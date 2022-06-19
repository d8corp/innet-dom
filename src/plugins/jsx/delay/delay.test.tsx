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

    const result = render(() => show.value && (
      <delay show={100} hide={100}>
        works
      </delay>
    ))

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

    const result = render(() => show.value && (
      <>
        before
        <delay show={100} hide={100}>
          works
        </delay>
        after
      </>
    ))

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

    const result = render(() => show.value && (
      <delay hide={100}>
        <Component />
      </delay>
    ))

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

    const result = render(() => show.value && (
      <delay show={100} hide={100}>
        <Component />
      </delay>
    ))

    expect(getHTML(result)).toBe('')

    await new Promise(resolve => setTimeout(resolve, 100))

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

    const result = render(() => show.value && <Component />)

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
})
