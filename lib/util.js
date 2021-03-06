'use strict';
/* 
    UTILITY FUNCTIONS
    -----------------
    This file hosts non-essential, independent utility functions.
*/

// Libraries
var _ = require('lodash');

let script = require('./script.js');

// Ensure an object only contains keys that are considered valid. (E.g: For preventing property pollution)
function areKeysValid(validKeys, obj) {
    for (let [key] of Object.entries(obj)) {
        if (!validKeys.includes(key)) {
            return key;
        }
    }
    return true;
}

// Encode a given string into HEX (as a native string)
// Tip:
// Using 'withMarker' will prefix the output with "HEX:", which ensures
// ... the ZVM interpreter will read the input as HEX instead of accidently
// ... interpreting an all-numeric HEX encoded string as a number.
function hexEncode(str, withMarker) {
    let res = Buffer.from(str, "utf8").toString("hex");
    return (withMarker ? "HEX:" : "") + res;
}

// Decode a given HEX string into UTF-8
function hexDecode(str) {
    // Strip the HEX 'marker', if one exists, then return the utf8 string
    str = str.replace("HEX:", "");
    return Buffer.from(str, "hex").toString("utf8");
}

// Splices and decodes a string from a contract
function recoverContractString(script, pos) {
    let nScript = script.split(" ");
    return hexDecode(nScript.splice(pos, 1)[0]);
}

// Sanitizes a string (presumably for user-end display) by removing non-ASCII unicode chars
function sanitizeString(str) {
    return str.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
}

// Cleans a list of items of their local-node data (Does not mutate original list)
function cleanItems (itemList, asPublicObject = false) {
    if (asPublicObject) {
        let i = 0, len = itemList.length;
        let tmpItemList = _.cloneDeep(itemList);
        for (i=0; i<len; i++) {
            tmpItemList[i] = tmpItemList[i].formatAsObject();
        }
        return tmpItemList;
    } else {
        let i = 0, len = itemList.length;
        let tmpItemList = _.cloneDeep(itemList);
        for (i=0; i<len; i++) {
            delete tmpItemList[i].priority;
            delete tmpItemList[i].objLastValidation;
            delete tmpItemList[i].invalidScore;
            delete tmpItemList[i].signedByReceiver;
            delete tmpItemList[i].isUnsigned;
            delete tmpItemList[i].vout;
        }
        return tmpItemList;
    }
}

// Returns the current unix epoch
function epoch() {
    return Math.floor(Date.now() / 1000);
}

exports.areKeysValid          = areKeysValid;
exports.hexEncode             = hexEncode;
exports.hexDecode             = hexDecode;
exports.recoverContractString = recoverContractString;
exports.sanitizeString        = sanitizeString;
exports.cleanItems            = cleanItems;
exports.epoch                 = epoch;