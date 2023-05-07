"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const error_reply_js_1 = __importDefault(require("./error-reply.js"));
const url = "https://dog.ceo/api/breeds/image/random";
exports.default = async () => {
    const response = await fetch(url);
    if (!response.ok)
        return error_reply_js_1.default;
    const data = await response.json();
    return { files: [new discord_js_1.AttachmentBuilder(data.message)] };
};
