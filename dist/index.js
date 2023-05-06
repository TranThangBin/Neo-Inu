"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const MyClient_js_1 = __importDefault(require("./extend/classes/MyClient.js"));
const discord_js_1 = require("discord.js");
dotenv_1.default.config();
const token = process.env.TOKEN;
const client = new MyClient_js_1.default({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildVoiceStates,
    ],
});
client.login(token);
