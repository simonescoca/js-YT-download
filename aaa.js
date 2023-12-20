// checkDirs()
// getInfos()
// download()
// converToAudio()

const checkDirs = require("./src/functions/checkDirs");
const getInfos = require("./src/functions/getInfos");
const download = require("./src/functions/download");
const converToAudio = require("./src/functions/convertToAudio");

checkDirs();

getInfos()
.then((res) => {
    download(res.url, res.author, res.title);
})
.then((videopath) => {
    converToAudio(videopath);
})
.catch((err) => {
    console.log(err);
});