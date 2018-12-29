const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.prettyPrint(),
                format.colorize()
            )
        })
    ]
});

module.exports = logger;