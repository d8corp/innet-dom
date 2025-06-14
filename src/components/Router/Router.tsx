import { ContextProvider, useContext } from '@innet/jsx'
import { locationPath } from '@watch-state/history-api'
import { Cache, State } from 'watch-state'

import { paramsContext } from '../../hooks'
import { type Component, type StateProp } from '../../types'
import { isLazy, type LazyResult, use } from '../../utils'
import { Lazy } from '../Lazy'
import { Pipe } from '../Pipe'
import { findRoute } from './helpers/findRoute'
import { type Routing } from './types'

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

    const result: Array<Component | LazyResult> = []

    for (let i = 0; i < routeValue.components.length; i++) {
      const component = routeValue.components[i]
      result.push(isLazy(component) ? component() : component)
    }

    return result
  })

  const loadedComponents = new Map()

  return (
    <ContextProvider for={paramsContext} set={params}>
      <Pipe>
        {(children, index) => (
          <Lazy
            component={new Cache(() => components.value[index])}
            fallback={new Cache(() => route.value?.fallback?.[index])}
            show={new Cache(() => components.value.length > index)}
            render={(Component) => <Component children={children} />}
            loadedComponents={loadedComponents}
          />
        )}
      </Pipe>
    </ContextProvider>
  )
}
