"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("user")
        .setDescription("Provide information about a user.")
        .addUserOption((option) => option
        .setName("username")
        .setDescription("Provide information about a user in the server (blank if yourself).")),
    async execute(interaction) {
        const target = interaction.options.getMember("name") ||
            interaction.member;
        await interaction.reply({
            content: `This user is \`${target.user.username}\`, who joined on \`${target.joinedAt}\`.`,
            ephemeral: true,
        });
    },
};
