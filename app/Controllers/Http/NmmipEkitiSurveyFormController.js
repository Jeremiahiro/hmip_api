'use strict'
const _ = require("lodash");
const Logger = use("Logger");
const { validate } = use("Validator");
const NmmipEkitiSurveyForm = use("App/Models/NmmipEkitiSurveyForm");
const NmmipState = use("App/Models/NmmipState");
const Lga = use("App/Models/Lga");
const OwnershipType = use("App/Models/OwnershipType");
const EmploymentSector = use("App/Models/EmploymentSector");
const EmploymentStatus = use("App/Models/EmploymentStatus");
const TypeOfBuyer = use("App/Models/TypeOfBuyer");
const PropertyType = use("App/Models/PropertyType");
const Sex = use("App/Models/Sex");
const ControllerHelpers = use("App/Utility/ControllerHelpers");
const NmmipEnumerator = use("App/Models/NmmipEnumerator");
class NmmipEkitiSurveyFormController {
    async createNmmipEkitiSurveyForm({ request, response }) {
        const data = request.post();

        const rules = {
            FirstName: `required`,
            LastName: `required`,            
            PhoneNumber: `required|unique:${NmmipEkitiSurveyForm.table}`,
            Email: `required|unique:${NmmipEkitiSurveyForm.table}`,
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
            Enumerator:`required|exists:${NmmipEnumerator.table},id`,


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
            "MortagePropertyAmount.required": "Mortage Property Amount is required",   
            "Enumerator.required": "An Enumerator  is required",
            "Enumerator.exists": "This enumerator does not exist",


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
            const create_nmmipEKITISurveyForm = await NmmipEkitiSurveyForm.createNmmipEkitiSurveyForm(data);

            const return_body = {
                success: true,
                details: create_nmmipEKITISurveyForm,
                message: "Nmmip EKITI Survey Form Successfully Created"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //createNmmipEKITISurveyForm

    async fetchNmmipEkitiSurveyForms({ request, response }) {
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
            const nmmipEkitiSurveyForm = await NmmipEkitiSurveyForm.getNmmipEkitiSurveyForms(data);

            const return_body = {
                success: true,
                details: nmmipEkitiSurveyForm,
                message: "Nmmip Ekiti Survey Forms Successfully Fetched"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //fetchNmmipEkitiSurveyForms

    async getNmmipEkitiSurveyForm({ request, response }) {
        const data = request.all();

        const rules = {
            EKITIID: `required|exists:${NmmipEkitiSurveyForm.table},EKITIID`
        };

        const messages = {
            "EKITIID.required": "A EKITI ID is required",
            "EKITIID.exists": "EKITI ID does not exist"
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

        const { EKITIID } = data;

        try {
            const nmmipEKITISurveyForm = await NmmipEkitiSurveyForm.getNmmipEkitiSurveyForm(EKITIID);

            const return_body = {
                success: true,
                details: nmmipEKITISurveyForm,
                message: "Nmmip EKITI Survey Form Successfully Fetched"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //getNmmipEkitiSurveyForm

    async removeNmmipEkitiSurveyForm({ request, response }) {
        const data = request.post();

        const rules = {
            EKITIID: `required|exists:${NmmipEkitiSurveyForm.table},EKITIID`
        };

        const messages = {
            "EKITIID.required": "A EKITI ID is required",
            "EKITIID.exists": "EKITI ID does not exist"
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

        const { EKITIID } = data;

        let return_body;

        const nmmipEkitiSurveyForm = await NmmipEkitiSurveyForm.find(EKITIID);

        if (nmmipEkitiSurveyForm) {
            try {
                const delete_nmmipEkitiSurveyForm = await NmmipEkitiSurveyForm.removeNmmipEkitiSurveyForm(
                    EKITIID
                );

                return_body = {
                    success: true,
                    details: delete_nmmipEkitiSurveyForm,
                    message: "Nmmip Ekiti Survey Form Successfully Deleted"
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
                message: "EKITIID does not exist"
            };

            return response.status(400).send(return_body);
        }
    } //removeNmmipEkitiSurveyForm
}

module.exports = NmmipEkitiSurveyFormController
