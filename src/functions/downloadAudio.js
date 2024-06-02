const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const os = require("os");
const progressBar = require("progress");

/**
 * Downloads audio from a YouTube video at the highest quality available.
 * @param {string} url - The URL of the YouTube video.
 * @param {string} author - The video's author.
 * @param {string} title - The video's title.
 */
function downloadAudio(url, author, title) {

    const filepath = `${os.homedir()}/Downloads/${title}-${author}.mp3`;
    const audiostream = ytdl(url, {
        filter: "audioonly",
        format: "mp3",
        quality: "highestaudio"
    });

    ffmpeg(audiostream)
        .audioBitrate(128)
        .save(filepath)
        .on("end", () => {
            console.log(`> download di ${title}-${author}.mp3 completato :) trovi il file in ${os.homedir()}/Downloads`);
        })
        .on("error", (err) => {
            console.error("> errore durante il download dell'audio", err);
        });

    let bar;
    audiostream.on("response", (res) => {
        const totalSize = res.headers["content-length"];
        bar = new progressBar("> download dell'audio in corso...  :etas [:bar] :percent", {
            width: 40,
            complete: "=",
            incomplete: " ",
            renderThrottle: 100,
            total: parseInt(totalSize)
        });
    });

    audiostream.on("data", (chunk) => {
        bar.tick(chunk.length);
    });
}

module.exports = downloadAudio;