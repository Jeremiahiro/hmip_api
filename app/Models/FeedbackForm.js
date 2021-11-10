'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use("Database");
const _ = require("lodash");
const uuidv1 = require("uuid/v1");

class FeedbackForm extends Model {
    static get table() {
        return "FeedbackForms";
      }
    
      static get primaryKey() {
        return "FeedbackID";
      }
    
      static boot() {
        super.boot();
    
        this.addHook("beforeCreate", FeedbackFormInstance => {
            //FeedbackFormInstance.FeedbackID = uuidv1();
            FeedbackFormInstance.FeedbackID =  uuidv4();

        });
    
        //Ensure that locked Feedback cannot be deleted
        this.addHook("beforeDelete", "RestrictionHook.noDeleteLocked");
      }
    
      //Relationships
      Users() {
        return this.hasMany("App/Models/User", "FeedbackID", "FeedbackID");
      }
    
      static async createFeedback(data) {
      
        const Feedback = await this.create(data);
        return Feedback;
      }
    
      static async getFeedbacks(fetch_data) {
        const Feedbacks = await this.query()
          .where(fetch_data)
          .fetch();
    
        return Feedbacks;
      } //getFeedback
    
      static async getFeedback(FeedbackID) {
        const Feedback = await this.find(FeedbackID);
    
        return Feedback;
      } //getFeedback
}

module.exports = FeedbackForm
