"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const error_image_path_js_1 = __importDefault(require("./error-image-path.js"));
const url = "https://dog.ceo/api/breeds/image/random";
exports.default = async () => {
    const response = await fetch(url);
    if (!response.ok)
        return { files: [new discord_js_1.AttachmentBuilder(error_image_path_js_1.default)] };
    const data = await response.json();
    return { files: [new discord_js_1.AttachmentBuilder(data.message)] };
};
