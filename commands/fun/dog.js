const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const getDogImage = require("../../external_apis/get-dog-image.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dog")
        .setDescription("Send a random dog image to you.")
        .addBooleanOption((option) =>
            option
                .setName("public")
                .setDescription(
                    "Do you want this respond to be public (Private by default)."
                )
        ),
    async execute(interaction) {
        const public = !interaction.options.getBoolean("public");
        const imageUrl = await getDogImage();
        const image = new AttachmentBuilder(imageUrl);
        await interaction.reply({ files: [image], ephemeral: public });
    },
};
