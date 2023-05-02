const dotenv = require("dotenv");
dotenv.config();
const language = JSON.parse(process.env.LANGUAGE);
const url = "https://rapid-translate-multi-traduction.p.rapidapi.com/t";
const apiKey = process.env.TRANSLATION_KEY;
const options = {
    method: "POST",
    headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "rapid-translate-multi-traduction.p.rapidapi.com",
    },
    body: "",
};

async function translate(sourceLang, targetLang, sourceText) {
    const languageErrorEnd =
        "is not valid use `/translate-help` for more informations!";
    let invalidLangs = [];
    if (!language[sourceLang])
        invalidLangs.push(`Source language ${sourceLang}`);
    if (!language[targetLang])
        invalidLangs.push(`Target language ${targetLang}`);
    if (invalidLangs.length > 0)
        return `${invalidLangs.join(" and ")} ${languageErrorEnd}`;
    options.body = `{
        from: "${sourceLang}",
        to: "${targetLang}",
        q: "${sourceText}",
    }`;
    const response = await fetch(url, options);
    if (response.status === 400)
        return "Translation is not available right now!";
    if (!response.ok) return `An Error Occurred: Error ${response.status}!`;
    const data = await response.json();
    return data[0];
}

module.exports = translate;
