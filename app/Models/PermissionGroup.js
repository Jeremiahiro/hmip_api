'use strict'
const uuidv1 = require("uuid/v1");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PermissionGroup extends Model {
    static get table() {
        return "PermissionGroups";
    }

    static get primaryKey() {
        return "PermissionGroupID";
    }

    static boot() {
        super.boot();

        this.addHook("beforeCreate", groupInstance => {
            groupInstance.PermissionGroupID = uuidv1();
        });
    }

    //Relationships
    Permissions() {
        return this.hasMany(
            "App/Models/Permission",
            "PermissionGroupID",
            "PermissionGroupID"
        );
    }

    static async createGroup(data) {
        const group = await this.create(data);

        return group;
    }

    static async updateGroup(filter_data, update) {
        const run_update = await this.query()
            .where(filter_data)
            .update(update);

        const { PermissionGroupID } = filter_data;
        const updated_group = await this.find(PermissionGroupID);

        return updated_group;
    } //updateGroup

    static async removeGroup(PermissionGroupID) {
        const group = await this.find(PermissionGroupID);

        const run_delete = await group.delete();

        return run_delete;
    } //removeGroup

    static async getGroups(fetch_data) {
        const groups = await this.query()
            .where(fetch_data)
            .with("Permissions")
            .fetch();

        return groups;
    } //getGroups

    static async getGroup(PermissionGroupID) {
        const group = await this.find(PermissionGroupID);

        group.Permissions = await group.Permissions().fetch();

        return group;
    }
}

module.exports = PermissionGroup
