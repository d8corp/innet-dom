import { Context, useContext } from '@innet/jsx'
import { locationPath } from '@watch-state/history-api'
import { Cache, State } from 'watch-state'

import { paramsContext } from '../../hooks'
import type { StateProp } from '../../types'
import { use } from '../../utils'
import { Show } from '../Show'
import { findRoute } from './helpers/findRoute'
import { type RouteComponent, type Routing } from './types'

export interface RouterProps {
  routing: StateProp<Routing>
  prefix?: StateProp<string>
}

interface IndexRouterProps {
  index: number
  components: Cache<RouteComponent[]>
}

const prefixContext = new Context<State<string>>()

function IndexRouter ({ index, components }: IndexRouterProps) {
  const component = new Cache(() => components.value[index])
  const show = new Cache(() => components.value.length > index)

  return (
    <Show when={show}>
      {() => {
        const Component = component.value
        return <Component children={<IndexRouter index={index + 1} components={components} />} />
      }}
    </Show>
  )
}

export function Router ({ routing, prefix: prefixRaw = useContext(prefixContext) || '/' }: RouterProps) {
  const prefix = new Cache(() => use(prefixRaw))
  const localPath = new Cache(() => locationPath.value.slice(prefix.value.length))
  const params = useContext(paramsContext) || new State<Record<string, string>>({})

  const components = new Cache(() => {
    const newParams: Record<string, string> = {}
    const result = findRoute(use(routing), localPath.value.split('/').filter(Boolean), newParams)
    params.value = newParams
    return result || []
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
      <context for={paramsContext} set={params}>
        <IndexRouter index={0} components={components} />
      </context>
    </Show>
  )
}
