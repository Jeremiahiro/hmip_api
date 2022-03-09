'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const uuidv1 = require("uuid/v1");
const _ = require("lodash");
const Permission = use("App/Models/Permission");
const User = use("App/Models/User");
const RoleTypes = use("App/Definitions/RoleTypes");


class Role extends Model {
  static get table() {
    return "Roles";
  }

  static get primaryKey() {
    return "RoleID";
  }
  User() {
    return this.hasOne("App/Models/User", "RoleSlug", "RoleIDs");
  }

  static boot() {
    super.boot();

    //Transform Permissions
    this.addHook("beforeCreate", RoleInstance => {
      //Create Primary Key
      RoleInstance.RoleID = uuidv1();

      //Convert Array of Permission Slugs to comma-separated string
      RoleInstance.Permissions = RoleInstance.Permissions.join("|");
    });

    /* this.addHook("beforeUpdate", RoleInstance => {
      //Convert Array of Permission Slugs to comma-separated string
      RoleInstance.Permissions = RoleInstance.Permissions.join("|");
      console.log("Hey\r");
    }); */

    this.addHook("afterFind", RoleInstance => {
      //Return the comma-separated permissions string as an array
      RoleInstance.Permissions = RoleInstance.Permissions.split("|");
    });

    this.addHook("afterFetch", Instances => {
      //Return the comma-separated permissions string as an array
      _.map(Instances, RoleInstance => {
        RoleInstance.Permissions = RoleInstance.Permissions.split("|");

        return RoleInstance;
      });
    });

    //Ensure that locked roles cannot be deleted
    this.addHook("beforeDelete", "RestrictionHook.noDeleteLocked");
  }

  //Relatsionships

  async PermissionsDetails() {
    const allPermissions = await Permission.all();

    let rolePermissionsSlugs = this.Permissions;

    let details = _.map(rolePermissionsSlugs, slug => {
      let permission = _.find(allPermissions.toJSON(), { Slug: slug });

      if (permission) {
        return permission;
      }
    });

    return details;
  } //PermissionsDetails

  static async createRole(data) {
    //Lock default roles
    if (data.RoleType == "default") {
      data.IsLocked = 1;
    }
    const Role = await this.create(data);

    return Role;
  } //createRole

  static async updateRole(filter_data, update) {
    if (update.Permissions) {
      update.Permissions = update.Permissions.join("|");
    }
    const run_update = await this.query()
      .where(filter_data)
      .update(update);

    const { RoleID } = filter_data;
    const updated_Role = await this.find(RoleID);

    return updated_Role;
  } //updateRole

  static async removeRole(RoleID) {
    const Role = await this.find(RoleID);

    const run_delete = await Role.delete();

    return run_delete;
  } //removeRole

  static async getRolesold(fetch_data) {
    const Roles = await this.query()
      .where(fetch_data)
      .fetch();

    return Roles;
  } //getRolesold

  static async getRoles(fetch_data, raw = false, with_users = false) {
    // let Roles = [];
    const Roles = (raw) ? await this.query().whereRaw(fetch_data).fetch() : await this.query().where(fetch_data).fetch();
    if (with_users) {
      let organizationUsers = await User.query()
        .where({ IsEnabled: true })
        .fetch();

      let rolesArray = Roles.toJSON();
      console.log("ROLES ARRAY")
      console.log(rolesArray)
      let roleDetails = _.map(rolesArray, (role) => {
        role.Users = _.filter(organizationUsers.toJSON(), (user) => {
          return user.RoleIDs.indexOf(role.RoleSlug) != -1;
        });

        return role;
      });

      return roleDetails;
    } else {
      return Roles.toJSON();
    }
  } //getRoles
  static async getUserRoles(UserID) {
    let user = await User.find(UserID);

    let userRoles = user.RoleIDs;
    // console.log("USER ROLES")
    // console.log(userRoles)
    let organizationRoles = await this.getRoles({ IsEnabled: true });
    // console.log("ORGANAISATION ROLES")
    // console.log(organizationRoles)

    let userRoleDetails = _.map(userRoles, (roleslug) => {
      let detail = _.find(organizationRoles, { RoleName: roleslug });

      return detail;
    });
    return userRoleDetails;
  } //getUserRoles


  static async getUsersByPermission(data) {
    const query = `Permissions LIKE '%${data.Permission}%'`;
    return await this.query()
      .select('*')
      .from('roles')
      .with("User")
      // .leftJoin('users', 'users.RoleIDs', 'roles.RoleSlug')
      .whereRaw(query)
      .fetch()
  }
  static async getRole(RoleID) {
    let Role = await this.find(RoleID);
    Role.PermissionsData = await Role.PermissionsDetails();

    return Role;
  }
  static async getOrganizationRoles(fetch_data) {
    //Actual fetch should get only custom roles and default roles
    fetch_data.RoleType = RoleTypes.Custom;
    const Roles = await this.query()
      .where(fetch_data)
      .orWhere({
        RoleType: RoleTypes.Default
      })
      .fetch();

    //Fetch overrides
    const OverrideRoles = await this.query()
      .where({
        //OrganizationID: fetch_data.OrganizationID,
        RoleType: RoleTypes.Override
      })
      .fetch();

    //Swap override roles for defaults using their slugs
    let rolesCollection = Roles.toJSON();
    let overrideCollection = OverrideRoles.toJSON();

    let organizationUsers = await User.query()
    //.where({OrganizationID : fetch_data.OrganizationID})
    .fetch();

    let organizationRoles = _.map(rolesCollection, role => {
      //Check if this role contains the same slug as an override
      let foundOverride = _.find(overrideCollection, {
        RoleSlug: role.RoleSlug
      });

      if (foundOverride) {
        return foundOverride;
      }

      role.Users = _.filter(organizationUsers.toJSON(), (user) => {
        return user.RoleIDs.indexOf(role.RoleSlug) != -1;
      })

      return role;
    });

    return organizationRoles;
  } //getOrganizationRoles
}

module.exports = Role
