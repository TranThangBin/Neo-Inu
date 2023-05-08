"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const yugioh_banlist_js_1 = __importDefault(require("../../external_apis/yugioh-banlist.js"));
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("ygo-banlist")
        .setDescription("Get Yu-Gi-Oh banlist from a format.")
        .addStringOption((option) => option
        .setName("format")
        .setDescription("The format of the banlist.")
        .addChoices({ name: "TCG Format", value: "tcg" }, { name: "OCG Format", value: "ocg" }, { name: "GOAT Format", value: "goat" })
        .setRequired(true))
        .addStringOption((option) => option
        .setName("status")
        .setDescription("The forbidden status.")
        .addChoices({ name: "Banned", value: "Banned" }, { name: "Limited", value: "Limited" }, { name: "Semi-Limited", value: "Semi-Limited" })
        .setRequired(true))
        .addNumberOption((option) => option
        .setName("page")
        .setDescription("Specify the page of the list you want to see.")
        .setMinValue(1)
        .setRequired(true))
        .addBooleanOption((option) => option
        .setName("public")
        .setDescription("Do you want this message to be public?")
        .setRequired(true)),
    async execute(interaction) {
        const publicStatus = !interaction.options.get("public")
            ?.value;
        await interaction.deferReply({ ephemeral: publicStatus });
        const format = interaction.options.get("format")?.value;
        const status = interaction.options.get("status")?.value;
        const page = interaction.options.get("page")?.value;
        const replyBanlist = (await (0, yugioh_banlist_js_1.default)(format, status, page));
        await interaction.editReply(replyBanlist);
    },
};
