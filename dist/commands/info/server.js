"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("server")
        .setDescription("Provides information about the server."),
    async execute(interaction) {
        await interaction.reply({
            content: `This server is \`${interaction.guild?.name}\` and has \`${interaction.guild?.memberCount}\` members.`,
            ephemeral: true,
        });
    },
};
