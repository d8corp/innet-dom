import { Cache, State } from 'watch-state'

import { useMapIndex, useMapValue } from '../../../hooks'
import { getHTML, render } from '../../../test'
import { use } from '../../../utils'

describe('map', () => {
  describe('static', () => {
    it('should render without comments', () => {
      const names = ['Mike', 'Alex', 'Dan']

      function Item () {
        const value = useMapValue()
        const index = useMapIndex()

        return (
          <li>
            #{index}: {value}
          </li>
        )
      }

      const result = render(
        <ul>
          <map of={names}>
            <Item />
          </map>
        </ul>,
      )

      expect(getHTML(result, true)).toBe('<ul><li>#0: Mike</li><li>#1: Alex</li><li>#2: Dan</li></ul>')
    })
    it('should render Set', () => {
      const names = new Set(['Mike', 'Alex', 'Dan'])

      function Item () {
        const value = useMapValue()
        const index = useMapIndex()

        return (
          <li>
            #{index}: {value}
          </li>
        )
      }

      const result = render(
        <ul>
          <map of={names}>
            <Item />
          </map>
        </ul>,
      )

      expect(getHTML(result, true)).toBe('<ul><li>#0: Mike</li><li>#1: Alex</li><li>#2: Dan</li></ul>')
    })
    it('should render Map', () => {
      const names = new Map([[1, 'Mike'], [2, 'Alex'], [3, 'Dan']])

      function Item () {
        const value = useMapValue()
        const index = useMapIndex()

        return (
          <li>
            #{index}: {value}
          </li>
        )
      }

      const result = render(
        <ul>
          <map of={names}>
            <Item />
          </map>
        </ul>,
      )

      expect(getHTML(result, true)).toBe('<ul><li>#0: 1Mike</li><li>#1: 2Alex</li><li>#2: 3Dan</li></ul>')
    })
  })
  describe('dynamic', () => {
    it('should re-render', () => {
      const names = new State(['Mike', 'Alex', 'Dan'])

      function Item () {
        const value = useMapValue()
        const index = useMapIndex()

        return (
          <li>
            #{index}: {value}
          </li>
        )
      }

      const result = render(
        <ul>
          <map of={names}>
            <Item />
          </map>
        </ul>,
      )

      expect(getHTML(result)).toBe('<ul><li>#0: Mike</li><li>#1: Alex</li><li>#2: Dan</li></ul>')

      names.value = ['Alex', 'Dan', 'Mike']

      expect(getHTML(result)).toBe('<ul><li>#0: Alex</li><li>#1: Dan</li><li>#2: Mike</li></ul>')
    })
    it('should re-render with a function value', () => {
      const names = new State(['Mike', 'Alex', 'Dan'])

      function Item () {
        const value = useMapValue()
        const index = useMapIndex()

        return (
          <li>
            #{index}: {value}
          </li>
        )
      }

      const result = render(
        <ul>
          <map of={() => names.value}>
            <Item />
          </map>
        </ul>,
      )

      expect(getHTML(result)).toBe('<ul><li>#0: Mike</li><li>#1: Alex</li><li>#2: Dan</li></ul>')

      names.value = ['Alex', 'Dan', 'Mike']

      expect(getHTML(result)).toBe('<ul><li>#0: Alex</li><li>#1: Dan</li><li>#2: Mike</li></ul>')
    })
    it('should keep elements, if index in a function', () => {
      const names = new State(['Mike', 'Alex', 'Dan'])

      function Item () {
        const value = useMapValue()
        const index = useMapIndex()

        return (
          <li>
            #{index}: {value}
          </li>
        )
      }

      const result = render(
        <ul>
          <map of={names}>
            <Item />
          </map>
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

      function Item () {
        const value = useMapValue()

        return (
          <li>
            {value}
          </li>
        )
      }

      const result = render(
        <ul>
          <map of={names}>
            <Item />
          </map>
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

      function Item () {
        const value = useMapValue<typeof people.value[0]>()

        return (
          <li>
            {() => use(value).name}
          </li>
        )
      }

      const result = render(
        <ul>
          <map of={people} key='id'>
            <Item />
          </map>
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
    it('should work with delay', async () => {
      const min = new State(1)
      const max = new State(2)
      const data = new Cache(() => {
        const result = []

        for (let i = min.value; i < max.value; i++) {
          result.push(i)
        }

        return result
      })

      function Item () {
        const value = useMapValue()

        return (
          <li>
            {value}
          </li>
        )
      }

      const result = render(
        <ul>
          <map of={data}>
            <delay hide={300}>
              <Item />
            </delay>
          </map>
        </ul>,
      )

      expect(getHTML(result)).toBe('<ul><li>1</li></ul>')

      min.value = 0

      await new Promise(resolve => setTimeout(resolve, 300))

      expect(data.value).toEqual([0, 1])
      expect(getHTML(result)).toBe('<ul><li>0</li><li>1</li></ul>')
    })
  })
})
