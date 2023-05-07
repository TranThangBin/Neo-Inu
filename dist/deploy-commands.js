"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const log_with_timestamp_1 = __importDefault(require("./log-with-timestamp"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildID = process.env.GUILD_ID;
const commands = [];
const commandRoot = path_1.default.join(__dirname, "commands");
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
            (0, log_with_timestamp_1.default)(`Deploying /${command.data.name}.`);
            commands.push(command.data.toJSON());
        }
        else
            (0, log_with_timestamp_1.default)(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}
const rest = new discord_js_1.REST().setToken(token);
(async () => {
    try {
        (0, log_with_timestamp_1.default)(`Started refreshing ${commands.length} application (/) commands.`);
        const data = (await rest.put(discord_js_1.Routes.applicationGuildCommands(clientId, guildID), { body: commands }));
        (0, log_with_timestamp_1.default)(`Successfully reloaded ${data.length} application (/) commands.`);
    }
    catch (error) {
        console.error(error);
    }
})();
