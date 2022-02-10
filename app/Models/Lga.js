'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use("Database");
const _ = require("lodash");
const NmmipStates= use("App/Models/NmmipState");

class Lga extends Model {
    static get table() {
        return "Lga";
      }
      static get primaryKey() {
        return "id";
      }

     NmmipStates() {
        return this.hasOne("App/Models/NmmipState", "StateID", "id");
      }
    
      static async createLga(data) {
        const Lga = await this.create(data);
    
        return Lga;
      } //createLga

      static async getLgas(fetch_data) {
        const Lga = await this.query()
        //.where(fetch_data)
        .with("NmmipStates")
        .paginate(fetch_data.page,fetch_data.limit)
        //.fetch();
        return Lga;
      } //getLgas

      static async getLga(LgaID) {
        const Lga = await this.find(LgaID);
    
        return Lga;
      } //getLga

      static async updateLga(filter_data, update) {
        const run_update = await this.query()
          .where(filter_data)
          .update(update);
    
        const { id } = filter_data;
        const updated_Lga= await this.find(id);
    
        return updated_Lga;
      } //updateLga
    
      static async removeLga(LgaID) {
        const Lga = await this.find(LgaID);
    
        const run_delete = await Lga.delete();
    
        return run_delete;
      } //removeLga
}

module.exports = Lga
