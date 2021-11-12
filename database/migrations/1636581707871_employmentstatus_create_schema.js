'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmploymentstatusCreateSchema extends Schema {
  up () {
    this.create('EmploymentStatus', (table) => {
      //table.increments()
      table.uuid("EmploymentStatusID").primary();
      table.string('EmploymentStatusName', 100).nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('EmploymentStatus')
  }
}

module.exports = EmploymentstatusCreateSchema
