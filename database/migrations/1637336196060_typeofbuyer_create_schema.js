'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TypeofbuyerCreateSchema extends Schema {
  up () {
    this.create('TypeOfBuyer', (table) => {
      //table.increments()
      table.uuid("TypeOfBuyerID").primary();
      table.string('TypeOfBuyerName', 100).nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('TypeOfBuyer')
  }
}

module.exports = TypeofbuyerCreateSchema
