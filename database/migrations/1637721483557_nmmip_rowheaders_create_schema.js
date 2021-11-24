'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NmmipRowheadersCreateSchema extends Schema {
  up () {
    this.create('NmmipRowHeaders', (table) => {
     table.increments()
     //table.uuid("RowHeaderID").primary();
     table.string('RowName', 225).nullable();
     table.integer("TableID").nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('NmmipRowHeaders')
  }
}

module.exports = NmmipRowheadersCreateSchema
