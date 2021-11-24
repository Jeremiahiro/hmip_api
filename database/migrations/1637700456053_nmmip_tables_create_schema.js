'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NmmipTablesCreateSchema extends Schema {
  up () {
    this.create('NmmipTables', (table) => {
      table.increments()
      table.string('TableName', 500).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('NmmipTables')
  }
}

module.exports = NmmipTablesCreateSchema
