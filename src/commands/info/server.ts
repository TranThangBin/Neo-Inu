import { SlashCommandBuilder, CommandInteraction } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("server")
        .setDescription("Provides information about the server."),
    async execute(interaction: CommandInteraction) {
        await interaction.reply({
            content: `This server is \`${interaction.guild?.name}\` and has \`${interaction.guild?.memberCount}\` members.`,
            ephemeral: true,
        });
    },
};
