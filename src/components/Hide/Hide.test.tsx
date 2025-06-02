import { Cache, onDestroy, State } from 'watch-state'

import { getHTML, render } from '../../test'
import { Hide } from './Hide'

describe('Hide', () => {
  it('should render with a state', () => {
    const hide = new State(false)

    const result = render(
      <Hide when={hide}>
        Shown
      </Hide>,
    )

    expect(getHTML(result)).toBe('Shown')

    hide.value = true

    expect(getHTML(result)).toBe('')
  })
  it('should render with a cache', () => {
    const hide1 = new State(false)
    const hide2 = new State(false)
    const hide = new Cache(() => hide1.value && hide2.value)

    const result = render(
      <Hide when={hide}>
        Shown
      </Hide>,
    )

    expect(getHTML(result)).toBe('Shown')

    hide1.value = true

    expect(getHTML(result)).toBe('Shown')

    hide2.value = true

    expect(getHTML(result)).toBe('')
  })
  it('should render with a function of state', () => {
    const hide = new State(false)

    const result = render(
      <Hide when={() => hide.value}>
        Shown
      </Hide>,
    )

    expect(getHTML(result)).toBe('Shown')

    hide.value = true

    expect(getHTML(result)).toBe('')
  })
  it('should destroy content', () => {
    const fn = jest.fn()
    const hide = new State(false)

    function Test () {
      onDestroy(fn)
      return 'test'
    }

    render(
      <Hide when={hide}>
        <Test />
      </Hide>,
    )

    expect(fn).not.toBeCalled()

    hide.value = true

    expect(fn).toBeCalled()
  })
  it('should render fallback', () => {
    const hide = new State(false)

    const result = render(
      <Hide when={hide} fallback='Hide'>
        Show
      </Hide>,
    )

    expect(getHTML(result)).toBe('Show')

    hide.value = true

    expect(getHTML(result)).toBe('Hide')
  })
})
