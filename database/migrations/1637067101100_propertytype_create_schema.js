'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PropertytypeCreateSchema extends Schema {
  up () {
    this.create('PropertyType', (table) => {
      //table.increments()
      table.uuid("PropertyTypeID").primary();
      table.string('PropertyTypeName', 500).nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('PropertyType')
  }
}

module.exports = PropertytypeCreateSchema
