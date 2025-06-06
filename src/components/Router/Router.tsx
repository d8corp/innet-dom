import { Context, ContextProvider, useContext } from '@innet/jsx'
import Async from '@watch-state/async'
import { locationPath } from '@watch-state/history-api'
import { Cache, State, Watch } from 'watch-state'

import { paramsContext } from '../../hooks'
import type { StateProp } from '../../types'
import { use } from '../../utils'
import { Show } from '../Show'
import { findRoute } from './helpers/findRoute'
import { type RouteComponent, type RouteLazyComponent, type RouteLazyComponentResult, type Routing } from './types'

export interface RouterProps {
  routing: StateProp<Routing>
  prefix?: StateProp<string>
}

interface IndexRouterProps {
  index: number
  components: () => Array<RouteComponent | RouteLazyComponentResult>
  lazy: () => boolean[]
  fallbacks: () => JSX.Element[]
  loadedComponents: WeakMap<RouteLazyComponentResult, RouteComponent>
}

const prefixContext = new Context<State<string>>()

function IndexRouter ({ index, components, fallbacks, lazy, loadedComponents }: IndexRouterProps) {
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

export function Router ({ routing, prefix: prefixRaw = useContext(prefixContext) || '/' }: RouterProps) {
  const prefix = new Cache(() => use(prefixRaw))
  const localPath = new Cache(() => locationPath.value.slice(prefix.value.length))
  const params = useContext(paramsContext) || new State<Record<string, string>>({})

  const route = new Cache(() => {
    const newParams: Record<string, string> = {}
    const route = findRoute(use(routing), localPath.value.split('/').filter(Boolean), newParams)
    params.value = newParams
    return route
  })

  const components = new Cache(() => {
    const routeValue = route.value
    if (!routeValue) return []

    const result: Array<RouteComponent | RouteLazyComponentResult> = []

    for (let i = 0; i < routeValue.components.length; i++) {
      result.push(routeValue.lazy[i] ? (routeValue.components[i] as RouteLazyComponent)() : routeValue.components[i] as RouteComponent)
    }

    return result
  })

  const prefixSuccess = new Cache(() => {
    return true
    // const path = locationPath.value.endsWith('/') ? locationPath.value : `${locationPath.value}/`
    // const currentPrefix = prefix.value
    // const normalizedPrefix = currentPrefix.endsWith('/') ? currentPrefix : `${currentPrefix}/`
    // return path.startsWith(normalizedPrefix)
  })

  return (
    <Show when={prefixSuccess}>
      <ContextProvider for={paramsContext} set={params}>
        <IndexRouter
          index={0}
          components={() => components.value}
          fallbacks={() => route.value?.fallback ?? []}
          lazy={() => route.value?.lazy ?? []}
          loadedComponents={new WeakMap()}
        />
      </ContextProvider>
    </Show>
  )
}
