import { Transaction } from '../models'

export type BankEventMap = {
  depostit: Transaction
  withdrawal: Transaction
  transferComplete: Transaction
}