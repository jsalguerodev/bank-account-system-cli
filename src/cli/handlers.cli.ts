import { cliAsk } from '../plugins'
import { IBankService } from '../interfaces'

export const createHandlers = (service: IBankService) =>{

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

    const newAccount = service.createAccount(owner, type, initialDeposit)

    if (!newAccount.success) {
      console.log(newAccount.error)
      return
    }

    console.table(newAccount.data)
  }

  return {
    createAccountHandler
  }
}