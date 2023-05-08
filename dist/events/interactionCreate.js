"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const log_with_timestamp_js_1 = __importDefault(require("../log-with-timestamp.js"));
module.exports = {
    name: discord_js_1.Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand())
            return;
        const client = interaction.client;
        const command = client.commands.get(interaction.commandName);
        if (!command) {
            console.error(`No command matching ${interaction.commandName}`);
            return;
        }
        const { cooldowns } = client;
        if (!cooldowns.has(command.data.name))
            cooldowns.set(command.data.name, new discord_js_1.Collection());
        const now = Date.now();
        const timestamps = cooldowns.get(command.data.name);
        const defaultCooldownDuration = 5;
        const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;
        if (timestamps.has(interaction.user.id)) {
            const user = timestamps.get(interaction.user.id);
            const expirationTime = user + cooldownAmount;
            if (now < expirationTime) {
                const expirationTimeStamp = Math.round(expirationTime / 1000);
                return interaction.reply({
                    content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expirationTimeStamp}:R>.`,
                    ephemeral: true,
                });
            }
        }
        timestamps.set(interaction.user.id, now);
        setTimeout(() => {
            () => timestamps.delete(interaction.user.id);
        }, cooldownAmount);
        try {
            await command.execute(interaction);
            (0, log_with_timestamp_js_1.default)(`Executing /${interaction.commandName} by ${interaction.user.tag}`);
        }
        catch (error) {
            (0, log_with_timestamp_js_1.default)(`Error execute ${interaction.commandName}`);
            console.error(error);
        }
    },
};
