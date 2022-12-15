import { State } from 'watch-state'

import { getHTML, render } from '../../test'

describe('domJSX', () => {
  it('should render an element', () => {
    const result = render(<div />)

    expect(getHTML(result)).toBe('<div></div>')
  })
  it('should watch property', () => {
    const classState = new State()

    const result = render(<div class={classState} />)

    expect(getHTML(result)).toBe('<div></div>')

    classState.value = 'test'

    expect(getHTML(result)).toBe('<div class="test"></div>')

    classState.value = ''

    expect(getHTML(result)).toBe('<div class=""></div>')

    classState.value = undefined

    expect(getHTML(result)).toBe('<div></div>')
  })
})
