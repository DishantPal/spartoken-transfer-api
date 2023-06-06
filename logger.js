import winston from 'winston';

export const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'error.log', level: 'error', format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD hh:mm:ss'
        }),
        winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${typeof info.message == 'object' ? JSON.stringify(info.message) : info.message}`),
      )
    }),
    new winston.transports.File({
      filename: 'app.log', level: 'info', format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD hh:mm:ss'
        }),
        winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${typeof info.message == 'object' ? JSON.stringify(info.message) : info.message}`),
      )
    }),
  ],
});