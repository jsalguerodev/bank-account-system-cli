import { Result } from '../types'
import { ITransaction } from './ITransaction.interface'
import { BaseAccount } from '../models'


export interface IBankService {
  createAccount(owner: string, type: BaseAccount["type"], initialDeposit: number): Result<BaseAccount>
  deposit(accountId: string, amount: number): Promise< Result<ITransaction> >
  withdraw(accountId: string, amount: number): Promise< Result<ITransaction> >
  transfer(issuerAccountId: string, recipientAccountId: string, amount: number): Promise < Result<ITransaction> >
  getStatement(accountId: string): Result<ITransaction[]>
  getBalance(accountId: string): Result<number>;
}