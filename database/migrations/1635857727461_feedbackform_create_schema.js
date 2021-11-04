'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FeedbackformCreateSchema extends Schema {
  up() {
    this.create('FeedbackForms', (table) => {
      table.uuid("FeedbackID").primary();
      table.string('FeedbackMessage', 500).nullable()
      table.integer("Rating").nullable()
      table.timestamps();
    })
  }

  down() {
    this.drop('FeedbackForms')
  }
}

module.exports = FeedbackformCreateSchema
