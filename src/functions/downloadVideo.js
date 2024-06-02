const ytdl = require("ytdl-core");
const fs = require("fs");
const os = require("os");
const progressBar = require("progress");

/**
 * Downloads a YouTube video at the highest quality available.
 * @param {string} url - The URL of the YouTube video.
 * @param {string} author - The video's author.
 * @param {string} title - The video's title.
 */
function downloadVideo(url, author, title) {
    return new Promise((resolve, reject) => {

        const filepath = `${os.homedir()}/Downloads/${title}-${author}.mp4`;
        const videostream = ytdl(url, {
            filter: "audioandvideo",
            format: "mp4",
            quality: "highestvideo"
        });

        let bar;
        videostream.on("response", (res) => {
            const totalSize = res.headers["content-length"];
            bar = new progressBar("> download del video in corso... :etas [:bar] :percent", {
                width: 40,
                complete: "=",
                incomplete: " ",
                renderThrottle: 100,
                total: parseInt(totalSize)
            });
        });

        videostream.on("data", (chunk) => {
            bar.tick(chunk.length);
        });

        const fileStream = fs.createWriteStream(filepath);
        videostream.pipe(fileStream);

        fileStream.on("error", (err) => {
            console.log("> errore durante il download del video", err);
            reject(err);
        });

        fileStream.on("finish", () => {
            console.log(`> download di ${title}-${author}.mp4 completato :) trovi il file in ${os.homedir()}/Downloads`);
            resolve(filepath);
        });
        
    });
}

module.exports = downloadVideo;