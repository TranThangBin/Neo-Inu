import {
    SlashCommandBuilder,
    CommandInteraction,
    InteractionEditReplyOptions,
} from "discord.js";
import getDog from "../../external_apis/dog-reply.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dog")
        .setDescription("Get a random image of a doggo.")
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
        const replyDog = (await getDog()) as InteractionEditReplyOptions;
        await interaction.editReply(replyDog);
    },
};
