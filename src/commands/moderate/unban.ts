import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    CommandInteraction,
    User,
} from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Select a member to unban them.")
        .addUserOption((option) =>
            option
                .setName("target")
                .setDescription("The member to unban.")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),
    async execute(interaction: CommandInteraction) {
        const target = interaction.options.getUser("target") as User;
        const banList = await interaction.guild?.bans.fetch();
        if (!banList?.has(target.id)) {
            await interaction.reply({
                content: `${target?.username} is not banned or not exist.`,
                ephemeral: true,
            });
            return;
        }
        await interaction.guild?.members.unban(target);
        await interaction.reply({
            content: `Welcome back to sociaty ${target?.username}.`,
        });
    },
};
