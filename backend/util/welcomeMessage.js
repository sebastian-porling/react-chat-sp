const figlet = require("figlet"),
    clear = require("clear"),
    chalk = require("chalk"),
    internalIp = require("internal-ip");

/**
 * Displays a welcome message
 */
module.exports.display = (port) => {
    try {
        clear();
        console.log(chalk.greenBright(figlet.textSync("socketIO ")));
        console.log(chalk.cyan(figlet.textSync("chat")));
        console.log(
            chalk.magenta("\n A socket.io chat application utilizing firebase!")
        );
        console.log(
            chalk.yellowBright(
                `\n     Server on: http://${internalIp.v4.sync()}:${port}`
            )
        );
        console.log(chalk.redBright(`\t or on: http://localhost:${port}\n`));
    } catch (error) {
        console.log("socket.io chat");
    }
};
