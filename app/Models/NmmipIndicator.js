'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use("Database");
const _ = require("lodash");
const PageVisibility = use("App/Definitions/PageVisibility");
const NmmipDataGroup = use("App/Models/NmmipDataGroup");

class NmmipIndicator extends Model {
    static get table() {
        return "NmmipIndicators";
      }

      static get primaryKey() {
        return "id";
      }

     NmmipDataGroup() {
        return this.hasOne("App/Models/NmmipDataGroup", "DataGroupID", "id");
      }
    
      static async createNmmipIndicator(data) {
        const NmmipIndicator = await this.create(data);
    
        return NmmipIndicator;
      } //createNmmipIndicator

      static async getNmmipIndicators(data) {
        //console.log("DATATATA", data)
        const NmmipIndicators = await this.query()
        .from('NmmipIndicators')
        //.where(data)
        .with("NmmipDataGroup")
        .orderBy("created_at", "desc")
        .paginate(data.page, data.limit)
       //.fetch();

        return NmmipIndicators;
      } //getNmmipIndicators
     
     
      static async getNmmipIndicator(IndicatorID) {
        const NmmipIndicator = await this.find(IndicatorID);
    
        return NmmipIndicator;
      } //getNmmipIndicator

      static async updateNmmipIndicator(filter_data, update) {
        const run_update = await this.query()
          .where(filter_data)
          .update(update);
    
        const { id } = filter_data;
        const updated_NmmipIndicator = await this.find(id);
    
        return updated_NmmipIndicator;
      } //updateNmmipIndicator
    
      static async removeNmmipIndicator(IndicatorID) {
        const NmmipIndicator = await this.find(IndicatorID);
    
        const run_delete = await NmmipIndicator.delete();
    
        return run_delete;
      } //removeNmmipIndicator

      static async getNmmipIndicatorCount() {
        const NmmipindicatorsCount = await Database
             .from('NmmipIndicators')
             .getCount()
         return NmmipindicatorsCount;
     } //NmmipindicatorsCount
}


module.exports = NmmipIndicator
