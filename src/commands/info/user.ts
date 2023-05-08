import {
    SlashCommandBuilder,
    CommandInteraction,
    GuildMember,
    AttachmentBuilder,
} from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("Provide information about a user.")
        .addUserOption((option) =>
            option
                .setName("username")
                .setDescription(
                    "Provide information about a user in the server."
                )
                .setRequired(true)
        ),
    async execute(interaction: CommandInteraction) {
        const target = interaction.options.getMember("username") as GuildMember;

        const targetAvatar = target.user.avatarURL() as string;

        if (!targetAvatar) {
            await interaction.reply({
                content: `This user is \`${target.user.username}\`, who joined on \`${target.joinedAt}\`.`,
                ephemeral: true,
            });
            return;
        }

        await interaction.reply({
            content: `This user is \`${target.user.username}\`, who joined on \`${target.joinedAt}\`.`,
            ephemeral: true,
            files: [new AttachmentBuilder(targetAvatar)],
        });
    },
};
