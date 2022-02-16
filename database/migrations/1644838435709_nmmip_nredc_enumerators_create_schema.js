'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NmmipNredcEnumeratorsCreateSchema extends Schema {
  up () {
    this.create('NmmipEnumerators', (table) => {
      table.increments()
      table.string('EnumeratorName', 250).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('NmmipEnumerators')
  }
}

module.exports = NmmipNredcEnumeratorsCreateSchema
