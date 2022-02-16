'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use("Database");
const _ = require("lodash");

class NmmipEnumerator extends Model {
    static get table() {
        return "NmmipEnumerators";
      }
      static get primaryKey() {
        return "id";
      }
      static async createNmmipEnumerator(data) {
        const NmmipEnumerator = await this.create(data);
    
        return NmmipEnumerator;
      } //createNmmipEnumerator

      static async getNmmipEnumerators(fetch_data) {
        const NmmipEnumerator = await this.query()
        .where(fetch_data)
        .fetch();
        return NmmipEnumerator;
      } //getNmmipEnumerators

      static async getNmmipEnumerator(EnumeratorID) {
        const NmmipEnumerator = await this.find(EnumeratorID);
    
        return NmmipEnumerator;
      } //getNmmipEnumerator

      static async updateNmmipEnumerator(filter_data, update) {
        const run_update = await this.query()
          .where(filter_data)
          .update(update);
    
        const { id } = filter_data;
        const updated_NmmipEnumerator= await this.find(id);
    
        return updated_NmmipEnumerator;
      } //updateNmmipEnumerator
    
      static async removeNmmipEnumerator(EnumeratorID) {
        const NmmipEnumerator = await this.find(EnumeratorID);
    
        const run_delete = await NmmipEnumerator.delete();
    
        return run_delete;
      } //removeNmmipEnumerator
}

module.exports = NmmipEnumerator
