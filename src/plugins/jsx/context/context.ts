import innet, { Handler } from 'innet'

export class Context <D = any, Def = D> {
  readonly key: string

  constructor (public readonly defaultValue?: Def, name?: string) {
    this.key = Symbol(name) as unknown as string
  }

  get (handler: Handler): D | Def {
    return this.key in handler ? handler[this.key] : this.defaultValue
  }
}

export interface ContextProps <D = any> {
  for: Context<D>
  set?: D
}

export function context ({ props, children }, handler) {
  const childrenHandler = Object.create(handler)
  childrenHandler[props.for.key] = props.set

  return innet(children, childrenHandler)
}
