'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PermissionGroupsAddDefaultsSchema extends Schema {
  up() {
    this.alter("PermissionGroups", table => {
      table
        .uuid("PermissionGroupID")
        .notNullable()
        .alter();

      table
        .boolean("IsLocked")
        .defaultTo(true)
        .alter();
    })
  }

  down() {
    this.alter("PermissionGroups", table => {
      table
        .uuid("PermissionGroupID")
        .nullable()
        .alter();

      table.boolean("IsLocked").alter();
    });
  }
}

module.exports = PermissionGroupsAddDefaultsSchema
