"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("clear-chat")
        .setDescription("Clear the chat.")
        .addIntegerOption((option) => option
        .setName("count")
        .setDescription("Clear from 1 to 100 messages from the last message that is under 14 days old.")
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        const count = interaction.options.get("count")?.value;
        const channel = interaction.channel;
        const messages = await interaction.channel?.messages.fetch({
            limit: count,
        });
        if (!messages)
            return;
        await channel.bulkDelete(messages);
        await interaction.editReply({
            content: `Delete ${messages.size} messages!`,
        });
    },
};
