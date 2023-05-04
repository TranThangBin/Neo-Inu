"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyClient = void 0;
const discord_js_1 = require("discord.js");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class MyClient extends discord_js_1.Client {
    commands;
    cooldowns;
    constructor(options) {
        super(options);
        this.commands = new discord_js_1.Collection();
        this.cooldowns = new discord_js_1.Collection();
        this.loadEvent();
        this.loadCommands();
    }
    loadEvent() {
        const eventPath = path.join(__dirname, "..", "events");
        const eventFiles = fs
            .readdirSync(eventPath)
            .filter((file) => file.endsWith(".js"));
        for (const file of eventFiles) {
            const filePath = path.join(eventPath, file);
            const event = require(filePath);
            if (event.once)
                this.once(event.name, (...args) => event.execute(...args));
            else
                this.on(event.name, (...args) => event.execute(...args));
        }
    }
    loadCommands() {
        const commandRoot = path.join(__dirname, "..", "commands");
        const commandFolders = fs.readdirSync(commandRoot);
        for (const folder of commandFolders) {
            const commandPath = path.join(commandRoot, folder);
            const commandFiles = fs
                .readdirSync(commandPath)
                .filter((file) => file.endsWith(".js"));
            for (const file of commandFiles) {
                const filePath = path.join(commandPath, file);
                const command = require(filePath);
                if ("data" in command && "execute" in command) {
                    console.log(`Command /${command.data.name} is loaded.`);
                    this.commands.set(command.data.name, command);
                }
                else
                    console.log(`[WARNING] The command at ${filePath} is missing a required or "execute property.`);
            }
        }
    }
}
exports.MyClient = MyClient;
