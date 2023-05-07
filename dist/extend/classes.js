"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyClient = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const log_with_timestamp_js_1 = __importDefault(require("../log-with-timestamp.js"));
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
        const eventPath = path_1.default.join(__dirname, "..", "events");
        const eventFiles = fs_1.default
            .readdirSync(eventPath)
            .filter((file) => file.endsWith(".js"));
        for (const file of eventFiles) {
            const filePath = path_1.default.join(eventPath, file);
            const event = require(filePath);
            if (event.once)
                this.once(event.name, (...args) => event.execute(...args));
            else
                this.on(event.name, (...args) => event.execute(...args));
        }
    }
    loadCommands() {
        const commandRoot = path_1.default.join(__dirname, "..", "commands");
        const commandFolders = fs_1.default.readdirSync(commandRoot);
        for (const folder of commandFolders) {
            const commandPath = path_1.default.join(commandRoot, folder);
            const commandFiles = fs_1.default
                .readdirSync(commandPath)
                .filter((file) => file.endsWith(".js"));
            for (const file of commandFiles) {
                const filePath = path_1.default.join(commandPath, file);
                const command = require(filePath);
                if ("data" in command && "execute" in command) {
                    (0, log_with_timestamp_js_1.default)(`Loading command /${command.data.name}.`);
                    this.commands.set(command.data.name, command);
                }
                else
                    (0, log_with_timestamp_js_1.default)(`[WARNING] The command at ${filePath} is missing a required or "execute property.`);
            }
        }
    }
}
exports.MyClient = MyClient;
