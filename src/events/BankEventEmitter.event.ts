import { BankEventMap } from "../types";
import { EventEmitter } from './EventEmitter.event'

export const BankEventEmmiter = new EventEmitter<BankEventMap>()