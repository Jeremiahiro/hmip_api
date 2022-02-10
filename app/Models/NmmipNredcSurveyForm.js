'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const uuidv1 = require("uuid/v1");
const Database = use("Database");

class NmmipNredcSurveyForm extends Model {
    static get table() {
        return "NmmipNREDCSurveyForms";
      }
    
      static get primaryKey() {
        return "NREDCID";
      }
    
      static boot() {
        super.boot();
    
        this.addHook("beforeCreate", NmmipNREDCSurveyForm => {
          if (!NmmipNREDCSurveyForm.NREDCID) {
            NmmipNREDCSurveyForm.NREDCID = uuidv1();
          }
        });
    
        this.addHook("afterFind", NmmipNREDCSurveyForm => {
          //Return the comma-separated permissions string as an array
          //ProjectInstance.Status = ProjectInstance.Status();
        });
    
        this.addHook("afterFetch", Instances => {
          
        });
      }
    
      //Relationships
      OwnershipTypes() {
        return this.hasMany("App/Models/OwnershipType", "OwnershipTypeID", "OwnershipTypeID");
      }
      NmmipStates() {
        return this.hasMany("App/Models/NmmipState", "ProvinceOrState", "id");
      }
      Lga() {
        return this.hasOne("App/Models/Lga", "LGAID", "id");
      }
      EmploymentSector() {
        return this.hasOne("App/Models/EmploymentSector", "EmploymentSectorID", "EmploymentSectorID");
      }
      EmploymentStatus() {
        return this.hasOne("App/Models/EmploymentStatus", "EmploymentStatusID", "EmploymentStatusID");
      }
      TypeOfBuyer() {
        return this.hasOne("App/Models/TypeOfBuyer", "TypeOfBuyerID", "TypeOfBuyerID");
      }
      PropertyType() {
        return this.hasOne("App/Models/PropertyType", "PropertyTypeID", "PropertyTypeID");
      }
      Sex() {
        return this.hasOne("App/Models/Sex", "SexID", "id");
      }
      
      static async createNmmipNREDCSurveyForm(data) {
      
        const NmmipNREDCSurveyForm = await this.create(data);
    
        return NmmipNREDCSurveyForm;
      }
    
      static async updateNmmipNREDCSurveyForm(filter_data, update) {
        let NmmipNREDCSurveyForm = this.find(filter_data.NREDCID);
    
    
        const run_update = await this.query()
          .where(filter_data)
          .update(update);
    
        const { NREDCID } = filter_data;
        const updated_NmmipNREDCSurveyForm = await this.find(NREDCID);
    
        return updated_NmmipNREDCSurveyForm;
      } //updateNmmipNREDCSurveyForm
    
      static async removeNmmipNREDCSurveyForm(NREDCID) {
        const NmmipNREDCSurveyForm = await this.find(NREDCID);
    
        const run_delete = await NmmipNREDCSurveyForm.delete();
    
        return run_delete;
      } //removeNmmipNREDCSurveyForm
    
      static async getNmmipNREDCSurveyForms(fetch_data) {
        const NmmipNREDCSurveyForms = await this.query()
          //.where(fetch_data)
          .with('NmmipStates')
          .with('Lga')
          .with('EmploymentSector')
          .with('EmploymentStatus')
          .with('TypeOfBuyer')
          .with('OwnershipTypes')
          .with('PropertyType')
          .with('Sex')
          .paginate(fetch_data.page,fetch_data.limit)
          //.fetch();
    
        return NmmipNREDCSurveyForms;
      } //getNmmipNREDCSurveyForms
    
      static async getNmmipNREDCSurveyForm(NREDCID) {
        const NmmipNREDCSurveyForm = await this.find(NREDCID);
    
        return NmmipNREDCSurveyForm;
      } //getNmmipNREDCSurveyForm
}

module.exports = NmmipNredcSurveyForm
