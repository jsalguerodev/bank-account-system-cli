import test from 'node:test';
import { delay } from './plugins'

async function main() {

  const testMap = new Map();

  testMap.set(1, 'Alter Bridge')
  testMap.set(2, 'LosPetitFellas')
  testMap.set(3, 'Royal Republic')
  testMap.set(4, 'Guns n\' roses')

  console.log( testMap.get(1) )

  testMap.set( 1, 'Myles Kennedy')

  console.log( testMap.get(10))
  console.table( Array.from(testMap.values()))
}

main()