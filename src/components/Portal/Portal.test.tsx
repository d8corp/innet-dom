import { State } from 'watch-state'

import { getHTML, render } from '../../test'
import { Show } from '../Show'
import { Portal } from './Portal'

describe('Portal', () => {
  it('should work static', () => {
    const div = document.createDocumentFragment()

    const result = render(
      <Portal parent={div}>
        works
      </Portal>,
    )

    expect(getHTML(result)).toBe('')
    expect(getHTML(div)).toBe('works')
  })
  it('should work dynamic', () => {
    const div = document.createDocumentFragment()
    const show = new State(true)

    const result = render(
      <Show when={show}>
        <Portal parent={div}>
          works
        </Portal>
      </Show>,
    )

    expect(getHTML(result)).toBe('')
    expect(getHTML(div)).toBe('works')

    show.value = false

    expect(getHTML(result)).toBe('')
    expect(getHTML(div)).toBe('')

    show.value = true

    expect(getHTML(result)).toBe('')
    expect(getHTML(div)).toBe('works')
  })
})
