"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("ping")
        .setDescription("Reply with Pong!"),
    async execute(interaction) {
        await interaction.reply({ content: "Pong!" });
        await interaction.followUp({ content: "Pong again!", ephemeral: true });
    },
};
