import { AttachmentBuilder } from "discord.js";
import path from "path";

const url = "https://dog.ceo/api/breeds/image/random";

export default async () => {
    const response = await fetch(url);
    if (!response.ok)
        return new AttachmentBuilder(
            path.join(
                __dirname,
                "..",
                "..",
                "images",
                "error-image-photo-icon.png"
            )
        );
    const data = await response.json();
    return new AttachmentBuilder(data.message);
};
