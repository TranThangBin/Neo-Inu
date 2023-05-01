const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
const language = JSON.parse(process.env.LANGUAGE);
let languageOptions = "";
for (const [key, value] of Object.entries(language))
    languageOptions += `${key}: ${value}\n`;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("translate-help")
        .setDescription(`Show language option for \`/translate\`.`),
    async execute(interaction) {
        await interaction.reply({ content: languageOptions, ephemeral: true });
    },
};
