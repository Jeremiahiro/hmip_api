'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const _ = require("lodash");
const uuidv1 = require("uuid/v1");

class TypeOfBuyer extends Model {
    static get table() {
        return "TypeOfBuyer";
      }
    
      static get primaryKey() {
        return "TypeOfBuyerID";
      }
    
      static boot() {
        super.boot();
    
        this.addHook("beforeCreate", TypeOfBuyerInstance => {
            TypeOfBuyerInstance.TypeOfBuyerID = uuidv1();
        });
    
        //Ensure that locked TypeOfBuyer cannot be deleted
        this.addHook("beforeDelete", "RestrictionHook.noDeleteLocked");
      }
    
    
      static async createTypeOfBuyer(data) {
      
        const TypeOfBuyer = await this.create(data);
    
        return TypeOfBuyer;
      }
    
      static async updateTypeOfBuyer(filter_data, update) {
        let TypeOfBuyer = this.find(filter_data.TypeOfBuyerID);
    
    
        const run_update = await this.query()
          .where(filter_data)
          .update(update);
    
        const { TypeOfBuyerID } = filter_data;
        const updated_TypeOfBuyer = await this.find(TypeOfBuyerID);
    
        return updated_TypeOfBuyer;
      } //updateTypeOfBuyer
    
      static async removeTypeOfBuyer(TypeOfBuyerID) {
        const TypeOfBuyer = await this.find(TypeOfBuyerID);
    
        const run_delete = await TypeOfBuyer.delete();
    
        return run_delete;
      } //removeTypeOfBuyer
    
      static async getTypeOfBuyers(fetch_data) {
        const TypeOfBuyers = await this.query()
          .where(fetch_data)
          .fetch();
    
        return TypeOfBuyers;
      } //getTypeOfBuyers
    
      static async getTypeOfBuyer(TypeOfBuyerID) {
        const TypeOfBuyer = await this.find(TypeOfBuyerID);
    
        return TypeOfBuyer;
      } //getTypeOfBuyer
}

module.exports = TypeOfBuyer
