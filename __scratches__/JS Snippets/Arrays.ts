export default {}

import { range } from './Generators, Iterators, array-like'

const isEven = (num: number) => !(num % 2)
const NUMS: number[] = Array.from(Array(10).keys())
const STRS: string[] = ['one', 'two', 'three', 'one']
const ANY: unknown[] = [() => 0, {}, Symbol('hi')] //?

/**
 * methods
 */
console.log(STRS[2])
// console.log('two' in STRS)
console.log(STRS.length)
// can truncate:
NUMS.length = 8
console.log(NUMS)
console.log(STRS.concat('test'))
const str = STRS.join('-')
console.log(str.split('-'))
console.log(STRS.push('five')) // to the end, return new len
console.log(STRS.pop()) // from the end
// next 2 are much slower!
console.log(STRS.shift()) // from the front
console.log(STRS.unshift('one')) // adds to the front, returns new len
console.log(STRS.reverse())
console.log(NUMS.every(isEven))
console.log(NUMS.some(isEven))
console.log(NUMS.find(value => value > 3))
console.log(STRS.findIndex((value) => value.length > 3)) // it's reversed..
console.log(STRS.indexOf('one'))
console.log(STRS.lastIndexOf('one'))
console.log(STRS.includes('one'))
console.log(NUMS.filter(value => value > 7))
console.log(NUMS.splice(1, 2, 0, 0, 0)) // mutates and returns deleted
console.log(NUMS) // inserted elements
console.log(NUMS.slice(-3, -1)) // piece of arrray, does not mutate
console.log(NUMS.concat([2, 3, 4]))
console.log([...NUMS, 2, 3, '3']) // alternative, does not inherit the type

/**
 * functional;
 * may provide optional 'this' argument
 */
console.log(NUMS.reduce((acc, curr) =>
  acc + curr, 0)) // sum, starting value
console.log(NUMS.reduceRight((acc, curr) =>
  acc + curr, 0)) // same, but from the right
console.log(NUMS.map(value => value + 1))
console.log(NUMS.sort((a, b) => a - b)) // provide comparator

for (let str1 of STRS) {console.log(str1)}
STRS.forEach((value) => console.log(value))

/**
 * array to object, optional starting value
 */
console.log(
  STRS.reduce((acc, curr, index) => (
    {
      ...acc,
      [`[${index}] ` + curr]: curr.length
    }), {}
  )
)

/**
 * some, find
 */
console.log(STRS.find/*some*/(value => /th/g.test(value)))

/**
 * TS doesn't like this
 */
// let arr = [1, 2];
//
// let arrayLike = {
//   0: "something",
//   1: "else",
//   [Symbol.isConcatSpreadable]: true,
//   length: 2
// };
//
// console.log( arr.concat(arrayLike) ); // 1,2,something,else

/**
 * array like, but not iterable
 */
let arrayLike = {
  0:      'Hello',
  1:      'World',
  2:      'prop',
  length: 5 // needs this
}

console.log(Array.from(arrayLike))
console.log(Array.from(range(-3, 4)))
// optional map function
console.log(Array.from(range(-3, 5), (num) =>
  num !== undefined
  ? num * 2
  : undefined))
