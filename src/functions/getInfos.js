const input = require("../../utils/input");
const ytdl = require("ytdl-core");

async function getInfos() {
    let check = false;
    let isFullVideo = false;

    while (!check) {
        try {
            let url = await input("> YT Download - Inserisci l'URL : ");
            
            if (url.startsWith("-fv https://www.youtube.com/watch")){
                isFullVideo = true;
                url = url.slice(4);
            }
            
            const info = await ytdl.getBasicInfo(url);
            check = true;

            const infos = {
                url: url,
                author: info.videoDetails.author.name,
                title: info.videoDetails.title,
                fullVideo: isFullVideo
            };

            return infos;

        } catch (err) {
            console.log("> URL non valido", err);
        }
    }
}

module.exports = getInfos;