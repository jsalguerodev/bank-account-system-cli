import { createAccount as newAccount, createTransaction } from '../factories'
import { IBankService, IAccountRepository, ITransactionRespository} from '../interfaces'
import { delay } from '../plugins'
import { BankEventEmmiter } from '../events'

interface IBankServiceDeps {
  accountRepository : IAccountRepository
  transactionRepository : ITransactionRespository
}

export const BankService = ({ accountRepository, transactionRepository } : IBankServiceDeps): IBankService => {
  return{
    createAccount(owner, type, initialDeposit) {
      try {
        const account = newAccount(owner, type, initialDeposit)
        accountRepository.save(account)
        return { success: true, data: account }

      }catch (error) {
        return { success: false, error: error instanceof Error ? error.message : 'Could not create account' }
      }
    },

    getStatement(accountId) {
      const result = accountRepository.getById(accountId)

      if(!result.success) return result

      return {success: true, data: transactionRepository.getByAccount(accountId) }
    },

    getBalance(accountId) {
      const result = accountRepository.getById(accountId)

      if(!result.success) return result

      return {success: true, data: result.data.getBalance() }
    },

    async deposit(accountId, amount){
      if(amount <= 0) return {success: false, error: 'The amount should be greater that 0. Please try again.'}

      const result = accountRepository.getById(accountId)
      if(!result.success) return result

      const account = result.data

      if (account.getStatus() === 'closed') return {
        success: false,
        error: 'The account is closed. You cannot make a deposit a closed account.'
      }

      await delay(1000)

      account.deposit(amount)

      const transaction = createTransaction({type: 'deposit', amount: amount, recipientAccountId: accountId})
      transactionRepository.save(transaction)

      await BankEventEmmiter.emit('depostit', transaction)
      return { success: true, data: transaction }
    },

    async withdraw(accountId, amount) {
      if (amount <= 0) return {success: false, error: 'The amount should be greater that 0. Please try again'}

      const result = accountRepository.getById(accountId)
      if (!result.success) return result

      const account = result.data

      if (account.getStatus() === 'closed') return {
        success: false,
        error: 'Your account is closed. You cannot withdraw money from a closed account.'
      }

      if (!account.canWithdraw(amount)) return {
        success: false,
        error: 'You cannot withdraw that amount at this moment. Please check you balace and try again'
      }

      await delay( 1000 )

      account.withdraw(amount)

      const transaction = createTransaction({type: 'withdrawal', amount: amount, issuerAccountId: accountId})
      transactionRepository.save(transaction)

      await BankEventEmmiter.emit('withdrawal', transaction)
      return { success: true, data: transaction }
    },

    async transfer(issuerAccountId, recipientAccountId, amount) {
      if(amount <= 0) return {success: false, error: 'The amount should be greater that 0. Please try again'}

      const issuerResult = accountRepository.getById(issuerAccountId)
      if(!issuerResult.success) return issuerResult

      const recipientResult = accountRepository.getById(recipientAccountId)
      if(!recipientResult.success) return recipientResult

      const issuerAccount = issuerResult.data
      const recipientAccount = recipientResult.data

      if (issuerAccount.getStatus() === 'closed') return {
        success: false,
        error: 'Your account is closed. You cannot transfer money to another account'
      }

      if (recipientAccount.getStatus() === 'closed') return {
        success: false,
        error: 'The recipient account is closed. You cannot transfer money to that account'
      }

      if (!issuerAccount.canTransfer(amount)) return {
        success: false,
        error: 'You cannot withdraw that amount at this moment. Please check you balace and try again'
      }

      const transaction = createTransaction({ type: 'transfer', amount, issuerAccountId, recipientAccountId})
      transactionRepository.save(transaction)

      try {
        issuerAccount.withdraw(amount)
        await delay( 1000 )

        recipientAccount.deposit(amount)
        transaction.completeTransaction()

        await BankEventEmmiter.emit('transferComplete', transaction)

        return { success: true, data: transaction}
      } catch(error) {
        issuerAccount.deposit(amount)
        transaction.failTransaction()

        return { success: false, error: 'Transaction failed. Please try again later'}
      }

    }
  }
}