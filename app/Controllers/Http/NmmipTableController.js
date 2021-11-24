'use strict'
const _ = require("lodash");
const Logger = use("Logger");
const { validate } = use("Validator");
const NmmipTable = use("App/Models/NmmipTable");
const ControllerHelpers = use("App/Utility/ControllerHelpers");

class NmmipTableController {

    async createNmmipTable({ request, response }) {
        const data = request.post();
    
        const rules = {
            TableName: `required|unique:${NmmipTable.table}`
                };
    
        const messages = {
          "TableName.required": "A table name is required",
          "TableName.unique": "A table with this name already exists"
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
         //Duplicate check
         let checkDuplicateTable = await NmmipTable.query()
         .where({
             TableName: data.TableName
         })
         .first();

     if (checkDuplicateTable) {
         return response.status(403).send({
             success: false,
             message: "A Table with this name already exists"
         });
     }
        try {
          const create_nmmipTable= await NmmipTable.createNmmipTable(
            data
          );
    
          const return_body = {
            success: true,
            details: create_nmmipTable,
            message: "nmmip Table Successfully Created"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //createNmmipTable

    async fetchNmmipTables({ request, response }) {
        const data = request.all();
    
        try {
          const nmmipTables = await NmmipTable.getNmmipTables(data);
    
          const return_body = {
            success: true,
            details: nmmipTables,
            message: "nmmip Tables Successfully Fetched"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //fetchNmmipTables

    async getNmmipTable({ request, response }) {
        const data = request.all();
    
        const rules = {
            TableID: `required|exists:${NmmipTable.table},id`
        };
    
        const messages = {
          "TableID.required": "A table id is required",
          "TableID.exists": "table does not exist"
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
    
        const { TableID } = data;
    
        try {
          const nmmiptable = await NmmipTable.getNmmipTable(TableID);
    
          const return_body = {
            success: true,
            details: nmmiptable,
            message: "Table Successfully Fetched"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //getNmmipTable

    async updateNmmipTable({ request, response }) {
        const data = request.post();
    
        const rules = {
          TableID: `required|exists:${NmmipTable.table},id`
        };
    
        const messages = {
          "TableID.required": "A Table  id is required",
          "TableID.exists": "Table does not exist"
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
    
        const { TableID } = data;
    
        //Do not update the primary key
        delete data.TableID;
    
        let return_body;
    
        if (!_.isEmpty(data)) {
          try {
            const update_nmmipTable = await NmmipTable.updateNmmipTable(
              { id: TableID },
              data
            );
    
            return_body = {
              success: true,
              details: update_nmmipTable,
              message: "Table Successfully Updated"
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
      } //updateNmmipTable
    
    async removeNmmipTable({ request, response }) {
        const data = request.post();
    
        const rules = {
            TableID: `required|exists:${NmmipTable.table},id`
        };
    
        const messages = {
          "TableID.required": "A table  id is required",
          "TableID.exists": "Table  does not exist"
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
    
        const { TableID } = data;
    
        let return_body;
    
        const nmmiptable = await NmmipTable.find(TableID);
    
        if (nmmiptable) {
          try {
            const delete_nmmipTable = await NmmipTable.removeNmmipTable(
                TableID
            );
    
            return_body = {
              success: true,
              details: delete_nmmipTable,
              message: "nmmip Table Successfully Deleted"
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
            message: "nmmip Table does not exist"
          };
    
          return response.status(400).send(return_body);
        }
      } //removeNmmipTable
}

module.exports = NmmipTableController
