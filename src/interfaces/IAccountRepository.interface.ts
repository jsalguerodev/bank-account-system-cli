import { BaseAccount } from '../models'
import { Result } from '../types'

export interface IAccountRepository {
  save(account : BaseAccount) : void
  getById(id : string): Result<BaseAccount>
  getAll() : Result<BaseAccount[]>
  getAllActive() : Result<BaseAccount[]>
}