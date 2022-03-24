/*
  4182 - Fibonacci Sequence
  -------
  by windliang (@wind-liang) #medium

  ### Question

  Implement a generic Fibonacci\<T\> takes an number T and returns it's corresponding [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number).

  The sequence starts:
  1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...

  For example
  ```ts
  type Result1 = Fibonacci<3> // 2
  type Result2 = Fibonacci<8> // 21
  ```

  > View on GitHub: https://tsch.js.org/4182
*/


/* _____________ Your Code Here _____________ */

// type Fibonacci<T extends number, C extends any[] = [[1], []]> = C extends [infer _, ...infer Rest]
//     ? Rest['length'] extends T
//         ? C[0]['length']
//         : Fibonacci<T, [[...C[0], ...C[1]], ...C]>
//     : never

type BaseDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
type BaseDigitsStringUnion = `${BaseDigits[number]}`
type TupleExpand10x<T extends any[]> = [
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T
]

type TupleGeneratorHelper<
    T extends BaseDigitsStringUnion,
    U extends any[] = []
    > = T extends `${U['length']}` ? U : TupleGeneratorHelper<T, [...U, any]>

type TupleGenerator<
    T extends string,
    U extends any[] = []
    > = T extends `${infer F}${infer R}`
    ? F extends BaseDigitsStringUnion
        ? TupleGenerator<R, [...TupleExpand10x<U>, ...TupleGeneratorHelper<F>]>
        : U
    : U

type Plus<A extends number, B extends number> = [
    ...TupleGenerator<`${A}`>,
    ...TupleGenerator<`${B}`>
] extends [...infer S]
    ? S['length']
    : never

type FibonacciHelper<
    T extends number,
    Current extends number = 1,
    Prev extends number = 0,
    Index extends number = 1
    > = T extends Index
    ? Current
    : FibonacciHelper<T, Plus<Current, Prev>, Current, Plus<Index, 1>>

type Fibonacci<T extends number> = FibonacciHelper<T>

type Debug = Fibonacci<20>

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<Fibonacci<3>, 2>>,
    Expect<Equal<Fibonacci<8>, 21>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4182/answer
  > View solutions: https://tsch.js.org/4182/solutions
  > More Challenges: https://tsch.js.org
*/

