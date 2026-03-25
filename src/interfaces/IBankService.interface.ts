import { Result } from '../types'
import { BaseAccount, Transaction } from '../models'


export interface IBankService {
  createAccount(owner: string, type: BaseAccount["type"], initialDeposit: number): Result<BaseAccount>
  deposit(accountId: string, amount: number): Promise< Result<Transaction> >
  withdraw(accountId: string, amount: number): Promise< Result<Transaction> >
  transfer(issuerAccountId: string, recipientAccountId: string, amount: number): Promise < Result<Transaction> >
  getStatement(accountId: string): Result<Transaction[]>
  getBalance(accountId: string): Result<number>
  getAllAccounts(): Result<BaseAccount[]>
  getAllTransactions(): Result<Transaction[]>
}