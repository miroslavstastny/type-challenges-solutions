/*
  4179 - Flip
  -------
  by Farhan Kathawala (@kathawala) #medium #object

  ### Question

  Implement the type of `just-flip-object`. Examples:

  ```typescript
  Flip<{ a: "x", b: "y", c: "z" }>; // {x: 'a', y: 'b', z: 'c'}
  Flip<{ a: 1, b: 2, c: 3 }>; // {1: 'a', 2: 'b', 3: 'c'}
  flip<{ a: false, b: true }>; // {false: 'a', true: 'b'}
  ```

  No need to support nested objects and values which cannot be object keys such as arrays

  > View on GitHub: https://tsch.js.org/4179
*/


/* _____________ Your Code Here _____________ */

type TypeToString<T> = T extends string | number | bigint | boolean | null | undefined ? `${T}` : never

type MemberOfType<O, T> = keyof O extends infer K
    ? K extends keyof O
        ? TypeToString<O[K]> extends T
            ? K
            : never
        : never
    : never

type FlipHuh<T> = {
    [K in TypeToString<T[keyof T]>]: MemberOfType<T, K>
}

/*
// Typescript Record for reference
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
*/

type Flip<T extends Record<any, any>> = { // Record is required to constrain the T[K] to allow the string interpolation
    [K in keyof T as `${T[K]}`]: K
}

type Debug = MemberOfType<{pi: 3.14, bool: true}, '3.14'>
type Debug2 = Flip<{pi: 3.14, bool: true}>

/* _____________ Test Cases _____________ */
import { Equal, Expect, NotEqual } from '@type-challenges/utils'

type cases = [
    Expect<Equal<{a: 'pi'}, Flip<{pi: 'a'}>>>,
    Expect<NotEqual<{b: 'pi'}, Flip<{pi: 'a'}>>>,
    Expect<Equal<{3.14: 'pi', true: 'bool'}, Flip<{pi: 3.14, bool: true}>>>,
    Expect<Equal<{val2: 'prop2', val: 'prop'}, Flip<{prop: 'val', prop2: 'val2'}>>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4179/answer
  > View solutions: https://tsch.js.org/4179/solutions
  > More Challenges: https://tsch.js.org
*/

