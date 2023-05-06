import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    CommandInteraction,
    User,
} from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Select a member to ban them.")
        .addUserOption((option) =>
            option
                .setName("target")
                .setDescription("The member to ban.")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option.setName("reason").setDescription("Reason for banning.")
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),
    async execute(interaction: CommandInteraction) {
        const target = interaction.options.getUser("target") as User;
        const reason =
            (interaction.options.get("reason")?.value as string) ??
            "No reason provided";
        try {
            await interaction.guild?.members.fetch(target);
            await interaction.guild?.members.ban("target");
            await interaction.reply({
                content: `Banning ${target?.username} for reason: ${reason}.`,
            });
        } catch {
            await interaction.reply({
                content: `${target.username} is not a member of this server.`,
                ephemeral: true,
            });
        }
    },
};
