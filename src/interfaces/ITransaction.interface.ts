import { TransactionStatus, TransactionType } from "../types"

export interface ITransaction {
  id: string
  type: TransactionType
  description: string
  issuerAccountId?: string
  recipientAccountId?: string

  getAmount(): number
  getStatus(): TransactionStatus
  getDates(): { createdAt: Date, completedAt?: Date }
  completeTransaction(): void
  failTransaction(): void
}