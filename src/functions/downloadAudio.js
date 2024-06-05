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
            if(err.message === "Cannot find ffmpeg") {
                console.log("> prima di procedere devi installare FFmpeg");
                if(os.type() === "Darwin") {
                    console.log("> stai usando macOS, installa Homebrew seguendo i passaggi sul sito ufficiale brew.sh/it");
                    console.log("> se hai già installato Homebrew, apri il terminale ed esegui questo comando per installare FFmpeg: 'brew install ffmpeg', poi rilancia l'app");
                } else if(os.type() === "Windows_NT") {
                    console.log("> stai usando Windows, installa FFmpeg seguendo le indicazioni sul sito ufficiale ffmpeg.org, poi rilancia l'app");
                }
            } else {
                console.error("> errore durante la conversione in audio", err.message);
            }
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