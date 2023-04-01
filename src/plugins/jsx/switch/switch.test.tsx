import { State } from 'watch-state'

import { getHTML, render } from '../../../test'

describe('switch', () => {
  it('should render with a state', () => {
    const selectedCase = new State('')

    const result = render(
      <switch of={selectedCase}>
        <slot name='case1'>
          Case 1
        </slot>
        <slot name='case2'>
          Case 2
        </slot>
        Default
      </switch>,
    )

    expect(getHTML(result)).toBe('Default')

    selectedCase.value = 'case1'

    expect(getHTML(result)).toBe('Case 1')

    selectedCase.value = 'case2'

    expect(getHTML(result)).toBe('Case 2')

    selectedCase.value = 'case3'

    expect(getHTML(result)).toBe('Default')
  })
})
