import { BankEventEmitter } from '../events'
import { ILogger } from '../interfaces'

export const initListeners = (logger : ILogger) => {
  BankEventEmitter.on('accountCreation', (account) => {
    logger.log(`Account created. Account id: ${account.id}`)
  })

  BankEventEmitter.on('deposit', (transaction) => {
    logger.log(`New deposit. Transaction id: ${transaction.id}`)
  })

  BankEventEmitter.on('withdrawal', (transaction) => {
    logger.log(`New withdrawal. Transaction id: ${transaction.id}`)
  })

  BankEventEmitter.on('transferCompleted', (transaction) => {
    logger.log(`Transfer transaction completed. Transaction id: ${transaction.id}`)
  })

  BankEventEmitter.on('transferFailed', (transaction) => {
    logger.error(`Transfer transaction failed. Transaction id: ${transaction.id}`)
  })

}