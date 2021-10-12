'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PermissionsCreateSchema extends Schema {
  up() {
    this.create("Permissions", table => {
      table
        .uuid("PermissionID")
        .unique()
        .notNullable()
        .primary();
      table.string("PermissionGroupID").notNullable();

      table
        .string("Slug", 240)
        .unique()
        .notNullable();
      table
        .string("PermissionName", 254)
        .unique()
        .notNullable();

      table.text("Description", "mediumtext").notNullable();

      table.boolean("IsEnabled").defaultTo(true);
      table.boolean("IsLocked").defaultTo(true);

      table.timestamps();
    });
  }

  down() {
    this.drop("Permissions");
  }
}

module.exports = PermissionsCreateSchema
