import { cliAsk } from '../plugins'

export type MenuOption = {
  label: string
  action: () => Promise < void | MenuResult >
}

export enum MenuResult {
  Continue = 'continue',
  Exit = 'exit',
  Back = 'back'
}

export const showMenu = async (title: string, options: MenuOption[]) : Promise < MenuResult > => {

  console.log(`=== ${title.toUpperCase()} ===`)

  options.forEach((option, index) => {
    console.log( `${index + 1}. ${option.label}`)
  })

  const input = Number(await cliAsk('Choose an option: '))
  const choice = options[input - 1]

  if (!choice) {
    console.log('Invalid option')
    return showMenu(title, options)
  }

  return (await choice.action()) ?? MenuResult.Continue
}
