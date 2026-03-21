import readline from 'readline/promises'
import { stdin as input, stdout as output } from 'process'

import { BankService } from './services/BankService.service'
import { InMemoryAccountRepository, InMemoryTransactionRepository } from './repositories'

const accountRepository = new InMemoryAccountRepository()
const transactionRepository = new InMemoryTransactionRepository()

const rl = readline.createInterface({ input, output })
const bankService = BankService({accountRepository, transactionRepository})

const ask = async (question: string): Promise<string> => {
  const answer = await rl.question(question)
  return answer
}

const showMainMenu = async (): Promise<string> => {
  console.log("\n=== BANK MENU ===")
  console.log("1. Deposit")
  console.log("2. Withdraw")
  console.log("3. Transfer")
  console.log("4. Create an account")
  console.log("5. Exit")

  const option = (await ask("Choose an option: ")).trim()
  return option
}

const main = async () => {
  let running = true

  while(running){
    const option = await showMainMenu()

    switch (option) {
      case "1":
        console.log("Deposit selected\n")
        break
      case "2":
        console.log("Withdraw selected\n")
        break
      case "3":
        console.log("Transfer selected\n")
        break
      case "4":
        console.log("Create an account selected\n")

        // ** Owner
        const firstName = (await ask("Enter the account owner first name: ")).trim()
        const lastName = (await ask("Enter the account owner last name: ")).trim()

        const owner = `${firstName} ${lastName}`

        // ** Type
        console.log("Available account types:")
        console.log("1. Checking")
        console.log("2. Savings")
        const type = (await ask("Enter the account type: ")).trim() === "1" ? "checking" : "savings"

        // ** Initial Deposit
        const initialDeposit = parseFloat((await ask("Enter the initial deposit: ")).trim())

        if (isNaN(initialDeposit) || initialDeposit < 0) {
            console.log("Invalid deposit amount\n")
            break
        }

        const isCorrect = (await ask(`You are creating a ${type} account for: ${owner}\nwith a initial deposit of ${initialDeposit}. Is that correct? (y/n) `)).trim() === "y" ? true : false

        if (!isCorrect) {
            console.log("Account creation cancelled\n")
            break
        }

        const newAccount = bankService.createAccount(owner, type, initialDeposit)

        if (!newAccount.success) {
            console.log(newAccount.error)
            break
        }

        console.table(newAccount.data)
        break
      case "5":
        running = false

        console.log("Exiting application. Please wait\n")
        console.log("Bye.\n")
        break
      default:
        console.log("Invalid option. Please try again\n")
    }

  }

  rl.close()
}

main()