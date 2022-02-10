'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const _ = require("lodash");
const uuidv1 = require("uuid/v1");

class PropertyType extends Model {
    static get table() {
        return "PropertyType";
      }
    
      static get primaryKey() {
        return "PropertyTypeID";
      }
    
      static boot() {
        super.boot();
    
        this.addHook("beforeCreate", PropertyTypeInstance => {
            PropertyTypeInstance.PropertyTypeID = uuidv1();
        });
    
        //Ensure that locked PropertyType cannot be deleted
        this.addHook("beforeDelete", "RestrictionHook.noDeleteLocked");
      }
    
    
      static async createPropertyType(data) {
      
        const PropertyType = await this.create(data);
    
        return PropertyType;
      }
    
      static async updatePropertyType(filter_data, update) {
        let PropertyType = this.find(filter_data.PropertyTypeID);
    
    
        const run_update = await this.query()
          .where(filter_data)
          .update(update);
    
        const { PropertyTypeID } = filter_data;
        const updated_PropertyType = await this.find(PropertyTypeID);
    
        return updated_PropertyType;
      } //updatePropertyType
    
      static async removePropertyType(PropertyTypeID) {
        const PropertyType = await this.find(PropertyTypeID);
    
        const run_delete = await PropertyType.delete();
    
        return run_delete;
      } //removePropertyType
    
      static async getPropertyTypes(fetch_data) {
        const PropertyTypes = await this.query()
          //.where(fetch_data)
          //.fetch();
         .paginate(fetch_data.page,fetch_data.limit)
        return PropertyTypes;
      } //getPropertyTypes
    
      static async getPropertyType(PropertyTypeID) {
        const PropertyType = await this.find(PropertyTypeID);
    
        return PropertyType;
      } //getPropertyType
}

module.exports = PropertyType
