"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeKey = exports.encodeKey = void 0;
const js_base64_1 = require("js-base64");
const encodeKey = (userID, value, registerID) => {
    const part1 = (0, js_base64_1.encode)(userID);
    const part2 = (0, js_base64_1.encode)(value.toString());
    const part3 = (0, js_base64_1.encode)(registerID);
    return `${part1}-${part2}-${part3}`;
};
exports.encodeKey = encodeKey;
const decodeKey = (key) => {
    const keyDecode = key.split('-');
    const userId = (0, js_base64_1.decode)(keyDecode[0]);
    const value = (0, js_base64_1.decode)(keyDecode[1]);
    const registerId = (0, js_base64_1.decode)(keyDecode[2]);
    return {
        userId,
        value,
        registerId
    };
};
exports.decodeKey = decodeKey;
