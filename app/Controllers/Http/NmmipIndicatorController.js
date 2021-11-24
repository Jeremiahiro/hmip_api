'use strict'
const PageVisibility = use("App/Definitions/PageVisibility");
const _ = require("lodash");
const Logger = use("Logger");
const { validate } = use("Validator");
const NmmipIndicator = use("App/Models/NmmipIndicator");
const NmmipDataGroup = use("App/Models/NmmipDataGroup");
const ControllerHelpers = use("App/Utility/ControllerHelpers");

class NmmipIndicatorController {

    async createNmmipIndicator({ request, response }) {
        const data = request.post();
    
        const rules = {
            IndicatorName: `required|unique:${NmmipIndicator.table}`,
            ParentIndicatorID: "required",
            DataGroupID: `required|exists:${NmmipDataGroup.table},id`,
            PageVisibility:"required",


        };
    
        const messages = {
          "IndicatorName.required": "An Indicator name is required",
          "IndicatorName.unique": "An Indicator with this name already exists",
          "ParentIndicatorID.required": "Provide a parent indicator Id",
          "DataGroupID.required": "A data group  id is required",
          "DataGroupID.exists": "data group does not exist",
          "PageVisibility.required": "Page visibility is required",

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
          const create_nmmipIndicator= await NmmipIndicator.createNmmipIndicator(
            data
          );
    
          const return_body = {
            success: true,
            details: create_nmmipIndicator,
            message: "nmmip Indicator Successfully Created"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //createNmmipIndicator

      async fetchNmmipIndicators({ request, response }) {
        const data = request.all();
    
        try {
          const nmmipIndicators = await NmmipIndicator.getNmmipIndicators(data);
    
          const return_body = {
            success: true,
            details: nmmipIndicators,
            message: "nmmip Indicators Successfully Fetched"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //fetchNmmipIndicators

      async getNmmipIndicator({ request, response }) {
        const data = request.all();
    
        const rules = {
            IndicatorID: `required|exists:${NmmipIndicator.table},id`
        };
    
        const messages = {
          "IndicatorID.required": "An Indicator  id is required",
          "IndicatorID.exists": "Indicator does not exist"
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
    
        const { IndicatorID } = data;
    
        try {
          const nmmipIndicator = await NmmipIndicator.getNmmipIndicator(IndicatorID);
    
          const return_body = {
            success: true,
            details: nmmipIndicator,
            message: "Indicator Successfully Fetched"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //getNmmipIndicator

      async updateNmmipIndicator({ request, response }) {
        const data = request.post();
    
        const rules = {
          IndicatorID: `required|exists:${NmmipIndicator.table},id`
        };
    
        const messages = {
          "IndicatorID.required": "An Indicator  id is required",
          "IndicatorID.exists": "Indicator does not exist"
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
    
        const { IndicatorID } = data;
    
        //Do not update the primary key
        delete data.IndicatorID;
    
        let return_body;
    
        if (!_.isEmpty(data)) {
          try {
            const update_nmmipIndicator = await NmmipIndicator.updateNmmipIndicator(
              { id: IndicatorID },
              data
            );
    
            return_body = {
              success: true,
              details: update_nmmipIndicator,
              message: "Indicator Successfully Updated"
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
      } //updateNmmipIndicator
    
      async removeNmmipIndicator({ request, response }) {
        const data = request.post();
    
        const rules = {
            IndicatorID: `required|exists:${NmmipIndicator.table},id`
        };
    
        const messages = {
          "IndicatorID.required": "An Indicator  id is required",
          "IndicatorID.exists": "Indicator  does not exist"
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
    
        const { IndicatorID } = data;
    
        let return_body;
    
        const nmmipIndicator = await NmmipIndicator.find(IndicatorID);
    
        if (nmmipIndicator) {
          try {
            const delete_nmmipIndicator = await NmmipIndicator.removeNmmipIndicator(
                IndicatorID
            );
    
            return_body = {
              success: true,
              details: delete_nmmipIndicator,
              message: "nmmip Indicator Successfully Deleted"
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
            message: "nmmip Indicator does not exist"
          };
    
          return response.status(400).send(return_body);
        }
      } //removeNmmipIndicator
}

module.exports = NmmipIndicatorController
