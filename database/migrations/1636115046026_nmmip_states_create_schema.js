'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NmmipStatesCreateSchema extends Schema {
  up () {
    this.create('NmmipStates', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('NmmipStates')
  }
}

module.exports = NmmipStatesCreateSchema
