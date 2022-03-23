/*
  612 - KebabCase
  -------
  by Johnson Chu (@johnsoncodehk) #medium #template-literal

  ### Question

  `FooBarBaz` -> `foo-bar-baz`

  > View on GitHub: https://tsch.js.org/612
*/


/* _____________ Your Code Here _____________ */

// type UpperCaseChars = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
//
// type KebabCaseInner<S extends string> = S extends `${infer Head}${infer Tail}`
//     ? Head extends UpperCaseChars
//         ? `-${Lowercase<Head>}${KebabCaseInner<Tail>}`
//         : `${Head}${KebabCaseInner<Tail>}`
//     : S
//
// type KebabCase<S extends string> = S extends `${infer Head}${infer Tail}`
//     ? `${Lowercase<Head>}${KebabCaseInner<Tail>}`
//     : Lowercase<S>

type KebabCase<S extends string> = S extends `${infer Head}${infer Tail}`
    ? Tail extends Uncapitalize<Tail>
        ? `${Uncapitalize<Head>}${KebabCase<Tail>}`
        : `${Uncapitalize<Head>}-${KebabCase<Tail>}`
    : Uncapitalize<S>

type Debug3 = 'Fx' extends `${infer Head}${infer Middle}${infer Tail}` ? Tail : 'no'
type Debug = KebabCase<'ABC'>
type Debug2 = KebabCase<'Single'>

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
    Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
    Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
    Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
    Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
    Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
    Expect<Equal<KebabCase<'-'>, '-'>>,
    Expect<Equal<KebabCase<''>, ''>>,
    Expect<Equal<KebabCase<'😎'>, '😎'>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/612/answer
  > View solutions: https://tsch.js.org/612/solutions
  > More Challenges: https://tsch.js.org
*/

