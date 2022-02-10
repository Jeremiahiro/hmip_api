'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use("Database");
const _ = require("lodash");
const uuidv1 = require("uuid/v1");
class EmploymentSector extends Model {
    static get table() {
        return "EmploymentSector";
      }
    
      static get primaryKey() {
        return "EmploymentSectorID";
      }
    
      static boot() {
        super.boot();
    
        this.addHook("beforeCreate", EmploymentSectorInstance => {
            EmploymentSectorInstance.EmploymentSectorID = uuidv1();
        });
    
        //Ensure that locked EmploymentSector cannot be deleted
        this.addHook("beforeDelete", "RestrictionHook.noDeleteLocked");
      }
    
    
      static async createEmploymentSector(data) {
      
        const EmploymentSector = await this.create(data);
    
        return EmploymentSector;
      }
    
      static async updateEmploymentSector(filter_data, update) {
        let EmploymentSector = this.find(filter_data.EmploymentSectorID);
    
    
        const run_update = await this.query()
          .where(filter_data)
          .update(update);
    
        const { EmploymentSectorID } = filter_data;
        const updated_EmploymentSector = await this.find(EmploymentSectorID);
    
        return updated_EmploymentSector;
      } //updateEmploymentSector
    
      static async removeEmploymentSector(EmploymentSectorID) {
        const EmploymentSector = await this.find(EmploymentSectorID);
    
        const run_delete = await EmploymentSector.delete();
    
        return run_delete;
      } //removeEmploymentSector
    
      static async getEmploymentSectors(fetch_data) {
        const EmploymentSectors = await this.query()
          //.where(fetch_data)
          .paginate(fetch_data.page, fetch_data.limit)
          //.fetch();
    
        return EmploymentSectors;
      } //getEmploymentSectors
    
      static async getEmploymentSector(EmploymentSectorID) {
        const EmploymentSector = await this.find(EmploymentSectorID);
    
        return EmploymentSector;
      } //getEmploymentSector
}

module.exports = EmploymentSector
