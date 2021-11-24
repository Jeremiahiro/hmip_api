'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NmmipValuesCreateSchema extends Schema {
  up () {
    this.create('NmmipValues', (table) => {
      table.increments()
      table.integer('StateID').notNullable();
      table.integer('IndicatorID').nullable()
      table.string('Value', 500).nullable()
      table.integer("Month", 2).notNullable();
      table.integer("Year", 4).notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('NmmipValues')
  }
}

module.exports = NmmipValuesCreateSchema
