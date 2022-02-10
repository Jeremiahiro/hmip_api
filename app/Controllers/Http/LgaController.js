'use strict'
const _ = require("lodash");
const Logger = use("Logger");
const { validate } = use("Validator");
const Lga = use("App/Models/Lga");
const NmmipState = use("App/Models/NmmipState");
const ControllerHelpers = use("App/Utility/ControllerHelpers");

class LgaController {

    async createLga({ request, response }) {
        const data = request.post();
    
        const rules = {
            LgaName: `required|unique:${Lga.table}`,
            StateID: `required|exists:${NmmipState.table},id`
                };
    
        const messages = {
          "LgaName.required": "An lga name is required",
          "LgaName.unique": "An lga with this name already exists",
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
         //Duplicate check
         let checkDuplicateLga = await Lga.query()
         .where({
             LgaName: data.LgaName
         })
         .first();

     if (checkDuplicateLga) {
         return response.status(403).send({
             success: false,
             message: "A Lga with this name already exists"
         });
     }
        try {
          const create_lga= await Lga.createLga(
            data
          );
    
          const return_body = {
            success: true,
            details: create_lga,
            message: "lga Successfully Created"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //createLga

    async fetchLgas({ request, response }) {
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
          const lgas = await Lga.getLgas(data);
    
          const return_body = {
            success: true,
            details: lgas,
            message: "lgas Successfully Fetched"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //fetchLgas

    async getLga({ request, response }) {
        const data = request.all();
    
        const rules = {
            LgaID: `required|exists:${Lga.table},id`
        };
    
        const messages = {
          "LgaID.required": "An lga id is required",
          "LgaID.exists": "lga does not exist"
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
    
        const { LgaID } = data;
    
        try {
          const lga = await Lga.getLga(LgaID);
    
          const return_body = {
            success: true,
            details: lga,
            message: "Lga Successfully Fetched"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //getLga

    async updateLga({ request, response }) {
        const data = request.post();
    
        const rules = {
          LgaID: `required|exists:${Lga.table},id`
        };
    
        const messages = {
          "LgaID.required": "A Lga  id is required",
          "LgaID.exists": "Lga does not exist"
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
    
        const { LgaID } = data;
    
        //Do not update the primary key
        delete data.LgaID;
    
        let return_body;
    
        if (!_.isEmpty(data)) {
          try {
            const update_lga = await Lga.updateLga(
              { id: LgaID },
              data
            );
    
            return_body = {
              success: true,
              details: update_lga,
              message: "Lga Successfully Updated"
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
      } //updateLga
    
    async removeLga({ request, response }) {
        const data = request.post();
    
        const rules = {
            LgaID: `required|exists:${Lga.table},id`
        };
    
        const messages = {
          "LgaID.required": "A lga  id is required",
          "LgaID.exists": "Lga  does not exist"
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
    
        const { LgaID } = data;
    
        let return_body;
    
        const lga = await Lga.find(LgaID);
    
        if (lga) {
          try {
            const delete_lga = await Lga.removeLga(
                LgaID
            );
    
            return_body = {
              success: true,
              details: delete_lga,
              message: "lga Successfully Deleted"
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
            message: "lga does not exist"
          };
    
          return response.status(400).send(return_body);
        }
      } //removeLga
}

module.exports = LgaController
