"use strict";

const Config = use("Config");
const AWS = require("aws-sdk");
var fs = require("fs");

AWS.config.update({
  accessKeyId: Config.get("procureease.AWSCredentials.accessKeyId"),
  secretAccessKey: Config.get("procureease.AWSCredentials.secretAccessKey")
});

const s3 = new AWS.S3();

class FileUpload {
  static async uploadToAws(uploadData) {
    const { filename, filepath, contentType } = uploadData;
    var d = new Date();
    var n = d.getTime();

    var uniqueFileName = n + filename;
    //store uniquefilename

    const params = {
      Bucket: Config.get("procureease.AWSCredentials.bucketName"),
      Body: await fs.createReadStream(filepath),
      Key: uniqueFileName,
      ACL: "public-read",
      ContentType: contentType
    };

    const returnData = await this.promisifyUpload(params);
    returnData.fileName = uniqueFileName;
    const signedUrl = await this.getSignedUrl(uniqueFileName);
    returnData.signedUrl = signedUrl;
    console.log("returnData ", returnData);

    return returnData;
  } //uploadToAws

  static async promisifyUpload(params) {
    return new Promise((resolve, reject) => {
      s3.upload(params, function(err, data) {
        //handle error
        if (err) {
          console.log("an error occured ", err);
          reject(error);
        }

        resolve(data);

        //success
        /* if (data) {
          console.log("Uploaded in:", data.Location);

          var returnData = {
            fileLocation: data.Location,
            message: "uploaded to AWS successfully"
          };

          resolve(returnData);
        } */
      });
    });
  } //promisifyUpload

  static async getSignedUrl(uniqueFileName) {
    var params = {
      Bucket: "procureease-bucket",
      Expires: 2147483640,
      Key: uniqueFileName
    };
    

    const url = await this.promisifyGetSignedUrl(params);

    return url;
  } //getSignedUrl, store signed url, to be used when file to be retrieved

  static async promisifyGetSignedUrl(params) {
    return new Promise((resolve, reject) => {
      s3.getSignedUrl("getObject", params, function(err, data) {
        if (err) {
          reject(error);
        }
        resolve(data);
      });
    });
  }
}

module.exports = FileUpload;
