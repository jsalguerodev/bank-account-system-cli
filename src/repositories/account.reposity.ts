import { IAccountRepository } from '../interfaces'
import { BaseAccount } from '../models'
import { Result } from '../types'

export class InMemoryAccountRepository implements IAccountRepository {
  readonly accounts = new Map<string, BaseAccount>()

  save(account : BaseAccount): void {
    this.accounts.set(account.id, account)
  }

  getById(id: string): Result<BaseAccount> {
    const account = this.accounts.get( id )

    if(!account) {
      return { success: false, error: 'Account not found'}
    }

    return { success: true, data: account}
  }

  getAll(): Result<BaseAccount[]> {
    const allAccounts = Array.from(this.accounts.values())
    return { success: true, data: allAccounts}
  }

  getAllActive(): Result<BaseAccount[]> {
    const activeAccounts = Array.from(this.accounts.values()).filter( account => account.getStatus() === 'active' )
    return { success: true, data: activeAccounts}
  }

}