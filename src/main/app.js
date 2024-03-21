const getInfos = require("../functions/getInfos");
const download = require("../functions/download");
const converToAudio = require("../functions/convertToAudio");

getInfos()
.then((res) => {
    download(res.url, res.author, res.title)
    .then((videopath) => {
        converToAudio(videopath);
    })
})
.catch((err) => {
    console.log(err);
});