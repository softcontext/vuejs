import { name } from './client'

const pizza = 100
const beer = 50

const sum = (a, b) => a + b + '$'
console.log(`${name}, you have to pay ${sum(pizza, beer)}`);
