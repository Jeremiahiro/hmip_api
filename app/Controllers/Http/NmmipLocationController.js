'use strict'
const _ = require("lodash");
const Logger = use("Logger");
const { validate } = use("Validator");
const NmmipLocation = use("App/Models/NmmipLocation");
const NmmipState = use("App/Models/NmmipState");
const ControllerHelpers = use("App/Utility/ControllerHelpers");
class NmmipLocationController {
    
    async createNmmipLocation({ request, response }) {
        const data = request.post();
    
        const rules = {
            LocationName: `required|unique:${NmmipLocation.table}`,
            Latitude: "required",
            Longitude:"required",
            StateID: `required|exists:${NmmipState.table},id`,


        };
    
        const messages = {
          "LocationName.required": "A Location name is required",
          "LocationName.unique": "A Location with this name already exists",
          "Longitude.required": "Provide a longitude",
          "Latitude.required": "Provide a latitude",
          "StateID.required": "A State id is required",
          "StateID.exists": "State id does not exist",

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
          const create_nmmipLocation = await NmmipLocation.createNmmipLocation(
            data
          );
    
          const return_body = {
            success: true,
            details: create_nmmipLocation,
            message: "nmmip Location Successfully Created"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //createNmmipLocation

      async fetchNmmipLocations({ request, response }) {
        const data = request.all();
    
        try {
          const nmmipLocations = await NmmipLocation.getNmmipLocations(data);
    
          const return_body = {
            success: true,
            details: nmmipLocations,
            message: "nmmip Locations Successfully Fetched"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //fetchNmmipLocations

      async getNmmipLocation({ request, response }) {
        const data = request.all();
    
        const rules = {
            LocationID: `required|exists:${NmmipLocation.table},id`
        };
    
        const messages = {
          "LocationID.required": "a Location  id is required",
          "LocationID.exists": "Location does not exist"
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
    
        const { LocationID } = data;
    
        try {
          const nmmipLocation = await NmmipLocation.getNmmipLocation(LocationID);
    
          const return_body = {
            success: true,
            details: nmmipLocation,
            message: "Location Successfully Fetched"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //getNmmipLocation

      async updateNmmipLocation({ request, response }) {
        const data = request.post();
    
        const rules = {
          LocationID: `required|exists:${NmmipLocation.table},id`
        };
    
        const messages = {
          "LocationID.required": "a Location  id is required",
          "LocationID.exists": "Location does not exist"
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
    
        const { LocationID } = data;
    
        //Do not update the primary key
        delete data.LocationID;
    
        let return_body;
    
        if (!_.isEmpty(data)) {
          try {
            const update_nmmipLocation = await NmmipLocation.updateNmmipLocation(
              { id: LocationID },
              data
            );
    
            return_body = {
              success: true,
              details: update_nmmipLocation,
              message: "Location Successfully Updated"
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
      } //updateNmmipLocation
    
      async removeNmmipLocation({ request, response }) {
        const data = request.post();
    
        const rules = {
            LocationID: `required|exists:${NmmipLocation.table},id`
        };
    
        const messages = {
          "LocationID.required": "a Location  id is required",
          "LocationID.exists": "Location  does not exist"
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
    
        const { LocationID } = data;
    
        let return_body;
    
        const nmmipLocation = await NmmipLocation.find(LocationID);
    
        if (nmmipLocation) {
          try {
            const delete_nmmipLocation = await NmmipLocation.removeNmmipLocation(
                LocationID
            );
    
            return_body = {
              success: true,
              details: delete_nmmipLocation,
              message: "nmmip Location Successfully Deleted"
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
            message: "nmmip Location does not exist"
          };
    
          return response.status(400).send(return_body);
        }
      } //removeNmmipLocation
}

module.exports = NmmipLocationController
