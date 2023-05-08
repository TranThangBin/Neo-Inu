"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dog_reply_js_1 = __importDefault(require("../../external_apis/dog-reply.js"));
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("dog")
        .setDescription("Get a random image of a doggo.")
        .addBooleanOption((option) => option
        .setName("public")
        .setDescription("Do you want this image to be public?")
        .setRequired(true)),
    async execute(interaction) {
        const publicStatus = !interaction.options.get("public")
            ?.value;
        await interaction.deferReply({ ephemeral: publicStatus });
        const replyDog = (await (0, dog_reply_js_1.default)());
        await interaction.editReply(replyDog);
    },
};
