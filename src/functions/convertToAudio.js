const ffmpeg = require("fluent-ffmpeg");
const os = require("os");

function convertToAudio(videopath) {

    let filename = videopath.split("/");
    filename = filename[filename.length - 1].replace(".mp4", "");

    console.log(`> conversione a file audio in corso...`);
 
    ffmpeg(videopath)
    .output(`${os.homedir}/Downloads/${filename}.mp3`)
    .on("error", (err) => console.error("> errore durante la conversione a file.mp3", err))
    .on("end", () => console.log(`> conversione completata!\n> trovi il tuo file.mp3 in ${os.homedir}/Downloads`))
    .run();
}

module.exports = convertToAudio;