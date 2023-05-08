import errorReply from "./error-reply.js";

let url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=";

export default async (format: string, status: string, page: number) => {
    const response = await fetch(url + format);
    if (!response.ok) return errorReply;
    const data = await response.json();

    const banlistData = data.data;
    const banlist = [`**${status}: Page/${page}**`, "```"];

    const cardPerPage = 30;
    const startIndex = cardPerPage * (page - 1);
    const endIndex = cardPerPage * page;

    for (let i = startIndex; i < endIndex; i++) {
        const currentCard = banlistData[i];
        if (!currentCard) continue;
        const forbiddenStatus = currentCard.banlist_info[`ban_${format}`];
        const cardName = currentCard.name;
        if (forbiddenStatus === status) banlist.push(cardName);
    }

    if (banlist.length === 2)
        return { content: "```\nThis page have no content.\n```" };

    banlist.push("```");

    if (!banlistData[endIndex + 1])
        banlist.push("**This is the end of the list.**");

    return { content: banlist.join("\n") };
};
