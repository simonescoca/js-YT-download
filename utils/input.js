const input = require("input");
/**
    This async customInput is a valid sideway to node's readline module, example of how it works:

    const input = require("./input");

    input("What's your name? : ")
        .then((name) => {
            console.log(`Your name is ${name}`);
        })
        .catch((err) => {
            console.log(err);
        });

    * @param {string} quest prompt to user
    * @returns {*} the user input value
*/
async function customInput(quest) {
    return await input.text(quest);
}

module.exports = customInput;