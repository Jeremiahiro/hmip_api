"use strict";

const uuidv1 = require("uuid/v1");

const Model = use("Model");

class Permission extends Model {
  static get table() {
    return "Permissions";
  }

  static get primaryKey() {
    return "PermissionID";
  }

  static boot() {
    super.boot();

    this.addHook("beforeCreate", PermissionInstance => {
      PermissionInstance.PermissionID = uuidv1();
    });
  }
  PermissionGroup() {
    return this.hasOne("App/Models/PermissionGroup", "PermissionGroupID", "PermissionGroupID");
  }
  static async createPermission(data) {
    const Permission = await this.create(data);

    return Permission;
  }

  static async updatePermission(filter_data, update) {
    const run_update = await this.query()
      .where(filter_data)
      .update(update);

    const { PermissionID } = filter_data;
    const updated_Permission = await this.find(PermissionID);

    return updated_Permission;
  } //updatePermission

  static async removePermission(PermissionID) {
    const Permission = await this.find(PermissionID);

    const run_delete = await Permission.delete();

    return run_delete;
  } //removePermission

  static async getPermissions(fetch_data) {
    const Permissions = await this.query()
      .where(fetch_data)
      .with ("PermissionGroup")
      .fetch();

    return Permissions;
  } //getPermissions

  static async getPermission(PermissionID) {
    const Permission = await this.find(PermissionID);

    return Permission;
  }
}

module.exports = Permission;
