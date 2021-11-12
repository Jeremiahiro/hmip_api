'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OwnershiptypeCreateSchema extends Schema {
  up () {
    this.create('OwnershipType', (table) => {
      //table.increments()
      table.uuid("OwnershipTypeID").primary();
      table.string('OwnershipTypeName', 100).nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('OwnershipType')
  }
}

module.exports = OwnershiptypeCreateSchema
