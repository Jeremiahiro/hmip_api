'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NmmipLocationsCreateSchema extends Schema {
  up () {
    this.create('NmmipLocations', (table) => {

      table.increments()
      table.string('LocationName', 500).nullable()
      table.string('Latitude', 50).nullable()
      table.string('Longitude', 50).nullable()
      table.integer('StateID').notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('NmmipLocations')
  }
}

module.exports = NmmipLocationsCreateSchema
