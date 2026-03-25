import { cliAsk } from '../plugins'
import { IBankService } from '../interfaces'

export const createHandlers = (bankService: IBankService) =>{

  const createAccountHandler = async () : Promise< void > => {
    console.log("Create an account selected\n")

    // ** Owner
    const firstName = (await cliAsk("Enter the account owner first name: ")).trim()
    const lastName = (await cliAsk("Enter the account owner last name: ")).trim()

    const owner = `${firstName} ${lastName}`

    // ** Type
    console.log("Available account types:")
    console.log("1. Checking")
    console.log("2. Savings")
    const type = (await cliAsk("Enter the account type: ")).trim() === "1" ? "checking" : "savings"

    // ** Initial Deposit
    const initialDeposit = parseFloat((await cliAsk("Enter the initial deposit: ")).trim())

    if (isNaN(initialDeposit) || initialDeposit < 0) {
      console.log("Invalid deposit amount\n")
      return
    }

    const isCorrect = (await cliAsk(`You are creating a ${type} account for: ${owner}\nwith a initial deposit of ${initialDeposit}. Is that correct? (y/n) `)).trim() === "y" ? true : false

    if (!isCorrect) {
      console.log("Account creation cancelled\n")
      return
    }

    const newAccount = bankService.createAccount(owner, type, initialDeposit)

    if (!newAccount.success) {
      console.log(newAccount.error)
      return
    }

    console.table(newAccount.data)
  }

  const depositHandler = async () : Promise< void > => {
    console.log("Deposit selected\n")

    const accountId = (await cliAsk("Enter the account id: ")).trim()
    const amount = parseFloat((await cliAsk("Enter the amount: ")).trim())

    if (isNaN(amount) || amount < 0) {
      console.log("Invalid deposit amount\n")
      return
    }

    const result = await bankService.deposit(accountId, amount)

    if (!result.success) {
      console.log(result.error)
      return
    }

    console.table(result.data)
  }

  const withdrawHandler = async () : Promise< void > => {
    console.log("Withdraw selected\n")

    const accountId = (await cliAsk("Enter the account id you want to withdraw from: ")).trim()
    const amount = parseFloat((await cliAsk("Enter the amount: ")).trim())

    if (isNaN(amount) || amount < 0) {
      console.log("Invalid deposit amount\n")
      return
    }

    const result = await bankService.withdraw(accountId, amount)

    if (!result.success) {
      console.log(result.error)
      return
    }

    console.log({
      id: result.data.id,
      type: result.data.type,
      status: result.data.getStatus(),
      description: result.data.description,
      amount: result.data.getAmount(),
      timestamps: result.data.getDates()
    })

  }

  const transferHandler = async () : Promise< void > => {
    console.log("Transfer selected\n")

    const issuerAccountId = (await cliAsk("Enter the account id you want to tranfer from: ")).trim()
    const recipientAccountId = (await cliAsk("Enter the account id you want to tranfer to: ")).trim()
    const amount = parseFloat((await cliAsk("Enter the amount: ")).trim())

    if (isNaN(amount) || amount < 0) {
      console.log("Invalid deposit amount\n")
      return
    }

    const result = await bankService.transfer(issuerAccountId, recipientAccountId, amount)

    if (!result.success) {
      console.log(result.error)
      return
    }

    console.log(result.data)
  }

  const getallAccounts = async () : Promise< void > => {
    console.log('Get all accounts selected\n')

    const result = bankService.getAllAccounts()

    if (!result.success) {
      console.log(result.error)
      return
    }

    console.log(result.data)
  }

  const getAllTransactions = async () : Promise< void > => {
    console.log('Get all transactions selected\n')

    const result = bankService.getAllTransactions()

    if (!result.success) {
      console.log(result.error)
      return
    }

    console.log(result.data)
  }

  return {
    createAccountHandler,
    depositHandler,
    withdrawHandler,
    transferHandler,
    getallAccounts,
    getAllTransactions
  }
}