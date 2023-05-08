"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const error_reply_js_1 = __importDefault(require("./error-reply.js"));
let url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=";
exports.default = async (cardName) => {
    const response = await fetch(url + cardName);
    if (!response.ok)
        return error_reply_js_1.default;
    const data = await response.json();
    const firstFound = data.data[0];
    const firstImage = firstFound.card_images[0];
    const replyContent = [
        "```",
        `Id          : ${firstFound.id}`,
        `Name        : ${firstFound.name}`,
        `Type        : ${firstFound.type}`,
        `Race        : ${firstFound.race}`,
    ];
    if (firstFound.attribute)
        replyContent.push(`Attribute   : ${firstFound.attribute}`);
    if (firstFound.level)
        replyContent.push((firstFound.type === "XYZ Monster" ? "Rank " : "Level") +
            `       : ${firstFound.level}`);
    if (firstFound.atk)
        replyContent.push(`Stats       : ATK/${firstFound.atk} ` +
            (firstFound.type === "Link Monster"
                ? `LINK-${firstFound.linkval}`
                : `DEF/${firstFound.def}`));
    if (firstFound.scale)
        replyContent.push(`Scale       : ${firstFound.scale}`);
    if (firstFound.linkmarkers)
        replyContent.push(`Link markers: ${firstFound.linkmarkers}`);
    replyContent.push(`Archetype   : ${firstFound.archetype ?? "No archetype available yet"}`, `Description :\n${firstFound.desc}`, "```");
    return {
        content: replyContent.join("\n"),
        files: [new discord_js_1.AttachmentBuilder(firstImage.image_url)],
    };
};
