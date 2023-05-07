"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const log_with_timestamp_js_1 = __importDefault(require("../log-with-timestamp.js"));
module.exports = {
    name: discord_js_1.Events.ClientReady,
    once: true,
    execute(client) {
        (0, log_with_timestamp_js_1.default)(`Ready! Logged in as ${client.user?.tag}`);
    },
};
