'use strict'
const Logger = use("Logger");
const _ = require("lodash");
const { validate } = use("Validator");
const SecondaryIncome = use("App/Models/SecondaryIncome");
const ControllerHelpers = use("App/Utility/ControllerHelpers");

class SecondaryIncomeController {
    async createSecondaryIncome({ request, response }) {
        const data = request.post();

        const rules = {
            SecondaryIncomeName: `required`
        };

        const messages = {
            "SecondaryIncomeName.required": "A name is required for this Secondary Income"
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
        let checkDuplicateSecondaryIncome = await SecondaryIncome.query()
            .where({
                SecondaryIncomeName: data.SecondaryIncomeName
            })
            .first();

        if (checkDuplicateSecondaryIncome) {
            return response.status(403).send({
                success: false,
                message: "A Secondary Income with this name already exists"
            });
        }

        try {
            const create_secondaryIncome= await SecondaryIncome.createSecondaryIncome(data);

            const return_body = {
                success: true,
                details: create_secondaryIncome,
                message: "Secondary Income Successfully Created"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //createSecondaryIncome

    async fetchSecondaryIncomes({ request, response }) {
        const data = request.all();

        try {
            const secondaryIncome = await SecondaryIncome.getSecondaryIncomes(data);

            const return_body = {
                success: true,
                details: secondaryIncome,
                message: "Secondary Incomes Successfully Fetched"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //fetchSecondaryIncomes

    async updateSecondaryIncome({ request, response }) {
        const data = request.post();

        const rules = {
            SecondaryIncomeName: `required`,
            SecondaryIncomeID: `required|exists:${SecondaryIncome.table},SecondaryIncomeID`
        };

        const messages = {
            "SecondaryIncomeName.required": "A name is required for this Secondary Income",
            "SecondaryIncomeID.required": "A Secondary Income id is required",
            "SecondaryIncomeID.exists": "Secondary Income does not exist"
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
        let checkDuplicateSecondaryIncome = await SecondaryIncome.query()
            .where({
                SecondaryIncomeName: data.SecondaryIncomeName
            })
            .whereNot({
                SecondaryIncomeID: data.SecondaryIncomeID
            })
            .first();

        if (checkDuplicateSecondaryIncome) {
            return response.status(403).send({
                success: false,
                message: "A SecondaryIncome with this name already exists"
            });
        }

        const { SecondaryIncomeID } = data;

        //Do not update the primary key
        delete data.SecondaryIncomeID;

        let return_body;

        const secondaryIncome = await SecondaryIncome.find(SecondaryIncomeID);

        if (secondaryIncome) {
            if (!_.isEmpty(data)) {
                try {
                    const update_secondaryIncome = await SecondaryIncome.updateSecondaryIncome(
                        { SecondaryIncomeID },
                        data
                    );

                    return_body = {
                        success: true,
                        details: update_secondaryIncome,
                        message: "Secondary Income Successfully Updated"
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
                message: "SecondaryIncome does not exist"
            };

            return response.status(400).send(return_body);
        }
    } //updateSecondaryIncome

    async getSecondaryIncome({ request, response }) {
        const data = request.all();

        const rules = {
            SecondaryIncomeID: `required|exists:${SecondaryIncome.table},SecondaryIncomeID`
        };

        const messages = {
            "SecondaryIncomeID.required": "A Secondary Income id is required",
            "SecondaryIncomeID.exists": "Secondary Income does not exist"
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

        const { SecondaryIncomeID } = data;

        try {
            const secondaryIncome = await SecondaryIncome.getSecondaryIncome(SecondaryIncomeID);

            const return_body = {
                success: true,
                details: secondaryIncome,
                message: "Secondary Income Successfully Fetched"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //getSecondaryIncome

    async removeSecondaryIncome({ request, response }) {
        const data = request.post();

        const rules = {
            SecondaryIncomeID: `required|exists:${SecondaryIncome.table},SecondaryIncomeID`
        };

        const messages = {
            "SecondaryIncomeID.required": "A Secondary Income id is required",
            "SecondaryIncomeID.exists": "Secondary Income does not exist"
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

        const { SecondaryIncomeID } = data;

        let return_body;

        const secondaryIncome = await SecondaryIncome.find(SecondaryIncomeID);

        if (secondaryIncome) {
            try {
                const delete_SecondaryIncome = await SecondaryIncome.removeSecondaryIncome(
                    SecondaryIncomeID
                );

                return_body = {
                    success: true,
                    details: delete_SecondaryIncome,
                    message: "Secondary Income Successfully Deleted"
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
                message: "SecondaryIncome does not exist"
            };

            return response.status(400).send(return_body);
        }
    } //removeSecondaryIncome
}

module.exports = SecondaryIncomeController
