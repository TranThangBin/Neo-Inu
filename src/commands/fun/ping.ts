import { SlashCommandBuilder, CommandInteraction } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Reply with Pong!"),
    async execute(interaction: CommandInteraction) {
        await interaction.reply({ content: "Pong!" });
        await interaction.followUp({ content: "Pong again!", ephemeral: true });
    },
};
