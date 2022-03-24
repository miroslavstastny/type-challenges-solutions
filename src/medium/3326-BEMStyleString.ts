/*
  3326 - BEM style string
  -------
  by Songhn (@songhn233) #medium #template-literal #union #tuple

  ### Question

  The Block, Element, Modifier methodology (BEM) is a popular naming convention for classes in CSS.

  For example, the block component would be represented as `btn`, element that depends upon the block would be represented as `btn__price`, modifier that changes the style of the block would be represented as `btn--big` or `btn__price--warning`.

  Implement `BEM<B, E, M>` which generate string union from these three parameters. Where `B` is a string literal, `E` and `M` are string arrays (can be empty).

  > View on GitHub: https://tsch.js.org/3326
*/


/* _____________ Your Code Here _____________ */

type BEMSpreadModifier<BE extends string, M extends string[]> = M extends [infer MHead, ...infer MRest]
    ? `${BE}--${MHead & string}` | ([] extends MRest ? never : MRest extends string[] ? BEMSpreadModifier<BE, MRest> : never)
    : BE

type BEM_Ugly<B extends string, E extends string[], M extends string[]> = E extends [infer EHead, ...infer ERest]
    ? BEMSpreadModifier<`${B}__${EHead & string}`, M> | ([] extends ERest ? never : ERest extends string[] ? BEM<B, ERest, M> : never)
    : BEMSpreadModifier<B, M>

type Element<E extends string[]> = E[number] extends never ? '' : `__${E[number]}`
type Modifier<M extends string[]> = M[number] extends never ? '' : `--${M[number]}`

type BEM<B extends string, E extends string[], M extends string[]> = `${B}${Element<E>}${Modifier<M>}`

type Debug0 = BEM<'btn', ['1', '2', '3'], ['a', 'b', 'c']>
type Debug = BEM<'btn', ['price', 'nice'], ['warning', 'success']>
type Debug1 = BEM<'btn', [], ['small', 'medium', 'large']>
type Debug2 = string[] extends ['a', 'b'] ? 'y' : 'n'
type Debug3 = ['a', 'b'] extends string[] ? 'y' : 'n'
type Debug4 = string[] extends [] ? 'y' : 'n' // n
type Debug5 = [] extends string[] ? 'y' : 'n' // y
type Debug6 = [] extends ['a', 'b'] ? 'y' : 'n' // n
type Debug7 = `prefix${['A', 'B', 'C'][number]}suffix`

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
    Expect<Equal<BEM<'btn', ['price'], ['warning', 'success']>, 'btn__price--warning' | 'btn__price--success' >>,
    Expect<Equal<BEM<'btn', [], ['small', 'medium', 'large']>, 'btn--small' | 'btn--medium' | 'btn--large' >>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3326/answer
  > View solutions: https://tsch.js.org/3326/solutions
  > More Challenges: https://tsch.js.org
*/

