import winston, { format } from 'winston'
const { combine, timestamp, json } = format

export const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// logger.add(new winston.transports.Console({
//   format: winston.format.simple(),
// }));