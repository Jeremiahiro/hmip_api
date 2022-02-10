'use strict'
const _ = require("lodash");
const Logger = use("Logger");
const { validate } = use("Validator");
const NmmipIndicator = use("App/Models/NmmipIndicator");
const NmmipIndicatorView = use("App/Models/NmmipIndicatorView");
const NmmipTable = use("App/Models/NmmipTable");
const ControllerHelpers = use("App/Utility/ControllerHelpers");
class NmmipIndicatorViewController {

    async createNmmipIndicatorView({ request, response }) {
        const data = request.post();
    
        const rules = {
            IndicatorID: `required|exists:${NmmipIndicator.table},id`,
            TableID: `required|exists:${NmmipTable.table},id`,
            TableOrViewName: `required|unique:${NmmipIndicatorView.table}`,
            SummaryTableOrViewName: "required",
            IsViewOrTable: "required",
            TotalNumberOfRespondents:"required",


        };
    
        const messages = {
          
          "IndicatorID.required": "Provide an indicator Id",
          "IndicatorID.exists": "Indicator does not exist",
          "TableID.required": "A table id is required",
          "TableID.exists": "table id does not exist",
          "TableOrViewName.required": "An Table or View name is required",
          "TableOrViewName.unique": "An Table or View with this name already exists",
          "SummaryTableOrViewName.required": "A summary Table or View name is required",
          "IsViewOrTable.required": "Is table or view",
          "TotalNumberOfRespondents.required":"The Total number of respondents is required"

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
          const create_nmmipIndicatorView = await NmmipIndicatorView.createNmmipIndicatorView(
            data
          );
    
          const return_body = {
            success: true,
            details: create_nmmipIndicatorView,
            message: "nmmip Indicator View Successfully Created"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //createNmmipIndicatorView

      async fetchNmmipIndicatorViews({ request, response }) {
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
          const nmmipIndicatorViews = await NmmipIndicatorView.getNmmipIndicatorViews(data);
    
          const return_body = {
            success: true,
            details: nmmipIndicatorViews,
            message: "nmmip Indicator views Successfully Fetched"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //fetchNmmipIndicatorViews

      async getNmmipIndicatorView({ request, response }) {
        const data = request.all();
    
        const rules = {
            IndicatorViewID: `required|exists:${NmmipIndicatorView.table},id`
        };
    
        const messages = {
          "IndicatorViewID.required": "An Indicator View id is required",
          "IndicatorViewID.exists": "Indicator View does not exist"
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
    
        const { IndicatorViewID } = data;
    
        try {
          const nmmipIndicatorView = await NmmipIndicatorView.getNmmipIndicatorView(IndicatorViewID);
    
          const return_body = {
            success: true,
            details: nmmipIndicatorView,
            message: "Indicator View Successfully Fetched"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //getNmmipIndicatorView

      async updateNmmipIndicatorView({ request, response }) {
        const data = request.post();
    
        const rules = {
          IndicatorViewID: `required|exists:${NmmipIndicatorView.table},id`
        };
    
        const messages = {
          "IndicatorViewID.required": "An Indicator View id is required",
          "IndicatorViewID.exists": "Indicator View does not exist"
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
    
        const { IndicatorViewID } = data;
    
        //Do not update the primary key
        delete data.IndicatorViewID;
    
        let return_body;
    
        if (!_.isEmpty(data)) {
          try {
            const update_nmmipIndicatorView = await NmmipIndicatorView.updateNmmipIndicatorView(
              { id: IndicatorViewID },
              data
            );
    
            return_body = {
              success: true,
              details: update_nmmipIndicatorView,
              message: "Indicator View Successfully Updated"
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
      } //updateNmmipIndicatorView
    
      async removeNmmipIndicatorView({ request, response }) {
        const data = request.post();
    
        const rules = {
            IndicatorViewID: `required|exists:${NmmipIndicatorView.table},id`
        };
    
        const messages = {
          "IndicatorViewID.required": "An Indicator View id is required",
          "IndicatorViewID.exists": "Indicator View does not exist"
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
    
        const { IndicatorViewID } = data;
    
        let return_body;
    
        const nmmipIndicatorView = await NmmipIndicatorView.find(IndicatorViewID);
    
        if (nmmipIndicatorView) {
          try {
            const delete_nmmipIndicatorView = await NmmipIndicatorView.removeNmmipIndicatorView(
                IndicatorViewID
            );
    
            return_body = {
              success: true,
              details: delete_nmmipIndicatorView,
              message: "nmmip Indicator View Successfully Deleted"
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
            message: "nmmip Indicator View does not exist"
          };
    
          return response.status(400).send(return_body);
        }
      } //removeNmmipIndicatorView
}

module.exports = NmmipIndicatorViewController
