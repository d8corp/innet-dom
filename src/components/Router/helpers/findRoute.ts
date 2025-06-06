import { type Routing, type RoutingRoute } from '../types'

function setParams (rootPath: string[], pathParams: string[], result: Record<string, string>) {
  for (let i = 0; i < pathParams.length; i++) {
    const key = pathParams[i]
    if (!key) continue
    result[key] = rootPath[i]
  }
}

export function findRoute (
  routing: Routing,
  path: string[],
  params: Record<string, string>,
  index = 0,
): RoutingRoute | undefined {
  if (path.length === index) {
    if (routing.index) {
      setParams(path, routing.index.params, params)
      return routing.index
    }

    if (routing.rest) {
      if (routing.rest.components) {
        setParams(path, routing.rest.params, params)
        return routing.rest
      }
    }

    return undefined
  }

  const key = path[index]
  const strictRouting = routing.strict?.[key]
  const nextIndex = index + 1

  if (strictRouting) {
    const result = findRoute(strictRouting, path, params, nextIndex)

    if (result) {
      return result
    }
  }

  if (routing.children) {
    const result = findRoute(routing.children, path, params, nextIndex)

    if (result) return result
  }

  if (routing.rest) {
    setParams(path, routing.rest.params, params)
    return routing.rest
  }
}
