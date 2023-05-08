import {
    SlashCommandBuilder,
    CommandInteraction,
    InteractionEditReplyOptions,
} from "discord.js";
import getYgoCard from "../../external_apis/yugiohdb.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ygo-card")
        .setDescription("Find a Yu-Gi-Oh card.")
        .addStringOption((option) =>
            option
                .setName("card-name")
                .setDescription("Provide the card name (Fuzzy search is on).")
                .setRequired(true)
        )
        .addBooleanOption((option) =>
            option
                .setName("public")
                .setDescription("Do you want this image to be public?")
                .setRequired(true)
        ),
    async execute(interaction: CommandInteraction) {
        const publicStatus = !interaction.options.get("public")
            ?.value as boolean;
        await interaction.deferReply({ ephemeral: publicStatus });
        const cardName = interaction.options.get("card-name")?.value as string;
        const replyCard = (await getYgoCard(
            cardName
        )) as InteractionEditReplyOptions;
        await interaction.editReply(replyCard);
    },
};
