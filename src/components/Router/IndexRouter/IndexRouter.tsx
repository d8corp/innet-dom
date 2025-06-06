import Async from '@watch-state/async'
import { Cache, Watch } from 'watch-state'

import type { RouteComponent, RouteLazyComponentResult } from '../types'

export interface IndexRouterProps {
  index: number
  components: () => Array<RouteComponent | RouteLazyComponentResult>
  lazy: () => boolean[]
  fallbacks: () => JSX.Element[]
  loadedComponents: WeakMap<RouteLazyComponentResult, RouteComponent>
}

export function IndexRouter ({ index, components, fallbacks, lazy, loadedComponents }: IndexRouterProps) {
  const component = new Cache(() => components()[index])
  const lazyMode = new Cache(() => lazy()[index])
  const fallback = new Cache(() => fallbacks()[index])
  const show = new Cache(() => components().length > index)

  const render = (Component: RouteComponent) => (
    <Component
      children={(
        <IndexRouter
          index={index + 1}
          fallbacks={fallbacks}
          components={components}
          lazy={lazy}
          loadedComponents={loadedComponents}
        />
      )}
    />
  )

  const lazyContent = new Async(async () => {
    const value = await component.rawValue
    return render(typeof value === 'function' ? value : value.default)
  })

  new Watch((update) => {
    if (!show.value || !lazyMode.value || !component.value) return

    if (component.value instanceof Promise && !loadedComponents.has(component.value)) {
      const key = component.value
      key.then((component) => {
        loadedComponents.set(key, typeof component === 'function' ? component : component.default)
      })
    }

    if (update) {
      lazyContent.update()
    }
  })

  return (): JSX.Element => {
    if (!show.value) return null
    if (!lazyMode.value) return render(component.value as RouteComponent)

    if (loadedComponents.has(component.value as Promise<RouteComponent>)) {
      return render(loadedComponents.get(component.value as Promise<RouteComponent>) as RouteComponent)
    }

    return lazyContent.loading ? fallback.value : lazyContent.value
  }
}
