import { type JsxComponent } from '@innet/jsx'
import { State } from 'watch-state'

import { getHTML, render } from '../../test'
import { Ref } from '../../utils'
import { Show } from '../Show'
import { Delay, useHidden } from '.'

describe('Delay', () => {
  it('should work as is, without props', () => {
    const result = render(
      <Delay>
        works
      </Delay>,
    )

    expect(getHTML(result)).toBe('works')
  })
  it('should work', async () => {
    const show = new State(true)

    const result = render(
      <Show when={show}>
        <Delay show={100} hide={100}>
          works
        </Delay>
      </Show>,
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
        <Delay show={100}>
          works
        </Delay>
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
      <Show when={show}>
        before
        <Delay show={100} hide={100}>
          works
        </Delay>
        after
      </Show>,
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

      return (
        <div class={() => hidden?.value ? 'hidden' : 'shown'} />
      )
    }

    const show = new State(true)

    const result = render(
      <Show when={show}>
        <Delay hide={100}>
          <Component />
        </Delay>
      </Show>,
    )

    expect(getHTML(result)).toBe('<div class="shown"></div>')

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(getHTML(result)).toBe('<div class="shown"></div>')

    show.value = false

    expect(getHTML(result)).toBe('<div class="hidden"></div>')

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(getHTML(result)).toBe('<div class="hidden"></div>')

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(getHTML(result)).toBe('')
  })
  it('should work with context and show', async () => {
    const Component: JsxComponent = () => {
      const hidden = useHidden()

      return (
        <div class={() => hidden?.value ? 'hidden' : 'shown'} />
      )
    }

    const show = new State(true)

    const result = render(
      <Show when={show}>
        <Delay show={100} hide={100}>
          <Component />
        </Delay>
      </Show>,
    )

    expect(getHTML(result)).toBe('')

    await new Promise(resolve => setTimeout(resolve, 105))

    expect(getHTML(result)).toBe('<div class="shown"></div>')

    show.value = false

    expect(getHTML(result)).toBe('<div class="hidden"></div>')

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(getHTML(result)).toBe('<div class="hidden"></div>')

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(getHTML(result)).toBe('')
  })
  it('should work with ref', async () => {
    const Component: JsxComponent = () => {
      const hidden = new Ref<State<boolean>>()

      return (
        <Delay ref={hidden} hide={100}>
          <div class={() => hidden.value?.value ? 'hidden' : 'shown'} />
        </Delay>
      )
    }

    const show = new State(true)

    const result = render(
      <Show when={show}>
        <Component />
      </Show>,
    )

    expect(getHTML(result)).toBe('<div class="shown"></div>')

    show.value = false

    expect(getHTML(result)).toBe('<div class="hidden"></div>')

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(getHTML(result)).toBe('<div class="hidden"></div>')

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(getHTML(result)).toBe('')
  })
  it('should work deep', async () => {
    const result = render(
      <Delay show={100}>
        Works
        <Delay show={100}>fine!</Delay>
      </Delay>,
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
        <Delay ref={hidden} hide={300}>
          <div>
            {() => String(hidden.value?.value)}
          </div>
        </Delay>
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
        <Delay show={300}>
          <Delay ref={hidden} hide={300}>
            <div>
              {() => String(hidden.value?.value)}
            </div>
          </Delay>
        </Delay>
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
