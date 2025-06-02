import { Cache, onDestroy, State } from 'watch-state'

import { getHTML, render } from '../../test'
import { Show } from './Show'

describe('Show', () => {
  it('should render with a state', () => {
    const show = new State(false)

    const result = render(
      <Show when={show}>
        Shown
      </Show>,
    )

    expect(getHTML(result)).toBe('')

    show.value = true

    expect(getHTML(result)).toBe('Shown')
  })
  it('should render with a cache', () => {
    const show1 = new State(false)
    const show2 = new State(false)
    const show = new Cache(() => show1.value && show2.value)

    const result = render(
      <Show when={show}>
        Shown
      </Show>,
    )

    expect(getHTML(result)).toBe('')

    show1.value = true

    expect(getHTML(result)).toBe('')

    show2.value = true

    expect(getHTML(result)).toBe('Shown')
  })
  it('should render with a function of state', () => {
    const show = new State(false)

    const result = render(
      <Show when={() => show.value}>
        Shown
      </Show>,
    )

    expect(getHTML(result)).toBe('')

    show.value = true

    expect(getHTML(result)).toBe('Shown')
  })
  it('should destroy content', () => {
    const fn = jest.fn()
    const show = new State(true)

    function Test () {
      onDestroy(fn)
      return 'test'
    }

    render(
      <Show when={show}>
        <Test />
      </Show>,
    )

    show.value = false
    expect(fn).toBeCalled()
  })
  it('should render fallback', () => {
    const show = new State(true)

    const result = render(
      <Show when={show} fallback='Hide'>
        Show
      </Show>,
    )

    expect(getHTML(result)).toBe('Show')

    show.value = false

    expect(getHTML(result)).toBe('Hide')
  })
})
