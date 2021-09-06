"use strict";

const Helpers = use("Helpers");

const _ = require("lodash");

const sgMail = require("@sendgrid/mail");
const handlebars = require("handlebars");
const fs = Helpers.promisify(require("fs"));

sgMail.setApiKey(
  "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"
);

//const send = Helpers.promisify(sgMail.send);

class SendMail {
  static async sendMail(config) {
    const compiledHtml = await this.compileTemplate(
      config.templateFile,
      config.data
    );
    const message = {
      to: config.to,
      from: config.from,
      subject: config.subject,

      // text: "and easy to do anywhere, even with Node.js",
      html: compiledHtml
    };

    const send = await this.promisifySend(message);
    return send;
  } //sendMail

  static async sendMailCallback(config, res, callback) {
    const compiledHtml = await this.compileTemplate(
      config.templateFile,
      config.data
    );
    const message = {
      to: config.to,
      from: config.from,
      subject: config.subject,

      // text: "and easy to do anywhere, even with Node.js",
      html: compiledHtml
    };

    //return send(message);

    sgMail.sendMultiple(message, function(error, response) {
      callback(error, response);
    });
  } //sendMailCallback

  static async compileTemplate(templateFile, dataToSend) {
    let file = await fs.readFile(`${Helpers.appRoot()}/email/${templateFile}`, {
      encoding: "utf-8"
    });

    //console.log(file);

    let template = handlebars.compile(file);

    let htmlToSend = template(dataToSend);

    return htmlToSend;
  } //compileTemplate

  static async promisifySend(data) {
    return new Promise((resolve, reject) => {
      sgMail.sendMultiple(data, function(error, response) {
        if (error) {
          reject(error);
          // callback(error);
        }

        resolve(response);
      });
    });
  } //promisifySend
}

module.exports = SendMail;
