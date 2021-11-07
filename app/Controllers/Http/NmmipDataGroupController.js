'use strict'
const _ = require("lodash");
const { validate } = use("Validator");
const NmmipDataGroup = use("App/Models/NmmipDataGroup");
const ControllerHelpers = use("App/Utility/ControllerHelpers");
class NmmipDataGroupController {
    async createNmmipDataGroup({ request, response }) {
        const data = request.post();
    
        const rules = {
            DataGroupName: `required|unique:${NmmipDataGroup.table}`,
            DataGroupParentID: "required"
        };
    
        const messages = {
          "DataGroupName.required": "A data group name is required",
          "DataGroupName.unique": "A data group with this name already exists",
          "DataGroupParentID.required": "Provide a table Id"
        };
    
        const validation = await validate(data, rules, messages);
    
        if (validation.fails()) {
          return response.status(400).send({
            success: false,
            message: ControllerHelpers.extractValidationErrorMessages(
              validation.messages()
            )
          });
        }
        try {
          const create_nmmipDataGroup= await NmmipDataGroup.createNmmipDataGroup(
            data
          );
    
          const return_body = {
            success: true,
            details: create_nmmipDataGroup,
            message: "nmmip Data Group Successfully Created"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //createNmmipDataGroup

      async fetchNmmipDataGroups({ request, response }) {
        const data = request.all();
    
        try {
          const nmmipDataGroups = await NmmipDataGroup.getNmmipDataGroups(data);
    
          const return_body = {
            success: true,
            details: nmmipDataGroups,
            message: "nmmip Data Groups Successfully Fetched"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //fetchNmmipDataGroups

      async getNmmipDataGroup({ request, response }) {
        const data = request.all();
    
        const rules = {
            DataGroupID: `required|exists:${NmmipDataGroup.table},id`
        };
    
        const messages = {
          "DataGroupID.required": "A data group  id is required",
          "DataGroupID.exists": "data group does not exist"
        };
    
        const validation = await validate(data, rules, messages);
    
        if (validation.fails()) {
          return response.status(400).send({
            success: false,
            message: ControllerHelpers.extractValidationErrorMessages(
              validation.messages()
            )
          });
        }
    
        const { DataGroupID } = data;
    
        try {
          const nmmipDataGroup = await NmmipDataGroup.getNmmipDataGroup(DataGroupID);
    
          const return_body = {
            success: true,
            details: nmmipDataGroup,
            message: "Data group Successfully Fetched"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //getNmmipDataGroup

      async updateNmmipDataGroup({ request, response }) {
        const data = request.post();
    
        const rules = {
          DataGroupID: `required|exists:${NmmipDataGroup.table},id`
        };
    
        const messages = {
          "DataGroupID.required": "A data group  id is required",
          "DataGroupID.exists": "data group does not exist"
        };
    
        const validation = await validate(data, rules, messages);
    
        if (validation.fails()) {
          return response.status(400).send({
            success: false,
            message: ControllerHelpers.extractValidationErrorMessages(
              validation.messages()
            )
          });
        }
    
        const { DataGroupID } = data;
    
        //Do not update the primary key
        delete data.DataGroupID;
    
        let return_body;
    
        if (!_.isEmpty(data)) {
          try {
            const update_nmmipDataGroup = await NmmipDataGroup.updateNmmipDataGroup(
              { id: DataGroupID },
              data
            );
    
            return_body = {
              success: true,
              details: update_nmmipDataGroup,
              message: "Data group Successfully Updated"
            };
    
            response.send(return_body);
          } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
              success: false,
              message: error.toString()
            });
          }
        } else {
          return_body = {
            success: false,
            message: "Nothing to update"
          };
    
          return response.status(400).send(return_body);
        }
      } //updateNmmipDataGroup
    
      async removeNmmipDataGroup({ request, response }) {
        const data = request.post();
    
        const rules = {
            DataGroupID: `required|exists:${NmmipDataGroup.table},id`
        };
    
        const messages = {
          "DataGroupID.required": "A data group  id is required",
          "DataGroupID.exists": "data group  does not exist"
        };
    
        const validation = await validate(data, rules, messages);
    
        if (validation.fails()) {
          return response.status(400).send({
            success: false,
            message: ControllerHelpers.extractValidationErrorMessages(
              validation.messages()
            )
          });
        }
    
        const { DataGroupID } = data;
    
        let return_body;
    
        const nmmipDataGroup = await NmmipDataGroup.find(DataGroupID);
    
        if (nmmipDataGroup) {
          try {
            const delete_nmmipDataGroup = await NmmipDataGroup.removeNmmipDataGroup(
                DataGroupID
            );
    
            return_body = {
              success: true,
              details: delete_nmmipDataGroup,
              message: "nmmip Data Group Successfully Deleted"
            };
    
            response.send(return_body);
          } catch (error) {
            Logger.error("Error : ", error);
            return response.status(500).send({
              success: false,
              message: error.toString()
            });
          }
        } else {
          return_body = {
            success: false,
            message: "nmmip Data Group does not exist"
          };
    
          return response.status(400).send(return_body);
        }
      } //removeNmmipDataGroup
}

module.exports = NmmipDataGroupController
