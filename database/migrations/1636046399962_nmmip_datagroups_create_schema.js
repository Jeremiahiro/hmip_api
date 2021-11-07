'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NmmipDatagroupsCreateSchema extends Schema {
  up () {
    this.create('NmmipDataGroups', (table) => {
      table.increments()
     table.integer("DataGroupParentID").nullable();
      table.string('DataGroupName', 500).nullable()
      table.timestamps();
    })
  }

  down () {
    this.drop('NmmipDataGroups')
  }
}

module.exports = NmmipDatagroupsCreateSchema
