'use strict'
const Logger = use("Logger");

const _ = require("lodash");
const { validate } = use("Validator");
const NmmipColumnHeader = use("App/Models/NmmipColumnHeader");
const ControllerHelpers = use("App/Utility/ControllerHelpers");

class NmmipColumnHeaderController {
    async createNmmipColumnHeader({ request, response }) {
        const data = request.post();
    
        const rules = {
            ColumnName: `required|unique:${NmmipColumnHeader.table}`,
          TableID: "required"
        };
    
        const messages = {
          "ColumnName.required": "A column name is required",
          "ColumnName.unique": "A column with this name already exists",
          "TableID.required": "Provide a table Id"
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
          const create_nmmmipColumnHeader= await NmmipColumnHeader.createNmmipColumnHeader(
            data
          );
    
          const return_body = {
            success: true,
            details: create_nmmmipColumnHeader,
            message: "Nmmip Column Header Successfully Created"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //createNmmipColumnHeader

      async fetchNmmipColumnHeaders({ request, response }) {
        const data = request.all();
    
        try {
          const nmmipColumnHeaders = await NmmipColumnHeader.getNmmipColumnHeaders(data);
    
          const return_body = {
            success: true,
            details: nmmipColumnHeaders,
            message: "Nmmip Column Headers Successfully Fetched"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //fetchNmmipColumnHeaders

      async getNmmipColumnHeader({ request, response }) {
        const data = request.all();
    
        const rules = {
            ColumnHeaderID: `required|exists:${NmmipColumnHeader.table},id`
        };
    
        const messages = {
          "ColumnHeaderID.required": "A Column Header id is required",
          "ColumnHeaderID.exists": "Column Header does not exist"
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
    
        const { ColumnHeaderID } = data;
    
        try {
          const nmmipColumnHeader = await NmmipColumnHeader.getNmmipColumnHeader(ColumnHeaderID);
    
          const return_body = {
            success: true,
            details: nmmipColumnHeader,
            message: "Column Header Successfully Fetched"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //getNmmipColumnHeader

      async updateNmmipColumnHeader({ request, response }) {
        const data = request.post();
    
        const rules = {
          ColumnHeaderID: `required|exists:${NmmipColumnHeader.table},id`
        };
    
        const messages = {
          "ColumnHeaderID.required": "A column header id is required",
          "ColumnHeaderID.exists": "Column header does not exist"
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
    
        const { ColumnHeaderID } = data;
    
        //Do not update the primary key
        delete data.ColumnHeaderID;
    
        let return_body;
    
        if (!_.isEmpty(data)) {
          try {
            const update_nmmipColumnHeader = await NmmipColumnHeader.updateNmmipColumnHeader(
              { id: ColumnHeaderID },
              data
            );
    
            return_body = {
              success: true,
              details: update_nmmipColumnHeader,
              message: "Column header Successfully Updated"
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
      } //updateNmmipColumnHeader
    
      async removeNmmipColumnHeader({ request, response }) {
        const data = request.post();
    
        const rules = {
            ColumnHeaderID: `required|exists:${NmmipColumnHeader.table},id`
        };
    
        const messages = {
          "ColumnHeaderID.required": "A Column Header id is required",
          "ColumnHeaderID.exists": "Column Header does not exist"
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
    
        const { ColumnHeaderID } = data;
    
        let return_body;
    
        const nmmipColumnHeader = await NmmipColumnHeader.find(ColumnHeaderID);
    
        if (nmmipColumnHeader) {
          try {
            const delete_nmmipColumnHeader = await NmmipColumnHeader.removeNmmipColumnHeader(
                ColumnHeaderID
            );
    
            return_body = {
              success: true,
              details: delete_nmmipColumnHeader,
              message: "nmmip Column Header Successfully Deleted"
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
            message: "nmmip Column Header does not exist"
          };
    
          return response.status(400).send(return_body);
        }
      } //removeNmmipColumnHeader
    
}

module.exports = NmmipColumnHeaderController
