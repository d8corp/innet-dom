import { useChildren } from '@innet/jsx'
import { State } from 'watch-state'

import { getHTML, render } from '../../test'

describe('domIterable', () => {
  it('should run after yield', () => {
    const fn = jest.fn()
    function * Test () {
      yield <div />
      fn()
    }

    render(<Test />)

    expect(fn).toBeCalledTimes(1)
  })
  it('should change state immediately', () => {
    function * Test () {
      const id = new State('foo')
      yield <div id={id} />
      id.value = 'bar'
    }

    const result = render(<Test />)

    expect(getHTML(result)).toBe('<div id="bar"></div>')
  })
  it('should works with hooks', () => {
    function * Test () {
      const children = useChildren()
      yield <div>{children}</div>
    }

    const result = render(<Test>foo</Test>)

    expect(getHTML(result)).toBe('<div>foo</div>')
  })
})
