import { Transaction } from "../models"
import { Result, TransactionType } from "../types"

export interface ITransactionRespository {
  save(transaction: Transaction) : void
  getById(id: string): Result<Transaction>
  getByAccount(id: string): Transaction[]
  getByAccountAndType(id: string, type: TransactionType): Result<Transaction[]>
  getAll(): Result<Transaction[]>
}