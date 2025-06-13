import { type Route, type RoutingRoute } from '../types'
import { createRouting } from './createRouting'
import { findRoute } from './findRoute'

const NotFound = () => '404'
const Home = () => 'Home'
const About = () => 'About'
const Todo = () => 'Todo'
const Todos = () => 'Todos'
const AllTodos = () => 'AllTodos'
const ActiveTodos = () => 'ActiveTodos'
const InactiveTodos = () => 'InactiveTodos'
const MainLayout = () => 'MainLayout'
const SecondLayout = () => 'SecondLayout'
const Settings = () => 'Settings'

const todoRoutes: Route[] = [
  { index: true, component: Home },
  {
    path: 'todos',
    children: [
      {
        component: Todos,
        children: [
          { index: true, component: AllTodos },
          { path: 'active', children: [{ component: ActiveTodos }] },
          { path: 'inactive', children: [{ component: InactiveTodos }] },
        ],
      },
    ],
  },
  { path: 'todo/:id', component: Todo },
  { index: true, path: 'about', component: About },
  {
    path: ':test[foo|bar]',
    component: Home,
  },
  { component: NotFound },
]

const todoRouting = createRouting(todoRoutes)

describe('findRoute', () => {
  describe('todos', () => {
    it('home page', () => {
      const params: Record<string, string> = {}
      const result = findRoute(todoRouting, [], params, new Set())

      expect(result).toEqual({ components: [Home], fallback: [undefined], params: [] } satisfies RoutingRoute)
      expect(params).toEqual({})
    })
    it('about page', () => {
      const params: Record<string, string> = {}
      const result = findRoute(todoRouting, ['about'], params, new Set())

      expect(result).toEqual({ components: [About], fallback: [undefined], params: [''] } satisfies RoutingRoute)
      expect(params).toEqual({})
    })
    it('404 page', () => {
      const params: Record<string, string> = {}
      const result = findRoute(todoRouting, ['404'], params, new Set())

      expect(result).toEqual({ components: [NotFound], fallback: [undefined], params: [] } satisfies RoutingRoute)
      expect(params).toEqual({})
    })
    it('404 about page', () => {
      const params: Record<string, string> = {}
      const result = findRoute(todoRouting, ['about', 'test'], params, new Set())

      expect(result).toEqual({ components: [NotFound], fallback: [undefined], params: [] } satisfies RoutingRoute)
      expect(params).toEqual({})
    })
    it('todo page', () => {
      const params: Record<string, string> = {}
      const result = findRoute(todoRouting, ['todo', '1'], params, new Set())

      expect(result).toEqual({ components: [Todo], fallback: [undefined], params: ['', 'id'] } satisfies RoutingRoute)
      expect(params).toEqual({ id: '1' })
    })
    it('todo page without param', () => {
      const params: Record<string, string> = {}
      const result = findRoute(todoRouting, ['todo'], params, new Set())

      expect(result).toEqual({ components: [NotFound], fallback: [undefined], params: [] } satisfies RoutingRoute)
      expect(params).toEqual({})
    })
    it('todos page all todos', () => {
      const params: Record<string, string> = {}
      const result = findRoute(todoRouting, ['todos'], params, new Set())

      expect(result).toEqual({ components: [Todos, AllTodos], fallback: [undefined, undefined], params: [''] } satisfies RoutingRoute)
      expect(params).toEqual({})
    })
    it('todos page active todos', () => {
      const params: Record<string, string> = {}
      const result = findRoute(todoRouting, ['todos', 'active'], params, new Set())

      expect(result).toEqual({ components: [Todos, ActiveTodos], fallback: [undefined, undefined], params: ['', ''] } satisfies RoutingRoute)
      expect(params).toEqual({})
    })
    it('foo', () => {
      const params: Record<string, string> = {}
      const result = findRoute(todoRouting, ['foo'], params, new Set())

      expect(result).toEqual({ components: [Home], fallback: [undefined], params: ['test'] } satisfies RoutingRoute)
      expect(params).toEqual({ test: 'foo' })
    })
    it('bar', () => {
      const params: Record<string, string> = {}
      const result = findRoute(todoRouting, ['bar'], params, new Set())

      expect(result).toEqual({ components: [Home], fallback: [undefined], params: ['test'] } satisfies RoutingRoute)
      expect(params).toEqual({ test: 'bar' })
    })
    it('complex', () => {
      const routing = createRouting([
        {
          component: MainLayout,
          children: [
            { index: true, component: Home },
            { index: true, path: 'about', component: About },
          ],
        },
        {
          component: SecondLayout,
          children: [
            { index: true, path: 'settings', component: Settings },
          ],
        },
        {
          component: MainLayout,
          children: [
            { component: NotFound },
          ],
        },
      ])
      const params: Record<string, string> = {}
      const result = findRoute(routing, ['settings'], params, new Set())

      expect(result).toEqual({ components: [SecondLayout, Settings], fallback: [undefined, undefined], params: [''] } satisfies RoutingRoute)
      expect(params).toEqual({})
    })
  })
})
