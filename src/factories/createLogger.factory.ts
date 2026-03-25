import { logger } from '../plugins'
import { ILogger } from '../interfaces';

export const createLogger = (service: string): ILogger => {
  return  {
    log(message : string) {
      logger.log('info', {message, service})
    },
    error(message : string){
      logger.error({message, service})
    }
  }
}