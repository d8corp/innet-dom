import { type Routing } from '../types'
import { createRouting } from './createRouting'

const Home = () => 'Home'
const About = () => 'About'
const NotFound = () => '404'
const MainLayout = () => 'MainLayout'
const SecondLayout = () => 'SecondLayout'
const Settings = () => 'Settings'
const Todos = () => 'Todos'

describe('createRouting', () => {
  describe('success', () => {
    it('should return empty', () => {
      expect(createRouting([])).toEqual({})
    })
    it('should work with top level route', () => {
      const Home = () => 'Home'

      const routing = createRouting([
        {
          index: true,
          component: Home,
        },
      ])

      expect(routing).toEqual({
        index: {
          components: [Home],
          params: [],
          lazy: [false],
          fallback: [undefined],
        },
      } satisfies Routing)
    })
    it('should work with rest route', () => {
      const NotFound = () => '404'

      const routing = createRouting([
        {
          component: NotFound,
        },
      ])

      expect(routing).toEqual({
        rest: {
          components: [NotFound],
          params: [],
          lazy: [false],
          fallback: [undefined],
        },
      } satisfies Routing)
    })
    it('should work with index and rest together', () => {
      const Home = () => 'Home'
      const NotFound = () => '404'

      const routing = createRouting([
        {
          index: true,
          component: Home,
        },
        {
          component: NotFound,
        },
      ])

      expect(routing).toEqual({
        index: { components: [Home], params: [], lazy: [false], fallback: [undefined] },
        rest: { components: [NotFound], params: [], lazy: [false], fallback: [undefined] },
      } satisfies Routing)
    })
    it('should work with path', () => {
      const About = () => 'About'
      const Home = () => 'Home'
      const NotFound = () => '404'

      const routing = createRouting([
        {
          index: true,
          component: Home,
        },
        {
          index: true,
          path: 'about',
          component: About,
        },
        {
          component: NotFound,
        },
      ])

      expect(routing).toEqual({
        index: { components: [Home], params: [], lazy: [false], fallback: [undefined] },
        strict: {
          about: {
            index: { components: [About], params: [''], lazy: [false], fallback: [undefined] },
          },
        },
        rest: { components: [NotFound], params: [], lazy: [false], fallback: [undefined] },
      } satisfies Routing)
    })
    it('should work with simple deep path', () => {
      const AllTodos = () => 'AllTodos'
      const ActiveTodos = () => 'ActiveTodos'
      const InactiveTodos = () => 'InactiveTodos'

      const routing = createRouting([
        {
          path: 'todos',
          component: Todos,
          children: [
            {
              index: true,
              component: AllTodos,
            },
            {
              path: 'active',
              component: ActiveTodos,
            },
            {
              path: 'inactive',
              component: InactiveTodos,
            },
          ],
        },
      ])

      expect(routing).toEqual({
        strict: {
          todos: {
            index: {
              components: [Todos, AllTodos],
              params: [''],
              lazy: [false, false],
              fallback: [undefined, undefined],
            },
            strict: {
              active: {
                rest: {
                  components: [Todos, ActiveTodos],
                  params: ['', ''],
                  lazy: [false, false],
                  fallback: [undefined, undefined],
                },
              },
              inactive: {
                rest: {
                  components: [Todos, InactiveTodos],
                  params: ['', ''],
                  lazy: [false, false],
                  fallback: [undefined, undefined],
                },
              },
            },
          },
        },
      } satisfies Routing)
    })
    it('should work with deep path', () => {
      const Home = () => 'Home'
      const NotFound = () => '404'
      const Todos = () => 'Todos'
      const AllTodos = () => 'AllTodos'
      const ActiveTodos = () => 'ActiveTodos'
      const InactiveTodos = () => 'InactiveTodos'

      const routing = createRouting([
        {
          index: true,
          component: Home,
        },
        {
          path: 'todos',
          component: Todos,
          children: [
            {
              index: true,
              component: AllTodos,
            },
            {
              path: 'active',
              component: ActiveTodos,
            },
            {
              path: 'inactive',
              component: InactiveTodos,
            },
          ],
        },
        {
          component: NotFound,
        },
      ])

      expect(routing).toEqual({
        index: { components: [Home], params: [], lazy: [false], fallback: [undefined] },
        strict: {
          todos: {
            index: { components: [Todos, AllTodos], params: [''], lazy: [false, false], fallback: [undefined, undefined] },
            strict: {
              active: { rest: { components: [Todos, ActiveTodos], params: ['', ''], lazy: [false, false], fallback: [undefined, undefined] } },
              inactive: { rest: { components: [Todos, InactiveTodos], params: ['', ''], lazy: [false, false], fallback: [undefined, undefined] } },
            },
          },
        },
        rest: { components: [NotFound], params: [], lazy: [false], fallback: [undefined] },
      } satisfies Routing)
    })
    it('should work with deep mixed path', () => {
      const TodoSettings = () => 'TodoSettings'
      const Todos = () => 'Todos'
      const AllTodos = () => 'AllTodos'
      const ActiveTodos = () => 'ActiveTodos'
      const InactiveTodos = () => 'InactiveTodos'

      const routing = createRouting([
        {
          path: 'todos',
          component: Todos,
          children: [
            {
              index: true,
              component: AllTodos,
            },
            {
              path: 'active',
              component: ActiveTodos,
            },
            {
              path: 'inactive',
              component: InactiveTodos,
            },
          ],
        },
        {
          path: 'todos/settings',
          component: TodoSettings,
        },
      ])

      expect(routing).toEqual({
        strict: {
          todos: {
            index: { components: [Todos, AllTodos], params: [''], lazy: [false, false], fallback: [undefined, undefined] },
            strict: {
              settings: {
                rest: {
                  components: [TodoSettings],
                  lazy: [false],
                  fallback: [undefined],
                  params: ['', ''],
                },
              },
              active: { rest: { components: [Todos, ActiveTodos], params: ['', ''], lazy: [false, false], fallback: [undefined, undefined] } },
              inactive: { rest: { components: [Todos, InactiveTodos], params: ['', ''], lazy: [false, false], fallback: [undefined, undefined] } },
            },
          },
        },
      } satisfies Routing)
    })
    it('should work with path param', () => {
      const Todo = () => 'Todo'

      const routing = createRouting([
        {
          path: ':todoId',
          component: Todo,
        },
      ])

      expect(routing).toEqual({
        children: {
          rest: { components: [Todo], params: ['todoId'], lazy: [false], fallback: [undefined] },
        },
      } satisfies Routing)
    })
    it('should work with deep path param', () => {
      const Home = () => 'Home'
      const NotFound = () => '404'
      const Todo = () => 'Todo'

      const routing = createRouting([
        {
          index: true,
          component: Home,
        },
        {
          path: 'todo/:todoId',
          component: Todo,
        },
        {
          component: NotFound,
        },
      ])

      expect(routing).toEqual({
        index: { components: [Home], params: [], lazy: [false], fallback: [undefined] },
        strict: {
          todo: {
            children: {
              rest: { components: [Todo], params: ['', 'todoId'], lazy: [false], fallback: [undefined] },
            },
          },
        },
        rest: { components: [NotFound], params: [], lazy: [false], fallback: [undefined] },
      } satisfies Routing)
    })
    it('should work with deep structure path param', () => {
      const Todo = () => 'Todo'

      const routing = createRouting([
        {
          path: 'todo',
          children: [
            {
              path: ':todoId',
              component: Todo,
            },
          ],
        },
      ])

      expect(routing).toEqual({
        strict: {
          todo: {
            children: {
              rest: { components: [Todo], params: ['', 'todoId'], lazy: [false], fallback: [undefined] },
            },
          },
        },
      } satisfies Routing)
    })
    it('should work with complex routing', () => {
      const Home = () => 'Home'
      const Todos = () => 'Todos'
      const AllTodos = () => 'AllTodos'
      const ActiveTodos = () => 'ActiveTodos'
      const InactiveTodos = () => 'InactiveTodos'
      const About = () => 'About'
      const Todo = () => 'Todo'
      const NotFound = () => '404'

      const routing = createRouting([
        {
          index: true,
          component: Home,
        },
        {
          path: 'todos',
          component: Todos,
          children: [
            {
              index: true,
              component: AllTodos,
            },
            {
              path: 'active',
              component: ActiveTodos,
            },
            {
              path: 'inactive',
              component: InactiveTodos,
            },
          ],
        },
        {
          index: true,
          path: 'about',
          component: About,
        },
        {
          path: 'todo/:id',
          component: Todo,
        },
        {
          component: NotFound,
        },
      ])

      expect(routing).toEqual({
        index: { components: [Home], params: [], lazy: [false], fallback: [undefined] },
        strict: {
          todos: {
            index: { components: [Todos, AllTodos], params: [''], lazy: [false, false], fallback: [undefined, undefined] },
            strict: {
              active: { rest: { components: [Todos, ActiveTodos], params: ['', ''], lazy: [false, false], fallback: [undefined, undefined] } },
              inactive: { rest: { components: [Todos, InactiveTodos], params: ['', ''], lazy: [false, false], fallback: [undefined, undefined] } },
            },
          },
          about: {
            index: { components: [About], params: [''], lazy: [false], fallback: [undefined] },
          },
          todo: {
            children: {
              rest: { components: [Todo], params: ['', 'id'], lazy: [false], fallback: [undefined] },
            },
          },
        },
        rest: { components: [NotFound], params: [], lazy: [false], fallback: [undefined] },
      } satisfies Routing)
    })
    it('should work with layout complex routing', () => {
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

      expect(routing).toEqual({
        index: { components: [MainLayout, Home], params: [], lazy: [false, false], fallback: [undefined, undefined] },
        strict: {
          about: { index: { components: [MainLayout, About], params: [''], lazy: [false, false], fallback: [undefined, undefined] } },
          settings: { index: { components: [SecondLayout, Settings], params: [''], lazy: [false, false], fallback: [undefined, undefined] } },
        },
        rest: {
          components: [MainLayout, NotFound],
          params: [],
          lazy: [false, false],
          fallback: [undefined, undefined],
        },
      } satisfies Routing)
    })
  })
  describe('errors', () => {
    it('should error if rest duplicates', () => {
      const Home = () => 'Home'
      const NotFound = () => '404'

      const testCase = () => {
        createRouting([
          { component: Home },
          { component: NotFound },
        ])
      }

      expect(testCase).toThrowError('Routing Error. Do not use the same routes.')
    })
    it('should error if a param twice', () => {
      const Home = () => 'Home'
      const NotFound = () => '404'

      const testCase = () => {
        createRouting([
          { path: ':id', component: Home },
          { path: ':uuid', component: NotFound },
        ])
      }

      expect(testCase).toThrowError('Routing Error. Do not use the same routes.')
    })
    it('should error if the same path', () => {
      const Home = () => 'Home'
      const NotFound = () => '404'

      const testCase = () => {
        createRouting([
          { path: 'home', component: Home },
          { path: 'home', component: NotFound },
        ])
      }

      expect(testCase).toThrowError('Routing Error. Do not use the same routes.')
    })
    it('should error if the same path deep', () => {
      const Home = () => 'Home'
      const NotFound = () => '404'

      const testCase = () => {
        createRouting([
          { path: 'foo', children: [{ path: 'bar', component: Home }] },
          { path: 'foo/bar', component: NotFound },
        ])
      }

      expect(testCase).toThrowError('Routing Error. Do not use the same routes.')
    })
    it('should error if index duplicates', () => {
      const Home = () => 'Home'
      const NotFound = () => '404'

      const testCase = () => {
        createRouting([
          { index: true, component: Home },
          { index: true, component: NotFound },
        ])
      }

      expect(testCase).toThrowError('Routing Error. Do not use index routes twice.')
    })
  })
})
