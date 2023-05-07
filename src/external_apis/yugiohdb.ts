import { AttachmentBuilder } from "discord.js";
import errorReply from "./error-reply.js";

let url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=";

export default async (cardName: string) => {
    const response = await fetch(url + cardName);
    if (!response.ok) return errorReply;
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
        replyContent.push(
            (firstFound.type === "XYZ Monster" ? "Rank " : "Level") +
                `       : ${firstFound.level}`
        );
    if (firstFound.atk)
        replyContent.push(
            `Stats       : ATK/${firstFound.atk} ` +
                (firstFound.type === "Link Monster"
                    ? `LINK-${firstFound.linkval}`
                    : `DEF/${firstFound.def}`)
        );
    if (firstFound.scale)
        replyContent.push(`Scale       : ${firstFound.scale}`);
    if (firstFound.linkmarkers)
        replyContent.push(`Link markers: ${firstFound.linkmarkers}`);

    replyContent.push(
        `Archetype   : ${firstFound.archetype ?? "No archetype available yet"}`,
        `Description : ${firstFound.desc}`,
        "```"
    );

    return {
        content: replyContent.join("\n"),
        files: [new AttachmentBuilder(firstImage.image_url)],
    };
};
