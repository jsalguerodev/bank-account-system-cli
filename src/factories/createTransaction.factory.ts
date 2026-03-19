import { transactionOptions } from '../types'
import { Transaction } from '../models'
import { getNewId } from '../plugins'

const buildDescription  =  (options: transactionOptions): string =>{
  switch (options.type){
    case 'deposit':
      return `Deposit of ${options.amount} to account ${options.recipientAccountId}`
    case 'withdrawal':
      return `Withdrawal of ${options.amount} from account ${options.issuerAccountId}`
    case 'transfer':
      return `Transfer of ${options.amount} from account ${options.issuerAccountId} to account ${options.recipientAccountId}`
  }
}

export const createTransaction = (options: transactionOptions):
  Transaction => new Transaction(getNewId(), {...options, description: buildDescription(options)})
