import { BaseAccount } from './BaseAccount.model'

export class SavingsAccount extends BaseAccount {

  #minimumBalance: number = 15

  constructor(id: string, owner: string, initialDeposit: number) {
    super(id, owner, 'savings', initialDeposit)

    if (this.balance < this.#minimumBalance) {
      throw new Error(`Initial deposit must be at least ${this.#minimumBalance}`)
    }
  }

  canWithdraw(amount: number): boolean {
    return this.balance - amount >= this.#minimumBalance
  }

  canTransfer(amount: number): boolean {
    return this.canWithdraw(amount)
  }

  close(): void {
    this.status = 'closed'
  }
}
