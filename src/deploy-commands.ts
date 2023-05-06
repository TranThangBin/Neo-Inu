import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { REST, Routes, ApplicationCommand } from "discord.js";
import Command from "./extend/interfaces/Command";
dotenv.config();
const token = process.env.TOKEN as string;
const clientId = process.env.CLIENT_ID as string;
const guildID = process.env.GUILD_ID as string;

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
        const command: Command = require(filePath);
        if ("data" in command && "execute" in command) {
            console.log(`Deploying /${command.data.name}.`);
            commands.push(command.data.toJSON());
        } else
            console.log(
                `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
            );
    }
}

const rest = new REST().setToken(token);

(async () => {
    try {
        console.log(
            `Started refreshing ${commands.length} application (/) commands.`
        );
        const data = (await rest.put(
            Routes.applicationGuildCommands(clientId, guildID),
            { body: commands }
        )) as ApplicationCommand[];
        console.log(
            `Successfully reloaded ${data.length} application (/) commands.`
        );
    } catch (error) {
        console.error(error);
    }
})();
