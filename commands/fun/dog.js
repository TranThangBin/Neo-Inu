const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const getDogImage = require("../../external_apis/get-dog-image.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dog")
        .setDescription("Send a random dog image to you."),
    async execute(interaction) {
        const imageUrl = await getDogImage();
        const image = new AttachmentBuilder(imageUrl);
        await interaction.reply({ files: [image], ephemeral: true });
    },
};
