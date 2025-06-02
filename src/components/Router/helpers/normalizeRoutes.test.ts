import { type Route } from '../types'
import { type NormalizedRoute, normalizeRoutes } from './normalizeRoutes'

const Todo = () => 'Todo'

describe('normalizeRoutes', () => {
  it('should work with empty router', () => {
    expect(normalizeRoutes([])).toEqual([])
  })
  it('should work with simple path', () => {
    const input: Route[] = [
      { path: 'todos', component: Todo },
    ]

    const output: NormalizedRoute[] = [
      {
        path: 'todos',
        children: [
          { component: Todo },
        ],
      },
    ]

    expect(normalizeRoutes(input)).toEqual(output)
  })
  it('should work with normalized simple path', () => {
    const Todo = () => 'Todo'

    const input: Route[] = [
      {
        path: 'todos',
        children: [
          { component: Todo },
        ],
      },
    ]

    const output: NormalizedRoute[] = [
      {
        path: 'todos',
        children: [
          { component: Todo },
        ],
      },
    ]

    expect(normalizeRoutes(input)).toEqual(output)
  })
  it('should work', () => {
    const Todo = () => 'Todo'

    const input: Route[] = [
      { path: 'todos/:todoId', component: Todo },
    ]

    const output: NormalizedRoute[] = [
      {
        path: 'todos',
        children: [
          {
            path: ':todoId',
            children: [
              { component: Todo },
            ],
          },
        ],
      },
    ]

    expect(normalizeRoutes(input)).toEqual(output)
  })
  it('should work deep', () => {
    const Todo = () => 'Todo'

    const input: Route[] = [
      { path: 'todos/:todoId', children: [{ component: Todo }] },
    ]

    const output: NormalizedRoute[] = [
      {
        path: 'todos',
        children: [
          {
            path: ':todoId',
            children: [
              {
                children: [{ component: Todo }],
              },
            ],
          },
        ],
      },
    ]

    expect(normalizeRoutes(input)).toEqual(output)
  })
  it('should reduce slashes', () => {
    const input: Route[] = [
      { path: '/todo/', component: Todo },
    ]

    const output: NormalizedRoute[] = [
      {
        path: 'todo',
        children: [
          {
            component: Todo,
          },
        ],
      },
    ]

    expect(normalizeRoutes(input)).toEqual(output)
  })
})
