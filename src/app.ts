import { cliClose } from './plugins'
import { showMenu} from './cli'
import { BankService } from './services/BankService.service'
import { InMemoryAccountRepository, InMemoryTransactionRepository } from './repositories'
import { createHandlers, MenuResult } from './cli'

const accountRepository = new InMemoryAccountRepository()
const transactionRepository = new InMemoryTransactionRepository()

const bankService = BankService({accountRepository, transactionRepository})

const cliHandlers = createHandlers(bankService)

const showMainMenu = async (): Promise< boolean > => {
  const action = await showMenu('bank menu', [
    {label: 'Deposit', action: async () => { console.log(`Deposit selected.`) }},
    {label: 'Withdraw', action: async () => { console.log(`Withdraw selected.`) }},
    {label: 'Transfer', action: async () => { console.log(`Transfer selected.`) }},
    {label: 'Create an account', action: cliHandlers.createAccountHandler },
    {label: 'Exit', action: async () => { console.log('Bye!\n') ; return MenuResult.Exit} }
  ])

  return action !== MenuResult.Exit
}

const main = async () => {
  let running = true

  while(running){
    running = await showMainMenu()
  }

  cliClose()
}

main()