"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (...args) => {
    const date = new Date();
    const options = { timeZone: "Asia/Ho_Chi_Minh" };
    const now = date.toLocaleString("en-US", options);
    console.log(`[${now}]`, ...args);
};
