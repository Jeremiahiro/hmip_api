'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const _ = require("lodash");

class NmmipRow extends Model {
    static get table() {
        return "NmmipRows";
      }
    
      static get primaryKey() {
        return "id";
      }
      
      NmmipTable() {
        return this.hasOne("App/Models/NmmipTable", "TableID", "id");
      }

      NmmipRowHeader() {
        return this.hasOne("App/Models/NmmipRowHeader", "RowHeaderID", "id");
      }
      NmmipColumnHeader() {
        return this.hasOne("App/Models/NmmipColumnHeader", "ColumnHeaderID", "id");
      }
    
      static async createNmmipRow(data) {
      
        const NmmipRow = await this.create(data);
    
        return NmmipRow;
      }
    
      static async updateNmmipRow(filter_data, update) {
        let NmmipRow = this.find(filter_data.RowID);
    
    
        const run_update = await this.query()
          .where(filter_data)
          .update(update);
    
        const {id } = filter_data;
        const updated_NmmipRow = await this.find(id);
    
        return updated_NmmipRow;
      } //updateNmmipRow
    
      static async removeNmmipRow(RowID) {
        const NmmipRow = await this.find(RowID);
    
        const run_delete = await NmmipRow.delete();
    
        return run_delete;
      } //removeNmmipRow
    
      static async getNmmipRows(fetch_data) {
        const NmmipRows = await this.query()
          //.where(fetch_data)
          .with('NmmipTable')
          .with('NmmipRowHeader')
          .with('NmmipColumnHeader')
          .paginate(fetch_data.page,fetch_data.limit)
          //.fetch();
    
        return NmmipRows;
      } //getNmmipRows
    
      static async getNmmipRow(RowID) {
        const NmmipRow = await this.find(RowID);
    
        return NmmipRow;
      } //getNmmipRow
}

module.exports = NmmipRow
