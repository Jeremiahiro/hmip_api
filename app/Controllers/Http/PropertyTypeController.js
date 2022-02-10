'use strict'
const Logger = use("Logger");
const _ = require("lodash");
const { validate } = use("Validator");
const PropertyType = use("App/Models/PropertyType");
const ControllerHelpers = use("App/Utility/ControllerHelpers");

class PropertyTypeController {
    
    async createPropertyType({ request, response }) {
        const data = request.post();

        const rules = {
            PropertyTypeName: `required`
        };

        const messages = {
            "PropertyTypeName.required": "A name is required for this Property Type"
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
        let checkDuplicatePropertyType = await PropertyType.query()
            .where({
                PropertyTypeName: data.PropertyTypeName
            })
            .first();

        if (checkDuplicatePropertyType) {
            return response.status(403).send({
                success: false,
                message: "A Property Type with this name already exists"
            });
        }

        try {
            const create_propertyType= await PropertyType.createPropertyType(data);

            const return_body = {
                success: true,
                details: create_propertyType,
                message: "Property Type Successfully Created"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //createPropertyType

    async fetchPropertyTypes({ request, response }) {
        const data = request.all();
        const rules = {
            page: `required`,
            limit: `required`
          };
      
          const messages = {
           
           "page.required": "An page value",
            "limit.required": "A limit value"
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
            const propertyType = await PropertyType.getPropertyTypes(data);

            const return_body = {
                success: true,
                details: propertyType,
                message: "Property Types Successfully Fetched"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //fetchPropertyTypes

    async updatePropertyType({ request, response }) {
        const data = request.post();

        const rules = {
            PropertyTypeName: `required`,
            PropertyTypeID: `required|exists:${PropertyType.table},PropertyTypeID`
        };

        const messages = {
            "PropertyTypeName.required": "A name is required for this Property Type",
            "PropertyTypeID.required": "A Property Type id is required",
            "PropertyTypeID.exists": "Property Type does not exist"
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
        let checkDuplicatePropertyType = await PropertyType.query()
            .where({
                PropertyTypeName: data.PropertyTypeName
            })
            .whereNot({
                PropertyTypeID: data.PropertyTypeID
            })
            .first();

        if (checkDuplicatePropertyType) {
            return response.status(403).send({
                success: false,
                message: "A PropertyType with this name already exists"
            });
        }

        const { PropertyTypeID } = data;

        //Do not update the primary key
        delete data.PropertyTypeID;

        let return_body;

        const propertyType = await PropertyType.find(PropertyTypeID);

        if (propertyType) {
            if (!_.isEmpty(data)) {
                try {
                    const update_propertyType = await PropertyType.updatePropertyType(
                        { PropertyTypeID },
                        data
                    );

                    return_body = {
                        success: true,
                        details: update_propertyType,
                        message: "Property Type Successfully Updated"
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
                message: "PropertyType does not exist"
            };

            return response.status(400).send(return_body);
        }
    } //updatePropertyType

    async getPropertyType({ request, response }) {
        const data = request.all();

        const rules = {
            PropertyTypeID: `required|exists:${PropertyType.table},PropertyTypeID`
        };

        const messages = {
            "PropertyTypeID.required": "A Property Type id is required",
            "PropertyTypeID.exists": "Property Type does not exist"
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

        const { PropertyTypeID } = data;

        try {
            const propertyType = await PropertyType.getPropertyType(PropertyTypeID);

            const return_body = {
                success: true,
                details: propertyType,
                message: "Property Type Successfully Fetched"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //getPropertyType

    async removePropertyType({ request, response }) {
        const data = request.post();

        const rules = {
            PropertyTypeID: `required|exists:${PropertyType.table},PropertyTypeID`
        };

        const messages = {
            "PropertyTypeID.required": "A Property Type id is required",
            "PropertyTypeID.exists": "Property Type does not exist"
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

        const { PropertyTypeID } = data;

        let return_body;

        const propertyType = await PropertyType.find(PropertyTypeID);

        if (propertyType) {
            try {
                const delete_PropertyType = await PropertyType.removePropertyType(
                    PropertyTypeID
                );

                return_body = {
                    success: true,
                    details: delete_PropertyType,
                    message: "Property Type Successfully Deleted"
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
                message: "PropertyType does not exist"
            };

            return response.status(400).send(return_body);
        }
    } //removePropertyType
}

module.exports = PropertyTypeController
