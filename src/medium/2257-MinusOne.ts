/*
  2257 - MinusOne
  -------
  by Mustafo Faiz (@fayzzzm) #medium #math

  ### Question

  Given a number (always positive) as a type. Your type should return the number decreased by one.

  For example:

  ```ts
  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
  ```

  > View on GitHub: https://tsch.js.org/2257
*/


/* _____________ Your Code Here _____________ */

// Fails on 1101: TS2589: Type instantiation is excessively deep and possibly infinite.
// type MinusOne<T extends number, C extends any[] = []> = T extends C["length"]
//     ? C extends [infer _, ...infer Rest] ? Rest["length"] : 0
//     : MinusOne<T, [...C, []]>

// Based on this solution: https://github.com/type-challenges/type-challenges/issues/5547
// Fails for 10000: TS2799: Type produces a tuple type that is too large to represent.
type Numbers = {
    '0': []
    '1': [1]
    '2': [2, 2]
    '3': [3, 3, 3]
    '4': [4, 4, 4, 4]
    '5': [5, 5, 5, 5, 5]
    '6': [6, 6, 6, 6, 6, 6]
    '7': [7, 7, 7, 7, 7, 7, 7]
    '8': [8, 8, 8, 8, 8, 8, 8, 8]
    '9': [9, 9, 9, 9, 9, 9, 9, 9, 9]
}

type NumberToArray<N extends string, Acc extends number[] = []> = N extends `${infer Head}${infer Tail}`
    ? Head extends keyof Numbers ? NumberToArray<Tail, [...Acc, ...Acc, ...Acc, ...Acc, ...Acc, ...Acc, ...Acc, ...Acc, ...Acc, ...Acc, ...Numbers[Head]]> : never
    : Acc

type MinusOne<N extends number> = NumberToArray<`${N}`> extends [infer _, ...infer Rest] ? Rest["length"] : never

type Debug = NumberToArray<'42'> // 54


type Zero = MinusOne<1> // 0
type FiftyFour = MinusOne<55> // 54

// @ts-expect-error TS2799: Type produces a tuple type that is too large to represent.
type TooBig = MinusOne<10000>

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<MinusOne<1>, 0>>,
    Expect<Equal<MinusOne<55>, 54>>,
    Expect<Equal<MinusOne<3>, 2>>,
    Expect<Equal<MinusOne<100>, 99>>,
    Expect<Equal<MinusOne<1101>, 1100>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2257/answer
  > View solutions: https://tsch.js.org/2257/solutions
  > More Challenges: https://tsch.js.org
*/

