const ytdl = require("ytdl-core");
const fs = require("fs");
const ffmpeg = require('fluent-ffmpeg');
const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('YT Download Video - Inserisci l\'URL > ', (YTvideoURL) => {
        
    if (YTvideoURL.startsWith("https://www.youtube.com/watch")) {
        downloadVideo(YTvideoURL);

    } else console.log("URL non valido")

    rl.close();
});

function downloadVideo(YTvideoURL) {
    console.log("> download del video in corso...")
    const videoFilePath = "video.mp4";
    ytdl(YTvideoURL, { filter: "audioandvideo", quality: "highestaudio", format: "mp4" })
        .pipe(fs.createWriteStream(videoFilePath))
        .on(("error"), (err) => {
            console.log("errore durante il download del video: " + err);
            return
        })
        .on("finish", () => {
            console.log("> download video.mp4 completato")
            convertToAudio(YTvideoURL, videoFilePath);
        });
}

async function convertToAudio(YTvideoURL, videoFilePath) {
    console.log("> conversione a file audio.mp3 in corso...")
    let titolo = "";
    let autore = "";

    await ytdl.getInfo(YTvideoURL).then((info) => {
        console.log("> recupero titolo e autore del video...")
        titolo = info.videoDetails.title;
        autore = info.videoDetails.author.name;
    });

    ffmpeg(videoFilePath)
        .output(`${titolo + " - " + autore}.mp3`)
        .on('end', () => {
            fs.unlink(videoFilePath, (err) => {
                if (err) {
                    console.error('Errore durante l\'eliminazione del file video: ' + err);
                    return;
                }
            });
        })
        .on('error', (err) => console.error('Errore durante la conversione a file.mp3: ' + err))
        .on("end", () => console.log("> conversione completata"))
        .run();
}