import { AttachmentBuilder } from "discord.js";
import errorReply from "./error-reply.js";

const url = "https://dog.ceo/api/breeds/image/random";

export default async () => {
    const response = await fetch(url);
    if (!response.ok) return errorReply;
    const data = await response.json();
    return { files: [new AttachmentBuilder(data.message)] };
};
