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
    if (!language[sourceLang] && !language[targetLang])
        return `Source language ${sourceLang} and Target language ${targetLang} is not valid!`;
    if (!language[sourceLang])
        return `Source language ${sourceLang} is not valid!`;
    if (!language[targetLang])
        return `Target language ${targetLang} is not valid!`;
    options.body = `{
        from: "${sourceLang}",
        to: "${targetLang}",
        q: "${sourceText}",
    }`;
    const response = await fetch(url, options);
    if (!response.ok) return `An Error Occurred: Error ${response.status}`;
    const data = await response.json();
    return data[0];
}

module.exports = translate;
