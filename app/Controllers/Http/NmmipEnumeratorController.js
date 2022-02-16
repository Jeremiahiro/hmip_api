'use strict'
const _ = require("lodash");
const Logger = use("Logger");
const { validate } = use("Validator");
const NmmipEnumerator = use("App/Models/NmmipEnumerator");
const ControllerHelpers = use("App/Utility/ControllerHelpers");

class NmmipEnumeratorController {

    async createNmmipEnumerator({ request, response }) {
        const data = request.post();
    
        const rules = {
            EnumeratorName: `required|unique:${NmmipEnumerator.table}`
                };
    
        const messages = {
          "EnumeratorName.required": "A Enumerator Name is required",
          "EnumeratorName.unique": "A enumerator with this name already exists"
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
         let checkDuplicateEnurator = await NmmipEnumerator.query()
         .where({
             EnumeratorName: data.EnumeratorName
         })
         .first();

     if (checkDuplicateEnurator) {
         return response.status(403).send({
             success: false,
             message: "A Enumerator with this name already exists"
         });
     }
        try {
          const create_nmmipEnumerator= await NmmipEnumerator.createNmmipEnumerator(
            data
          );
    
          const return_body = {
            success: true,
            details: create_nmmipEnumerator,
            message: "nmmip Enumerator Successfully Created"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //createNmmipEnumerator

    async fetchNmmipEnumerators({ request, response }) {
        const data = request.all();
        try {
          const nmmipEnumerators = await NmmipEnumerator.getNmmipEnumerators(data);
    
          const return_body = {
            success: true,
            details: nmmipEnumerators,
            message: "nmmip Enumerators Successfully Fetched"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //fetchNmmipEnumerators

    async getNmmipEnumerator({ request, response }) {
        const data = request.all();
    
        const rules = {
            EnumeratorID: `required|exists:${NmmipEnumerator.table},id`
        };
    
        const messages = {
          "EnumeratorID.required": "A enumerator id is required",
          "EnumeratorID.exists": "enumerator does not exist"
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
    
        const { EnumeratorID } = data;
    
        try {
          const nmmipenumerator = await NmmipEnumerator.getNmmipEnumerator(EnumeratorID);
    
          const return_body = {
            success: true,
            details: nmmipenumerator,
            message: "Enumerator Successfully Fetched"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //getNmmipEnumerator

    async updateNmmipEnumerator({ request, response }) {
        const data = request.post();
    
        const rules = {
          EnumeratorID: `required|exists:${NmmipEnumerator.table},id`
        };
    
        const messages = {
          "EnumeratorID.required": "A Enumerator  id is required",
          "EnumeratorID.exists": "Enumerator does not exist"
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
    
        const { EnumeratorID } = data;
    
        //Do not update the primary key
        delete data.EnumeratorID;
    
        let return_body;
    
        if (!_.isEmpty(data)) {
          try {
            const update_nmmipEnumerator = await NmmipEnumerator.updateNmmipEnumerator(
              { id: EnumeratorID },
              data
            );
    
            return_body = {
              success: true,
              details: update_nmmipEnumerator,
              message: "Enumerator Successfully Updated"
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
      } //updateNmmipEnumerator
    
    async removeNmmipEnumerator({ request, response }) {
        const data = request.post();
    
        const rules = {
            EnumeratorID: `required|exists:${NmmipEnumerator.table},id`
        };
    
        const messages = {
          "EnumeratorID.required": "A enumerator  id is required",
          "EnumeratorID.exists": "Enumerator  does not exist"
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
    
        const { EnumeratorID } = data;
    
        let return_body;
    
        const nmmipenumerator = await NmmipEnumerator.find(EnumeratorID);
    
        if (nmmipenumerator) {
          try {
            const delete_nmmipEnumerator = await NmmipEnumerator.removeNmmipEnumerator(
                EnumeratorID
            );
    
            return_body = {
              success: true,
              details: delete_nmmipEnumerator,
              message: "nmmip Enumerator Successfully Deleted"
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
            message: "nmmip Enumerator does not exist"
          };
    
          return response.status(400).send(return_body);
        }
      } //removeNmmipEnumerator
     
    
}

module.exports = NmmipEnumeratorController
