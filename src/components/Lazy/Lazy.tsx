import Async from '@watch-state/async'
import { unwatch, Watch } from 'watch-state'

import { type Component, type StateProp } from '../../types'
import { use } from '../../utils'

export type LazyComponent = Promise<{ default: Component } | Component>
export type LazyComponentFn = () => LazyComponent

export interface LazyProps<L extends boolean> {
  component: StateProp<L extends true ? LazyComponent : Component>
  lazy: StateProp<L>
  fallback?: StateProp<JSX.Element>
  show?: StateProp<boolean>
  render?: (Component: Component) => JSX.Element
  loadedComponents?: WeakMap<LazyComponent, Component>
}

export function Lazy<L extends boolean> ({
  component,
  lazy,
  fallback,
  show = true,
  render = (Component) => <Component />,
  loadedComponents = new WeakMap(),
}: LazyProps<L>) {
  const lazyContent = new Async(async () => {
    const value = await unwatch(() => use(component))
    return render(typeof value === 'function' ? value : value.default)
  })

  if (show && lazy) {
    new Watch((update) => {
      if (!use(show) || !use(lazy)) return

      const currentComponent = use(component)

      if (!currentComponent) return

      if (currentComponent instanceof Promise && !loadedComponents.has(currentComponent)) {
        const key = currentComponent
        key.then((component) => {
          loadedComponents.set(key, typeof component === 'function' ? component : component.default)
        })
      }

      if (update) {
        lazyContent.update()
      }
    })
  }

  return () => {
    if (!use(show)) return null

    const currentComponent = use(component)

    if (!use(lazy)) return render(currentComponent as Component)

    if (loadedComponents.has(currentComponent as Promise<Component>)) {
      return render(loadedComponents.get(currentComponent as Promise<Component>) as Component)
    }

    return lazyContent.loading ? use(fallback) : lazyContent.value
  }
}
