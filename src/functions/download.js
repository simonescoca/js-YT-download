const ytdl = require("ytdl-core");
const fs = require("fs");
const os = require("os");
const progressBar = require("progress");

function download(url, author, title) {

    return new Promise((resolve, reject) => {
        const now = new Date();
        const timestamps = Math.round(now.getTime() / 1000);
        const filepath = `${os.homedir()}/Downloads/${title}-${author}-${timestamps}.mp4`;
        const videoStream = ytdl(url, { filter: "audioandvideo", quality: "highestaudio", format: "mp4" });

        let bar;
        videoStream.on('response', (res) => {
            const totalSize = res.headers['content-length'];
            bar = new progressBar('> download del video in corso... [:bar] :percent :etas', {
                width: 40,
                complete: '=',
                incomplete: ' ',
                renderThrottle: 100,
                total: parseInt(totalSize)
            });
        });

        videoStream.on('data', (chunk) => {
            bar.tick(chunk.length);
        });

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