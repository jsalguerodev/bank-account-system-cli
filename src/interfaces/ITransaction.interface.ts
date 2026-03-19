import { transactionStatus, transactionType } from "../types"

export interface ITransaction {
  id: string
  type: transactionType
  description: string
  issuerAccountId?: string
  recipientAccountId?: string

  getAmount(): number
  getStatus(): transactionStatus
  getDates(): { createdAt: Date, completedAt?: Date }
  completeTransaction(): void
  failTransaction(): void
}