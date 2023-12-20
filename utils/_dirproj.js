const _dirproj = (__dirname.replace("/utils" , ""));

/**
 * per creare un'app eseguibile con pkg non puoi usare __dirname, perché le azioni sui file system sono relegate all'ambiente dello snapshot
 */
// const path = require("path");
// const _dirproj = (path.dirname(process.execPath).replace("/utils" , ""));

module.exports = _dirproj;