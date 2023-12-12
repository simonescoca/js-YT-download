const input = require("input");
/**
    This async cInput is a valid sideway to node's readline module, example of how it works:

    const cInput = require("./c-input");

    cInput("What's your name?")
        .then((name) => {
            console.log(`Your name is ${name}`)
        })
        .catch((err) => {
            console.log(err.message)
        });

    * @param {string} quest prompt to user
    * @returns {*} the user input value
*/
async function cInput(quest) {
    return await input.text(`${quest} >`);
}

module.exports = cInput;