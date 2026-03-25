import { BankEventMap } from "../types";
import { EventEmitter } from './EventEmitter.event'

export const BankEventEmitter = new EventEmitter<BankEventMap>()