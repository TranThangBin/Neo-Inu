"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=";
exports.default = async (cardName) => {
    const response = await fetch(url + cardName);
    // if(!response.ok)
};
