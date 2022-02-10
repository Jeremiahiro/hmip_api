'use strict'
const Logger = use("Logger");

const _ = require("lodash");
const User = use("App/Models/User");
const NmmipIndicator = use("App/Models/NmmipIndicator");
const NmmipLocation = use("App/Models/NmmipLocation");
const NmmipState = use("App/Models/NmmipState");
class DashboardController {
    async fetchUsersCount({ request, response }) {
        const data = request.all();
    
        try {
          const users = await User.getUserCount(data);
          const indicator = await NmmipIndicator.getNmmipIndicatorCount(data);
          const locations = await NmmipLocation.getNmmipLocationCount(data);
          const states = await NmmipState.getNmmipStateCount(data);

          const statisticsData = {
            userdata: users,
            NmmipLocationData: locations,
            NmmipIndicatorData: indicator,
            NmmipStateData:states
          };
          const return_body = {
            success: true,
            statistics: statisticsData || {},
            message: "Dashboard statistics Successfully Fetched"
          };
    
          response.send(return_body);
        } catch (error) {
          Logger.error("Error : ", error);
          return response.status(500).send({
            success: false,
            message: error.toString()
          });
        }
      } //fetchUsersCount
}


module.exports = DashboardController
