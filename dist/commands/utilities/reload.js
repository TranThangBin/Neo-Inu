"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const log_with_timestamp_1 = __importDefault(require("../../log-with-timestamp"));
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("reload")
        .setDescription("Reload commands.")
        .addStringOption((option) => option
        .setName("command")
        .setDescription("The command you want to reload (blank if reload all).")),
    async execute(interaction) {
        const client = interaction.client;
        const commandName = interaction.options.get("command")?.value;
        if (!commandName) {
            const commandRoot = path_1.default.join(__dirname, "..");
            const commandFolders = fs_1.default.readdirSync(commandRoot);
            for (const folder of commandFolders) {
                const commandPath = path_1.default.join(commandRoot, folder);
                const commandFiles = fs_1.default
                    .readdirSync(commandPath)
                    .filter((file) => file.endsWith(".js"));
                for (const file of commandFiles) {
                    const command = path_1.default.join(commandPath, file);
                    delete require.cache[require.resolve(command)];
                    try {
                        const newCommand = require(command);
                        (0, log_with_timestamp_1.default)(`Reloading command /${newCommand.data.name}.`);
                        client.commands.set(newCommand.data.name, newCommand);
                    }
                    catch (error) {
                        console.error(error);
                        await interaction.reply({
                            content: `There was an error while reloading a command \`${file}\`:\n\`${error.message}\``,
                            ephemeral: true,
                        });
                    }
                }
            }
            await interaction.reply({
                content: `\`All commands\` were reloaded!`,
                ephemeral: true,
            });
            return;
        }
        const command = client.commands.get(commandName);
        if (!command) {
            return interaction.reply(`There is no command with name \`/${commandName}\`!`);
        }
        const commandRoot = path_1.default.join(__dirname, "..");
        const folderName = fs_1.default
            .readdirSync(commandRoot)
            .find((folder) => fs_1.default
            .readdirSync(path_1.default.join(commandRoot, folder))
            .includes(`${commandName}.js`));
        const commandPath = path_1.default.join(commandRoot, folderName, `${command.data.name}.js`);
        delete require.cache[require.resolve(commandPath)];
        try {
            client.commands.delete(command.data.name);
            const newCommand = require(commandPath);
            (0, log_with_timestamp_1.default)(`Reloading command /${newCommand.data.name}.`);
            client.commands.set(newCommand.data.name, newCommand);
            await interaction.reply({
                content: `Command \`/${newCommand.data.name}\` was reloaded!`,
                ephemeral: true,
            });
        }
        catch (error) {
            console.error(error);
            await interaction.reply({
                content: `There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``,
                ephemeral: true,
            });
        }
    },
};
