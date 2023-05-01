const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("clear-chat")
        .setDescription("Clears the chat")
        .addIntegerOption((option) =>
            option
                .setName("count")
                .setDescription(
                    "Number of messages from 0 to 100 to delete (0 to delete all)"
                )
                .setRequired(true)
                .setMinValue(0)
                .setMaxValue(100)
        ),
    async execute(interaction) {
        const count = interaction.options.getInteger("count");
        let messages;
        if (count === 0) {
            messages = await interaction.channel.messages.fetch();
            await interaction.channel.bulkDelete(messages);
        } else {
            messages = await interaction.channel.messages.fetch({
                limit: count,
            });
            await interaction.channel.bulkDelete(messages);
        }
        await interaction.reply(`Deleted ${messages.size} messages!`);
    },
};
