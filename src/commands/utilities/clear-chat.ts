import {
    SlashCommandBuilder,
    CommandInteraction,
    TextChannel,
    NewsChannel,
} from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear-chat")
        .setDescription("Clear the chat.")
        .addIntegerOption((option) =>
            option
                .setName("count")
                .setDescription(
                    "Clear from 1 to 100 messages from the last message."
                )
                .setMinValue(1)
                .setMaxValue(100)
                .setRequired(true)
        ),
    async execute(interaction: CommandInteraction) {
        await interaction.deferReply({ ephemeral: true });
        const count = interaction.options.get("count")?.value as number;
        const channel = interaction.channel as TextChannel | NewsChannel;
        const messages = await interaction.channel?.messages.fetch({
            limit: count,
        });
        if (!messages) return;
        await channel.bulkDelete(messages);
        await interaction.editReply({
            content: `Delete ${messages.size} messages!`,
        });
    },
};
