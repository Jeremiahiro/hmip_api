'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use("Database");
const _ = require("lodash");
const NmmipState = use("App/Models/NmmipState");

class NmmipValue extends Model {
    static get table() {
        return "NmmipValues";
      }

      static get primaryKey() {
        return "id";
      }

     NmmipState() {
        return this.hasOne("App/Models/NmmipState", "StateID", "id");
      }
      NmmipIndicator() {
        return this.hasOne("App/Models/NmmipIndicator", "IndicatorID", "id");
      }
    
      static async createNmmipValue(data) {
        const NmmipValue = await this.create(data);
    
        return NmmipValue;
      } //createNmmipValue

      static async getNmmipValues(fetch_data) {
        const NmmipValues = await this.query()
        .where(fetch_data)
        .with("NmmipState")
        .with("NmmipIndicator")
        .fetch();
        return NmmipValues;
      } //getNmmipValues

      static async getNmmipValue(ValueID) {
        const NmmipValue = await this.find(ValueID);
    
        return NmmipValue;
      } //getNmmipValue

      static async updateNmmipValue(filter_data, update) {
        const run_update = await this.query()
          .where(filter_data)
          .update(update);
    
        const { id } = filter_data;
        const updated_NmmipValue = await this.find(id);
    
        return updated_NmmipValue;
      } //updateNmmipValue
    
      static async removeNmmipValue(ValueID) {
        const NmmipValue = await this.find(ValueID);
    
        const run_delete = await NmmipValue.delete();
    
        return run_delete;
      } //removeNmmipValue
}

module.exports = NmmipValue
