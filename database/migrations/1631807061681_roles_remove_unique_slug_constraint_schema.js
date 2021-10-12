'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RolesRemoveUniqueSlugConstraintSchema extends Schema {
  up() {
    this.alter("Roles", table => {
      table.dropUnique("RoleName");
      table.dropUnique("RoleSlug");
    });
  }

  down() {
    this.alter("Roles", table => {
      table
        .string("RoleName", 100)
        .notNullable()
        .unique()
        .alter();
      table
        .string("RoleSlug", 50)
        .notNullable()
        .unique()
        .alter();
    });
  }
}

module.exports = RolesRemoveUniqueSlugConstraintSchema
