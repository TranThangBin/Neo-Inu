const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear-chat")
        .setDescription("Clears the chat")
        .addIntegerOption((option) =>
            option
                .setName("count")
                .setDescription(
                    "Number of messages from 0 to 100 to delete (0 to delete all)"
                )
                .setMinValue(1)
                .setMaxValue(100)
        ),
    async execute(interaction) {
        const count = interaction.options.getInteger("count");
        const messages = await interaction.channel.messages.fetch({
            limit: count || undefined,
        });
        await interaction.channel.bulkDelete(messages);
        await interaction.reply({
            content: `Deleted ${messages.size} messages!`,
            ephemeral: true,
        });
    },
};
