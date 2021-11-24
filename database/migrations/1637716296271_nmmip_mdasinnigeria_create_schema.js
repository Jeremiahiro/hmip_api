'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NmmipMdasinnigeriaCreateSchema extends Schema {
  up () {
    this.create('NmmipMDAsInNigeria', (table) => {
      table.increments()
      table.string('MDAName', 500).notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('NmmipMDAsInNigeria')
  }
}

module.exports = NmmipMdasinnigeriaCreateSchema
