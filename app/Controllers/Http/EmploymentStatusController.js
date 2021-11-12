'use strict'
const Logger = use("Logger");
const _ = require("lodash");
const { validate } = use("Validator");
const EmploymentStatus = use("App/Models/EmploymentStatus");
const ControllerHelpers = use("App/Utility/ControllerHelpers");

class EmploymentStatusController {
    async createEmploymentStatus({ request, response }) {
        const data = request.post();

        const rules = {
            EmploymentStatusName: `required`
        };

        const messages = {
            "EmploymentStatusName.required": "A name is required for this Employment Status"
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
        let checkDuplicateEmploymentStatus = await EmploymentStatus.query()
            .where({
                EmploymentStatusName: data.EmploymentStatusName
            })
            .first();

        if (checkDuplicateEmploymentStatus) {
            return response.status(403).send({
                success: false,
                message: "A Employment Status with this name already exists"
            });
        }

        try {
            const create_employmentStatus= await EmploymentStatus.createEmploymentStatus(data);

            const return_body = {
                success: true,
                details: create_employmentStatus,
                message: "Employment Status Successfully Created"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //createEmploymentStatus

    async fetchEmploymentStatuses({ request, response }) {
        const data = request.all();

        try {
            const employmentStatus = await EmploymentStatus.getEmploymentStatuses(data);

            const return_body = {
                success: true,
                details: employmentStatus,
                message: "Employment Statuses Successfully Fetched"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //fetchEmploymentStatuss

    async updateEmploymentStatus({ request, response }) {
        const data = request.post();

        const rules = {
            EmploymentStatusName: `required`,
            EmploymentStatusID: `required|exists:${EmploymentStatus.table},EmploymentStatusID`
        };

        const messages = {
            "EmploymentStatusName.required": "A name is required for this Employment Status",
            "EmploymentStatusID.required": "A Employment Status id is required",
            "EmploymentStatusID.exists": "Employment Status does not exist"
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
        let checkDuplicateEmploymentStatus = await EmploymentStatus.query()
            .where({
                EmploymentStatusName: data.EmploymentStatusName
            })
            .whereNot({
                EmploymentStatusID: data.EmploymentStatusID
            })
            .first();

        if (checkDuplicateEmploymentStatus) {
            return response.status(403).send({
                success: false,
                message: "A EmploymentStatus with this name already exists"
            });
        }

        const { EmploymentStatusID } = data;

        //Do not update the primary key
        delete data.EmploymentStatusID;

        let return_body;

        const employmentStatus = await EmploymentStatus.find(EmploymentStatusID);

        if (employmentStatus) {
            if (!_.isEmpty(data)) {
                try {
                    const update_employmentStatus = await EmploymentStatus.updateEmploymentStatus(
                        { EmploymentStatusID },
                        data
                    );

                    return_body = {
                        success: true,
                        details: update_employmentStatus,
                        message: "Employment Status Successfully Updated"
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
                message: "EmploymentStatus does not exist"
            };

            return response.status(400).send(return_body);
        }
    } //updateEmploymentStatus

    async getEmploymentStatus({ request, response }) {
        const data = request.all();

        const rules = {
            EmploymentStatusID: `required|exists:${EmploymentStatus.table},EmploymentStatusID`
        };

        const messages = {
            "EmploymentStatusID.required": "A Employment Status id is required",
            "EmploymentStatusID.exists": "Employment Status does not exist"
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

        const { EmploymentStatusID } = data;

        try {
            const employmentStatus = await EmploymentStatus.getEmploymentStatus(EmploymentStatusID);

            const return_body = {
                success: true,
                details: employmentStatus,
                message: "Employment Status Successfully Fetched"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //getEmploymentStatus

    async removeEmploymentStatus({ request, response }) {
        const data = request.post();

        const rules = {
            EmploymentStatusID: `required|exists:${EmploymentStatus.table},EmploymentStatusID`
        };

        const messages = {
            "EmploymentStatusID.required": "A Employment Status id is required",
            "EmploymentStatusID.exists": "Employment Status does not exist"
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

        const { EmploymentStatusID } = data;

        let return_body;

        const employmentStatus = await EmploymentStatus.find(EmploymentStatusID);

        if (employmentStatus) {
            try {
                const delete_EmploymentStatus = await EmploymentStatus.removeEmploymentStatus(
                    EmploymentStatusID
                );

                return_body = {
                    success: true,
                    details: delete_EmploymentStatus,
                    message: "Employment Status Successfully Deleted"
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
                message: "EmploymentStatus does not exist"
            };

            return response.status(400).send(return_body);
        }
    } //removeEmploymentStatus
}

module.exports = EmploymentStatusController
