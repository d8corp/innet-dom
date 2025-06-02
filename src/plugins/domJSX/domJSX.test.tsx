import { State } from 'watch-state'

import { getHTML, render } from '../../test'

describe('domJSX', () => {
  it('should render an element', () => {
    const result = render(<div />)

    expect(getHTML(result)).toBe('<div></div>')
  })
  it('should watch property', () => {
    const classState = new State<string | undefined>()

    const result = render(<div class={classState} />)

    expect(getHTML(result)).toBe('<div></div>')

    classState.value = 'test'

    expect(getHTML(result)).toBe('<div class="test"></div>')

    classState.value = ''

    expect(getHTML(result)).toBe('<div class=""></div>')

    classState.value = undefined

    expect(getHTML(result)).toBe('<div></div>')
  })
  it('should handle style', () => {
    const result = render(<div style={{ color: 'red' }} />)

    expect(getHTML(result)).toBe('<div style="color: red;"></div>')
  })
  it('should skip empty value', () => {
    const result = render(<div style={{ color: '' }} />)

    expect(getHTML(result)).toBe('<div></div>')
  })
  it('should handle dynamic style', () => {
    const style = {
      color: new State('red'),
      background: new State('blue'),
    }

    const result = render(<div style={style} />)

    expect(getHTML(result)).toBe('<div style="color: red; background: blue;"></div>')

    style.color.value = 'black'

    expect(getHTML(result)).toBe('<div style="color: black; background: blue;"></div>')

    style.background.value = ''

    expect(getHTML(result)).toBe('<div style="color: black;"></div>')
  })
})
