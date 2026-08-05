import { onDestroy, State } from 'watch-state'

import { getHTML, render } from '../../test'

describe('domFn', () => {
  it('Should react on changes', () => {
    const show = new State(false)

    const result = render(
      () => show.value ? 'Shown' : '',
    )

    expect(getHTML(result)).toBe('')

    show.value = true

    expect(getHTML(result)).toBe('Shown')
  })

  it('Should react on destroy', () => {
    const fn = jest.fn()
    const show = new State(true)

    function Test () {
      onDestroy(fn)

      return 'test'
    }

    const result = render(
      () => show.value ? <Test /> : '',
    )

    expect(getHTML(result)).toBe('test')

    show.value = false

    expect(getHTML(result)).toBe('')
    expect(fn).toHaveBeenCalled()
  })
})
