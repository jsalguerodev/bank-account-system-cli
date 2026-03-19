import { Transaction } from "../models"
import { Result, transactionType } from "../types"

export interface ITransactionRespository {
  save(transaction: Transaction) : void
  getById(id: string): Result<Transaction>
  getByAccount(id: string): Transaction[]
  getByAccountAndType(id: string, type: transactionType): Result<Transaction[]>
  getAll(): Result<Transaction[]>
}