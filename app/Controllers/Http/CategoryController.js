'use strict'
const Logger = use("Logger");
const _ = require("lodash");
const { validate } = use("Validator");
const Category = use("App/Models/Category");
const ControllerHelpers = use("App/Utility/ControllerHelpers");

class CategoryController {
    async createCategory({ request, response }) {
        const data = request.post();

        const rules = {
            CategoryName: `required`
        };

        const messages = {
            "CategoryName.required": "A name is required for this category"
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
        let checkDuplicateCategory = await Category.query()
            .where({
                CategoryName: data.CategoryName
            })
            .first();

        if (checkDuplicateCategory) {
            return response.status(403).send({
                success: false,
                message: "A Category with this name already exists"
            });
        }

        try {
            const create_category = await Category.createCategory(data);

            const return_body = {
                success: true,
                details: create_category,
                message: "Category Successfully Created"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //createCategory

    async fetchCategories({ request, response }) {
        const data = request.all();

        try {
            const categories = await Category.getCategories(data);

            const return_body = {
                success: true,
                details: categories,
                message: "Categories Successfully Fetched"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //fetchCategories

    async updateCategory({ request, response }) {
        const data = request.post();

        const rules = {
            CategoryName: `required`,
            CategoryID: `required|exists:${Category.table},CategoryID`
        };

        const messages = {
            "CategoryName.required": "A name is required for this Category",
            "CategoryID.required": "A Category id is required",
            "CategoryID.exists": "Category does not exist"
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
        let checkDuplicateCategory = await Category.query()
            .where({
                CategoryName: data.CategoryName
            })
            .whereNot({
                CategoryID: data.CategoryID
            })
            .first();

        if (checkDuplicateCategory) {
            return response.status(403).send({
                success: false,
                message: "A Category with this name already exists"
            });
        }

        const { CategoryID } = data;

        //Do not update the primary key
        delete data.CategoryID;

        let return_body;

        const category = await Category.find(CategoryID);

        if (category) {
            if (!_.isEmpty(data)) {
                try {
                    const update_category = await Category.updateCategory(
                        { CategoryID },
                        data
                    );

                    return_body = {
                        success: true,
                        details: update_category,
                        message: "Category Successfully Updated"
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
                message: "Category does not exist"
            };

            return response.status(400).send(return_body);
        }
    } //updateCategory

    async getCategory({ request, response }) {
        const data = request.all();

        const rules = {
            CategoryID: `required|exists:${Category.table},CategoryID`
        };

        const messages = {
            "CategoryID.required": "A Category id is required",
            "CategoryID.exists": "Category does not exist"
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

        const { CategoryID } = data;

        try {
            const category = await Category.getCategory(CategoryID);

            const return_body = {
                success: true,
                details: category,
                message: "Category Successfully Fetched"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //getCategory

    async removeCategory({ request, response }) {
        const data = request.post();

        const rules = {
            CategoryID: `required|exists:${Category.table},CategoryID`
        };

        const messages = {
            "CategoryID.required": "A Category id is required",
            "CategoryID.exists": "Category does not exist"
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

        const { CategoryID } = data;

        let return_body;

        const category = await Category.find(CategoryID);

        if (category) {
            try {
                const delete_Category = await Category.removeCategory(
                    CategoryID
                );

                return_body = {
                    success: true,
                    details: delete_Category,
                    message: "Category Successfully Deleted"
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
                message: "Category does not exist"
            };

            return response.status(400).send(return_body);
        }
    } //removeCategory
}

module.exports = CategoryController
