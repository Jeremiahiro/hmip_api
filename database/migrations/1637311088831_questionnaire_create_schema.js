'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestionnaireCreateSchema extends Schema {
  up () {
    this.create('Questionnaire', (table) => {
      table.increments()
      table.string('Question1', 50).nullable();
      table.string('Question2', 50).nullable();
      table.string('Question3', 50).nullable();
      table.string('Question4', 50).nullable();
      table.string('Question5', 50).nullable();
      table.string('Question6A', 50).nullable();
      table.string('Question6B', 50).nullable();
      table.string('Question6C', 50).nullable();
      table.string('Question6D', 50).nullable();
      table.string('Question6E', 50).nullable();
      table.string('Question6F', 50).nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('Questionnaire')
  }
}

module.exports = QuestionnaireCreateSchema
