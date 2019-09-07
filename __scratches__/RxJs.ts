import {
  audit,
  auditTime,
  bufferCount,
  bufferTime,
  concatMap,
  delay,
  endWith,
  filter,
  map,
  mergeMap,
  take
} from 'rxjs/operators'
import { asyncScheduler, from, fromEvent, interval, Observable, of, timer } from 'rxjs'

//================================================================================
// Helpers
const STR = 'text'

/**
 * returns the difference between previous called value and the next one
 */
class Difference {
  private prevValue: number | null

  constructor() {
    this.prevValue = null
  }

  /**
   * sets the value as current if not previously initialised,
   * otherwise returns the difference
   * @param value
   */
  public getDifference(value: number) {
    if (!this.prevValue) {
      this.prevValue = value
      return 0
    } else {
      const result = value - this.prevValue
      this.prevValue = value
      return result
    }
  }
}

const diff = new Difference()
//================================================================================


/**
 * emit each letter after delay
 */
from(STR)
  .pipe(
    concatMap(x => of(x).pipe(
      delay(1000)
    )),
    endWith('Done')
  )
// .subscribe(x => console.log(x))

/**
 * OR bind each value to an interval emit!
 */
interval(300)
  .pipe(
    take(STR.length), // limit emits
    map(i => [...STR][i]), // map each emit to corresponding member
    endWith('Done!')
  )
  .subscribe(console.log)


/**
 * of,
 * filter,
 * map each value
 */
of(1, 2, 3, 4)
  .pipe(
    filter(value => value !== 2),
    map(x => x * x)
  )
// .subscribe(value => console.log(value))

/**
 * start after 1s
 * emit every 0.5s
 * only even
 * take 5
 */
timer /*interval*/(1000, 500)
  .pipe(
    filter(value => !(value % 2)),
    take(5)
  )
// .subscribe(value => console.log(value))

/**
 * countdown
 */
const countdown = (amount: number, every: number = 1000) =>
  interval(every)
    .pipe(
      take(amount),
      map(value => amount - value - 1)
    )

countdown(10, 300)
// .subscribe(value => console.log(value))

/**
 * auditTIme
 * allow through every n ms
 * throttleTime: emits, then waits
 */
interval(1000)
  .pipe(
    auditTime(1010),
    take(10)
  )
// .subscribe(value => console.log(value))

/**
 * [Node input]
 * wait for input and console.log it
 */
const input = process.openStdin()
fromEvent(input, 'data')
// .subscribe(value => console.log(value))

/**
 * buffer: collects values untill param observable emits, then returns collected as []
 * bufferTime: for duration x ms
 * bufferCount: number of emits x
 */
interval(200)
  .pipe(
    filter(v => !!(v % 2)),
    bufferCount(3)
  )

  // .subscribe(v => console.log(v))
