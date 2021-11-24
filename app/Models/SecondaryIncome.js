'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const uuidv1 = require("uuid/v1");
const _ = require("lodash");

class SecondaryIncome extends Model {
    static get table() {
        return "SecondaryIncome";
      }
    
      static get primaryKey() {
        return "SecondaryIncomeID";
      }
    
      static boot() {
        super.boot();
    
        this.addHook("beforeCreate", SecondaryIncomeInstance => {
            SecondaryIncomeInstance.SecondaryIncomeID = uuidv1();
        });
    
        //Ensure that locked SecondaryIncome cannot be deleted
        this.addHook("beforeDelete", "RestrictionHook.noDeleteLocked");
      }
    
    
      static async createSecondaryIncome(data) {
      
        const SecondaryIncome = await this.create(data);
    
        return SecondaryIncome;
      }
    
      static async updateSecondaryIncome(filter_data, update) {
        let SecondaryIncome = this.find(filter_data.SecondaryIncomeID);
    
    
        const run_update = await this.query()
          .where(filter_data)
          .update(update);
    
        const { SecondaryIncomeID } = filter_data;
        const updated_SecondaryIncome = await this.find(SecondaryIncomeID);
    
        return updated_SecondaryIncome;
      } //updateSecondaryIncome
    
      static async removeSecondaryIncome(SecondaryIncomeID) {
        const SecondaryIncome = await this.find(SecondaryIncomeID);
    
        const run_delete = await SecondaryIncome.delete();
    
        return run_delete;
      } //removeSecondaryIncome
    
      static async getSecondaryIncomes(fetch_data) {
        const SecondaryIncomes = await this.query()
          .where(fetch_data)
          .fetch();
    
        return SecondaryIncomes;
      } //getSecondaryIncomes
    
      static async getSecondaryIncome(SecondaryIncomeID) {
        const SecondaryIncome = await this.find(SecondaryIncomeID);
    
        return SecondaryIncome;
      } //getSecondaryIncome
}

module.exports = SecondaryIncome
