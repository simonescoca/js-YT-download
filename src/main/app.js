const getInfos = require("../functions/getInfos");
const downloadVideo = require("../functions/downloadVideo");
const downloadAudio = require("../functions/downloadAudio");


getInfos()
.then((infos) => {
    if(infos.fullVideo) downloadVideo(infos.url, infos.author, infos.title);
    else downloadAudio(infos.url, infos.author, infos.title);
})
.catch((err) => {
    console.log(err);
});