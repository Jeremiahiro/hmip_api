'use strict'
const Logger = use("Logger");
const _ = require("lodash");
const { validate } = use("Validator");
const TypeOfBuyer = use("App/Models/TypeOfBuyer");
const ControllerHelpers = use("App/Utility/ControllerHelpers");

class TypeOfBuyerController {
     
    async createTypeOfBuyer({ request, response }) {
        const data = request.post();

        const rules = {
            TypeOfBuyerName: `required`
        };

        const messages = {
            "TypeOfBuyerName.required": "A name is required for this Type Of Buyer"
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
        let checkDuplicateTypeOfBuyer = await TypeOfBuyer.query()
            .where({
                TypeOfBuyerName: data.TypeOfBuyerName
            })
            .first();

        if (checkDuplicateTypeOfBuyer) {
            return response.status(403).send({
                success: false,
                message: "A Type Of Buyer with this name already exists"
            });
        }

        try {
            const create_typeOfBuyer= await TypeOfBuyer.createTypeOfBuyer(data);

            const return_body = {
                success: true,
                details: create_typeOfBuyer,
                message: "Type Of Buyer Successfully Created"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //createTypeOfBuyer

    async fetchTypeOfBuyers({ request, response }) {
        const data = request.all();

        try {
            const typeOfBuyer = await TypeOfBuyer.getTypeOfBuyers(data);

            const return_body = {
                success: true,
                details: typeOfBuyer,
                message: "Type Of Buyers Successfully Fetched"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //fetchTypeOfBuyers

    async updateTypeOfBuyer({ request, response }) {
        const data = request.post();

        const rules = {
            TypeOfBuyerName: `required`,
            TypeOfBuyerID: `required|exists:${TypeOfBuyer.table},TypeOfBuyerID`
        };

        const messages = {
            "TypeOfBuyerName.required": "A name is required for this Type Of Buyer",
            "TypeOfBuyerID.required": "A Type Of Buyer id is required",
            "TypeOfBuyerID.exists": "Type Of Buyer does not exist"
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
        let checkDuplicateTypeOfBuyer = await TypeOfBuyer.query()
            .where({
                TypeOfBuyerName: data.TypeOfBuyerName
            })
            .whereNot({
                TypeOfBuyerID: data.TypeOfBuyerID
            })
            .first();

        if (checkDuplicateTypeOfBuyer) {
            return response.status(403).send({
                success: false,
                message: "A TypeOfBuyer with this name already exists"
            });
        }

        const { TypeOfBuyerID } = data;

        //Do not update the primary key
        delete data.TypeOfBuyerID;

        let return_body;

        const typeOfBuyer = await TypeOfBuyer.find(TypeOfBuyerID);

        if (typeOfBuyer) {
            if (!_.isEmpty(data)) {
                try {
                    const update_typeOfBuyer = await TypeOfBuyer.updateTypeOfBuyer(
                        { TypeOfBuyerID },
                        data
                    );

                    return_body = {
                        success: true,
                        details: update_typeOfBuyer,
                        message: "Type Of Buyer Successfully Updated"
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
                message: "TypeOfBuyer does not exist"
            };

            return response.status(400).send(return_body);
        }
    } //updateTypeOfBuyer

    async getTypeOfBuyer({ request, response }) {
        const data = request.all();

        const rules = {
            TypeOfBuyerID: `required|exists:${TypeOfBuyer.table},TypeOfBuyerID`
        };

        const messages = {
            "TypeOfBuyerID.required": "A Type Of Buyer id is required",
            "TypeOfBuyerID.exists": "Type Of Buyer does not exist"
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

        const { TypeOfBuyerID } = data;

        try {
            const typeOfBuyer = await TypeOfBuyer.getTypeOfBuyer(TypeOfBuyerID);

            const return_body = {
                success: true,
                details: typeOfBuyer,
                message: "Type Of Buyer Successfully Fetched"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //getTypeOfBuyer

    async removeTypeOfBuyer({ request, response }) {
        const data = request.post();

        const rules = {
            TypeOfBuyerID: `required|exists:${TypeOfBuyer.table},TypeOfBuyerID`
        };

        const messages = {
            "TypeOfBuyerID.required": "A Type Of Buyer id is required",
            "TypeOfBuyerID.exists": "Type Of Buyer does not exist"
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

        const { TypeOfBuyerID } = data;

        let return_body;

        const typeOfBuyer = await TypeOfBuyer.find(TypeOfBuyerID);

        if (typeOfBuyer) {
            try {
                const delete_TypeOfBuyer = await TypeOfBuyer.removeTypeOfBuyer(
                    TypeOfBuyerID
                );

                return_body = {
                    success: true,
                    details: delete_TypeOfBuyer,
                    message: "Type Of Buyer Successfully Deleted"
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
                message: "TypeOfBuyer does not exist"
            };

            return response.status(400).send(return_body);
        }
    } //removeTypeOfBuyer
}

module.exports = TypeOfBuyerController
