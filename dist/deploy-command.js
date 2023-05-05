"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const discord_js_1 = require("discord.js");
dotenv_1.default.config();
const token = process.env.TOKEN ?? "";
const clientId = process.env.CLIENT_ID ?? "";
const guildID = process.env.GUILD_ID ?? "";
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
            console.log(`Deploying /${command.data.name}.`);
            commands.push(command.data.toJSON());
        }
        else
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}
const rest = new discord_js_1.REST().setToken(token);
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        const data = (await rest.put(discord_js_1.Routes.applicationGuildCommands(clientId, guildID), { body: commands }));
        console.log(`Successfully reloaded ${data.length}`);
    }
    catch (error) {
        console.error(error);
    }
})();
