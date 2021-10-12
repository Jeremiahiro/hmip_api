'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const uuidv1 = require("uuid/v1");

const Database = use("Database");
const _ = require("lodash");

class Category extends Model {
  static get table() {
    return "Categories";
  }

  static get primaryKey() {
    return "CategoryID";
  }

  static boot() {
    super.boot();

    this.addHook("beforeCreate", CategoryInstance => {
      CategoryInstance.CategoryID = uuidv1();
    });

    //Ensure that locked category cannot be deleted
    this.addHook("beforeDelete", "RestrictionHook.noDeleteLocked");
  }

  //Relationships
  Users() {
    return this.hasMany("App/Models/User", "CategoryID", "CategoryID");
  }

  static async createCategory(data) {
  
    const Category = await this.create(data);

    return Category;
  }

  static async updateCategory(filter_data, update) {
    let Category = this.find(filter_data.CategoryID);


    const run_update = await this.query()
      .where(filter_data)
      .update(update);

    const { CategoryID } = filter_data;
    const updated_Category = await this.find(CategoryID);

    return updated_Category;
  } //updateCategory

  static async removeCategory(CategoryID) {
    const Category = await this.find(CategoryID);

    const run_delete = await Category.delete();

    return run_delete;
  } //removeCategory

  static async getCategories(fetch_data) {
    const Categories = await this.query()
      .where(fetch_data)
      .fetch();

    return Categories;
  } //getCategories

  static async getCategory(CategoryID) {
    const Category = await this.find(CategoryID);

    return Category;
  } //getCategory
}

module.exports = Category
