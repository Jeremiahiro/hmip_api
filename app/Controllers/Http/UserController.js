"use strict";
const Logger = use("Logger");
const { validate } = use("Validator");
const User = use("App/Models/User");
const ControllerHelpers = use("App/Utility/ControllerHelpers");

class UserController {
  async createUser({ request, response }) {
    const data = request.post();

    const rules = {
      //username: `required|unique:${User.table}`,
      email: `required|unique:${User.table}`,
      password: `required`,
      phoneNumber: `required|unique:${User.table}`,
    };

    const messages = {
      //   "username.required": "A username is required",
      //   "username.unique": "This username is taken. Try another.",
      "email.required": "An Email is required",
      "email.unique": "Email already exists",
      "password.required": "A password for the user",
      "phoneNumber.required": "Phone Number is needed for user",
      "phoneNumber.unique": "Phone Number already exist",
    };

    const validation = await validate(data, rules, messages);

    if (validation.fails()) {
      const validation_messages = validation.messages().map((msgObject) => {
        return msgObject.message;
      });

      return response.status(400).send({
        success: false,
        message: validation_messages,
      });
    }

    try {
      let create_user = await User.createUser(data);

      let return_body = {
        success: true,
        details: create_user,
        message: "User Successfully created",
      };

      response.send(return_body);
    } catch (error) {
      Logger.error("Error : ", error);
      return response.status(500).send({
        success: false,
        message: error.toString(),
      });
    }
  } //createUser

  async login({ request, auth, response }) {
    const data = request.post();

    const rules = {
      email: `required|exists:${User.table},email`,
      password: `required`,
    };

    const messages = {
      "email.required": "An Email is required",
      "email.exists": "User does not exist",
      "password.required": "A password for the user",
    };

    const validation = await validate(data, rules, messages);

    if (validation.fails()) {
      return response.status(400).send({
        success: false,
        message: ControllerHelpers.extractValidationErrorMessages(
          validation.messages()
        ),
      });
    }

    let { email, password } = data;

    try {
      if (await auth.attempt(email, password)) {
        let user = await User.findBy("Email", email);

        //Disabled users should not be allowed to login
        if (!user.IsEnabled) {
          return response.status(401).send({
            success: false,
            message:
              "You have been deactivated by the admin. Please contact your Admin",
          });
        }
        let accessToken = await auth.generate(user);

        response.json({
          success: true,
          details: user,
          access_token: accessToken,
          message: "Login Successfully",
        });
      } else {
        return response.status(401).send({
          success: false,
          message: "Login failed : Incorrect Email/Password",
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
        error: error.toString(),
      });
    }
  } //login
}

module.exports = UserController;
