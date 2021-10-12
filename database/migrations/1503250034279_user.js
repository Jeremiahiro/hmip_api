'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('Users', (table) => {
      table.uuid("UserID").primary();
      table.string("Email").notNullable().unique();
      table.string('Firstname', 128).nullable()
      table.string('Lastname', 128).nullable()
      table.string("Password", 100).notNullable();
      table.string("PhoneNumber", 15).nullable()
      table.text("RoleIDs", "longtext").notNullable();
      table.boolean("IsEnabled");
      table.boolean("IsLocked");
      table.timestamps();




    })
  }

  down() {
    this.drop('Users')
  }
}

module.exports = UserSchema
