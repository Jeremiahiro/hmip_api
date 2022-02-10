'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use("Database");
const _ = require("lodash");
const NmmipIndicator = use("App/Models/NmmipIndicator");

class NmmipIndicatorView extends Model {
    static get table() {
        return "NmmipIndicatorViews";
      }

      static get primaryKey() {
        return "id";
      }

     NmmipIndicator() {
        return this.hasOne("App/Models/NmmipIndicator", "IndicatorID", "id");
      }
    
      static async createNmmipIndicatorView(data) {
        const NmmipIndicatorView = await this.create(data);
    
        return NmmipIndicatorView;
      } //createNmmipIndicatorView

      static async getNmmipIndicatorViews(fetch_data) {
        const NmmipIndicatorViews = await this.query()
        //.where(fetch_data)
        .with("NmmipIndicator")
        .paginate(fetch_data.page, fetch_data.limit)
        //.fetch();
        return NmmipIndicatorViews;
      } //getNmmipIndicatorViews

      static async getNmmipIndicatorView(IndicatorViewID) {
        const NmmipIndicatorView = await this.find(IndicatorViewID);
    
        return NmmipIndicatorView;
      } //getNmmipIndicatorView

      static async updateNmmipIndicatorView(filter_data, update) {
        const run_update = await this.query()
          .where(filter_data)
          .update(update);
    
        const { id } = filter_data;
        const updated_NmmipIndicatorView = await this.find(id);
    
        return updated_NmmipIndicatorView;
      } //updateNmmipIndicatorView
    
      static async removeNmmipIndicatorView(IndicatorViewID) {
        const NmmipIndicatorView = await this.find(IndicatorViewID);
    
        const run_delete = await NmmipIndicatorView.delete();
    
        return run_delete;
      } //removeNmmipIndicatorView
}

module.exports = NmmipIndicatorView
