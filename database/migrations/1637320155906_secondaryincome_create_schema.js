'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SecondaryincomeCreateSchema extends Schema {
  up () {
    this.create('SecondaryIncome', (table) => {
      table.uuid("SecondaryIncomeID").primary();
      table.string('SecondaryIncomeName', 225).nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('SecondaryIncome')
  }
}

module.exports = SecondaryincomeCreateSchema
