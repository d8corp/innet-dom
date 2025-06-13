import { Cache } from 'watch-state'

import { type Component, type StateProp } from '../../types'
import { type LazyResult, use } from '../../utils'
import { Lazy } from '../Lazy'

export interface LazyPipeProps {
  components: StateProp<Array<Component | LazyResult>>
  fallbacks: StateProp<JSX.Element[]>
  index?: number
  loadedComponents?: Map<LazyResult, Component>
}

export function LazyPipe ({
  components,
  fallbacks,
  index = 0,
  loadedComponents,
}: LazyPipeProps) {
  const component = new Cache(() => use(components)[index])
  const fallback = new Cache(() => use(fallbacks)[index])
  const show = new Cache(() => use(components).length > index)

  const children = (
    <LazyPipe
      index={index + 1}
      fallbacks={fallbacks}
      components={components}
      loadedComponents={loadedComponents}
    />
  )

  return (
    <Lazy
      component={component}
      fallback={fallback}
      show={show}
      loadedComponents={loadedComponents}
      render={(Component) => <Component children={children} />}
    />
  )
}
