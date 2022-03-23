/*
  1367 - Remove Index Signature
  -------
  by hiroya iizuka (@hiroyaiizuka) #medium

  ### Question

  Implement `RemoveIndexSignature<T>` , exclude the index signature from object types.

  For example:

  ```

  type Foo = {
    [key: string]: any;
    foo(): void;
  }

  type A = RemoveIndexSignature<Foo>  // expected { foo(): void }

  ```

  > View on GitHub: https://tsch.js.org/1367
*/


/* _____________ Your Code Here _____________ */

type RemoveIndexSignature1<T> = {
    [K in keyof T as string extends K
        ? never
        : number extends K
            ? never
            : symbol extends K
                ? never
                : K
    ]: T[K]
}


// Only a string literal can be inferred in a template string
type Debug2 = string extends `${infer R}` ? R : never // never
type Debug3 = 'prop' extends `${infer R}` ? R : never // 'prop'

type RemoveIndexSignature<T> = {
    [Key in keyof T as Key extends `${infer R}` ? Key : never]: T[Key];
};

type Debug = RemoveIndexSignature<Foo>

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'


type Foo = {
    [key: string]: any;
    foo(): void;
}


type Bar = {
    [key: number]: any;
    bar(): void;
}

type Baz = {
    bar(): void;
    baz: string
}


type cases = [
    Expect<Equal< RemoveIndexSignature<Foo>, { foo(): void }>>,
    Expect<Equal< RemoveIndexSignature<Bar>, { bar(): void }>>,
    Expect<Equal< RemoveIndexSignature<Baz>, { bar(): void, baz: string }>>
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1367/answer
  > View solutions: https://tsch.js.org/1367/solutions
  > More Challenges: https://tsch.js.org
*/

