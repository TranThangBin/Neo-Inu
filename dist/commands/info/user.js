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
        const target = interaction.options.getMember("username") ??
            interaction.member;
        const targetAvatar = target.user.avatarURL();
        if (!targetAvatar) {
            await interaction.reply({
                content: `This user is \`${target.user.username}\`, who joined on \`${target.joinedAt}\`.`,
                ephemeral: true,
            });
            return;
        }
        await interaction.reply({
            content: `This user is \`${target.user.username}\`, who joined on \`${target.joinedAt}\`.`,
            ephemeral: true,
            files: [new discord_js_1.AttachmentBuilder(targetAvatar)],
        });
    },
};
