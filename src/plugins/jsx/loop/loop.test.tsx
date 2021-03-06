import { State } from 'watch-state'

import { getHTML, render } from '../../../test'

describe('for', () => {
  describe('static', () => {
    it('should render without comments', () => {
      const names = ['Mike', 'Alex', 'Dan']

      const result = render(
        <ul>
          <for of={names}>
            {name => (
              <li>
                #{name.index}: {name.value}
              </li>
            )}
          </for>
        </ul>,
      )

      expect(getHTML(result, true)).toBe('<ul><li>#0: Mike</li><li>#1: Alex</li><li>#2: Dan</li></ul>')
    })
    it('should limit by size', () => {
      const names = ['Mike', 'Alex', 'Dan']

      const result = render(
        <ul>
          <for of={names} size={2}>
            {name => (
              <li>
                #{name.index}: {name.value}
              </li>
            )}
          </for>
        </ul>,
      )

      expect(getHTML(result, true)).toBe('<ul><li>#0: Mike</li><li>#1: Alex</li></ul>')
    })
  })
  describe('dynamic', () => {
    it('should re-render', () => {
      const names = new State(['Mike', 'Alex', 'Dan'])

      const result = render(
        <ul>
          <for of={() => names.value}>
            {name => (
              <li>
                #{name.index}: {name.value}
              </li>
            )}
          </for>
        </ul>,
      )

      expect(getHTML(result)).toBe('<ul><li>#0: Mike</li><li>#1: Alex</li><li>#2: Dan</li></ul>')

      names.value = ['Alex', 'Dan', 'Mike']

      expect(getHTML(result)).toBe('<ul><li>#0: Alex</li><li>#1: Dan</li><li>#2: Mike</li></ul>')
    })
    it('should keep elements, if index in a function', () => {
      const names = new State(['Mike', 'Alex', 'Dan'])

      const result = render(
        <ul>
          <for of={() => names.value}>
            {name => (
              <li>
                #{() => name.index}: {name.value}
              </li>
            )}
          </for>
        </ul>,
      )

      const elements1 = [...result.querySelectorAll('li')]

      names.value = ['Alex', 'Dan', 'Mike']

      const elements2 = [...result.querySelectorAll('li')]

      expect(elements1[0]).toBe(elements2[2])
      expect(elements1[1]).toBe(elements2[0])
      expect(elements1[2]).toBe(elements2[1])
    })
    it('should not keep elements, if element key is changed', () => {
      const names = new State(['Mike', 'Alex', 'Dan'])

      const result = render(
        <ul>
          <for of={() => names.value}>
            {name => (
              <li>
                {name.value}
              </li>
            )}
          </for>
        </ul>,
      )

      const elements1 = [...result.querySelectorAll('li')]

      names.value = ['Michael', 'Alex', 'Dan']

      const elements2 = [...result.querySelectorAll('li')]

      expect(elements1[0]).not.toBe(elements2[0])
      expect(elements1[1]).toBe(elements2[1])
      expect(elements1[2]).toBe(elements2[2])
    })
    it('should keep elements, if element key is not changed', () => {
      const people = new State([
        { id: 'mike', name: 'Mike' },
        { id: 'alex', name: 'Alex' },
        { id: 'dan', name: 'Dan' },
      ])

      const result = render(
        <ul>
          <for of={() => people.value} key='id'>
            {body => (
              <li>
                {() => body.value.name}
              </li>
            )}
          </for>
        </ul>,
      )

      const elements1 = [...result.querySelectorAll('li')]

      expect(getHTML(result)).toBe('<ul><li>Mike</li><li>Alex</li><li>Dan</li></ul>')

      people.value = [
        { id: 'mike', name: 'Michael' },
        { id: 'alex', name: 'Alex' },
        { id: 'dan', name: 'Dan' },
      ]

      const elements2 = [...result.querySelectorAll('li')]
      expect(elements1[0]).toBe(elements2[0])
      expect(elements1[1]).toBe(elements2[1])
      expect(elements1[2]).toBe(elements2[2])

      expect(getHTML(result)).toBe('<ul><li>Michael</li><li>Alex</li><li>Dan</li></ul>')
    })
  })
})
