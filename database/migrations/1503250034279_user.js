'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('firstname', 128).nullable()
      table.string('lastname', 128).nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 100).notNullable()
      table.string("PhoneNumber", 15) .nullable()   
      table.boolean("IsEnabled");
   
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
