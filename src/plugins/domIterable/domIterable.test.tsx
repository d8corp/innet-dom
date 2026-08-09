import { State } from 'watch-state'

import { getHTML, render } from '../../test'
import { type ChildrenProps } from '../../types'
import { Ref } from '../../utils'

describe('domIterable', () => {
  it('should run after yield', () => {
    const fn = jest.fn()

    function * Test () {
      yield <div />
      fn()
    }

    render(<Test />)

    expect(fn).toHaveBeenCalledTimes(1)
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

  it('should works with ref', () => {
    const log: any[] = []

    function * Test (props: ChildrenProps) {
      const ref = new Ref<HTMLDivElement>()
      yield <div ref={ref}>{props.children}</div>
      log.push(ref.value)
    }

    const result = render(<Test>foo</Test>)

    expect(getHTML(result)).toBe('<div>foo</div>')
    expect(log.length).toBe(1)
    expect(log[0]).toBeInstanceOf(HTMLDivElement)
  })

  it('should works with deep ref', () => {
    const log: any[] = []

    function Foo ({ children }: ChildrenProps) {
      return <div>{children}</div>
    }

    function * Test ({ children }: ChildrenProps) {
      const ref = new Ref<HTMLDivElement>()
      yield <div><Foo>1<div ref={ref}>{children}</div></Foo></div>
      log.push(ref.value)
    }

    const result = render(<Test>foo</Test>)

    expect(getHTML(result)).toBe('<div><div>1<div>foo</div></div></div>')
    expect(log.length).toBe(1)
    expect(log[0]).toBeInstanceOf(HTMLDivElement)
  })
})
