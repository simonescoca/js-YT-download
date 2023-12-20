const input = require("../../utils/input");
const ytdl = require("ytdl-core");

async function getInfos() {
    let check = false;

    while (!check) {
        try {
            const url = await input("> YT Download Video - Inserisci l'URL : ");

            if (url.startsWith("https://www.youtube.com/watch")) {
                const info = await ytdl.getBasicInfo(url);
                check = true;

                const infos = {
                    url: url,
                    author: info.videoDetails.author.name,
                    title: info.videoDetails.title
                };

                return infos;

            } else {
                console.log("> URL non valido");
            }
        } catch (err) {
            console.log("> URL non valido", err);
        }
    }
}

module.exports = getInfos;