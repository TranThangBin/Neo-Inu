"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("unban")
        .setDescription("Select a member to unban them.")
        .addUserOption((option) => option
        .setName("target")
        .setDescription("The member to unban.")
        .setRequired(true))
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.BanMembers)
        .setDMPermission(false),
    async execute(interaction) {
        const target = interaction.options.getUser("target");
        const banList = await interaction.guild?.bans.fetch();
        if (!banList?.has(target.id)) {
            await interaction.reply({
                content: `${target?.username} is not banned or not exist.`,
                ephemeral: true,
            });
            return;
        }
        await interaction.guild?.members.unban(target);
        await interaction.reply({
            content: `Welcome back to sociaty ${target?.username}.`,
        });
    },
};
