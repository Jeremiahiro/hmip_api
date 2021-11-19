'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const _ = require("lodash");

class Questionnaire extends Model {
    static get table() {
        return "Questionnaire";
      }
    
      static async createQuestionnaire(data) {
        const Questionnaire = await this.create(data);
    
        return Questionnaire;
      } //createQuestionnaire

      static async getQuestionnaires(fetch_data) {
        const Questionnaires = await this.query()
        .where(fetch_data)
        .fetch();
        return Questionnaires;
      } //getQuestionnaires

      static async getQuestionnaire(QuestionnaireID) {
        const Questionnaire = await this.find(QuestionnaireID);
    
        return Questionnaire;
      } //getQuestionnaire

      static async removeQuestionnaire(QuestionnaireID) {
        const Questionnaire = await this.find(QuestionnaireID);
    
        const run_delete = await Questionnaire.delete();
    
        return run_delete;
      } //removeQuestionnaire
}

module.exports = Questionnaire
