import { type Observable, State, Watch, type Watcher } from 'watch-state'

import { type Component, type StateProp } from '../../types'
import { type LazyResult, use } from '../../utils'

export interface LazyProps<C extends Component = Component> {
  component: Watcher<LazyResult<C> | C> | Observable<LazyResult<C> | C>
  fallback?: JSX.Element
  show?: StateProp<boolean>
  render?: (Component: C) => JSX.Element
  loadedComponents?: Map<LazyResult, Component>
}

export function Lazy<C extends Component = Component> ({
  component,
  fallback,
  show = true,
  render = (Component) => <Component />,
  loadedComponents = new Map(),
}: LazyProps<C>) {
  if (!show) return

  const loading = new State(false)

  new Watch(() => {
    if (!use(show)) return

    const currentComponent = use(component)

    if (currentComponent instanceof Promise && !loadedComponents.has(currentComponent)) {
      loading.value = true
      currentComponent.then((component) => {
        loadedComponents.set(currentComponent, typeof component === 'function' ? component : component.default)
        loading.value = false
      })
    }
  })

  return () => {
    if (!use(show)) return null

    const currentComponent = use(component)

    if (typeof currentComponent === 'function') return render(currentComponent)

    const loadedComponent = loadedComponents.get(currentComponent) as C

    if (loadedComponent) {
      return render(loadedComponent)
    }

    if (loading.value) return fallback

    throw Error('Error in Lazy component. component has wrong result of promise.')
  }
}
