'use strict'
const _ = require("lodash");
const Logger = use("Logger");
const { validate } = use("Validator");
const Sex = use("App/Models/Sex");
const ControllerHelpers = use("App/Utility/ControllerHelpers");

class SexController {
    async createSex({ request, response }) {
        const data = request.post();
    
        const rules = {
            SexName: `required|unique:${Sex.table}`
                };
    
        const messages = {
          "SexName.required": "A sex name is required",
          "SexName.unique": "A sex with this name already exists"
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
          let checkDuplicateSex = await Sex.query()
          .where({
              SexName: data.SexName
          })
          .first();

      if (checkDuplicateSex) {
          return response.status(403).send({
              success: false,
              message: "A Sex with this name already exists"
          });
      }
        try {
          const create_sex= await Sex.createSex(
            data
          );
    
          const return_body = {
            success: true,
            details: create_sex,
            message: "Sex Successfully Created"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //createSex

    async fetchSexes({ request, response }) {
        const data = request.all();
    
        try {
          const sex = await Sex.getSexes(data);
    
          const return_body = {
            success: true,
            details: sex,
            message: "Sex Successfully Fetched"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //fetchSexes

    async getSex({ request, response }) {
        const data = request.all();
    
        const rules = {
            SexID: `required|exists:${Sex.table},id`
        };
    
        const messages = {
          "SexID.required": "A sex id is required",
          "SexID.exists": "sex does not exist"
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
    
        const { SexID } = data;
    
        try {
          const sex = await Sex.getSex(SexID);
    
          const return_body = {
            success: true,
            details: sex,
            message: "Sex Successfully Fetched"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //getSex

    async updateSex({ request, response }) {
        const data = request.post();
    
        const rules = {
          SexID: `required|exists:${Sex.table},id`
        };
    
        const messages = {
          "SexID.required": "A Sex id is required",
          "SexID.exists": "Sex does not exist"
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
    
        const { SexID } = data;
    
        //Do not update the primary key
        delete data.SexID;
    
        let return_body;
    
        if (!_.isEmpty(data)) {
          try {
            const update_sex = await Sex.updateSex(
              { id: SexID },
              data
            );
    
            return_body = {
              success: true,
              details: update_sex,
              message: "Sex Successfully Updated"
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
      } //updateSex
    
    async removeSex({ request, response }) {
        const data = request.post();
    
        const rules = {
            SexID: `required|exists:${Sex.table},id`
        };
    
        const messages = {
          "SexID.required": "A sex  id is required",
          "SexID.exists": "Sex does not exist"
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
    
        const { SexID } = data;
    
        let return_body;
    
        const sex = await Sex.find(SexID);
    
        if (sex) {
          try {
            const delete_sex = await Sex.removeSex(
                SexID
            );
    
            return_body = {
              success: true,
              details: delete_sex,
              message: "Sex Successfully Deleted"
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
            message: "Sex does not exist"
          };
    
          return response.status(400).send(return_body);
        }
      } //removeSex
}

module.exports = SexController
