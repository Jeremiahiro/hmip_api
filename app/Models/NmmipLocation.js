'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use("Database");
const _ = require("lodash");
const NmmipState = use("App/Models/NmmipState");
class NmmipLocation extends Model {
    static get table() {
        return "NmmipLocations";
      }

      static get primaryKey() {
        return "id";
      }

     NmmipState() {
        return this.hasOne("App/Models/NmmipState", "StateID", "id");
      }
    
      static async createNmmipLocation(data) {
        const NmmipLocation = await this.create(data);
    
        return NmmipLocation;
      } //createNmmipLocation

      static async getNmmipLocations(fetch_data) {
        const NmmipLocations = await this.query()
        .where(fetch_data)
        .with("NmmipState")
        .fetch();
        return NmmipLocations;
      } //getNmmipLocations

      static async getNmmipLocation(LocationID) {
        const NmmipLocation = await this.find(LocationID);
    
        return NmmipLocation;
      } //getNmmipLocation

      static async updateNmmipLocation(filter_data, update) {
        const run_update = await this.query()
          .where(filter_data)
          .update(update);
    
        const { id } = filter_data;
        const updated_NmmipLocation = await this.find(id);
    
        return updated_NmmipLocation;
      } //updateNmmipLocation
    
      static async removeNmmipLocation(LocationID) {
        const NmmipLocation = await this.find(LocationID);
    
        const run_delete = await NmmipLocation.delete();
    
        return run_delete;
      } //removeNmmipLocation

      static async getNmmipLocationCount() {
        const NmmipLocationsCount = await Database
             .from('NmmipLocations')
             .getCount()
         return NmmipLocationsCount;
     } //getNmmipLocationCount
}

module.exports = NmmipLocation
