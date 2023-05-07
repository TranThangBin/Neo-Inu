import { AttachmentBuilder } from "discord.js";
import errorImagePath from "./error-image-path.js";

let url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=";

export default async (cardName: string) => {
    const response =await fetch(url + cardName);
    // if(!response.ok)
};
