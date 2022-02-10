'use strict'
const _ = require("lodash");
const Logger = use("Logger");
const { validate } = use("Validator");
const NmmipValue = use("App/Models/NmmipValue");
const NmmipState = use("App/Models/NmmipState");
const NmmipIndicator = use("App/Models/NmmipIndicator");
const ControllerHelpers = use("App/Utility/ControllerHelpers");

class NmmipValueController {
     
    async createNmmipValue({ request, response }) {
        const data = request.post();
    
        const rules = {
            Value: `required|unique:${NmmipValue.table}`,
            Year: "required",
            Month:"required",
            StateID: `required|exists:${NmmipState.table},id`,
            IndicatorID: `required|exists:${NmmipIndicator.table},id`,


        };
    
        const messages = {
          "Value.required": "A Value  is required",
          "Value.unique": "This value already exists",
          "Year.required": "Provide a longitude",
          "Month.required": "Provide a latitude",
          "StateID.required": "A State id is required",
          "StateID.exists": "State id does not exist",
          "IndicatorID.required": "Provide an indicator Id",
          "IndicatorID.exists": "Indicator does not exist",

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
          const create_nmmipValue = await NmmipValue.createNmmipValue(
            data
          );
    
          const return_body = {
            success: true,
            details: create_nmmipValue,
            message: "nmmip Value Successfully Created"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //createNmmipValue

      async fetchNmmipValues({ request, response }) {
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
          const nmmipValues = await NmmipValue.getNmmipValues(data);
    
          const return_body = {
            success: true,
            details: nmmipValues,
            message: "nmmip Values Successfully Fetched"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //fetchNmmipValues

      async getNmmipValue({ request, response }) {
        const data = request.all();
    
        const rules = {
            ValueID: `required|exists:${NmmipValue.table},id`
        };
    
        const messages = {
          "ValueID.required": "a Value  id is required",
          "ValueID.exists": "Value does not exist"
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
    
        const { ValueID } = data;
    
        try {
          const nmmipValue = await NmmipValue.getNmmipValue(ValueID);
    
          const return_body = {
            success: true,
            details: nmmipValue,
            message: "Value Successfully Fetched"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //getNmmipValue

      async updateNmmipValue({ request, response }) {
        const data = request.post();
    
        const rules = {
          ValueID: `required|exists:${NmmipValue.table},id`
        };
    
        const messages = {
          "ValueID.required": "a Value  id is required",
          "ValueID.exists": "Value does not exist"
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
    
        const { ValueID } = data;
    
        //Do not update the primary key
        delete data.ValueID;
    
        let return_body;
    
        if (!_.isEmpty(data)) {
          try {
            const update_nmmipValue = await NmmipValue.updateNmmipValue(
              { id: ValueID },
              data
            );
    
            return_body = {
              success: true,
              details: update_nmmipValue,
              message: "Value Successfully Updated"
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
            message: "Nothing to update"
          };
    
          return response.status(400).send(return_body);
        }
      } //updateNmmipValue
    
      async removeNmmipValue({ request, response }) {
        const data = request.post();
    
        const rules = {
            ValueID: `required|exists:${NmmipValue.table},id`
        };
    
        const messages = {
          "ValueID.required": "a Value  id is required",
          "ValueID.exists": "Value  does not exist"
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
    
        const { ValueID } = data;
    
        let return_body;
    
        const nmmipValue = await NmmipValue.find(ValueID);
    
        if (nmmipValue) {
          try {
            const delete_nmmipValue = await NmmipValue.removeNmmipValue(
                ValueID
            );
    
            return_body = {
              success: true,
              details: delete_nmmipValue,
              message: "nmmip Value Successfully Deleted"
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
            message: "nmmip Value does not exist"
          };
    
          return response.status(400).send(return_body);
        }
      } //removeNmmipValue
}

module.exports = NmmipValueController
