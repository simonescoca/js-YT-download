const ytdl = require("ytdl-core");
const fs = require("fs");
const os = require("os");

function download(url, author, title) {

    return new Promise((resolve, reject) => {
        const now = new Date();
        const timestamps = Math.round(now.getTime() / 1000);
        const filepath = `${os.homedir}/Downloads/${title}-${author}-${timestamps}.mp4`;
        
        console.log(`> il video verrà scaricato in ${os.homedir}/Downloads`);
        console.log("> download del video in corso...");

        const videoStream = ytdl(url, { filter: "audioandvideo", quality: "highestaudio", format: "mp4" });
        const fileStream = fs.createWriteStream(filepath);

        videoStream.pipe(fileStream);

        fileStream.on("error", (err) => {
            console.log("> errore durante il download del video", err);
            reject(err);
        });

        fileStream.on("finish", () => {
            console.log(`> download di ${title}-${author}-${timestamps}.mp4 completato!`);
            resolve(filepath);
        });
    });

}

module.exports = download;
