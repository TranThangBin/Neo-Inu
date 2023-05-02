const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("Provides information about the user.")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("Find info of a user (blank if yourself).")
        ),
    async execute(interaction) {
        const target =
            interaction.options.getMember("user") || interaction.user;
        const joinedAt = target.joinedAt;
        await interaction.reply({
            content: `This user is ${target.user.username}, who joined on ${joinedAt}`,
            ephemeral: true,
        });
    },
};
