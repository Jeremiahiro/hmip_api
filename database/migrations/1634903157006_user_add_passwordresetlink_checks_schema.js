'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserAddPasswordresetlinkChecksSchema extends Schema {
  up() {
    this.alter("Users", table => {
      table
        .bigInteger("ResetPasswordTokenExpiry")
        .after("ResetPasswordToken")
        .nullable();
      table
        .boolean("ResetPasswordTokenUsed")
        .after("ResetPasswordTokenExpiry")
        .defaultTo(false);
    });
  }

  down() {
    this.alter("Users", table => {
      table.dropColumn("ResetPasswordTokenExpiry");
      table.dropColumn("ResetPasswordTokenUsed");
    });
  }
}

module.exports = UserAddPasswordresetlinkChecksSchema
