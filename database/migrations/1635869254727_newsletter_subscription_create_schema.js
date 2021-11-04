'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NewsletterSubscriptionCreateSchema extends Schema {
  up () {
    this.create('NewsletterSubscriptions', (table) => {
      table.uuid("ID").primary();
      table.string("Email").notNullable().unique();
      table.string('FirstName', 128).nullable()
      table.string('LastName', 128).nullable()
      table.string("Password", 100).notNullable();
      table.string("PhoneNumber", 15).nullable()
      table.timestamps();

    })
  }

  down () {
    this.drop('NewsletterSubscriptions')
  }
}

module.exports = NewsletterSubscriptionCreateSchema
