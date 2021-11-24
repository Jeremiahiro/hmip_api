'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LgaCreateSchema extends Schema {
  up () {
    this.create('Lga', (table) => {
      table.increments()
      table.string('LgaName', 250).nullable()
      table.integer('StateID').notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('Lga')
  }
}

module.exports = LgaCreateSchema
