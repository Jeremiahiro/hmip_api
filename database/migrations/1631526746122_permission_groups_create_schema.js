'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PermissionGroupsCreateSchema extends Schema {
  up() {
    this.create("PermissionGroups", table => {
      table.uuid("PermissionGroupID").primary();
      table
        .string("PermissionGroupName")
        .notNullable()
        .unique();

      table.text("GroupDescription", "longtext").nullable();
      table.boolean("IsLocked");
      table.timestamps();
    });
  }

  down() {
    this.drop("PermissionGroups");
  }
}

module.exports = PermissionGroupsCreateSchema
