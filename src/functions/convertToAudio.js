// const ffmpeg = require("fluent-ffmpeg");
// const os = require("os");
// const progressBar = require("progress");

// function convertToAudio(videopath) {

//     let filename = videopath.split("/");
//     filename = filename[filename.length - 1].replace(".mp4", "");
 
//     const proc = ffmpeg(videopath)
//         .output(`${os.homedir()}/Downloads/${filename}.mp3`)
//         .on("error", (err) => console.error("> errore durante la conversione a file.mp3", err))
//         .on("end", () => console.log(`> conversione completata!\n> trovi i files in ${os.homedir()}/Downloads`));

//     // Initialize progress bar
//     const bar = new progressBar('> conversione a file audio in corso... [:bar] :percent :etas', {
//         width: 40,
//         complete: '=',
//         incomplete: ' ',
//         renderThrottle: 100,
//         total: 100  // Set total to 100 to represent percentage
//     });

//     proc.on('progress', (progress) => {
//         bar.update(progress.percent / 100);
//     });

//     proc.run();
// }

// module.exports = convertToAudio;

const ffmpeg = require("fluent-ffmpeg");
const os = require("os");
const ProgressBar = require("progress");

function convertToAudio(videopath) {

    let filename = videopath.split("/");
    filename = filename[filename.length - 1].replace(".mp4", "");
 
    const proc = ffmpeg(videopath)
        .output(`${os.homedir()}/Downloads/${filename}.mp3`)
        .on("error", (err) => console.error("> errore durante la conversione a file.mp3", err))
        .on("end", () => {
            bar.update(1); // Force the progress bar to complete
            console.log(`> conversione completata!\n> trovi i tuoi files in ${os.homedir()}/Downloads`);
        });

    // Initialize progress bar
    const bar = new ProgressBar('> conversione a file audio in corso... [:bar] :percent :etas', {
        width: 40,
        complete: '=',
        incomplete: ' ',
        renderThrottle: 100,
        total: 100  // Set total to 100 to represent percentage
    });

    proc.on('progress', (progress) => {
        bar.update(progress.percent / 100);
    });

    proc.run();
}

module.exports = convertToAudio;