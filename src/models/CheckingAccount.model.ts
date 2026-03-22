import { BaseAccount } from './BaseAccount.model'

export class CheckingAccount extends BaseAccount {

  #overdraftLimit: number = 15

  constructor(id: string, owner: string, initialDeposit: number) {
    super(id, owner, 'checking', initialDeposit)
  }

  canWithdraw(amount: number): boolean {
    return this.balance - amount >= (this.#overdraftLimit * -1)
  }

  canTransfer(amount: number): boolean {
    return this.canWithdraw(amount)
  }

  close(): void {
    this.status = 'closed'
  }

}
