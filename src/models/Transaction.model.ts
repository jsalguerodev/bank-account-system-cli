import { ITransaction } from '../interfaces'
import { transactionStatus, transactionType, TransactionConstructorOptions } from '../types'

export class Transaction implements ITransaction {
  readonly id: string
  readonly type: transactionType;
  readonly description: string;
  readonly issuerAccountId?: string;
  readonly recipientAccountId?: string;

  protected amount: number;
  protected status: transactionStatus;
  protected createdAt: Date;
  protected completedAt?: Date;

  constructor(id: string, options: TransactionConstructorOptions) {

    if (options.amount <= 0) {
      throw new Error('Transaction amount must be greater than 0')
    }

    this.id = id
    this.type = options.type
    this.status = (options.type === 'deposit' || options.type === 'withdrawal') ? 'completed' : 'pending'
    this.amount = options.amount
    this.createdAt = new Date()
    this.description = options.description

    if (this.status === 'completed') {
      this.completedAt = this.createdAt
    }
  }

  getAmount(): number {
    return this.amount
  }

  getStatus(): transactionStatus {
    return this.status
  }

  getDates(): Readonly <{ createdAt: Date; completedAt?: Date }> {

    const timestamps: { createdAt: Date; completedAt?: Date } = {
      createdAt: this.createdAt
    }

    if (this.type === 'transfer' && this.completedAt) {
      timestamps.completedAt = this.completedAt
    }

    return timestamps
  }

  completeTransaction(): void {
    if (this.status !== 'pending') {
      throw new Error('Only pending transactions can be completed')
    }

    this.status = 'completed'
    this.completedAt = new Date()
  }

  failTransaction(): void {
    if (this.status !== 'pending') {
      throw new Error('Only pending transactions can be failed')
    }
    this.status = 'failed'
    this.completedAt = new Date()
  }
}