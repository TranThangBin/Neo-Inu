"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dog_images_js_1 = __importDefault(require("../../external_apis/dog-images.js"));
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("dog")
        .setDescription("Get a random image of a doggo.")
        .addBooleanOption((option) => option
        .setName("public")
        .setDescription("Do you want this image to be public?")),
    async execute(interaction) {
        const publicStatus = !interaction.options.get("public")
            ?.value;
        await interaction.deferReply({ ephemeral: publicStatus });
        const image = await (0, dog_images_js_1.default)();
        await interaction.editReply({
            files: [image],
        });
    },
};
