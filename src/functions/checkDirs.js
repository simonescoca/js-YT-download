const fs = require("fs");
const _dirproj = require("../../utils/_dirproj");

function checkDirs() {
    if(!fs.existsSync(`${_dirproj}/output`)) {
        fs.mkdirSync(`${_dirproj}/output`);
        fs.mkdirSync(`${_dirproj}/output/video`);
        fs.mkdirSync(`${_dirproj}/output/audio`);

    } else {
        if(!fs.existsSync(`${_dirproj}/output/video`)) {
            fs.mkdirSync(`${_dirproj}/output/video`);
        }

        if(!fs.existsSync(`${_dirproj}/output/audio`)) {
            fs.mkdirSync(`${_dirproj}/output/audio`);
        }
    }
}

module.exports = checkDirs;