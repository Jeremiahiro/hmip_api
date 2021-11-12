'use strict'
const Logger = use("Logger");
const _ = require("lodash");
const { validate } = use("Validator");
const OwnershipType = use("App/Models/OwnershipType");
const ControllerHelpers = use("App/Utility/ControllerHelpers");

class OwnershipTypeController {
    async createOwnershipType({ request, response }) {
        const data = request.post();

        const rules = {
            OwnershipTypeName: `required`
        };

        const messages = {
            "OwnershipTypeName.required": "A name is required for this Ownership Type"
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
        let checkDuplicateOwnershipType = await OwnershipType.query()
            .where({
                OwnershipTypeName: data.OwnershipTypeName
            })
            .first();

        if (checkDuplicateOwnershipType) {
            return response.status(403).send({
                success: false,
                message: "A Ownership Type with this name already exists"
            });
        }

        try {
            const create_ownershipType= await OwnershipType.createOwnershipType(data);

            const return_body = {
                success: true,
                details: create_ownershipType,
                message: "Ownership Type Successfully Created"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //createOwnershipType

    async fetchOwnershipTypes({ request, response }) {
        const data = request.all();

        try {
            const ownershipType = await OwnershipType.getOwnershipTypes(data);

            const return_body = {
                success: true,
                details: ownershipType,
                message: "Ownership Types Successfully Fetched"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //fetchOwnershipTypes

    async updateOwnershipType({ request, response }) {
        const data = request.post();

        const rules = {
            OwnershipTypeName: `required`,
            OwnershipTypeID: `required|exists:${OwnershipType.table},OwnershipTypeID`
        };

        const messages = {
            "OwnershipTypeName.required": "A name is required for this Ownership Type",
            "OwnershipTypeID.required": "A Ownership Type id is required",
            "OwnershipTypeID.exists": "Ownership Type does not exist"
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
        let checkDuplicateOwnershipType = await OwnershipType.query()
            .where({
                OwnershipTypeName: data.OwnershipTypeName
            })
            .whereNot({
                OwnershipTypeID: data.OwnershipTypeID
            })
            .first();

        if (checkDuplicateOwnershipType) {
            return response.status(403).send({
                success: false,
                message: "A OwnershipType with this name already exists"
            });
        }

        const { OwnershipTypeID } = data;

        //Do not update the primary key
        delete data.OwnershipTypeID;

        let return_body;

        const ownershipType = await OwnershipType.find(OwnershipTypeID);

        if (ownershipType) {
            if (!_.isEmpty(data)) {
                try {
                    const update_ownershipType = await OwnershipType.updateOwnershipType(
                        { OwnershipTypeID },
                        data
                    );

                    return_body = {
                        success: true,
                        details: update_ownershipType,
                        message: "Ownership Type Successfully Updated"
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
                message: "OwnershipType does not exist"
            };

            return response.status(400).send(return_body);
        }
    } //updateOwnershipType

    async getOwnershipType({ request, response }) {
        const data = request.all();

        const rules = {
            OwnershipTypeID: `required|exists:${OwnershipType.table},OwnershipTypeID`
        };

        const messages = {
            "OwnershipTypeID.required": "A Ownership Type id is required",
            "OwnershipTypeID.exists": "Ownership Type does not exist"
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

        const { OwnershipTypeID } = data;

        try {
            const ownershipType = await OwnershipType.getOwnershipType(OwnershipTypeID);

            const return_body = {
                success: true,
                details: ownershipType,
                message: "Ownership Type Successfully Fetched"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //getOwnershipType

    async removeOwnershipType({ request, response }) {
        const data = request.post();

        const rules = {
            OwnershipTypeID: `required|exists:${OwnershipType.table},OwnershipTypeID`
        };

        const messages = {
            "OwnershipTypeID.required": "A Ownership Type id is required",
            "OwnershipTypeID.exists": "Ownership Type does not exist"
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

        const { OwnershipTypeID } = data;

        let return_body;

        const ownershipType = await OwnershipType.find(OwnershipTypeID);

        if (ownershipType) {
            try {
                const delete_OwnershipType = await OwnershipType.removeOwnershipType(
                    OwnershipTypeID
                );

                return_body = {
                    success: true,
                    details: delete_OwnershipType,
                    message: "Ownership Type Successfully Deleted"
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
                message: "OwnershipType does not exist"
            };

            return response.status(400).send(return_body);
        }
    } //removeOwnershipType
}

module.exports = OwnershipTypeController
