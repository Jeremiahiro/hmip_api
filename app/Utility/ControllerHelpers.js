"use strict";

const _ = require("lodash");

class ControllerHelpers {
  static extractValidationErrorMessages(validatorMessages) {
    const messages = _.map(validatorMessages, msgObject => {
      return msgObject.message;
    });

    return messages;
  }

  static makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  } //makeid

  //Removes leading 'www.' from a requesting host
  static cleanHost(host) {
    if (host.includes("www.")) {
      return host.replace("www.", "");
    } else {
      return host;
    }
  } //cleanHost
}

module.exports = ControllerHelpers;
