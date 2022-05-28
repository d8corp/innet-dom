import { JSXPluginElement } from '@innet/jsx'
import innet, { Handler } from 'innet'

export interface ContextProps <D = any> {
  for: Context<D>
  set?: D
}

export class Context <D = any, Def = D> {
  readonly key: string

  constructor (public readonly defaultValue?: Def, name?: string) {
    this.key = Symbol(name) as unknown as string
  }

  get (handler: Handler): D | Def {
    return this.key in handler ? handler[this.key] : this.defaultValue
  }
}

export function createContextHandler <D> (handler: Handler, context: Context<D>, value: D): Handler {
  const childrenHandler = Object.create(handler)
  childrenHandler[context.key] = value
  return childrenHandler
}

export function context ({ props, children }: JSXPluginElement<ContextProps>, handler: Handler) {
  return innet(children, createContextHandler(handler, props.for, props.set))
}
