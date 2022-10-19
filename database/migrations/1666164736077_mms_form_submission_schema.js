'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MmsFormSubmissionSchema extends Schema {
  up () {
    this.create('mms_form_submissions', (table) => {
      table.increments()

      // applicant
      table.string('applicantIndex');
      table.string('salutation', 50).nullable();
      table.string('firstName', 225).nullable();
      table.string('middleName', 225).nullable();
      table.string('lastName', 225).nullable();
      table.string('email', 225).nullable();
      table.date('dob').nullable();
      table.string('sex', 10).nullable();
      table.string('cell', 15).nullable();
      table.string('bvn', 20).nullable();
      table.string('pencomPin', 50).nullable();

      // applicant current address
      table.string('address_unit', 255).nullable();
      table.string('address_state', 255).nullable();
      table.string('address_city', 255).nullable();
      table.string('address_houseplot', 255).nullable();
      table.string('address_streetNumber', 255).nullable();
      table.string('address_estate', 255).nullable();
      table.string('address_location', 255).nullable();
      table.string('address_countryCode', 255).nullable();

      // employer
      table.string('employer_employerName', 225).nullable();
      table.string('employer_employeeId', 225).nullable();
      table.string('employer_employeeEmail', 225).nullable();
      table.string('employer_title', 225).nullable();
      table.string('employer_type', 225).nullable();
      table.string('employer_status', 225).nullable();
      table.string('employer_startDate', 225).nullable();
      table.string('employer_incomeAmount', 225).nullable();
      table.string('employer_incomeType', 225).nullable();
      table.string('employer_incomePeriod', 225).nullable();
      table.string('employer_occupation', 225).nullable();
      table.string('employer_unit', 225).nullable();
      table.string('employer_houseplot', 225).nullable();
      table.string('employer_streetNumber', 225).nullable();
      table.string('employer_streetName', 225).nullable();
      table.string('employer_estate', 225).nullable();
      table.string('employer_location', 225).nullable();
      table.string('employer_city', 225).nullable();
      table.string('employer_state', 225).nullable();
      table.string('employer_CountryCode', 225).nullable();

      // otherIncome
      table.string('otherIncomeDescription', 255).nullable();
      table.float("otherIncomeAmount", 14, 2).nullable();
      table.string('otherIncomePeriod', 255).nullable();
      table.string('otherIncomeType', 255).nullable();

      // assets
      table.string('assetType', 255).nullable();
      table.string('assetDescription', 255).nullable();
      table.float("assetValue", 14, 2).nullable();

      // liabilities
      table.string('liabilities_accountNumber', 255).nullable();
      table.float("liabilities_balance", 14, 2).nullable();
      table.string('liabilities_description', 255).nullable();
      table.string('liabilities_liabilityType', 255).nullable();
      table.float("liabilities_monthlyPayment", 14, 2).nullable();

      // subject property
      table.string('property_unit', 255).nullable();
      table.string('property_houseplot', 255).nullable();
      table.string('property_streetNumber', 255).nullable();
      table.string('property_streetName', 255).nullable();
      table.string('property_estate', 255).nullable();
      table.string('property_location', 255).nullable();
      table.string('property_city', 255).nullable();
      table.string('property_state', 255).nullable();
      table.string('property_countryCode', 255).nullable();
      table.string('property_type', 255).nullable();
      table.string('property_tenure', 255).nullable();
      table.string('property_age', 255).nullable();
      table.string('property_livingSpace', 255).nullable();
      table.string('property_lotSize', 255).nullable();
      table.string('property_numbersofrooms', 255).nullable();
      table.string('property_plan', 255).nullable();
      table.string('property_plot', 255).nullable();
      table.string('property_annualTaxes', 255).nullable();
      table.float("property_estateServiceCharges", 14, 2).nullable();
      table.string('property_insurance', 255).nullable();
      table.float("property_valuation", 14, 2).nullable();
      table.float("property_valuationAsIs", 14, 2).nullable();
      table.float("property_valuationComplete", 14, 2).nullable();
      table.string('property_valuationDate', 255).nullable();
      table.float("property_valuationForceSaleAsIs", 14, 2).nullable();
      table.float("property_valuationForceSaleComplete", 14, 2).nullable();

      // deal
      table.string('deal_dealId', 255).nullable();
      table.float("deal_purchase", 14, 2).nullable();
      table.float("deal_deposit", 14, 2).nullable();
      table.string('deal_termMonths', 255).nullable();
      table.string('deal_applicants', 255).nullable();
      table.string('deal_subjectProperty', 255).nullable();

      table.timestamps()
    })
  }

  down () {
    this.drop('mms_form_submissions')
  }
}

module.exports = MmsFormSubmissionSchema
