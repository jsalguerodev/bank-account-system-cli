
import { accountStatus } from '../types'

export interface IAccount {
  id: string;
  owner: string
  type: 'checking' | 'savings' | 'investment'
  getBalance(): number
  getStatus():accountStatus
  canWithdraw(amount : number) : boolean
  canTransfer(amount: number): boolean
  deposit(amount: number): void
  withdraw(amount: number): void
  close(): void
}