// const ytdl = require("ytdl-core");
// const fs = require("fs");
// const _dirproj = require("../../utils/_dirproj");

// async function download(url, author, title) {

//     const now = new Date();
//     const timestamps = Math.round(now.getTime() / 1000);
//     console.log(`> il video verrà scaricato nel file ${title}-${author}-${timestamps}.mp4 che verrà inserito in ${_dirproj}/output/video`);
//     const filepath = `${_dirproj}/output/video/${title}-${author}-${timestamps}.mp4`;

//     console.log("> download del video in corso...");

//     ytdl(url, { filter: "audioandvideo", quality: "highestaudio", format: "mp4" })
//     .pipe(fs.createWriteStream(filepath))
//     .on(("error"), (err) => {
//         console.log("> errore durante il download del video", err);
//         return;
//     })
//     .on("finish", () => {
//         console.log(`> download di ${title}-${author}-${timestamps}.mp4 completato!`);
//         videocheck = true;
//         return filepath;
//     });
// }

// module.exports = download;


const ytdl = require("ytdl-core");
const fs = require("fs");
const _dirproj = require("../../utils/_dirproj");

function download(url, author, title) {

    return new Promise((resolve, reject) => {
        const now = new Date();
        const timestamps = Math.round(now.getTime() / 1000);
        const filepath = `${_dirproj}/output/video/${title}-${author}-${timestamps}.mp4`;
        
        console.log(`> il video verrà scaricato in ${_dirproj}/output/video`);
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
