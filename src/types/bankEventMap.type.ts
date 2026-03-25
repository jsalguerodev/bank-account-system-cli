import { BaseAccount, Transaction } from '../models'

export type BankEventMap = {
  deposit: Transaction
  accountCreation: BaseAccount
  withdrawal: Transaction
  transferCompleted: Transaction
  transferFailed: Transaction
}