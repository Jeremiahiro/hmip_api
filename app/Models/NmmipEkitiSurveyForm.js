'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const uuidv1 = require("uuid/v1");
const Database = use("Database");
class NmmipEkitiSurveyForm extends Model {
    static get table() {
        return "NmmipEKITISurveyForms";
      }
    
      static get primaryKey() {
        return "EKITIID";
      }
    
      static boot() {
        super.boot();
    
        this.addHook("beforeCreate", NmmipEkitiSurveyForm => {
          if (!NmmipEkitiSurveyForm.EKITIID) {
            NmmipEkitiSurveyForm.EKITIID = uuidv1();
          }
        });
    
        this.addHook("afterFind", NmmipEkitiSurveyForm => {
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
      NmmipEnumerators() {
        return this.hasMany("App/Models/NmmipEnumerator", "Enumerator", "id");
      }
      static async createNmmipEkitiSurveyForm(data) {
      
        const NmmipEkitiSurveyForm = await this.create(data);
    
        return NmmipEkitiSurveyForm;
      }
    
      static async updateNmmipEkitiSurveyForm(filter_data, update) {
        let NmmipEkitiSurveyForm = this.find(filter_data.EKITIID);
    
    
        const run_update = await this.query()
          .where(filter_data)
          .update(update);
    
        const { EKITIID } = filter_data;
        const updated_NmmipEkitiSurveyForm = await this.find(EKITIID);
    
        return updated_NmmipEkitiSurveyForm;
      } //updateNmmipEkitiSurveyForm
    
      static async removeNmmipEkitiSurveyForm(EKITIID) {
        const NmmipEkitiSurveyForm = await this.find(EKITIID);
    
        const run_delete = await NmmipEkitiSurveyForm.delete();
    
        return run_delete;
      } //removeNmmipEkitiSurveyForm
    
      static async getNmmipEkitiSurveyForms(fetch_data) {
        const NmmipEkitiSurveyForms = await this.query()
          //.where(fetch_data)
          .with('NmmipStates')
          .with('Lga')
          .with('EmploymentSector')
          .with('EmploymentStatus')
          .with('TypeOfBuyer')
          .with('OwnershipTypes')
          .with('PropertyType')
          .with('Sex')
          .with('NmmipEnumerators')
          .paginate(fetch_data.page,fetch_data.limit)
          //.fetch();
    
        return NmmipEkitiSurveyForms;
      } //getNmmipEkitiSurveyForms
    
      static async getNmmipEkitiSurveyForm(EKITIID) {
        const NmmipEkitiSurveyForm = await this.find(EKITIID)
        
        return NmmipEkitiSurveyForm;
      } //getNmmipEkitiSurveyForm
}

module.exports = NmmipEkitiSurveyForm
