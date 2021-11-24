'use strict'
const Logger = use("Logger");
const _ = require("lodash");
const { validate } = use("Validator");
const NmmipRowHeader = use("App/Models/NmmipRowHeader");
const NmmipTable = use("App/Models/NmmipTable");
const ControllerHelpers = use("App/Utility/ControllerHelpers");

class NmmipRowHeaderController {
    async createNmmipRowHeader({ request, response }) {
        const data = request.post();

        const rules = {
            RowName: `required`,
            TableID: `required|exists:${NmmipTable.table},id`,

        };

        const messages = {
            "RowName.required": "A name is required for this  Row Header",
            "TableID.required": "A table id is required",
            "TableID.exists": "table id does not exist",
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
        let checkDuplicateNmmipRowHeader = await NmmipRowHeader.query()
            .where({
                RowName: data.RowName
            })
            .first();

        if (checkDuplicateNmmipRowHeader) {
            return response.status(403).send({
                success: false,
                message: "A Row Header with this name already exists"
            });
        }

        try {
            const create_nmmipRowHeader= await NmmipRowHeader.createNmmipRowHeader(data);

            const return_body = {
                success: true,
                details: create_nmmipRowHeader,
                message: " Row Header Successfully Created"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //createNmmipRowHeader

    async fetchNmmipRowHeaders({ request, response }) {
        const data = request.all();

        try {
            const nmmipRowHeader = await NmmipRowHeader.getNmmipRowHeaders(data);

            const return_body = {
                success: true,
                details: nmmipRowHeader,
                message: " Row Headers Successfully Fetched"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //fetchNmmipRowHeaders

    async updateNmmipRowHeader({ request, response }) {
        const data = request.post();

        const rules = {
            RowName: `required`,
            RowHeaderID: `required|exists:${NmmipRowHeader.table},id`
        };

        const messages = {
            "RowName.required": "A name is required for this  Row Header",
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
        let checkDuplicateNmmipRowHeader = await NmmipRowHeader.query()
            .where({
                RowName: data.RowName
            })
            .whereNot({
                RowHeaderID: data.RowHeaderID
            })
            .first();

        if (checkDuplicateNmmipRowHeader) {
            return response.status(403).send({
                success: false,
                message: "A Nmmip Row Header with this name already exists"
            });
        }

        const { RowHeaderID } = data;

        //Do not update the primary key
        delete data.RowHeaderID;

        let return_body;

        const nmmipRowHeader = await NmmipRowHeader.find(RowHeaderID);

        if (nmmipRowHeader) {
            if (!_.isEmpty(data)) {
                try {
                    const update_nmmipRowHeader = await NmmipRowHeader.updateNmmipRowHeader(
                        { RowHeaderID },
                        data
                    );

                    return_body = {
                        success: true,
                        details: update_nmmipRowHeader,
                        message: " Row Header Successfully Updated"
                    };

                    response.send(return_body);
                } catch (error) {
                    //Logger.error("Error : ", error);
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
        } else {
            return_body = {
                success: false,
                message: "NmmipRowHeader does not exist"
            };

            return response.status(400).send(return_body);
        }
    } //updateNmmipRowHeader

    async getNmmipRowHeader({ request, response }) {
        const data = request.all();

        const rules = {
            RowHeaderID: `required|exists:${NmmipRowHeader.table},id`
        };

        const messages = {
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

        const { RowHeaderID } = data;

        try {
            const nmmipRowHeader = await NmmipRowHeader.getNmmipRowHeader(RowHeaderID);

            const return_body = {
                success: true,
                details: nmmipRowHeader,
                message: " Row Header Successfully Fetched"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //getNmmipRowHeader

    async removeNmmipRowHeader({ request, response }) {
        const data = request.post();

        const rules = {
            RowHeaderID: `required|exists:${NmmipRowHeader.table},id`
        };

        const messages = {
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

        const { RowHeaderID } = data;

        let return_body;

        const nmmipRowHeader = await NmmipRowHeader.find(RowHeaderID);

        if (nmmipRowHeader) {
            try {
                const delete_NmmipRowHeader = await NmmipRowHeader.removeNmmipRowHeader(
                    RowHeaderID
                );

                return_body = {
                    success: true,
                    details: delete_NmmipRowHeader,
                    message: " Row Header Successfully Deleted"
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
                message: "NmmipRowHeader does not exist"
            };

            return response.status(400).send(return_body);
        }
    } //removeNmmipRowHeader
}


module.exports = NmmipRowHeaderController
