const getInfos = require("../functions/getInfos");
const download = require("../functions/download");
const convertToAudio = require("../functions/convertToAudio");

getInfos()
.then((res) => {
    download(res.url, res.author, res.title)
    .then((videopath) => {
        convertToAudio(videopath);
    })
})
.catch((err) => {
    console.log(err);
});