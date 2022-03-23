/*
  1097 - IsUnion
  -------
  by null (@bencor) #medium

  ### Question

  Implement a type `IsUnion`, which takes an input type `T` and returns whether `T` resolves to a union type.

  For example:

    ```ts
    type case1 = IsUnion<string>  // false
    type case2 = IsUnion<string|number>  // true
    type case3 = IsUnion<[string|number]>  // false
    ```

  > View on GitHub: https://tsch.js.org/1097
*/


/* _____________ Your Code Here _____________ */

type IsUnion<T, S = T> = (T extends any // loop if T is distributive (=union) or just an always matching condition otherwise
    ? [S] extends [T] ? false : true  // if the whole type (S) matches the distributive part => it is not a distributive part
    : never) extends false ? false : true // `extends false...` added to handle the IsUnion<{ x: 1 } | { x: 1, y: 2 }>

type case1 = IsUnion<string>  // false
type case2 = IsUnion<string|number>  // true
type case3 = IsUnion<[string|number]>  // false
type Debug2 = boolean extends false ? 'y' : 'n'
type Debug = IsUnion<{ x: 1 } | { x: 1, y: 2 }>

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<IsUnion<string>, false >>,
    Expect<Equal<IsUnion<string|number>, true >>,
    Expect<Equal<IsUnion<'a'|'b'|'c'|'d'>, true >>,
    Expect<Equal<IsUnion<undefined|null|void|''>, true >>,
    Expect<Equal<IsUnion<{a: string}|{a: number}>, true >>,
    Expect<Equal<IsUnion<{a: string|number}>, false >>,
    Expect<Equal<IsUnion<[string|number]>, false >>,
    // Cases where T resolves to a non-union type.
    Expect<Equal<IsUnion<string|never>, false >>,
    Expect<Equal<IsUnion<string|unknown>, false >>,
    Expect<Equal<IsUnion<string|any>, false >>,
    Expect<Equal<IsUnion<string|'a'>, false >>,

    // From https://stackoverflow.com/questions/53953814/typescript-check-if-a-type-is-a-union/59687759#59687759
    Expect<Equal<IsUnion<{ x: 1 } | { x: 1, y: 2 }>, true >>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1097/answer
  > View solutions: https://tsch.js.org/1097/solutions
  > More Challenges: https://tsch.js.org
*/

