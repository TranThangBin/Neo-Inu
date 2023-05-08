"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const yugioh_card_js_1 = __importDefault(require("../../external_apis/yugioh-card.js"));
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("ygo-card")
        .setDescription("Find a Yu-Gi-Oh card.")
        .addStringOption((option) => option
        .setName("card-name")
        .setDescription("Provide the card name (Fuzzy search is on).")
        .setRequired(true))
        .addBooleanOption((option) => option
        .setName("public")
        .setDescription("Do you want this message to be public?")
        .setRequired(true)),
    async execute(interaction) {
        const publicStatus = !interaction.options.get("public")
            ?.value;
        await interaction.deferReply({ ephemeral: publicStatus });
        const cardName = interaction.options.get("card-name")?.value;
        const replyCard = (await (0, yugioh_card_js_1.default)(cardName));
        await interaction.editReply(replyCard);
    },
};
