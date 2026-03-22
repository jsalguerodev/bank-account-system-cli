import readline from 'readline/promises'
import { stdin as input, stdout as output } from 'process'

const rl = readline.createInterface({ input, output })

export const cliAsk = async (question: string): Promise<string> => {
  const answer = await rl.question(question)
  return answer
}

export const cliClose = ():void => rl.close()
