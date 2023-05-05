import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import getImage from "../../external_apis/dog-images.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dog")
        .setDescription("Get a random image of a doggo.")
        .addBooleanOption((option) =>
            option
                .setName("public")
                .setDescription("Do you want this image to be public?")
        ),
    async execute(interaction: CommandInteraction) {
        const publicStatus = !interaction.options.get("public")
            ?.value as boolean;
        await interaction.deferReply({ ephemeral: publicStatus });
        const image = await getImage();
        await interaction.editReply({
            files: [image],
        });
    },
};
