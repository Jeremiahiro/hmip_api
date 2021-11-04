'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NmmipcolumnheadersCreateSchema extends Schema {
  up () {
    this.create('NMMIPColumnHeaders', (table) => {
     // table.uuid("ColumnHeaderID").primary();
     table.increments("ColumnHeaderID");
     table.integer("TableID").nullable();
      table.string('ColumnName', 225).nullable()
    })
  }

  down () {
    this.drop('NMMIPColumnHeaders')
  }
}

module.exports = NmmipcolumnheadersCreateSchema
