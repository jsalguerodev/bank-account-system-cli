import { ITransaction } from '../interfaces'
import { TransactionStatus, TransactionType, TransactionConstructorOptions } from '../types'

export class Transaction implements ITransaction {
  readonly id: string
  readonly type: TransactionType;
  readonly description: string;
  readonly issuerAccountId?: string;
  readonly recipientAccountId?: string;

  #amount: number;
  #status: TransactionStatus;
  #createdAt: Date;
  #completedAt?: Date;

  constructor(id: string, options: TransactionConstructorOptions) {

    if (options.amount <= 0) {
      throw new Error('Transaction amount must be greater than 0')
    }

    this.id = id
    this.type = options.type
    this.#status = (options.type === 'deposit' || options.type === 'withdrawal') ? 'completed' : 'pending'
    this.#amount = options.amount
    this.#createdAt = new Date()
    this.description = options.description

    if (this.#status === 'completed') {
      this.#completedAt = this.#createdAt
    }

    switch (options.type) {
      case ('deposit'):
        this.recipientAccountId = options.recipientAccountId
        break
      case ('withdrawal'):
        this.issuerAccountId = options.issuerAccountId
        break
      case ('transfer'):
        this.issuerAccountId = options.issuerAccountId
        this.recipientAccountId = options.recipientAccountId
        break
    }
  }

  getAmount(): number {
    return this.#amount
  }

  getStatus(): TransactionStatus {
    return this.#status
  }

  getDates(): Readonly<{ createdAt: Date; completedAt?: Date }> {
    const timestamps: { createdAt: Date; completedAt?: Date } = {
      createdAt: this.#createdAt
    }
    if (this.#completedAt) {
      timestamps.completedAt = this.#completedAt
    }
    return timestamps
  }

  completeTransaction(): void {
    if (this.#status !== 'pending') {
      throw new Error('Only pending transactions can be completed')
    }

    this.#status = 'completed'
    this.#completedAt = new Date()
  }

  failTransaction(): void {
    if (this.#status !== 'pending') {
      throw new Error('Only pending transactions can be failed')
    }
    this.#status = 'failed'
    this.#completedAt = new Date()
  }
}