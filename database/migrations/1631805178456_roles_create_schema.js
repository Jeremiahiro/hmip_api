'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RolesCreateSchema extends Schema {
  up() {
    this.create("Roles", table => {
      table
        .uuid("RoleID")
        .unique()
        .notNullable()
        .primary();
      table
        .string("RoleName", 100)
        .notNullable()
        .unique();

      table
        .string("RoleSlug", 50)
        .notNullable()
        .unique();

      table.text("RoleDescription", "mediumtext").notNullable();

      table
        .string("RoleType", 15)
        .notNullable()
        .defaultTo("custom"); //Roles created by users are 'custom'

      table.text("Permissions", "longtext").notNullable();

      table.boolean("IsEnabled").defaultTo(true);

      table.boolean("IsLocked").defaultTo(false); //Roles created by users will open by default

      table.timestamps();
    });
  }

  down() {
    this.drop("Roles");
  }

}

module.exports = RolesCreateSchema
