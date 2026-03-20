import { IAccount } from '../interfaces'
import { AccountStatus } from '../types'

export abstract class BaseAccount implements IAccount {
  readonly id: string
  readonly owner: string
  readonly type: 'checking' | 'savings' | 'investment'

  protected status: AccountStatus
  protected balance: number

  constructor(id: string, owner: string, type: 'checking' | 'savings' | 'investment', initialDeposit: number = 0) {
    this.id = id
    this.owner = owner
    this.type = type
    this.status = 'active'
    this.balance = initialDeposit
  }

  getBalance(): number {
    return this.balance
  }

  getStatus(): AccountStatus {
    return this.status
  }

  deposit(amount: number): void {
    if (amount <= 0) throw new Error('Deposit amount must be greater than 0')
    this.balance += amount
  }

  withdraw(amount: number): void {
    if (amount <= 0) throw new Error('Withdrawal amount must be greater than 0')
    this.balance -= amount
  }

  abstract canWithdraw(amount : number): boolean
  abstract canTransfer(amount: number): boolean
  abstract close(): void
}