'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use("Database");
const _ = require("lodash");

class NmmipDataGroup extends Model {
    static get table() {
        return "NmmipDataGroups";
      }
      static get primaryKey() {
        return "id";
      }
      static async createNmmipDataGroup(data) {
        const NmmipDataGroup = await this.create(data);
    
        return NmmipDataGroup;
      } //createNmmipDataGroup

      static async getNmmipDataGroups(fetch_data) {
        const NmmipDataGroups = await this.query()
        .where(fetch_data)
        .fetch();
        return NmmipDataGroups;
      } //getNmmipDataGroups

      static async getNmmipDataGroup(DataGroupID) {
        const NmmipDataGroup = await this.find(DataGroupID);
    
        return NmmipDataGroup;
      } //getNmmipDataGroup

      static async updateNmmipDataGroup(filter_data, update) {
        const run_update = await this.query()
          .where(filter_data)
          .update(update);
    
        const { id } = filter_data;
        const updated_NmmipDataGroup = await this.find(id);
    
        return updated_NmmipDataGroup;
      } //updateNmmipDataGroup
    
      static async removeNmmipDataGroup(DataGroupID) {
        const NmmipDataGroup = await this.find(DataGroupID);
    
        const run_delete = await NmmipDataGroup.delete();
    
        return run_delete;
      } //removeNmmipDataGroup
}

module.exports = NmmipDataGroup
