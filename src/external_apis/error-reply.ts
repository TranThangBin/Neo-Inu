import { AttachmentBuilder } from "discord.js";
import path from "path";

const errorImagePath = path.join(
    __dirname,
    "..",
    "..",
    "images",
    "error-image-photo-icon.png"
);

export default {
    content: "An error occurred!",
    files: [new AttachmentBuilder(errorImagePath)],
};
