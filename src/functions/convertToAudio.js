const _dirproj = require("../../utils/_dirproj");
const ffmpeg = require("fluent-ffmpeg");

function convertToAudio(videopath) {

    let filename = videopath.split("/");
    filename = filename[filename.length - 1].replace(".mp4", "");

    console.log(`> conversione a file audio in corso...`);
 
    ffmpeg(videopath)
    .output(`${_dirproj}/output/audio/${filename}.mp3`)
    .on("error", (err) => console.error("> errore durante la conversione a file.mp3", err))
    .on("end", () => console.log(`> conversione completata!\n> trovi il tuo file.mp3 in ${_dirproj}/output/audio`))
    .run();
}

module.exports = convertToAudio;