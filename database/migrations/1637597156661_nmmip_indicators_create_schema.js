'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NmmipIndicatorsCreateSchema extends Schema {
  up () {
    this.create('NmmipIndicators', (table) => {
      table.increments()
      table.string('IndicatorName', 500).nullable()
      table.integer("ParentIndicatorID").nullable();
      table.integer("DataGroupID").nullable();
      table.boolean("IsEnabled").defaultTo(true);
      table.string("PageVisibility").notNullable().defaultTo("Both");
      table.timestamps()
    })
  }

  down () {
    this.drop('NmmipIndicators')
  }
}

module.exports = NmmipIndicatorsCreateSchema
