export type transactionOptions =
              | { type: 'deposit',    amount: number, recipientAccountId: string }
              | { type: 'withdrawal', amount: number, issuerAccountId: string }
              | { type: 'transfer';   amount: number; issuerAccountId: string; recipientAccountId: string }

export type TransactionConstructorOptions = transactionOptions & { description : string}