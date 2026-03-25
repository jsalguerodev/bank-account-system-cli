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
    {label: 'Create an account', action: cliHandlers.createAccountHandler },
    {label: 'Deposit', action: cliHandlers.depositHandler },
    {label: 'Account management', action: showAccountManagamentMenu },
    {label: 'Admin access', action: adminAccessMenu },
    {label: 'Exit', action: async () => { console.log('Bye!\n') ; return MenuResult.Exit} }
  ])

  return action !== MenuResult.Exit
}

const showAccountManagamentMenu = async (): Promise< MenuResult > => {
  const action = await showMenu('account menu', [
    {label: 'Withdraw', action: cliHandlers.withdrawHandler },
    {label: 'Transfer', action: cliHandlers.transferHandler },
    {label: 'Go back', action: async () => { return MenuResult.Back} },
    {label: 'Exit', action: async () => { console.log('Bye!\n') ; return MenuResult.Exit} }
  ])

  return action
}

const adminAccessMenu = async (): Promise< MenuResult > =>{
  const action = await showMenu('admin access', [
    {label: 'Get all accounts', action: cliHandlers.getallAccounts },
    {label: 'Get all transactions', action: cliHandlers.getAllTransactions },
    {label: 'Go back', action: async () => { return MenuResult.Back} },
    {label: 'Exit', action: async () => { console.log('Bye!\n') ; return MenuResult.Exit} }
  ])

  return action
}

const main = async () => {
  let running = true

  while(running){
    running = await showMainMenu()
  }

  cliClose()
}

main()