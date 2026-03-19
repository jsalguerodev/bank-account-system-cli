import { IAccount } from '../interfaces'
import { BaseAccount, CheckingAccount, SavingsAccount } from '../models'
import { getNewId } from '../plugins'

export const createAccount = (owner : string, type : IAccount["type"], initialDeposit : number): BaseAccount =>{
  if ( type === 'checking') return new CheckingAccount ( getNewId(), owner, initialDeposit )
  if ( type === 'savings' ) return new SavingsAccount  ( getNewId(), owner, initialDeposit )

  throw new Error ("Invalid account type")
}