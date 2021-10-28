'use strict'
const Logger = use("Logger");

const _ = require("lodash");

const PermissionGroup = use("App/Models/PermissionGroup");
const ControllerHelpers = use("App/Utility/ControllerHelpers");
const { validate } = use("Validator");
class PermissionGroupController {
    async createGroup({ request, response }) {
        const data = request.post();

        const rules = {
            PermissionGroupName: `required|unique:${PermissionGroup.table}`
        };

        const messages = {
            "PermissionGroupName.required": "A name is required for this group",
            "PermissionGroupName.unique": "A group with this name already exists"
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
            const create_group = await PermissionGroup.createGroup(data);

            const return_body = {
                success: true,
                details: create_group,
                message: "Permission Group Successfully Created"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //createGroup

    async fetchGroups({ request, response }) {
        const data = request.all();

        try {
            const groups = await PermissionGroup.getGroups(data);

            const return_body = {
                success: true,
                details: groups,
                message: "Groups Successfully Fetched"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //fetchGroups

    async updateGroup({ request, response }) {
        const data = request.post();

        const rules = {
            //PermissionGroupID: `required|in:${PermissionGroup.table}`
            PermissionGroupID: `required`
        };

        const messages = {
            "PermissionGroupID.required": "A group id is required",
            "PermissionGroupID.in": "Group does not exist"
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

        const { PermissionGroupID } = data;

        //Do not update the primary key
        delete data.PermissionGroupID;

        let return_body;

        const group = await PermissionGroup.find(PermissionGroupID);

        if (group) {
            if (!_.isEmpty(data)) {
                try {
                    const update_group = await PermissionGroup.updateGroup(
                        { PermissionGroupID },
                        data
                    );

                    return_body = {
                        success: true,
                        details: update_group,
                        message: "Permission Group Successfully Updated"
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
        } else {
            return_body = {
                success: false,
                message: "Group does not exist"
            };

            return response.status(400).send(return_body);
        }
    } //updateGroup

    async removeGroup({ request, response }) {
        const data = request.post();

        const rules = {
            //PermissionGroupID: `required|in:${PermissionGroup.table}`
            PermissionGroupID: `required`
        };

        const messages = {
            "PermissionGroupID.required": "A group id is required",
            "PermissionGroupID.in": "Group does not exist"
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

        const { PermissionGroupID } = data;

        let return_body;

        const group = await PermissionGroup.find(PermissionGroupID);

        if (group) {
            try {
                const delete_group = await PermissionGroup.removeGroup(
                    PermissionGroupID
                );

                return_body = {
                    success: true,
                    details: delete_group,
                    message: "Permission Group Successfully Deleted"
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
                message: "Group does not exist"
            };

            return response.status(400).send(return_body);
        }
    } //removeGroup

    async getGroup({ request, response }) {
        const data = request.all();

        const rules = {
            //PermissionGroupID: `required|in:${PermissionGroup.table}`
            PermissionGroupID: `required`
        };

        const messages = {
            "PermissionGroupID.required": "A group id is required",
            "PermissionGroupID.in": "Group does not exist"
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
        const { PermissionGroupID } = data;

        try {
            const group = await PermissionGroup.getGroup(PermissionGroupID);
            const return_body = {
                success: true,
                details: group,
                message: "Group Successfully Fetched"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //getGroup
}

module.exports = PermissionGroupController
