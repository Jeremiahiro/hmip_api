"use strict";

const FileSystem = require("fs");
const Crypto = require("crypto");

class fileEncrypt {

    // constructor method to keep record of the file location and the password for the instance of the class
    constructor(filePath, password) {
        this.filePath = filePath;
        this.password = password;
    }

    encryptAsync() {
        return new Promise((resolve, reject) => {
            FileSystem.readFile(this.filePath, (error, data) => {
                if (error) {
                    reject(error);
                    console.log(error)
                }
                try {
                    var cipher = Crypto.createCipher('aes-256-cbc', this.password);
                    var encrypted = Buffer.concat([cipher.update(Buffer.from(data, "utf8")), cipher.final()]);
                } catch (exception) {
                    reject({ message: exception.message });
                }
                FileSystem.writeFile(this.filePath, encrypted, error => {
                    if (error) {
                        reject(error)
                        console.log(error)
                    }
                    resolve({ message: "Encrypted!" });
                });
            });
        });
    }


    // use an AES algorithm
    //save to a file, we want to create a buffer from our plaintext data. 
    //Once we have an encrypted buffer, we can write to the file system and return a message.
    // encrypt(data) {
    //     try {
    //         var cipher = Crypto.createCipher('aes-256-cbc', this.password);
    //         var encrypted = Buffer.alloc([cipher.update(Buffer.from(JSON.stringify(data), "utf8")), cipher.final()]);
    //         FileSystem.writeFileSync(this.filePath, encrypted);
    //         return { message: "Encrypted!" };
    //     } catch (exception) {
    //         throw new Error(exception.message);
    //     }
    // }

    decryptAsync() {
        return new Promise((resolve, reject) => {
            FileSystem.readFile(this.filePath, (error, data) => {
                if (error) {
                    reject(error);
                    console.log(error)
                }
                try {
                    var decipher = Crypto.createDecipher("aes-256-cbc", this.password);
                    var decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
                    let bufferOriginal = Buffer.from(JSON.parse(JSON.stringify(decrypted)).data);
                    FileSystem.writeFile(this.filePath, bufferOriginal.toString('utf8'), error => {

                        if (error) {
                            reject(error)
                            console.log(error)
                        }
                        resolve({ message: "decrypted!" });
                    });
                } catch (exception) {
                    reject({ message: exception.message });
                }
            });
        });
    }

    //to decrrypt file,call the decrypt method
    // decrypt() {
    //     try {
    //         var data = FileSystem.readFileSync(this.filePath);
    //         var decipher = Crypto.createDecipher("aes-256-cbc", this.password);
    //         var decrypted = Buffer.alloc([decipher.update(data), decipher.final()]);
    //         return JSON.parse(decrypted.toString());
    //     } catch (exception) {
    //         throw new Error(exception.message);
    //     }
    // }

}

module.exports = fileEncrypt;