'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use("Database");
const _ = require("lodash");

class NmmipMdasInNigeria extends Model {
    static get table() {
        return "NmmipMDAsInNigeria";
      }
      static get primaryKey() {
        return "id";
      }
      static async createNmmipMDAsInNigeria(data) {
        const NmmipMDAsInNigeria = await this.create(data);
    
        return NmmipMDAsInNigeria;
      } //createNmmipMDAsInNigeria

      static async getNmmipMDAsInNigerias(fetch_data) {
        const NmmipMDAsInNigerias = await this.query()
        //.where(fetch_data)
        //.fetch();
        .paginate(fetch_data.page, fetch_data.limit)
        return NmmipMDAsInNigerias;
      } //getNmmipMDAsInNigerias

      static async getNmmipMDAsInNigeria(MDAID) {
        const NmmipMDAsInNigeria = await this.find(MDAID);
    
        return NmmipMDAsInNigeria;
      } //getNmmipMDAsInNigeria

      static async updateNmmipMDAsInNigeria(filter_data, update) {
        const run_update = await this.query()
          .where(filter_data)
          .update(update);
    
        const { id } = filter_data;
        const updated_NmmipMDAsInNigeria= await this.find(id);
    
        return updated_NmmipMDAsInNigeria;
      } //updateNmmipMDAsInNigeria
    
      static async removeNmmipMDAsInNigeria(MDAID) {
        const NmmipMDAsInNigeria = await this.find(MDAID);
    
        const run_delete = await NmmipMDAsInNigeria.delete();
    
        return run_delete;
      } //removeNmmipMDAsInNigeria
}

module.exports = NmmipMdasInNigeria
