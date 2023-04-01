import { Cache, State } from 'watch-state'

import { getHTML, render } from '../../../test'

describe('show', () => {
  it('should render with a state', () => {
    const hide = new State(true)

    const result = render(
      <hide when={hide}>
        Shown
      </hide>,
    )

    expect(getHTML(result)).toBe('')

    hide.value = false

    expect(getHTML(result)).toBe('Shown')
  })
  it('should render with a cache', () => {
    const hide1 = new State(true)
    const hide2 = new State(true)
    const hide = new Cache(() => hide1.value || hide2.value)

    const result = render(
      <hide when={hide}>
        Shown
      </hide>,
    )

    expect(getHTML(result)).toBe('')

    hide1.value = false

    expect(getHTML(result)).toBe('')

    hide2.value = false

    expect(getHTML(result)).toBe('Shown')
  })
  it('should render with a function of state', () => {
    const hide = new State(true)

    const result = render(
      <hide when={() => hide.value}>
        Shown
      </hide>,
    )

    expect(getHTML(result)).toBe('')

    hide.value = false

    expect(getHTML(result)).toBe('Shown')
  })
})
