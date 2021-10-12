'use strict'

const Logger = use("Logger");

const _ = require("lodash");

const Role = use("App/Models/Role");
const ControllerHelpers = use("App/Utility/ControllerHelpers");
const { validate } = use("Validator");
const RoleTypes = use("App/Definitions/RoleTypes");
class RoleController {
    async createRole({ request, response }) {
        const data = request.post();

        const rules = {
            RoleName: `required`,
            RoleSlug: `required`,
            RoleType: `required`,
            RoleDescription: "required",
            Permissions: "required|array"
        };

        const messages = {
            "RoleName.required": "A name is required for this role",
            "RoleSlug.required": "Provide a friendly slug for this role",
            "RoleDescription.required": "A role description is required",
            "RoleType.required": "A role type is required",
            "Permissions.required": "An array of permissions is required",
            "Permissions.array": "An array of permissions is required"
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
            if (data.RoleType == RoleTypes.Default) {
                //For default roles, ensure no other role has the same slug or name
                let checkSimilarNameOrSlug = await Role.query()
                    .where({
                        RoleSlug: data.RoleSlug
                    })
                    .orWhere({
                        RoleName: data.RoleName
                    })
                    .first();

                if (checkSimilarNameOrSlug) {
                    return response.status(403).send({
                        success: false,
                        message: "Role slug or Role name already exists"
                    });
                }
            }
            const create_role = await Role.createRole(data);

            const return_body = {
                success: true,
                details: create_role,
                message: "Role Successfully Created"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //createRole

    async createOrganizationRole({ request, response }) {
        const data = request.post();

        const rules = {
            OrganizationID: `required|exists:Organizations,OrganizationID`,
            RoleName: `required`,
            RoleDescription: "required",
            Permissions: "required|array"
        };

        const messages = {
            "OrganizationID.required": "An organization id is required",
            "OrganizationID.exists": "Organization does not exist",
            "RoleName.required": "A name is required for this role",
            "RoleDescription.required": "A role description is required",
            "RoleType.required": "A role type is required",
            "Permissions.required": "An array of permissions is required",
            "Permissions.array": "An array of permissions is required"
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
            //Generate random slug for Role
            data.RoleSlug = ControllerHelpers.makeid(6).toUpperCase();
            data.RoleType = RoleTypes.Custom;

            //Check if this role name already exists in the organization
            let checkDuplicateName = await Role.query()
                .where({
                    RoleName: data.RoleName,
                    OrganizationID: data.OrganizationID
                })
                .orWhere({
                    RoleName: data.RoleName,
                    RoleType: RoleTypes.Default
                })
                .first();

            if (checkDuplicateName) {
                return response.status(403).send({
                    success: false,
                    message: "A Role with this name already exists"
                });
            }

            const create_role = await Role.createRole(data);

            const return_body = {
                success: true,
                details: create_role,
                message: "Role Successfully Created"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //createRole

    async fetchRoles({ request, response }) {
        const data = request.all();

        try {
            const roles = await Role.getRoles(data);

            const return_body = {
                success: true,
                details: roles,
                message: "Roles Successfully Fetched"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //fetchRoles
    async updateRole({ request, response }) {
        const data = request.post();

        const rules = {
            //RoleID: `required|in:${Role.table}`
            RoleID: `required|exists:${Role.table},RoleID`,
            Permissions: "array"
        };

        const messages = {
            "RoleID.required": "A role id is required",
            "RoleID.exists": "Role does not exist",
            "Permissions.required": "An array of permissions is required",
            "Permissions.array": "An array of permissions is required"
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

        const { RoleID } = data;

        //Do not update the primary key
        delete data.RoleID;

        let return_body;

        const role = await Role.find(RoleID);

        if (role) {
            if (!_.isEmpty(data)) {
                try {
                    const update_role = await Role.updateRole({ RoleID }, data);

                    return_body = {
                        success: true,
                        details: update_role,
                        message: "Role Successfully Updated"
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
                message: "Role does not exist"
            };

            return response.status(400).send(return_body);
        }
    } //updateRole

    async removeRole({ request, response }) {
        const data = request.post();

        const rules = {
            //RoleID: `required|in:${Role.table}`
            RoleID: `required|exists:${Role.table},RoleID`
        };

        const messages = {
            "RoleID.required": "A role id is required",
            "RoleID.exists": "Role does not exist"
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

        const { RoleID } = data;

        let return_body;

        const role = await Role.find(RoleID);

        if (role) {
            try {
                const delete_role = await Role.removeRole(RoleID);

                return_body = {
                    success: true,
                    details: delete_role,
                    message: "Role Successfully Deleted"
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
                message: "Role does not exist"
            };

            return response.status(400).send(return_body);
        }
    } //removeRole

    async getRole({ request, response }) {
        const data = request.all();

        const rules = {
            //RoleID: `required|in:${Role.table}`
            RoleID: `required|exists:${Role.table},RoleID`
        };

        const messages = {
            "RoleID.required": "A role id is required",
            "RoleID.exists": "Role does not exist"
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

        const { RoleID } = data;

        try {
            const role = await Role.getRole(RoleID);

            const return_body = {
                success: true,
                details: role,
                message: "Role Successfully Fetched"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //getRole
}

module.exports = RoleController
