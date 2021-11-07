'use strict'
const Model = use('Model')
const Database = use("Database");
const _ = require("lodash");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

class NmmipColumnHeader extends Model {
    static get table() {
        return "NMMIPColumnHeaders";
      }
    
      static async createNmmipColumnHeader(data) {
        const NmmipColumnHeader = await this.create(data);
    
        return NmmipColumnHeader;
      } //createNmmmipColumnHeader

      static async getNmmipColumnHeaders(fetch_data) {
        const NmmipColumnHeaders = await this.query()
        .where(fetch_data)
        .fetch();
        return NmmipColumnHeaders;
      } //getNmmipColumnHeaders

      static async getNmmipColumnHeader(ColumnHeaderID) {
        const NmmipColumnHeader = await this.find(ColumnHeaderID);
    
        return NmmipColumnHeader;
      } //getNmmipColumnHeader

      static async updateNmmipColumnHeader(filter_data, update) {
        const run_update = await this.query()
          .where(filter_data)
          .update(update);
    
        const { id } = filter_data;
        const updated_NmmipColumnHeader = await this.find(id);
    
        return updated_NmmipColumnHeader;
      } //updateNmmipColumnHeader
    
      static async removeNmmipColumnHeader(ColumnHeaderID) {
        const NmmipColumnHeader = await this.find(ColumnHeaderID);
    
        const run_delete = await NmmipColumnHeader.delete();
    
        return run_delete;
      } //removeNmmipColumnHeader
}

module.exports = NmmipColumnHeader