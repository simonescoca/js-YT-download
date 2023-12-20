const ytdl = require("ytdl-core");
const fs = require("fs");
const _dirproj = require("../../utils/_dirproj");

async function download(url, author, title) {

    const now = new Date();
    const timestamps = Math.round(now.getTime() / 1000);
    console.log(`> il video verrà scaricato nel file ${title}-${author}-${timestamps}.mp4 che verrà inserito in ${_dirproj}/output/video`);
    const filepath = `${_dirproj}/output/video/${title}-${author}-${timestamps}.mp4`;

    console.log("> download del video in corso...");
    
    let videocheck = false;

    ytdl(url, { filter: "audioandvideo", quality: "highestaudio", format: "mp4" })
    .pipe(fs.createWriteStream(filepath))
    .on(("error"), (err) => {
        console.log("> errore durante il download del video", err);
        return;
    })
    .on("finish", () => {
        console.log(`> download di ${title}-${author}-${timestamps}.mp4 completato!`);
        videocheck = true;
        return filepath;
    });

    while(!videocheck) {
        console.log(".");
    }
}

module.exports = download;