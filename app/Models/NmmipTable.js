'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use("Database");
const _ = require("lodash");

class NmmipTable extends Model {
    static get table() {
        return "NmmipTables";
      }
      static get primaryKey() {
        return "id";
      }
      static async createNmmipTable(data) {
        const NmmipTable = await this.create(data);
    
        return NmmipTable;
      } //createNmmipTable

      static async getNmmipTables(fetch_data) {
        const NmmipTables = await this.query()
        // .where(fetch_data)
        // .fetch();
        .paginate(fetch_data.page,fetch_data.limit)
        return NmmipTables;
      } //getNmmipTables

      static async getNmmipTable(TableID) {
        const NmmipTable = await this.find(TableID);
    
        return NmmipTable;
      } //getNmmipTable

      static async updateNmmipTable(filter_data, update) {
        const run_update = await this.query()
          .where(filter_data)
          .update(update);
    
        const { id } = filter_data;
        const updated_NmmipTable= await this.find(id);
    
        return updated_NmmipTable;
      } //updateNmmipTable
    
      static async removeNmmipTable(TableID) {
        const NmmipTable = await this.find(TableID);
    
        const run_delete = await NmmipTable.delete();
    
        return run_delete;
      } //removeNmmipTable
}

module.exports = NmmipTable
