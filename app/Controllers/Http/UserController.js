"use strict";
const Logger = use("Logger");
const _ = require("lodash");
const url = require("url");
const moment = require("moment");

const { validate } = use("Validator");

const User = use("App/Models/User");
const Category = use("App/Models/Category");
const ControllerHelpers = use("App/Utility/ControllerHelpers");
//const SendMail = use("App/Utility/SendMail");
//const Notification = use("App/Models/Notification");

class UserController {
  async createUser({ request, auth, response }) {
    const data = request.post();

    const rules = {
      Email: `required|unique:${User.table}`,
      PhoneNumber: `required|unique:${User.table}`,
      RoleIDs: `required|array`,
      Firstname: `required`,
      Lastname: `required`,
      Password: `required`,
    };

    const messages = {
      "Email.required": "An Email is required",
      "Email.unique": "The email is taken. Try another.",
      "PhoneNumber.required": "A Phone Number is required",
      "PhoneNumber.unique": "Phone Number already exist",
      "Password.required": "Password is Required",
      "RoleIDs.required": "Roles are required",
      "RoleIDs.array": "Roles should be sent as an array",
      "Firstname.required": "A name is required for the user",
      "Lastname.required": "A name is required for the user"

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
      let create_user = await User.createUser(data);

      //Send the user a mail
      // let request_origin = url.parse(request.request.headers.origin);
      // let host = ControllerHelpers.cleanHost(request_origin.host);

      // const emailActivationConfig = {
      //   templateFile: "SignUpTemplate.html",
      //   from: "info@procureease.com.ng",
      //   to: create_user.Email,
      //   subject: "ProcureEase Account Activation",
      //   data: {
      //     fullname: create_user.Firstname,
      //     host: host,
      //     email: create_user.Email,
      //     protocol: request.protocol(),
      //   }
      // };

      let return_body = {
        success: true,
        details: create_user,
        //origin: host,
        message: "User Successully created"
      };

      //const sendMail = await SendMail.sendMail(emailActivationConfig);

      response.send(return_body);
    } catch (error) {
      Logger.error("Error : ", error);
      return response.status(500).send({
        success: false,
        message: error.toString()
      });
    }
  } //createUser

  async login({ request, auth, response }) {
    const data = request.post();

    const rules = {
      Email: `required|exists:${User.table},Email`,
      Password: `required`
    };

    const messages = {
      "Email.required": "An Email is required",
      "Email.exists": "User does not exist",
      "Password.required": "Password is Required",
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

    let { Email, Password } = data;

    try {
      if (await auth.attempt(Email, Password)) {
        let user = await User.findBy("Email", Email);

        //Disabled users should not be allowed to login
        if (!user.IsEnabled) {
          return response.status(401).send({
            success: false,
            message:
              "You have been deactivated by the admin. Please contact your Admin"
          });
        }

        let organization = await Organization.find(user.OrganizationID);
        let department = await Department.find(user.DepartmentID);
        //Get Organization roles
        let organization_roles = await Role.getOrganizationRoles({
          OrganizationID: user.OrganizationID
        });

        let userRoles = await Role.getUserRoles(user.UserID);
        let accessToken = await auth.generate(user);

        let all_user_permissions = [];

        _.forEach(userRoles, function (role) {
          all_user_permissions = [...all_user_permissions, ...role.Permissions];
        });
        user.all_roles = organization_roles;
        user.user_roles = userRoles;
        user.all_user_permissions = _.uniq(all_user_permissions);
        user.organization = organization;
        user.department = department;
        response.json({
          success: true,
          details: user,
          /* all_roles: organization_roles,
          user_roles: userRoles,
          all_user_permissions: _.uniq(all_user_permissions), */
          access_token: accessToken,
          message: "Login Successfull"
        });
      } else {
        return response.status(401).send({
          success: false,
          message: "Login failed : Incorrect Email/Password"
        });
      }
    } catch (error) {
      Logger.error("Error : ", error);
      let error_msg =
        error.name == "PasswordMisMatchException"
          ? "Login failed : Incorrect Email/Password"
          : "Authentication failed";
      return response.status(500).send({
        success: false,
        message: error_msg,
        error: error.toString()
      });
    }
  } //login
  async fetchUsers({ request, response }) {
    const data = request.all();

    try {
      const users = await User.getUsers(data);

      let usersJSON = users.toJSON();

      let allOrganizationRoles = await Role.getOrganizationRoles({
        OrganizationID: data.OrganizationID
      });

      usersJSON = _.map(usersJSON, user => {
        user.Roles = _.map(user.RoleIDs, roleslug => {
          let role = _.find(allOrganizationRoles, { RoleSlug: roleslug });
          delete role.Users;
          return role;
        });

        return user;
      });

      const return_body = {
        success: true,
        details: usersJSON,
        message: "Users Successfully Fetched"
      };

      response.send(return_body);
    } catch (error) {
      Logger.error("Error : ", error);
      return response.status(500).send({
        success: false,
        message: error.toString()
      });
    }
  } //fetchUsers
}

module.exports = UserController;
