const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("reply with Pong!"),
    async execute(interaction) {
        await interaction.reply("Pong!");
    },
};
