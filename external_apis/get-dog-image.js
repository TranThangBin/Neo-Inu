const url = "https://dog.ceo/api/breeds/image/random";

async function getDogImage() {
    const response = await fetch(url);
    if (!response.ok) return `An Error Occurred: Error ${response.status}`;
    const data = await response.json();
    return data.message;
}

module.exports = getDogImage;
