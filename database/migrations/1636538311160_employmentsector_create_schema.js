'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmploymentsectorCreateSchema extends Schema {
  up () {
    this.create('EmploymentSector', (table) => {
      //table.increments();
      table.uuid("EmploymentSectorID").primary();
      table.string('EmploymentSectorName', 100).nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('EmploymentSector')
  }
}

module.exports = EmploymentsectorCreateSchema
