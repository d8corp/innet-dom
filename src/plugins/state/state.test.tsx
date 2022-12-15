import { State } from 'watch-state'

import { getHTML, render } from '../../test'

describe('state', () => {
  it('should render state', () => {
    const state = new State('default')
    const result = render(state)

    expect(getHTML(result)).toBe('default')

    state.value = 'test'

    expect(getHTML(result)).toBe('test')
  })
  it('should render state value', () => {
    const state1 = new State()
    const state2 = new State('test')
    const result = render(state1)

    expect(getHTML(result)).toBe('')

    state1.value = (
      <div>{state2}</div>
    )

    expect(getHTML(result)).toBe('<div>test</div>')

    state2.value = 'test2'

    expect(getHTML(result)).toBe('<div>test2</div>')
  })
})
