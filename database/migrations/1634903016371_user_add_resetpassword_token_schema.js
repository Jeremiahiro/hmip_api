'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserAddResetpasswordTokenSchema extends Schema {
  up() {
    this.alter("Users", table => {
      table
        .string("ResetPasswordToken", 50)
        .nullable()
        .after("RoleIDs");
    });
  }

  down() {
    this.alter("Users", table => {
      table.dropColumn("ResetPasswordToken");
    });
  }
}

module.exports = UserAddResetpasswordTokenSchema
