import {
    SlashCommandBuilder,
    CommandInteraction,
    InteractionEditReplyOptions,
} from "discord.js";
import getYgoBanlist from "../../external_apis/yugioh-banlist.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ygo-banlist")
        .setDescription("Get Yu-Gi-Oh banlist from a format.")
        .addStringOption((option) =>
            option
                .setName("format")
                .setDescription("The format of the banlist.")
                .addChoices(
                    { name: "TCG Format", value: "tcg" },
                    { name: "OCG Format", value: "ocg" },
                    { name: "GOAT Format", value: "goat" }
                )
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("status")
                .setDescription("The forbidden status.")
                .addChoices(
                    { name: "Banned", value: "Banned" },
                    { name: "Limited", value: "Limited" },
                    { name: "Semi-Limited", value: "Semi-Limited" }
                )
                .setRequired(true)
        )
        .addNumberOption((option) =>
            option
                .setName("page")
                .setDescription("Specify the page of the list you want to see.")
                .setMinValue(1)
                .setRequired(true)
        )
        .addBooleanOption((option) =>
            option
                .setName("public")
                .setDescription("Do you want this message to be public?")
                .setRequired(true)
        ),
    async execute(interaction: CommandInteraction) {
        const publicStatus = !interaction.options.get("public")
            ?.value as boolean;
        await interaction.deferReply({ ephemeral: publicStatus });
        const format = interaction.options.get("format")?.value as string;
        const status = interaction.options.get("status")?.value as string;
        const page = interaction.options.get("page")?.value as number;
        const replyBanlist = (await getYgoBanlist(
            format,
            status,
            page
        )) as InteractionEditReplyOptions;
        await interaction.editReply(replyBanlist);
    },
};
