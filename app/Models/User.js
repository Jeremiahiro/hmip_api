"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const _ = require("lodash");

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use("Hash");
const uuidv1 = require("uuid/v1");
const Database = use("Database");

class User extends Model {
  static get table() {
    return "Users";
  }

  static get primaryKey() {
    return "UserID";
  }

  static boot() {
    super.boot();

    this.addHook("beforeCreate", userInstance => {
      userInstance.UserID = uuidv1();
      //Convert Array of Role Slugs to comma-separated string
      userInstance.RoleIDs = userInstance.RoleIDs.join("|");
    });

    this.addHook("beforeSave", async userInstance => {
      if (userInstance.dirty.Password) {
        userInstance.Password = await Hash.make(userInstance.Password);
      }
    });

    this.addHook("afterFind", userInstance => {
      //Return the comma-separated roles string as an array
      userInstance.RoleIDs = userInstance.RoleIDs.split("|");
    });

    this.addHook("afterFetch", Instances => {
      //Return the comma-separated roles string as an array
      _.map(Instances, userInstance => {
        userInstance.RoleIDs = userInstance.RoleIDs.split("|");

        return userInstance;
      });
    });
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany("App/Models/Token");
  }

  // Department() {
  //   return this.hasOne("App/Models/Department", "DepartmentID", "DepartmentID");
  // }

  static async createUser(data) {
    await this.guardUserData(data);
    data.IsEnabled = 1;
    data.IsLocked = 0;

    const User = await this.create(data);

    return User;
  }

  static async resetPassword(data) {
    data.Password = await Hash.make(data.Password);

    const reset_password = this.updateUser(
      { UserID: data.UserID },
      { Password: data.Password }
    );

    return reset_password;
  } //resetPassword

  static async updateUser(filter_data, update) {
    await this.guardUserData(update);

    if (update.RoleIDs) {
      update.RoleIDs = update.RoleIDs.join("|");
    }

    const run_update = await this.query()
      .where(filter_data)
      .update(update);

    const { UserID } = filter_data;
    const updated_User = await this.find(UserID);

    return updated_User;
  } //updateUser

  static async removeUser(UserID) {
    const User = await this.find(UserID);

    const run_delete = await User.delete();

    return run_delete;
  } //removeUser

  static async getUsers(fetch_data) {
    const Users = await this.query()
      .where(fetch_data)
      // .with("Department")
      .fetch();

    return Users;
  } //getUsers

  static async getUser(UserID) {
    const User = await this.find(UserID);

    return User;
  }
  static async guardUserData(data) {
    //Role Ids must come as a non-empty array
    if (data.RoleIDs) {
      if (_.isEmpty(data.RoleIDs) || !_.isArray(data.RoleIDs)) {
        throw new Error("Roles must be a non-empty array");
      }
    }
  } //guardUserData



}

module.exports = User;
