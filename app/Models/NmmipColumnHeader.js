'use strict'
const Model = use('Model')
const Database = use("Database");
const _ = require("lodash");
const uuidv1 = require("uuid/v1");
const uuidv4 = require("uuid/v4");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class NmmmipColumnHeader extends Model {
    static get table() {
        return "NMMIPColumnHeaders";
      }
    
      static async createNmmmipColumnHeader(data) {
        const NmmmipColumnHeader = await this.create(data);
    
        return NmmmipColumnHeader;
      } //createNmmmipColumnHeader
}

module.exports = NmmmipColumnHeader
