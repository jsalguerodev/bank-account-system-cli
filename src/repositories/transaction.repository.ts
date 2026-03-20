import { ITransactionRespository } from "../interfaces";
import { Transaction } from "../models";
import { Result, TransactionType } from "../types";

export class InMemoryTransactionRepository implements ITransactionRespository{
  readonly transactions = new Map< string, Transaction >()

  save(transaction: Transaction): void{
    this.transactions.set(transaction.id, transaction)
  }

  getById(id: string): Result<Transaction>{
    const transaction = this.transactions.get(id)

    if(!transaction) return { success: false, error: 'Transaction not found' }

    return { success: true, data: transaction }
  }

  getByAccount(accountId: string): Transaction[] {
    return [...this.transactions.values()]
      .filter(v =>(v.issuerAccountId === accountId || v.recipientAccountId === accountId))
  }

  getByAccountAndType(accountId: string, type: TransactionType): Result<Transaction[]> {
  let transactionsByAccountAndType: Transaction[] = [...this.transactions.values()]
    .filter(v =>(v.issuerAccountId === accountId || v.recipientAccountId === accountId) && v.type === type)

  return { success: true, data: transactionsByAccountAndType }
}

  getAll(): Result<Transaction[]> {
    return { success: true, data: [...this.transactions.values()] }
  }
}