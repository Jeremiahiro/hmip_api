'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use("Database");
const _ = require("lodash");
class Sex extends Model {
    static get table() {
        return "Sex";
      }
    
      static async createSex(data) {
        const Sex = await this.create(data);
    
        return Sex;
      } //createSex

      static async getSexes(fetch_data) {
        const Sexes = await this.query()
        .where(fetch_data)
        .fetch();
        return Sexes;
      } //getSexes

      static async getSex(SexID) {
        const Sex = await this.find(SexID);
    
        return Sex;
      } //getSex

      static async updateSex(filter_data, update) {
        const run_update = await this.query()
          .where(filter_data)
          .update(update);
    
        const { id } = filter_data;
        const updated_Sex= await this.find(id);
    
        return updated_Sex;
      } //updateSex
    
      static async removeSex(SexID) {
        const Sex = await this.find(SexID);
    
        const run_delete = await Sex.delete();
    
        return run_delete;
      } //removeSex
}

module.exports = Sex
