import { JsxComponent } from '@innet/jsx'
import { State } from 'watch-state'

import { getHTML, render } from '../../../test'
import { Ref } from '../../../utils'
import { useHidden } from './delay'

describe('delay', () => {
  it('should work as is, without props', () => {
    const result = render(
      <delay>
        works
      </delay>,
    )

    expect(getHTML(result)).toBe('works')
  })
  it('should work', async () => {
    const show = new State(true)

    const result = render(
      <show state={show}>
        <delay show={100} hide={100}>
          works
        </delay>
      </show>,
    )

    expect(getHTML(result)).toBe('')

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(getHTML(result)).toBe('works')

    show.value = false

    expect(getHTML(result)).toBe('works')

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(getHTML(result)).toBe('')
  })
  it('should set elements to the right place', async () => {
    const result = render(
      <>
        before
        <delay show={100}>
          works
        </delay>
        after
      </>,
    )

    expect(getHTML(result)).toBe('beforeafter')

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(getHTML(result)).toBe('beforeworksafter')
  })
  it('should set elements to the right place with hide', async () => {
    const show = new State(true)

    const result = render(
      <show state={show}>
        before
        <delay show={100} hide={100}>
          works
        </delay>
        after
      </show>,
    )

    expect(getHTML(result)).toBe('beforeafter')

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(getHTML(result)).toBe('beforeworksafter')

    show.value = false

    expect(getHTML(result)).toBe('works')

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(getHTML(result)).toBe('')
  })
  it('should work with context', async () => {
    const Component: JsxComponent = () => {
      const hidden = useHidden()

      return () => hidden.value ? 'hidden' : 'shown'
    }

    const show = new State(true)

    const result = render(
      <show state={show}>
        <delay hide={100}>
          <Component />
        </delay>
      </show>,
    )

    expect(getHTML(result)).toBe('shown')

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(getHTML(result)).toBe('shown')

    show.value = false

    expect(getHTML(result)).toBe('hidden')

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(getHTML(result)).toBe('hidden')

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(getHTML(result)).toBe('')
  })
  it('should work with context and show', async () => {
    const Component: JsxComponent = () => {
      const hidden = useHidden()

      return () => hidden.value ? 'hidden' : 'shown'
    }

    const show = new State(true)

    const result = render(
      <show state={show}>
        <delay show={100} hide={100}>
          <Component />
        </delay>
      </show>,
    )

    expect(getHTML(result)).toBe('')

    await new Promise(resolve => setTimeout(resolve, 105))

    expect(getHTML(result)).toBe('shown')

    show.value = false

    expect(getHTML(result)).toBe('hidden')

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(getHTML(result)).toBe('hidden')

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(getHTML(result)).toBe('')
  })
  it('should work with ref', async () => {
    const Component: JsxComponent = () => {
      const hidden = new Ref<State<boolean>>()

      return (
        <delay ref={hidden} hide={100}>
          {() => hidden.value.value ? 'hidden' : 'shown'}
        </delay>
      )
    }

    const show = new State(true)

    const result = render(
      <show state={show}>
        <Component />
      </show>,
    )

    expect(getHTML(result)).toBe('shown')

    show.value = false

    expect(getHTML(result)).toBe('hidden')

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(getHTML(result)).toBe('hidden')

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(getHTML(result)).toBe('')
  })
  it('should work deep', async () => {
    const result = render(
      <delay show={100}>
        Works <delay show={100}>fine!</delay>
      </delay>,
    )

    expect(getHTML(result)).toBe('')

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(getHTML(result)).toBe('Works')

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(getHTML(result)).toBe('Worksfine!')
  })
  it('should works with async', async () => {
    async function Test1 () {
      const hidden = new Ref<State<boolean>>()

      return (
        <delay ref={hidden} hide={300}>
          <div>
            {() => String(hidden.value?.value)}
          </div>
        </delay>
      )
    }

    function Test () {
      const show = new State(true)

      setTimeout(() => {
        show.value = false
      }, 300)

      return () => show.value && <Test1 />
    }

    const result = render(<Test />)

    await new Promise(resolve => setTimeout(resolve))

    expect(getHTML(result)).toBe('<div>false</div>')

    await new Promise(resolve => setTimeout(resolve, 300))

    expect(getHTML(result)).toBe('<div>true</div>')

    await new Promise(resolve => setTimeout(resolve, 300))

    expect(getHTML(result)).toBe('')
  })
  it('should works inside each other', async () => {
    const show = new State(true)

    function Test () {
      const hidden = new Ref<State<boolean>>()

      return () => show.value && (
        <delay show={300}>
          <delay ref={hidden} hide={300}>
            <div>
              {() => String(hidden.value?.value)}
            </div>
          </delay>
        </delay>
      )
    }

    const result = render(<Test />)

    expect(getHTML(result)).toBe('')

    await new Promise(resolve => setTimeout(resolve, 150))

    expect(getHTML(result)).toBe('')

    await new Promise(resolve => setTimeout(resolve, 150))

    expect(getHTML(result)).toBe('<div>false</div>')

    show.value = false

    expect(getHTML(result)).toBe('<div>true</div>')

    await new Promise(resolve => setTimeout(resolve, 150))

    expect(getHTML(result)).toBe('<div>true</div>')

    await new Promise(resolve => setTimeout(resolve, 150))

    expect(getHTML(result)).toBe('')
  })
})
