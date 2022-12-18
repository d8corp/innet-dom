import { State } from 'watch-state'

import { getHTML, render } from '../../../test'

describe('portal', () => {
  it('should work static', () => {
    const div = document.createDocumentFragment()

    const result = render(
      <portal parent={div}>
        works
      </portal>,
    )

    expect(getHTML(result)).toBe('')
    expect(getHTML(div)).toBe('works')
  })
  it('should work dynamic', () => {
    const div = document.createDocumentFragment()
    const show = new State(true)

    const result = render(
      <show state={show}>
        <portal parent={div}>
          works
        </portal>
      </show>,
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
