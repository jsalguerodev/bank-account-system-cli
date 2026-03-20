export type TransactionOptions =
              | { type: 'deposit',    amount: number, recipientAccountId: string }
              | { type: 'withdrawal', amount: number, issuerAccountId: string }
              | { type: 'transfer';   amount: number; issuerAccountId: string; recipientAccountId: string }

export type TransactionConstructorOptions = TransactionOptions & { description : string}