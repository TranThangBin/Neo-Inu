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
const dotenv = __importStar(require("dotenv"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const discord_js_1 = require("discord.js");
dotenv.config();
const token = process.env.TOKEN ?? "";
const clientId = process.env.CLIENT_ID ?? "";
const guildID = process.env.GUILD_ID ?? "";
const commands = [];
const commandRoot = path.join(__dirname, "commands");
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