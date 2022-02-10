'use strict'
const _ = require("lodash");
const Logger = use("Logger");
const { validate } = use("Validator");
const NmmipMDAsInNigeria = use("App/Models/NmmipMDAsInNigeria");
const ControllerHelpers = use("App/Utility/ControllerHelpers");

class NmmipMdAsInNigeriaController {

    async createNmmipMDAsInNigeria({ request, response }) {
        const data = request.post();
    
        const rules = {
            MDAName: `required|unique:${NmmipMDAsInNigeria.table}`
                };
    
        const messages = {
          "MDAName.required": "A state name is required",
          "MDAName.unique": "A state with this name already exists"
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
         let checkDuplicateState = await NmmipMDAsInNigeria.query()
         .where({
             MDAName: data.MDAName
         })
         .first();

     if (checkDuplicateState) {
         return response.status(403).send({
             success: false,
             message: "An MDA with this name already exists"
         });
     }
        try {
          const create_nmmipMDAsInNigeria= await NmmipMDAsInNigeria.createNmmipMDAsInNigeria(
            data
          );
    
          const return_body = {
            success: true,
            details: create_nmmipMDAsInNigeria,
            message: "nmmip MDAs In Nigeria Successfully Created"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //createNmmipMDAsInNigeria

    async fetchNmmipMDAsInNigerias({ request, response }) {
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
          const nmmipMDAsInNigerias = await NmmipMDAsInNigeria.getNmmipMDAsInNigerias(data);
    
          const return_body = {
            success: true,
            details: nmmipMDAsInNigerias,
            message: "nmmip MDAs In Nigerias Successfully Fetched"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //fetchNmmipMDAsInNigerias

    async getNmmipMDAsInNigeria({ request, response }) {
        const data = request.all();
    
        const rules = {
            MDAID: `required|exists:${NmmipMDAsInNigeria.table},id`
        };
    
        const messages = {
          "MDAID.required": "A state id is required",
          "MDAID.exists": "state does not exist"
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
    
        const { MDAID } = data;
    
        try {
          const nmmipstate = await NmmipMDAsInNigeria.getNmmipMDAsInNigeria(MDAID);
    
          const return_body = {
            success: true,
            details: nmmipstate,
            message: "MDA Successfully Fetched"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //getNmmipMDAsInNigeria

    async updateNmmipMDAsInNigeria({ request, response }) {
        const data = request.post();
    
        const rules = {
          MDAID: `required|exists:${NmmipMDAsInNigeria.table},id`
        };
    
        const messages = {
          "MDAID.required": "A MDA  id is required",
          "MDAID.exists": "MDA does not exist"
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
    
        const { MDAID } = data;
    
        //Do not update the primary key
        delete data.MDAID;
    
        let return_body;
    
        if (!_.isEmpty(data)) {
          try {
            const update_nmmipMDAsInNigeria = await NmmipMDAsInNigeria.updateNmmipMDAsInNigeria(
              { id: MDAID },
              data
            );
    
            return_body = {
              success: true,
              details: update_nmmipMDAsInNigeria,
              message: "MDA Successfully Updated"
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
      } //updateNmmipMDAsInNigeria
    
    async removeNmmipMDAsInNigeria({ request, response }) {
        const data = request.post();
    
        const rules = {
            MDAID: `required|exists:${NmmipMDAsInNigeria.table},id`
        };
    
        const messages = {
          "MDAID.required": "A state  id is required",
          "MDAID.exists": "MDA  does not exist"
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
    
        const { MDAID } = data;
    
        let return_body;
    
        const nmmipstate = await NmmipMDAsInNigeria.find(MDAID);
    
        if (nmmipstate) {
          try {
            const delete_nmmipMDAsInNigeria = await NmmipMDAsInNigeria.removeNmmipMDAsInNigeria(
                MDAID
            );
    
            return_body = {
              success: true,
              details: delete_nmmipMDAsInNigeria,
              message: "nmmip MDAs In Nigeria Successfully Deleted"
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
            message: "nmmip MDAs In Nigeria does not exist"
          };
    
          return response.status(400).send(return_body);
        }
      } //removeNmmipMDAsInNigeria
}

module.exports = NmmipMdAsInNigeriaController
