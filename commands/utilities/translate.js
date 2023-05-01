const { SlashCommandBuilder } = require("discord.js");
const translate = require("../../external_apis/translation.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("translate")
        .setDescription("Translate text from one language to another")
        .addStringOption((option) =>
            option
                .setName("sourcelang")
                .setDescription("The source language")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("targetlang")
                .setDescription("The target language")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("sourcetext")
                .setDescription("The text to translate")
                .setRequired(true)
        ),
    async execute(interaction) {
        const sourceLang = interaction.options.getString("sourcelang");
        const targetLang = interaction.options.getString("targetlang");
        const sourceText = interaction.options.getString("sourcetext");

        const translation = await translate(sourceLang, targetLang, sourceText);
        await interaction.reply(translation);
    },
};
