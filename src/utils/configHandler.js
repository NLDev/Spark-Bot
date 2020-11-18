"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

// Core Modules
let fs = require("fs");
let path = require("path");

// Utils
let log = require("./logger");

const packagefile = require(path.resolve("package.json"));
const configPath  = path.resolve("config.json");

/**
 * Check if the config is valid JSON
 *
 * @param {*} obj
 * @returns {boolean} whether it is valid JSON
 */
let validJson = function(obj){
    try {
        JSON.parse(obj);
    }
    catch (e){
        return false;
    }
    return true;
};

/**
 * Reads out config data
 *
 * @returns {object} JSON Content
 */
let getconfig = function(){
    if (!fs.existsSync(configPath)){
        log.error("Config does not exist! Make sure you copy config.template.json and paste it as 'config.json'. Then configure it.");
        process.exit(1);
    }

    let jsondata = "";
    try {
        jsondata = String(fs.readFileSync(configPath));
    }
    catch (e){
        log.error(`Konnte Config-Datei nicht lesen: ${e}`);
        process.exit(1);
    }

    if (validJson(jsondata)) return JSON.parse(jsondata);

    log.error("Die Config-Datei hat ein unzulässiges JSON Format...");
    return process.exit(1);
};

let getVersion = function(){
    return packagefile.version;
};

let getName = function(){
    return packagefile.name;
};

let getAuthor = function(){
    return packagefile.author;
};

let getDescription = function(){
    return packagefile.description;
};

module.exports = {
    getConfig: getconfig,
    getVersion: getVersion,
    getName: getName,
    getAuthor: getAuthor,
    getDescription: getDescription
};
