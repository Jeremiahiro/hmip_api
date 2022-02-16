'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NmmipEkitisurveyformsCreateSchema extends Schema {
  up () {
    this.create('NmmipEKITISurveyForms', (table) => {
      table.uuid("EKITIID").primary();
       table.string("Salutation").nullable()
       table.string('FirstName', 128).nullable()
       table.string('LastName', 128).nullable()
       table.string('MiddleName', 128).nullable()
       table.string("Email").notNullable().unique();
       table.string("PhoneNumber", 15).nullable()
       table.date("DateOfBirth").notNullable();
       table.integer('SexID').nullable();
       table.integer('Dependents').nullable();
       table.string("CurrentAddress", 50).nullable();
       table.integer('ProvinceOrState').nullable();
       table.string("LocationOrArea", 50).nullable();
       table.integer('LGAID').notNullable();
       table.string("StreetName", 50).nullable();
       table.integer("LengthOfTimeSpentIndwelling").nullable();
       table.integer('HouseNumber').nullable();
       table.string("OwnershipTypeID").nullable();
       table.float("RentAmountPerYear", 14, 2).nullable();
       table.float("PropertyValue", 14, 2).nullable();
       table.string("WhatIsYourPrimaryOccupation", 150).nullable();
       table.string("NameOfEmployer", 150).nullable();
       table.string("EmploymentSectorID").nullable();
       table.string("Designation", 150).nullable();
       table.string("EmploymentStatusID").nullable();
       table.float("MonthlyIncome", 14, 2).nullable();
       table.string("WhatIsYourSecondaryOccupation", 150).nullable();
       table.float("IncomeFromSecondaryOccupation", 14, 2).nullable();
       table.string("EmployerStreetName", 50).nullable();
       table.string("EmployerLocationOrArea", 50).nullable();
       table.string("OfficeAddressNumber").nullable();
       table.integer('PropertyProvinceOrState').nullable();
       table.string("PropertyLocationOrArea", 50).nullable();
       table.integer('PropertyLGAID').nullable();
       table.string("TypeOfBuyerID").nullable();
       table.string("PropertyTypeID").nullable();
       table.float("MortagePropertyAmount", 14, 2).nullable();
       table.integer('Enumerator').nullable();
       table.timestamps() 
    })
  }

  down () {
    this.drop('NmmipEKITISurveyForms')
  }
}

module.exports = NmmipEkitisurveyformsCreateSchema
