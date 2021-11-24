'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NmmipNredcsurveyformsCreateSchema extends Schema {
  up () {
    this.create('NmmipNREDCSurveyForms', (table) => {
      //table.increments()
      table.uuid("NREDCID").primary();
      table.string("Salutation").nullable()
      table.string('FirstName', 128).nullable()
      table.string('LastName', 128).nullable()
      table.string('MiddleName', 128).nullable()
      table.string("Email").notNullable().unique();
      table.string("PhoneNumber", 15).nullable()
      table.date("DateOfBirth").notNullable();
      table.string('Sex', 30).nullable()
      table.integer("Dependents").nullable();
      table.string("CurrentAddress", 50).nullable();
      table.string("ProvinceOrState", 50).nullable();
      table.string("LocationOrArea", 50).nullable();
      table.string("LGA", 50).nullable();
      table.string("StreetName", 50).nullable();
      table.integer("LengthOfTimeSpentIndwelling").nullable();
      table.integer("HouseNumber").nullable();
      table.string("OwnershipType", 150).nullable();
      table.float("RentAmountPerYear", 14, 2).nullable();
      table.float("PropertyValue", 14, 2).nullable();
      table.string("WhatIsYourPrimaryOccupation", 150).nullable();
      table.string("NameOfEmployer", 150).nullable();
      table.string("EmploymentSector", 150).nullable();
      table.string("Designation", 150).nullable();
      table.string("EmploymentStatus", 150).nullable();
      table.float("MonthlyIncome", 14, 2).nullable();
      table.string("WhatIsYourSecondaryOccupation", 150).nullable();
      table.float("IncomeFromSecondaryOccupation", 14, 2).nullable();
      table.string("EmployerStreetName", 50).nullable();
      table.string("EmployerLocationOrArea", 50).nullable();
      table.string("OfficeAddressNumber").nullable();
      table.string("PropertyProvinceOrState", 50).nullable();
      table.string("PropertyLocationOrArea", 50).nullable();
      table.string("PropertyLGA", 50).nullable();
      table.string("TypeOfBuyer", 150).nullable();
      table.string("PropertyType", 150).nullable();
      table.float("MortagePropertyAmount", 14, 2).nullable();
      table.integer('StateID').notNullable();
      table.integer('LGAID').notNullable();

      table.timestamps()
    })
  }

  down () {
    this.drop('NmmipNREDCSurveyForms')
  }
}

module.exports = NmmipNredcsurveyformsCreateSchema
