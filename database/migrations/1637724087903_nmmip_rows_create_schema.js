'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NmmipRowsCreateSchema extends Schema {
  up () {
    this.create('NmmipRows', (table) => {
      table.increments()
    table.integer("RowHeaderID").nullable();
    table.integer("ColumnHeaderID").nullable();
     table.string('Value', 225).nullable();
     table.integer("TableID").nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('NmmipRows')
  }
}

module.exports = NmmipRowsCreateSchema
