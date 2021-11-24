'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use("Database");
const _ = require("lodash");

class NmmipState extends Model {
    static get table() {
        return "NmmipStates";
      }
      static get primaryKey() {
        return "id";
      }
      static async createNmmipState(data) {
        const NmmipNmmipState = await this.create(data);
    
        return NmmipNmmipState;
      } //createNmmipNmmipState

      static async getNmmipStates(fetch_data) {
        const NmmipNmmipStates = await this.query()
        .where(fetch_data)
        .fetch();
        return NmmipNmmipStates;
      } //getNmmipStates

      static async getNmmipState(StateID) {
        const NmmipState = await this.find(StateID);
    
        return NmmipState;
      } //getNmmipState

      static async updateNmmipState(filter_data, update) {
        const run_update = await this.query()
          .where(filter_data)
          .update(update);
    
        const { id } = filter_data;
        const updated_NmmipState= await this.find(id);
    
        return updated_NmmipState;
      } //updateNmmipState
    
      static async removeNmmipState(StateID) {
        const NmmipState = await this.find(StateID);
    
        const run_delete = await NmmipState.delete();
    
        return run_delete;
      } //removeNmmipState
}

module.exports = NmmipState
