"use strict";

const FileSystem = require("fs");
const Crypto = require("crypto");
//const { Safe } = require("./safe");
const Safed = require("./fileEncrypt");

var safe = new Safed("./test.pdf", "my-password");

//var safe = new encrypt('C:/Users/Techspecialist/Documents/Ariah/mast/red.txt', "my-password");
var data = {
  private_keys: [
    "9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08",
    "5E884898DA28047151D0E56F8DC6292773603D0D6AABBDD62A11EF721D1542D8",
    "3FC9B689459D738F8C88A3A48AA9E33542016B7A4052E001AAA536FCA74813CB"
  ]
};
try {
  /* var dec = safe.encryptAsync(data).then(
    result => {
      //return safe.decryptAsync();
      console.log(result);
    },
    err => {
      console.log(err);
    }
  ); */
  var dec = safe.decryptAsync().then(
    result => {
      //return safe.decryptAsync();
      console.log(result);
    },
    err => {
      console.log(err);
    }
  );
  // dec.then(result => {
  //     console.log(result);
  // }, err => {
  //     console.log(err);
  // });
} catch (error) {
  console.log(error);
}
