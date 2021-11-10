'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SexCreateSchema extends Schema {
  up () {
    this.create('Sex', (table) => {
      table.increments()
      // table.uuid("SexID").primary();
      table.string('SexName', 100).nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('Sex')
  }
}

module.exports = SexCreateSchema
