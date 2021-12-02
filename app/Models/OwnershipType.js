'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use("Database");
const _ = require("lodash");
const uuidv1 = require("uuid/v1");

class OwnershipType extends Model {
    static get table() {
        return "OwnershipType";
      }
    
      static get primaryKey() {
        return "OwnershipTypeID";
      }
    
      static boot() {
        super.boot();
    
        this.addHook("beforeCreate", OwnershipTypeInstance => {
            OwnershipTypeInstance.OwnershipTypeID = uuidv1();
        });
    
        //Ensure that locked OwnershipType cannot be deleted
        this.addHook("beforeDelete", "RestrictionHook.noDeleteLocked");
      }
    
      static async createOwnershipType(data) {
      
        const OwnershipType = await this.create(data);
    
        return OwnershipType;
      }
    
      static async updateOwnershipType(filter_data, update) {
        let OwnershipType = this.find(filter_data.OwnershipTypeID);
    
    
        const run_update = await this.query()
          .where(filter_data)
          .update(update);
    
        const { OwnershipTypeID } = filter_data;
        const updated_OwnershipType = await this.find(OwnershipTypeID);
    
        return updated_OwnershipType;
      } //updateOwnershipType
    
      static async removeOwnershipType(OwnershipTypeID) {
        const OwnershipType = await this.find(OwnershipTypeID);
    
        const run_delete = await OwnershipType.delete();
    
        return run_delete;
      } //removeOwnershipType
    
      static async getOwnershipTypes(fetch_data) {
        const OwnershipTypes = await this.query()
          .where(fetch_data)
          .fetch();
    
        return OwnershipTypes;
      } //getOwnershipTypes
    
      static async getOwnershipType(OwnershipTypeID) {
        const OwnershipType = await this.find(OwnershipTypeID);
    
        return OwnershipType;
      } //getOwnershipType
}

module.exports = OwnershipType
