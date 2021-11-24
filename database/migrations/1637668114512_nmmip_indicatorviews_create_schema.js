'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NmmipIndicatorviewsCreateSchema extends Schema {
  up () {
    this.create('NmmipIndicatorViews', (table) => {
      table.increments()
      table.integer("TableID").nullable();
      table.integer('IndicatorID').nullable()
      table.string('TableOrViewName', 500).nullable()
      table.string('SummaryTableOrViewName', 500).nullable()
      table.string("IsViewOrTable").notNullable().defaultTo("Table");
      table.integer('TotalNumberOfRespondents').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('NmmipIndicatorViews')
  }
}

module.exports = NmmipIndicatorviewsCreateSchema
