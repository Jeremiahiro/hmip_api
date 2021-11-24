'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const uuidv1 = require("uuid/v1");
const _ = require("lodash");

class NmmipRowHeader extends Model {
    static get table() {
        return "NmmipRowHeaders";
      }
    
      static get primaryKey() {
        return "id";
      }
      
      NmmipTable() {
        return this.hasOne("App/Models/NmmipTable", "TableID", "id");
      }
    
      static async createNmmipRowHeader(data) {
      
        const NmmipRowHeader = await this.create(data);
    
        return NmmipRowHeader;
      }
    
      static async updateNmmipRowHeader(filter_data, update) {
        let NmmipRowHeader = this.find(filter_data.RowHeaderID);
    
    
        const run_update = await this.query()
          .where(filter_data)
          .update(update);
    
        const {id } = filter_data;
        const updated_NmmipRowHeader = await this.find(id);
    
        return updated_NmmipRowHeader;
      } //updateNmmipRowHeader
    
      static async removeNmmipRowHeader(RowHeaderID) {
        const NmmipRowHeader = await this.find(RowHeaderID);
    
        const run_delete = await NmmipRowHeader.delete();
    
        return run_delete;
      } //removeNmmipRowHeader
    
      static async getNmmipRowHeaders(fetch_data) {
        const NmmipRowHeaders = await this.query()
          .where(fetch_data)
          .with('NmmipTable')
          .fetch();
    
        return NmmipRowHeaders;
      } //getNmmipRowHeaders
    
      static async getNmmipRowHeader(RowHeaderID) {
        const NmmipRowHeader = await this.find(RowHeaderID);
    
        return NmmipRowHeader;
      } //getNmmipRowHeader
}

module.exports = NmmipRowHeader
