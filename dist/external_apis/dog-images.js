"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const path_1 = __importDefault(require("path"));
const url = "https://dog.ceo/api/breeds/image/random";
exports.default = async () => {
    const response = await fetch(url);
    if (!response.ok)
        return new discord_js_1.AttachmentBuilder(path_1.default.join(__dirname, "..", "..", "images", "error-image-photo-icon.png"));
    const data = await response.json();
    return new discord_js_1.AttachmentBuilder(data.message);
};
