'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use("Database");
const _ = require("lodash");
const uuidv1 = require("uuid/v1");

class EmploymentStatus extends Model {
    static get table() {
        return "EmploymentStatus";
      }
    
      static get primaryKey() {
        return "EmploymentStatusID";
      }
    
      static boot() {
        super.boot();
    
        this.addHook("beforeCreate", EmploymentStatusInstance => {
            EmploymentStatusInstance.EmploymentStatusID = uuidv1();
        });
    
        //Ensure that locked EmploymentStatus cannot be deleted
        this.addHook("beforeDelete", "RestrictionHook.noDeleteLocked");
      }
    
    
      static async createEmploymentStatus(data) {
      
        const EmploymentStatus = await this.create(data);
    
        return EmploymentStatus;
      }
    
      static async updateEmploymentStatus(filter_data, update) {
        let EmploymentStatus = this.find(filter_data.EmploymentStatusID);
    
    
        const run_update = await this.query()
          .where(filter_data)
          .update(update);
    
        const { EmploymentStatusID } = filter_data;
        const updated_EmploymentStatus = await this.find(EmploymentStatusID);
    
        return updated_EmploymentStatus;
      } //updateEmploymentStatus
    
      static async removeEmploymentStatus(EmploymentStatusID) {
        const EmploymentStatus = await this.find(EmploymentStatusID);
    
        const run_delete = await EmploymentStatus.delete();
    
        return run_delete;
      } //removeEmploymentStatus
    
      static async getEmploymentStatuses(fetch_data) {
        const EmploymentStatuses = await this.query()
          .where(fetch_data)
          .fetch();
    
        return EmploymentStatuses;
      } //getEmploymentStatuss
    
      static async getEmploymentStatus(EmploymentStatusID) {
        const EmploymentStatus = await this.find(EmploymentStatusID);
    
        return EmploymentStatus;
      } //getEmploymentStatus
}

module.exports = EmploymentStatus
