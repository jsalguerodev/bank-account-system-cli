
import { AccountStatus } from '../types'

export interface IAccount {
  id: string;
  owner: string
  type: 'checking' | 'savings' | 'investment'
  getBalance(): number
  getStatus():AccountStatus
  canWithdraw(amount : number) : boolean
  canTransfer(amount: number): boolean
  deposit(amount: number): void
  withdraw(amount: number): void
  close(): void
}