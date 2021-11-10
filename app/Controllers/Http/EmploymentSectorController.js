'use strict'
const Logger = use("Logger");
const _ = require("lodash");
const { validate } = use("Validator");
const EmploymentSector = use("App/Models/EmploymentSector");
const ControllerHelpers = use("App/Utility/ControllerHelpers");
class EmploymentSectorController {
    async createEmploymentSector({ request, response }) {
        const data = request.post();

        const rules = {
            EmploymentSectorName: `required`
        };

        const messages = {
            "EmploymentSectorName.required": "A name is required for this Employment Sector"
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
        let checkDuplicateEmploymentSector = await EmploymentSector.query()
            .where({
                EmploymentSectorName: data.EmploymentSectorName
            })
            .first();

        if (checkDuplicateEmploymentSector) {
            return response.status(403).send({
                success: false,
                message: "A Employment Sector with this name already exists"
            });
        }

        try {
            const create_employmentSector= await EmploymentSector.createEmploymentSector(data);

            const return_body = {
                success: true,
                details: create_employmentSector,
                message: "Employment Sector Successfully Created"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //createEmploymentSector

    async fetchEmploymentSectors({ request, response }) {
        const data = request.all();

        try {
            const employmentSector = await EmploymentSector.getEmploymentSectors(data);

            const return_body = {
                success: true,
                details: employmentSector,
                message: "Employment Sectors Successfully Fetched"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //fetchEmploymentSectors

    async updateEmploymentSector({ request, response }) {
        const data = request.post();

        const rules = {
            EmploymentSectorName: `required`,
            EmploymentSectorID: `required|exists:${EmploymentSector.table},EmploymentSectorID`
        };

        const messages = {
            "EmploymentSectorName.required": "A name is required for this Employment Sector",
            "EmploymentSectorID.required": "A Employment Sector id is required",
            "EmploymentSectorID.exists": "Employment Sector does not exist"
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
        let checkDuplicateEmploymentSector = await EmploymentSector.query()
            .where({
                EmploymentSectorName: data.EmploymentSectorName
            })
            .whereNot({
                EmploymentSectorID: data.EmploymentSectorID
            })
            .first();

        if (checkDuplicateEmploymentSector) {
            return response.status(403).send({
                success: false,
                message: "A EmploymentSector with this name already exists"
            });
        }

        const { EmploymentSectorID } = data;

        //Do not update the primary key
        delete data.EmploymentSectorID;

        let return_body;

        const employmentSector = await EmploymentSector.find(EmploymentSectorID);

        if (employmentSector) {
            if (!_.isEmpty(data)) {
                try {
                    const update_employmentSector = await EmploymentSector.updateEmploymentSector(
                        { EmploymentSectorID },
                        data
                    );

                    return_body = {
                        success: true,
                        details: update_employmentSector,
                        message: "Employment Sector Successfully Updated"
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
                message: "EmploymentSector does not exist"
            };

            return response.status(400).send(return_body);
        }
    } //updateEmploymentSector

    async getEmploymentSector({ request, response }) {
        const data = request.all();

        const rules = {
            EmploymentSectorID: `required|exists:${EmploymentSector.table},EmploymentSectorID`
        };

        const messages = {
            "EmploymentSectorID.required": "A Employment Sector id is required",
            "EmploymentSectorID.exists": "Employment Sector does not exist"
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

        const { EmploymentSectorID } = data;

        try {
            const employmentSector = await EmploymentSector.getEmploymentSector(EmploymentSectorID);

            const return_body = {
                success: true,
                details: employmentSector,
                message: "Employment Sector Successfully Fetched"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //getEmploymentSector

    async removeEmploymentSector({ request, response }) {
        const data = request.post();

        const rules = {
            EmploymentSectorID: `required|exists:${EmploymentSector.table},EmploymentSectorID`
        };

        const messages = {
            "EmploymentSectorID.required": "A Employment Sector id is required",
            "EmploymentSectorID.exists": "Employment Sector does not exist"
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

        const { EmploymentSectorID } = data;

        let return_body;

        const employmentSector = await EmploymentSector.find(EmploymentSectorID);

        if (employmentSector) {
            try {
                const delete_EmploymentSector = await EmploymentSector.removeEmploymentSector(
                    EmploymentSectorID
                );

                return_body = {
                    success: true,
                    details: delete_EmploymentSector,
                    message: "Employment Sector Successfully Deleted"
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
                message: "EmploymentSector does not exist"
            };

            return response.status(400).send(return_body);
        }
    } //removeEmploymentSector
}

module.exports = EmploymentSectorController
