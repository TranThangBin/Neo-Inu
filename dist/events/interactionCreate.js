"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
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
        const cooldownAmount = command.cooldown ?? defaultCooldownDuration;
        try {
            await command.execute(interaction);
            console.log(`Executing /${interaction.commandName}`);
        }
        catch (error) {
            console.error(`Error execute ${interaction.commandName}`);
            console.error(error);
        }
    },
};
