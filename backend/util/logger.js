const morgan = require("morgan"),
    chalk = require("chalk");

/**
 * Logs the HTTP request into standard out with styling!
 */
module.exports = morgan((tokens, req, res) => {
    const status = tokens.status(req, res);
    return (
        [
            chalk.green.bold(tokens.method(req, res)),
            getStatusEmoji(status),
            chalk.red.bold(status),
            chalk.white(tokens.url(req, res)),
            chalk.yellow(tokens["response-time"](req, res) + " ms"),
        ].join(" ") + "\n"
    );
});

/**
 * Generates an emoji to fit the status code
 * @param code status code
 *  @returns emoji
 */
const getStatusEmoji = (code) => {
    return code >= 500
        ? "⚠️"
        : code >= 400
        ? "❌"
        : code >= 300
        ? "🟡"
        : code >= 200
        ? "✔️ "
        : "🟦";
};
