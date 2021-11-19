'use strict'
const Logger = use("Logger");

const _ = require("lodash");
const { validate } = use("Validator");
const Questionnaire = use("App/Models/Questionnaire");
const ControllerHelpers = use("App/Utility/ControllerHelpers");

class QuestionnaireController {
    
    async createQuestionnaire({ request, response }) {
        const data = request.post();
    
        const rules = {
            Question1: `required`,
            Question2: `required`,
            Question3:`required`,
            Question4: `required`,
            Question5:`required`,
            Question6A: `required`,
            Question6B: `required`,
            Question6C: `required`,
            Question6D:`required`,
            Question6E:`required`,
            Question6F:`required`
        };
    
        const messages = {
          "Question1.required": "An answer is required",
          "Question2.required": "An answer is required",
          "Question3.required": "An answer is required",
          "Question4.required": "An answer is required",
          "Question5.required": "An answer is required",
          "Question6A.required": "An answer is required",
          "Question6B.required": "An answer is required",
          "Question6C.required": "An answer is required",
          "Question6D.required": "An answer is required",
          "Question6E.required": "An answer is required",
          "Question6F.required": "An answer is required",

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
          const create_questionnaire = await Questionnaire.createQuestionnaire(
            data
          );
    
          const return_body = {
            success: true,
            details: create_questionnaire,
            message: "Questionnaire Successfully Created"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //createQuestionnaire

      async fetchQuestionnaires({ request, response }) {
        const data = request.all();
    
        try {
          const questionnaires = await Questionnaire.getQuestionnaires(data);
    
          const return_body = {
            success: true,
            details: questionnaires,
            message: " Questionnaires Successfully Fetched"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //fetchQuestionnaires

      async getQuestionnaire({ request, response }) {
        const data = request.all();
    
        const rules = {
            QuestionnaireID: `required|exists:${Questionnaire.table},id`
        };
    
        const messages = {
          "QuestionnaireID.required": "A Questionnaire id is required",
          "QuestionnaireID.exists": "Questionnaire does not exist"
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
    
        const { QuestionnaireID } = data;
    
        try {
          const questionnaire = await Questionnaire.getQuestionnaire(QuestionnaireID);
    
          const return_body = {
            success: true,
            details: questionnaire,
            message: "Questionnaire Successfully Fetched"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //getQuestionnaire
    
      async removeQuestionnaire({ request, response }) {
        const data = request.post();
    
        const rules = {
            QuestionnaireID: `required|exists:${Questionnaire.table},id`
        };
    
        const messages = {
          "QuestionnaireID.required": "A Questionnaire id is required",
          "QuestionnaireID.exists": "Questionnaire does not exist"
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
    
        const { QuestionnaireID } = data;
    
        let return_body;
    
        const questionnaire = await Questionnaire.find(QuestionnaireID);
    
        if (questionnaire) {
          try {
            const delete_questionnaire = await Questionnaire.removeQuestionnaire(
                QuestionnaireID
            );
    
            return_body = {
              success: true,
              details: delete_questionnaire,
              message: "Questionnaire Successfully Deleted"
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
            message: "Questionnaire does not exist"
          };
    
          return response.status(400).send(return_body);
        }
      } //removeQuestionnaire
    
}

module.exports = QuestionnaireController
