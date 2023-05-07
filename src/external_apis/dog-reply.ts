import { AttachmentBuilder } from "discord.js";
import errorImagePath from "./error-image-path.js";

const url = "https://dog.ceo/api/breeds/image/random";

export default async () => {
    const response = await fetch(url);
    if (!response.ok) return { files: [new AttachmentBuilder(errorImagePath)] };
    const data = await response.json();
    return { files: [new AttachmentBuilder(data.message)] };
};