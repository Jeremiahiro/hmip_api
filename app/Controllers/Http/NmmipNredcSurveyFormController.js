'use strict'
const _ = require("lodash");
const Logger = use("Logger");
const { validate } = use("Validator");
const NmmipNredcSurveyForm = use("App/Models/NmmipNredcSurveyForm");
const NmmipState = use("App/Models/NmmipState");
const Lga = use("App/Models/Lga");
const OwnershipType = use("App/Models/OwnershipType");
const EmploymentSector = use("App/Models/EmploymentSector");
const EmploymentStatus = use("App/Models/EmploymentStatus");
const TypeOfBuyer = use("App/Models/TypeOfBuyer");
const PropertyType = use("App/Models/PropertyType");
const Sex = use("App/Models/Sex");
const ControllerHelpers = use("App/Utility/ControllerHelpers");

class NmmipNredcSurveyFormController {

    async createNmmipNredcSurveyForm({ request, response }) {
        const data = request.post();

        const rules = {
            FirstName: `required`,
            LastName: `required`,            
            PhoneNumber: `required|unique:${NmmipNredcSurveyForm.table}`,
            Email: `required|unique:${NmmipNredcSurveyForm.table}`,
            DateOfBirth:`required`,
            SexID: `required|exists:${Sex.table},id`,
            Dependents: `required`,            
            CurrentAddress: `required`,            
            ProvinceOrState: `required|exists:${NmmipState.table},id`,
            LgaID: `required|exists:${Lga.table},id`,
            StreetName: `required`,
            LengthOfTimeSpentIndwelling: `required`,
            HouseNumber: `required`,
            OwnershipTypeID: `required|exists:${OwnershipType.table},OwnershipTypeID`,
            RentAmountPerYear: `required`,
            PropertyValue: `required`,
            WhatIsYourPrimaryOccupation: `required`,
            NameOfEmployer: `required`,
            EmploymentSectorID: `required|exists:${EmploymentSector.table},EmploymentSectorID`,
            Designation: `required`,
            EmploymentStatusID: `required|exists:${EmploymentStatus.table},EmploymentStatusID`,
            MonthlyIncome: `required`,
            EmployerStreetName: `required`,
            EmployerLocationOrArea: `required`,
            OfficeAddressNumber: `required`,
            PropertyProvinceOrState:`required|exists:${NmmipState.table},id`,
            PropertyLocationOrArea: `required`,
            PropertyLGAID: `required|exists:${Lga.table},id`,
            TypeOfBuyerID: `required|exists:${TypeOfBuyer.table},TypeOfBuyerID`,
            PropertyTypeID: `required|exists:${PropertyType.table},PropertyTypeID`,
            MortagePropertyAmount: `required`,

        };

        const messages = {
            "FirstName.required": "A name is required for the user",
            "LastName.required": "A name is required for the user",
            "PhoneNumber.required": "A Phone Number is required",
            "PhoneNumber.unique": "Phone Number already exist",
            "Email.required": "An Email is required",
            "Email.unique": "The email is taken. Try another.",
            "DateOfBirth.required": "Date Of Birth is Required",
            "SexID.required": "A sex id is required",
            "SexID.exists": "sex does not exist",
            "Dependents.required": "A Dependents  is required",           
            "CurrentAddress.required": "An address is required",
            "ProvinceOrState.required": "A State id is required",
            "ProvinceOrState.exists": "State id does not exist",
            "LgaID.required": "An lga id is required",
            "LgaID.exists": "lga does not exist",
            "StreetName.required": "A street name is required",
            "LengthOfTimeSpentIndwelling.required": "A Length Of TimeSpent In dwelling is required",
            "HouseNumber.required": "A street name is required",
            "OwnershipTypeID.required": "A Ownership Type id is required",
            "OwnershipTypeID.exists": "Ownership Type does not exist",
            "RentAmountPerYear.required": "A Rent Amount Per Year is required",
            "PropertyValue.required": "Property Value is required",
            "WhatIsYourPrimaryOccupation.required": "Primary Occupation is required",
            "NameOfEmployer.required": "Name Of Employer is required",
            "EmploymentSectorID.required": "A Employment Sector id is required",
            "EmploymentSectorID.exists": "Employment Sector does not exist",
            "Designation.required": "Designation is required",
            "EmploymentStatusID.required": "A Employment Status id is required",
            "EmploymentStatusID.exists": "Employment Status does not exist",
            "MonthlyIncome.required": "Monthly Income is required",
            "EmployerStreetName.required": "A Employer street name is required",
            "EmployerLocationOrArea.required": "Employer Location Or Area is required",
            "OfficeAddressNumber.required": "Office Address Number is required",
            "PropertyProvinceOrState.required": "A State id is required",
            "PropertyProvinceOrState.exists": "State id does not exist",
            "PropertyLocationOrArea.required": "Property location is required",
            "PropertyLGAID.required": "Property lga id is required",
            "PropertyLGAID.exists": "Property lga does not exist",
            "TypeOfBuyerID.required": "A Type Of Buyer id is required",
            "TypeOfBuyerID.exists": "Type Of Buyer does not exist",
            "PropertyTypeID.required": "A Property Type id is required",
            "PropertyTypeID.exists": "Property Type does not exist",
            "MortagePropertyAmount": "Mortage Property Amount is required"

        };

        const validation = await validate(data, rules, messages);

        if (validation.fails()) {
            return response.status(400).send({
                success: false,
                message: ControllerHelpers.extractValidationErrorMessages(
                    validation.messages()
                )
            });
        }

        try {
            const create_nmmipNREDCSurveyForm = await NmmipNredcSurveyForm.createNmmipNREDCSurveyForm(data);

            const return_body = {
                success: true,
                details: create_nmmipNREDCSurveyForm,
                message: "Nmmip NREDC Survey Form Successfully Created"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //createNmmipNREDCSurveyForm

    async fetchNmmipNredcSurveyForms({ request, response }) {
        const data = request.all();
        const rules = {
            page: `required`,
            limit: `required`
          };
      
          const messages = {
           
           "page.required": "An page value",
            "limit.required": "A limit value"
          };
      
          const validation = await validate(data, rules, messages);
      
          if (validation.fails()) {
            return response.status(400).send({
              success: false,
              message: ControllerHelpers.extractValidationErrorMessages(
                validation.messages()
              )
            });
          }
        try {
            const nmmipNredcSurveyForm = await NmmipNredcSurveyForm.getNmmipNREDCSurveyForms(data);

            const return_body = {
                success: true,
                details: nmmipNredcSurveyForm,
                message: "Nmmip Nredc Survey Forms Successfully Fetched"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //fetchNmmipNredcSurveyForms

    async getNmmipNredcSurveyForm({ request, response }) {
        const data = request.all();

        const rules = {
            NREDCID: `required|exists:${NmmipNredcSurveyForm.table},NREDCID`
        };

        const messages = {
            "NREDCID.required": "A NREDC ID is required",
            "NREDCID.exists": "NREDC ID does not exist"
        };

        const validation = await validate(data, rules, messages);

        if (validation.fails()) {
            return response.status(400).send({
                success: false,
                message: ControllerHelpers.extractValidationErrorMessages(
                    validation.messages()
                )
            });
        }

        const { NREDCID } = data;

        try {
            const nmmipNREDCSurveyForm = await NmmipNredcSurveyForm.getNmmipNREDCSurveyForm(NREDCID);

            const return_body = {
                success: true,
                details: nmmipNREDCSurveyForm,
                message: "Nmmip NREDC Survey Form Successfully Fetched"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //getNmmipNredcSurveyForm

    async removeNmmipNredcSurveyForm({ request, response }) {
        const data = request.post();

        const rules = {
            NREDCID: `required|exists:${NmmipNredcSurveyForm.table},NREDCID`
        };

        const messages = {
            "NREDCID.required": "A NREDC ID is required",
            "NREDCID.exists": "NREDC ID does not exist"
        };

        const validation = await validate(data, rules, messages);

        if (validation.fails()) {
            return response.status(400).send({
                success: false,
                message: ControllerHelpers.extractValidationErrorMessages(
                    validation.messages()
                )
            });
        }

        const { NREDCID } = data;

        let return_body;

        const nmmipNredcSurveyForm = await NmmipNredcSurveyForm.find(NREDCID);

        if (nmmipNredcSurveyForm) {
            try {
                const delete_nmmipNredcSurveyForm = await NmmipNredcSurveyForm.removeNmmipNREDCSurveyForm(
                    NREDCID
                );

                return_body = {
                    success: true,
                    details: delete_nmmipNredcSurveyForm,
                    message: "Nmmip Nredc Survey Form Successfully Deleted"
                };

                response.send(return_body);
            } catch (error) {
                Logger.error("Error : ", error);
                return response.status(500).send({
                    success: false,
                    message: error.toString()
                });
            }
        } else {
            return_body = {
                success: false,
                message: "NREDCID does not exist"
            };

            return response.status(400).send(return_body);
        }
    } //removeNmmipNredcSurveyForm
}

module.exports = NmmipNredcSurveyFormController
