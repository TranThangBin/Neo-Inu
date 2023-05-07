"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const path_1 = __importDefault(require("path"));
const errorImagePath = path_1.default.join(__dirname, "..", "..", "images", "error-image-photo-icon.png");
exports.default = {
    content: "An error occurred!",
    files: [new discord_js_1.AttachmentBuilder(errorImagePath)],
};
