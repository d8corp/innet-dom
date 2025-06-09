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
  permissions: Set<string>,
  index = 0,
): RoutingRoute | undefined {
  if (path.length === index) {
    if (permissions.size && routing.indexList) {
      for (const item of routing.indexList) {
        if (item.permissions.isSubsetOf(permissions)) {
          setParams(path, item.params, params)
          return item
        }
      }
    }

    if (routing.index) {
      setParams(path, routing.index.params, params)
      return routing.index
    }

    if (permissions.size && routing.restList) {
      for (const item of routing.restList) {
        if (item.permissions.isSubsetOf(permissions)) {
          setParams(path, item.params, params)
          return item
        }
      }
    }

    if (routing.rest) {
      setParams(path, routing.rest.params, params)
      return routing.rest
    }

    return undefined
  }

  const key = path[index]
  const strictRouting = routing.strict?.[key]
  const nextIndex = index + 1

  if (strictRouting) {
    const result = findRoute(strictRouting, path, params, permissions, nextIndex)

    if (result) {
      return result
    }
  }

  if (routing.children) {
    const result = findRoute(routing.children, path, params, permissions, nextIndex)

    if (result) return result
  }

  if (routing.rest) {
    setParams(path, routing.rest.params, params)
    return routing.rest
  }
}
