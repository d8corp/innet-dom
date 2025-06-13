import { Cache } from 'watch-state'

import { type Component, type StateProp } from '../../types'
import { use } from '../../utils'
import { Lazy, type LazyComponent } from '../Lazy'

export interface LazyPipeProps {
  components: StateProp<Array<Component | LazyComponent>>
  lazy: StateProp<boolean[]>
  fallbacks: StateProp<JSX.Element[]>
  index?: number
  loadedComponents?: WeakMap<LazyComponent, Component>
}

export function LazyPipe ({
  components,
  fallbacks,
  lazy,
  index = 0,
  loadedComponents,
}: LazyPipeProps) {
  const component = new Cache(() => use(components)[index])
  const lazyMode = new Cache(() => use(lazy)[index])
  const fallback = new Cache(() => use(fallbacks)[index])
  const show = new Cache(() => use(components).length > index)

  const children = (
    <LazyPipe
      index={index + 1}
      fallbacks={fallbacks}
      components={components}
      lazy={lazy}
      loadedComponents={loadedComponents}
    />
  )

  return (
    <Lazy
      component={component}
      fallback={fallback}
      lazy={lazyMode}
      show={show}
      loadedComponents={loadedComponents}
      render={(Component) => <Component children={children} />}
    />
  )
}
