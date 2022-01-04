"use strict";

const Logger = use("Logger");

const _ = require("lodash");
const url = require("url");
const moment = require("moment");
const { Console } = require("console");
const Database = use('Database');

const { validate, validateAll } = use("Validator");


const User = use("App/Models/User");
const ControllerHelpers = use("App/Utility/ControllerHelpers");
//const SendMail = use("App/Utility/SendMail");

const Role = use("App/Models/Role");
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

    //Generate Random Password
    // data.Password = ControllerHelpers.makeid(7);
    const password = data.Password;
    console.log("PASSWORD", password)
    try {
      let create_user = await User.createUser(data);

      const activatedUser = await this.activateAccount(create_user);
      const { Email, Password, ResetPasswordToken } = await this.initiatePasswordReset(create_user);

      const userDetails = { Email, Password:password, Token: ResetPasswordToken }
      console.log("USER DETAILS ", userDetails);

      const resetDefaultPassword = await this.resetDefaultPassword(userDetails)
      console.log("RESET DETAILS DEFAULT PASSWORD", resetDefaultPassword);
      //Send the user a mail
      let request_origin = url.parse(request.request.headers.origin || "http://localhost");
      let host =
        ControllerHelpers.cleanHost(request_origin.host) || "localhost";

      // let password_reset_url = `https://${host}/signup?Email=${create_user.Email}`;

      // const emailActivationConfig = {
      //   templateFile: "SignUpTemplate.html",
      //   from: "info@anan.com.ng",
      //   to: create_user.Email,
      //   subject: "ANAN Account Activation",
      //   data: {
      //     fullname: create_user.FullName, 
      //     host: host,
      //     email: create_user.Email,
      //     activation_url: encodeURI(password_reset_url),
      //     protocol: request.protocol()
      //   }
      // };

      let return_body = {
        success: true,
        details: create_user,
        origin: host,
        message: "User Successully created"
      };

      // const sendMail = await SendMail.sendMail(emailActivationConfig);

      response.send(return_body);
    } catch (error) {
      Logger.error("Error : ", error);
      return response.status(500).send({
        success: false,
        message: error.toString()
      });
    }
  } //createUser
  // async activateAccount({ request, response }) {
  //   const data = request.post();

  //   const rules = {
  //     Email: `required|exists:${User.table},Email`,
  //     Password: `required`
  //   };

  //   const messages = {
  //     "Email.required": "An email is required",
  //     "Email.exists": "User does not exist",
  //     "Password.required": "Password is required"
  //   };

  //   const validation = await validate(data, rules, messages);

  //   if (validation.fails()) {
  //     return response.status(400).send({
  //       success: false,
  //       message: ControllerHelpers.extractValidationErrorMessages(
  //         validation.messages()
  //       )
  //     });
  //   }

  //   try {
  //     let user = await User.findBy("Email", data.Email);
  //     data.UserID = user.UserID;
  //     let resetPassword = await User.resetPassword(data);

  //     response.json({
  //       success: true,
  //       details: resetPassword,
  //       message: "Account Successfully Activated"
  //     });
  //   } catch (error) {
  //     Logger.error("Error : ", error);
  //     return response.status(500).send({
  //       success: false,
  //       message: error.toString()
  //     });
  //   }
  // } //activateAccount

  // async initiatePasswordReset({ request, response }) {
  //   const data = request.post();

  //   const rules = {
  //     Email: `required|exists:${User.table},Email`
  //   };

  //   const messages = {
  //     "Email.required": "An email is required",
  //     "Email.exists": "User does not exist"
  //   };

  //   const validation = await validate(data, rules, messages);

  //   if (validation.fails()) {
  //     return response.status(400).send({
  //       success: false,
  //       message: ControllerHelpers.extractValidationErrorMessages(
  //         validation.messages()
  //       )
  //     });
  //   }

  //   try {
  //     //Get this user
  //     let user = await User.findBy("Email", data.Email);

  //     //Generate Reset Token
  //     let passwordResetToken = ControllerHelpers.makeid(10);
  //     let passwordResetExpiryTime = moment()
  //       .add(2, "h")
  //       .unix(); //Set 2hours from now

  //     let updateData = {
  //       ResetPasswordToken: passwordResetToken,
  //       ResetPasswordTokenExpiry: passwordResetExpiryTime,
  //       ResetPasswordTokenUsed: false
  //     };

  //     let update_user = await User.updateUser(
  //       { UserID: user.UserID },
  //       updateData
  //     );

  //     //Send the user a mail
  //     //  let request_origin = url.parse(request.request.headers.origin);
  //     // let host = ControllerHelpers.cleanHost(request_origin.host);

  //     if (update_user) {
  //       //Send Email to user

  //       // const passwordResetEmailConfig = {
  //       //   templateFile: "PasswordResetTemplate.html",
  //       //   from: "info@anan.org.ng",
  //       //   to: user.Email,
  //       //   subject: "ANAN Account Password Reset",
  //       //   data: {
  //       //     fullname: user.FullName,
  //       //     host: host,
  //       //     email: user.Email,
  //       //     protocol: request.protocol(),
  //       //     token: passwordResetToken
  //       //   }
  //       // };

  //       let return_body = {
  //         success: true,
  //         details: updateData,

  //         message: "Password Reset Successfully Initiated"
  //       };

  //       //const sendMail = await SendMail.sendMail(passwordResetEmailConfig);

  //       response.send(return_body);
  //     } else {
  //       return response.status(400).send({
  //         success: false,
  //         message: "Could not process password reset"
  //       });
  //     }
  //   } catch (error) {
  //     Logger.error("Error : ", error);
  //     return response.status(500).send({
  //       success: false,
  //       error: error.toString(),
  //       message: "Could not Initiate Password Reset"
  //     });
  //   }
  // } 
  //initiatePasswordReset

  async resetPassword({ request, response }) {
    const data = request.post();

    const rules = {
      Email: `required|exists:${User.table},Email`,
      Token: `required`,
      Password: `required`
    };

    const messages = {
      "Email.required": "An email is required",
      "Email.exists": "User does not exist",
      "Token.required": "A Password Reset Token is required",
      "Password.required": "Password is required"
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

    let user = await User.findBy("Email", data.Email);

    //Check if this reset token matches that of the user
    if (user.ResetPasswordToken != data.Token) {
      return response.status(400).send({
        success: false,
        message: "Incorrect Reset Token"
      });
    }

    //Check if the reset token has already being used
    if (user.ResetPasswordTokenUsed) {
      return response.status(400).send({
        success: false,
        message: "You have already used this password reset link"
      });
    }

    //Check if link has expired
    let right_now = moment().unix();

    if (right_now > Number(user.ResetPasswordTokenExpiry)) {
      return response.status(400).send({
        success: false,
        message:
          "Reset link has already expired. Please initiate a new password reset"
      });
    }

    try {
      data.UserID = user.UserID;
      let resetPassword = await User.resetPassword(data);

      response.json({
        success: true,
        details: resetPassword,
        message: "Password Successfully Reset"
      });
    } catch (error) {
      Logger.error("Error : ", error);
      return response.status(500).send({
        success: false,
        message: error.toString()
      });
    }
  } //resetPassword

  async login({ request, auth, response }) {
    const data = request.post();

    const rules = {
      Email: `required|exists:${User.table},Email`,
      Password: `required`
    };

    const messages = {
      "Email.required": "An Email is required",
      "Email.exists": "User does not exist",
      "Password.required": "Password is Required"
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
        //let department = await Department.find(user.DepartmentID);
        //Get all roles
        let all_roles = await Role.getRoles({ IsEnabled: 1 });
        console.log("ALL ROLES", all_roles);
        let userRoles = await Role.getUserRoles(user.UserID);

        let accessToken = await auth.generate(user);

        let all_user_permissions = [];

        _.forEach(userRoles, function (role) {
          all_user_permissions = [...all_user_permissions, ...role.Permissions];
        });
        user.all_roles = all_roles;
        user.user_roles = userRoles;
        user.all_user_permissions = _.uniq(all_user_permissions);

        response.json({
          success: true,
          details: user,
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

  async updateUser({ request, response }) {
    const data = request.post();

    const rules = {
      //UserID: `required|in:${User.table}`
      UserID: `required|exists:${User.table},UserID`
    };

    const messages = {
      "UserID.required": "A user id is required",
      "UserID.exists": "User does not exist"
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

    const { UserID } = data;

    //Do not update certain parameters
    delete data.UserID;
    if (data.Password) {
      delete data.Password;
    }

    let return_body;

    const user = await User.find(UserID);

    //Check if the department is an enabled one
    if (data.DepartmentID) {
      let department = await Department.find(data.DepartmentID);

      if (department.IsEnabled == 0) {
        return response.status(403).send({
          success: false,
          message:
            "The Department you're trying to add the user to is Deactivated"
        });
      }
    }

    //Check if the role is an enabled one
    if (data.RoleIDs && data.RoleIDs.length > 0) {
      let role_queries = [];

      data.RoleIDs.forEach(role_slug => {
        role_queries.push(Role.findBy("RoleSlug", role_slug));
      });

      let update_roles = await Promise.all(role_queries);

      let deactivated_roles = [];

      update_roles.forEach(role => {
        if (role.IsEnabled == 0) {
          deactivated_roles.push(role);
        }
      });

      if (deactivated_roles.length > 0) {
        return response.status(403).send({
          success: false,
          message: "The Role you're trying to add the user to is Deactivated"
        });
      }
    }

    if (user) {
      if (!_.isEmpty(data)) {
        try {
          const update_user = await User.updateUser({ UserID }, data);

          return_body = {
            success: true,
            details: update_user,
            message: "User Successfully Updated"
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
    } else {
      return_body = {
        success: false,
        message: "User does not exist"
      };

      return response.status(400).send(return_body);
    }
  } //updateUser

  async removeUser({ request, response }) {
    const data = request.post();

    const rules = {
      //UserID: `required|in:${User.table}`
      UserID: `required|exists:${User.table},UserID`
    };

    const messages = {
      "UserID.required": "A user id is required",
      "UserID.exists": "User does not exist"
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

    const { UserID } = data;

    let return_body;

    const user = await User.find(UserID);

    if (user) {
      try {
        const delete_user = await User.removeUser(UserID);

        return_body = {
          success: true,
          details: delete_user,
          message: "User Successfully Deleted"
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
        message: "User does not exist"
      };

      return response.status(400).send(return_body);
    }
  } //removeUser

  async getUser({ request, response }) {
    const data = request.all();

    const rules = {
      //UserID: `required|in:${User.table}`
      UserID: `required|exists:${User.table},UserID`
    };

    const messages = {
      "UserID.required": "A user id is required",
      "UserID.exists": "User does not exist"
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

    const { UserID } = data;

    try {
      const user = await User.getUser(UserID);

      const return_body = {
        success: true,
        details: user,
        message: "User Successfully Fetched"
      };

      response.send(return_body);
    } catch (error) {
      Logger.error("Error : ", error);
      return response.status(500).send({
        success: false,
        message: error.toString()
      });
    }
  } //getUser
  
  async fetchUsersCount({ request, response }) {
    const data = request.all();

    try {
      const users = await User.getUserCount(data);

      //let usersJSON = users.toJSON();
      const return_body = {
        success: true,
        details: users || {},
        message: "Number of Users Successfully Fetched"
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

  async activateAccount({ Email, Password }) {

    const data = { Email, Password }

    console.log('this is email and paswword', Email, Password);


    try {
      let user = await User.findBy("Email", Email);
      // pass in all details required here
      data.UserID = user.UserID;

      let resetPassword = await User.resetPassword(data);


      console.log("this is reset password", resetPassword)


      //  return data needed for intiate password reset here 
      return resetPassword

    } catch (error) {
      // Logger.error("Error : ", error);
      // return 'error'
    }
  } //activateAccount
  async initiatePasswordReset(data) {


    try {
      //Get this user
      let user = await User.findBy("Email", data.Email);

      //Generate Reset Token
      let passwordResetToken = ControllerHelpers.makeid(10);
      let passwordResetExpiryTime = moment()
        .add(2, "h")
        .unix(); //Set 2hours from now

      let updateData = {
        ResetPasswordToken: passwordResetToken,
        ResetPasswordTokenExpiry: passwordResetExpiryTime,
        ResetPasswordTokenUsed: false
      };

      let update_user = await User.updateUser(
        { UserID: user.UserID },
        updateData
      );


      console.log("UPDATED USER", update_user);
      return update_user
    } catch (error) {
      Logger.error("Error : ", error);
      return 'error'
    }
  } //initiatePasswordReset
  async resetDefaultPassword(data) {


    let user = await User.findBy("Email", data.Email);

    //Check if this reset token matches that of the user
    if (user.ResetPasswordToken != data.Token) {
      return
    }




    try {
      data.UserID = user.UserID;
      let resetPassword = await User.resetPassword(data);

      return resetPassword

    } catch (error) {

      return 'error'
    }
  } //resetDefaultPassword


}

module.exports = UserController;
