'use strict'
const _ = require("lodash");
const Logger = use("Logger");
const { validate } = use("Validator");
const NmmipState = use("App/Models/NmmipState");
const ControllerHelpers = use("App/Utility/ControllerHelpers");

class NmmipStateController {
  
    async createNmmipState({ request, response }) {
        const data = request.post();
    
        const rules = {
            StateName: `required|unique:${NmmipState.table}`
                };
    
        const messages = {
          "StateName.required": "A state name is required",
          "StateName.unique": "A state with this name already exists"
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
         //Duplicate check
         let checkDuplicateState = await NmmipState.query()
         .where({
             StateName: data.StateName
         })
         .first();

     if (checkDuplicateState) {
         return response.status(403).send({
             success: false,
             message: "A State with this name already exists"
         });
     }
        try {
          const create_nmmipState= await NmmipState.createNmmipState(
            data
          );
    
          const return_body = {
            success: true,
            details: create_nmmipState,
            message: "nmmip State Successfully Created"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //createNmmipState

    async fetchNmmipStates({ request, response }) {
        const data = request.all();
        const rules = {
          page: `required`,
          limit: `required`
        };
    
        const messages = {
         
         "page.required": "An page value",
          "limit.required": "A limit value"
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
          const nmmipStates = await NmmipState.getNmmipStates(data);
    
          const return_body = {
            success: true,
            details: nmmipStates,
            message: "nmmip States Successfully Fetched"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //fetchNmmipStates

    async getNmmipState({ request, response }) {
        const data = request.all();
    
        const rules = {
            StateID: `required|exists:${NmmipState.table},id`
        };
    
        const messages = {
          "StateID.required": "A state id is required",
          "StateID.exists": "state does not exist"
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
    
        const { StateID } = data;
    
        try {
          const nmmipstate = await NmmipState.getNmmipState(StateID);
    
          const return_body = {
            success: true,
            details: nmmipstate,
            message: "State Successfully Fetched"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //getNmmipState

    async updateNmmipState({ request, response }) {
        const data = request.post();
    
        const rules = {
          StateID: `required|exists:${NmmipState.table},id`
        };
    
        const messages = {
          "StateID.required": "A State  id is required",
          "StateID.exists": "State does not exist"
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
    
        const { StateID } = data;
    
        //Do not update the primary key
        delete data.StateID;
    
        let return_body;
    
        if (!_.isEmpty(data)) {
          try {
            const update_nmmipState = await NmmipState.updateNmmipState(
              { id: StateID },
              data
            );
    
            return_body = {
              success: true,
              details: update_nmmipState,
              message: "State Successfully Updated"
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
      } //updateNmmipState
    
    async removeNmmipState({ request, response }) {
        const data = request.post();
    
        const rules = {
            StateID: `required|exists:${NmmipState.table},id`
        };
    
        const messages = {
          "StateID.required": "A state  id is required",
          "StateID.exists": "State  does not exist"
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
    
        const { StateID } = data;
    
        let return_body;
    
        const nmmipstate = await NmmipState.find(StateID);
    
        if (nmmipstate) {
          try {
            const delete_nmmipState = await NmmipState.removeNmmipState(
                StateID
            );
    
            return_body = {
              success: true,
              details: delete_nmmipState,
              message: "nmmip State Successfully Deleted"
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
            message: "nmmip State does not exist"
          };
    
          return response.status(400).send(return_body);
        }
      } //removeNmmipState
    
      async fetchNmmipStateCount({ request, response }) {
        const data = request.all();
    
        try {
          const users = await NmmipState.getNmmipStateCount(data);
    
          const return_body = {
            success: true,
            details: users || {},
            message: "Number of Nmmip States Successfully Fetched"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //fetchNmmipStateCount
    
}

module.exports = NmmipStateController
