import {
    SlashCommandBuilder,
    CommandInteraction,
    GuildMember,
} from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("Provide information about a user.")
        .addUserOption((option) =>
            option
                .setName("username")
                .setDescription(
                    "Provide information about a user in the server (blank if yourself)."
                )
        ),
    async execute(interaction: CommandInteraction) {
        const target =
            (interaction.options.getMember("name") as GuildMember) ||
            (interaction.member as GuildMember);

        await interaction.reply({
            content: `This user is \`${target.user.username}\`, who joined on \`${target.joinedAt}\`.`,
            ephemeral: true,
        });
    },
};
