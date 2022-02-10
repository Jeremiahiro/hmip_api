'use strict'
const Logger = use("Logger");

const _ = require("lodash");
const { validate } = use("Validator");
const FeedbackForm = use("App/Models/FeedbackForm");
const ControllerHelpers = use("App/Utility/ControllerHelpers");
class FeedbackFormController {
    async createFeedback({ request, response }) {
        const data = request.post();

        const rules = {
            FeedbackMessage: `required`,
            Rating:`required`
        };

        const messages = {
            "FeedbackMessage.required": "A message is required for this Feedback",
            "Rating.required":"A rating is required for this Feedback"
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
            const create_feedback = await FeedbackForm.createFeedback(data);
            const return_body = {
                success: true,
                details: create_feedback,
               // ID:
                message: "Feedback Successfully Created"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //createFeedback

    async fetchFeedbacks({ request, response }) {
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
            const feedbacks = await FeedbackForm.getFeedbacks(data);

            const return_body = {
                success: true,
                details: feedbacks,
                message: "feedbacks Successfully Fetched"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //fetchFeedbacks

    async getFeedback({ request, response }) {
        const data = request.all();

        const rules = {
            FeedbackID: `required|exists:${FeedbackForm.table},FeedbackID`
        };

        const messages = {
            "FeedbackID.required": "A Feedback id is required",
            "FeedbackID.exists": "Feedback does not exist"
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

        const { FeedbackID } = data;

        try {
            const feedback = await FeedbackForm.getFeedback(FeedbackID);

            const return_body = {
                success: true,
                details: feedback,
                message: "Feedback Successfully Fetched"
            };

            response.send(return_body);
        } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
                success: false,
                message: error.toString()
            });
        }
    } //getFeedback

}

module.exports = FeedbackFormController
