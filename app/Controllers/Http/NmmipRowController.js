'use strict'
const Logger = use("Logger");
const _ = require("lodash");
const { validate } = use("Validator");
const NmmipRowHeader = use("App/Models/NmmipRowHeader");
const NmmipRow = use("App/Models/NmmipRow");
const NmmipTable = use("App/Models/NmmipTable");
const NmmipColumnHeader = use("App/Models/NmmipColumnHeader");
const ControllerHelpers = use("App/Utility/ControllerHelpers");

class NmmipRowController {

    async createNmmipRow({ request, response }) {
        const data = request.post();

        const rules = {
            Value: `required`,
            TableID: `required|exists:${NmmipTable.table},id`,
            ColumnHeaderID: `required|exists:${NmmipColumnHeader.table},id`,
            RowHeaderID: `required|exists:${NmmipRowHeader.table},id`


        };

        const messages = {
            "Value.required": "A name is required for this  Row",
            "TableID.required": "A table id is required",
            "TableID.exists": "table id does not exist",
            "ColumnHeaderID.required": "A Column Header id is required",
            "ColumnHeaderID.exists": "Column Header does not exist",
            "RowHeaderID.required": "A  Row Header id is required",
            "RowHeaderID.exists": " Row Header does not exist"
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
        let checkDuplicateNmmipRow = await NmmipRow.query()
            .where({
                Value: data.Value
            })
            .first();

        if (checkDuplicateNmmipRow) {
            return response.status(403).send({
                success: false,
                message: "A Row with this name already exists"
            });
        }

        try {
            const create_nmmipRow = await NmmipRow.createNmmipRow(data);

            const return_body = {
                success: true,
                details: create_nmmipRow,
                message: " Row Successfully Created"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //createNmmipRow

    async fetchNmmipRows({ request, response }) {
        const data = request.all();

        try {
            const nmmipRow = await NmmipRow.getNmmipRows(data);

            const return_body = {
                success: true,
                details: nmmipRow,
                message: " Rows Successfully Fetched"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //fetchNmmipRows

    async updateNmmipRow({ request, response }) {
        const data = request.post();
    
        const rules = {
          RowID: `required|exists:${NmmipRow.table},id`
        };
    
        const messages = {
          "RowID.required": "A row  id is required",
          "RowID.exists": "row does not exist"
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
    
        const { RowID } = data;
    
        //Do not update the primary key
        delete data.RowID;
    
        let return_body;
    
        if (!_.isEmpty(data)) {
          try {
            const update_nmmipRow = await NmmipRow.updateNmmipRow(
              { id: RowID },
              data
            );
    
            return_body = {
              success: true,
              details: update_nmmipRow,
              message: "Row Successfully Updated"
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

    async getNmmipRow({ request, response }) {
        const data = request.all();

        const rules = {
            RowID: `required|exists:${NmmipRow.table},id`
        };

        const messages = {
            "RowID.required": "A  Row id is required",
            "RowID.exists": " Row does not exist"
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

        const { RowID } = data;

        try {
            const nmmipRow = await NmmipRow.getNmmipRow(RowID);

            const return_body = {
                success: true,
                details: nmmipRow,
                message: " Row Successfully Fetched"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //getNmmipRow

    async removeNmmipRow({ request, response }) {
        const data = request.post();

        const rules = {
            RowID: `required|exists:${NmmipRow.table},id`
        };

        const messages = {
            "RowID.required": "A  Row id is required",
            "RowID.exists": " Row does not exist"
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

        const { RowID } = data;

        let return_body;

        const nmmipRow = await NmmipRow.find(RowID);

        if (nmmipRow) {
            try {
                const delete_NmmipRow = await NmmipRow.removeNmmipRow(
                    RowID
                );

                return_body = {
                    success: true,
                    details: delete_NmmipRow,
                    message: " Row Successfully Deleted"
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
                message: "NmmipRow does not exist"
            };

            return response.status(400).send(return_body);
        }
    } //removeNmmipRow
}

module.exports = NmmipRowController
