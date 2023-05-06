"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("ban")
        .setDescription("Select a member to ban them.")
        .addUserOption((option) => option
        .setName("target")
        .setDescription("The member to ban.")
        .setRequired(true))
        .addStringOption((option) => option.setName("reason").setDescription("Reason for banning."))
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.BanMembers)
        .setDMPermission(false),
    async execute(interaction) {
        const target = interaction.options.getUser("target");
        const reason = interaction.options.get("reason")?.value ??
            "No reason provided";
        try {
            await interaction.guild?.members.fetch(target);
            await interaction.guild?.members.ban("target");
            await interaction.reply({
                content: `Banning ${target?.username} for reason: ${reason}.`,
            });
        }
        catch {
            await interaction.reply({
                content: `${target.username} is not a member of this server.`,
                ephemeral: true,
            });
        }
    },
};
