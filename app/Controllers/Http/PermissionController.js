'use strict'
const Logger = use("Logger");

const _ = require("lodash");

const Permission = use("App/Models/Permission");
const PermissionGroup = use("App/Models/PermissionGroup");
const ControllerHelpers = use("App/Utility/ControllerHelpers");
const { validate } = use("Validator");

class PermissionController {
    async createPermission({ request, response }) {
        const data = request.post();

        const rules = {
            PermissionName: `required|unique:${Permission.table}`,
            Slug: `required|unique:${Permission.table}`,
            PermissionGroupID: "required|exists:PermissionGroups,PermissionGroupID",
            Description: "required"
        };

        const messages = {
            "PermissionName.required": "A name is required for this permission",
            "Slug.required": "Provide a friendly slug for this permission",
            "PermissionGroupID.required": "A permission group is required",
            "PermissionName.unique": "A permission with this name already exists",
            "PermissionGroupID.exists": "Group does not exist"
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

        /* //Check if permission group exists
        const group = await PermissionGroup.find(data.PermissionGroupID);
    
        if (!group) {
          return response.status(400).send({
            success: false,
            message: "Permission group does not exist"
          });
        } */

        try {
            const create_permission = await Permission.createPermission(data);

            const return_body = {
                success: true,
                details: create_permission,
                message: "Permission Successfully Created"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //createPermission

    async fetchPermissions({ request, response }) {
        const data = request.all();

        try {
            const permissions = await Permission.getPermissions(data);

            const return_body = {
                success: true,
                details: permissions,
                message: "Permissions Successfully Fetched"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //fetchPermissions

    async updatePermission({ request, response }) {
        const data = request.post();

        const rules = {
            //PermissionID: `required|in:${Permission.table}`
            PermissionID: `required|exists:${Permission.table},PermissionID`
        };

        const messages = {
            "PermissionID.required": "A permission id is required",
            "PermissionID.exists": "Permission does not exist"
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

        const { PermissionID } = data;

        //Do not update the primary key
        delete data.PermissionID;

        let return_body;

        const permission = await Permission.find(PermissionID);

        if (permission) {
            if (!_.isEmpty(data)) {
                try {
                    const update_permission = await Permission.updatePermission(
                        { PermissionID },
                        data
                    );

                    return_body = {
                        success: true,
                        details: update_permission,
                        message: "Permission Successfully Updated"
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
                message: "Permission does not exist"
            };

            return response.status(400).send(return_body);
        }
    } //updatePermission

    async removePermission({ request, response }) {
        const data = request.post();

        const rules = {
            //PermissionID: `required|in:${Permission.table}`
            PermissionID: `required|exists:${Permission.table},PermissionID`
        };

        const messages = {
            "PermissionID.required": "A permission id is required",
            "PermissionID.exists": "Permission does not exist"
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

        const { PermissionID } = data;

        let return_body;

        const permission = await Permission.find(PermissionID);

        if (permission) {
            try {
                const delete_permission = await Permission.removePermission(
                    PermissionID
                );

                return_body = {
                    success: true,
                    details: delete_permission,
                    message: "Permission Successfully Deleted"
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
                message: "Permission does not exist"
            };

            return response.status(400).send(return_body);
        }
    } //removePermission

    async getPermission({ request, response }) {
        const data = request.all();

        const rules = {
            //PermissionID: `required|in:${Permission.table}`
            PermissionID: `required|exists:${Permission.table},PermissionID`
        };

        const messages = {
            "PermissionID.required": "A permission id is required",
            "PermissionID.exists": "Permission does not exist"
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

        const { PermissionID } = data;

        try {
            const permission = await Permission.getPermission(PermissionID);

            const return_body = {
                success: true,
                details: permission,
                message: "Permission Successfully Fetched"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //getPermission
}

module.exports = PermissionController
