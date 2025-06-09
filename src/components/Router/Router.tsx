import { ContextProvider, useContext } from '@innet/jsx'
import { locationPath } from '@watch-state/history-api'
import { Cache, State } from 'watch-state'

import { paramsContext } from '../../hooks'
import type { StateProp } from '../../types'
import { use } from '../../utils'
import { findRoute } from './helpers/findRoute'
import { IndexRouter } from './IndexRouter'
import { type RouteComponent, type RouteLazyComponent, type RouteLazyComponentResult, type Routing } from './types'

export interface RouterProps {
  routing: StateProp<Routing>
  permissions?: StateProp<Set<string>>
}

const EMPTY_SET = new Set<string>()

export function Router ({ routing, permissions = EMPTY_SET }: RouterProps) {
  const params = useContext(paramsContext) || new State<Record<string, string>>({})

  const route = new Cache(() => {
    const newParams: Record<string, string> = {}
    const route = findRoute(use(routing), locationPath.value.split('/').filter(Boolean), newParams, use(permissions))
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

  return (
    <ContextProvider for={paramsContext} set={params}>
      <IndexRouter
        index={0}
        components={() => components.value}
        fallbacks={() => route.value?.fallback ?? []}
        lazy={() => route.value?.lazy ?? []}
        loadedComponents={new WeakMap()}
      />
    </ContextProvider>
  )
}
