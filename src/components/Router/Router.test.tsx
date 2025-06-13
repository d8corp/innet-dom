import { historyPush } from '@watch-state/history-api'
import { State } from 'watch-state'

import { useParam } from '../../hooks'
import { getHTML, render } from '../../test'
import { type ChildrenProps } from '../../types'
import { lazy } from '../../utils'
import { createRouting } from './helpers/createRouting'
import { Router } from './Router'

const Home = () => 'Home'
const NotFound = () => '404'
const About = () => 'About'
const Settings = () => 'Settings'
const Prelogin = () => 'Prelogin'
const Foo = () => 'Foo'
const Bar = () => 'Bar'
const FooBar = () => 'FooBar'

const MainLayout = (props: ChildrenProps) => <div>{props.children}</div>
const SecondLayout = (props: ChildrenProps) => <span>{props.children}</span>

describe('Router', () => {
  describe('main', () => {
    it('Should render correctly', () => {
      const routing = createRouting([])

      const result = render(<Router routing={routing} />)

      expect(getHTML(result)).toBe('')
    })
    it('Should render home page', async () => {
      await historyPush('/')

      const routing = createRouting([
        { index: true, component: Home },
      ])

      const result = render(<Router routing={routing} />)

      expect(getHTML(result)).toBe('Home')

      await historyPush('/test')

      expect(getHTML(result)).toBe('')
    })
    it('Should render 404 page', async () => {
      await historyPush('/')

      const routing = createRouting([
        { index: true, component: Home },
        { component: NotFound },
      ])

      const result = render(<Router routing={routing} />)

      expect(getHTML(result)).toBe('Home')

      await historyPush('/test')

      expect(getHTML(result)).toBe('404')
    })
    it('Should render about page', async () => {
      await historyPush('/')

      const routing = createRouting([
        { index: true, component: Home },
        { path: 'about', component: About },
        { component: NotFound },
      ])

      const result = render(<Router routing={routing} />)

      expect(getHTML(result)).toBe('Home')

      await historyPush('/about')

      expect(getHTML(result)).toBe('About')

      await historyPush('/about/foo')

      expect(getHTML(result)).toBe('About')
    })
    it('Should render index about page', async () => {
      await historyPush('/')

      const routing = createRouting([
        { index: true, component: Home },
        { index: true, path: 'about', component: About },
        { component: NotFound },
      ])

      const result = render(<Router routing={routing} />)

      expect(getHTML(result)).toBe('Home')

      await historyPush('/about')

      expect(getHTML(result)).toBe('About')

      await historyPush('/about/foo')

      expect(getHTML(result)).toBe('404')
    })
    it('Should render layout', async () => {
      await historyPush('/')

      const routing = createRouting([
        {
          component: MainLayout,
          children: [
            { index: true, component: Home },
            { index: true, path: 'about', component: About },
            { component: NotFound },
          ],
        },
        {
          component: SecondLayout,
          children: [
            { index: true, path: 'settings', component: Settings },
          ],
        },
      ])

      const result = render(<Router routing={routing} />)

      expect(getHTML(result)).toBe('<div>Home</div>')

      await historyPush('/about')

      expect(getHTML(result)).toBe('<div>About</div>')

      await historyPush('/settings')

      expect(getHTML(result)).toBe('<span>Settings</span>')
    })
    it('Should render list of segments', async () => {
      await historyPush('/')

      const routing = createRouting([
        { index: true, component: Home },
        { path: 'foo|bar', component: FooBar },
        { component: NotFound },
      ])

      const result = render(<Router routing={routing} />)

      expect(getHTML(result)).toBe('Home')

      await historyPush('/foo')

      expect(getHTML(result)).toBe('FooBar')

      await historyPush('/bar')

      expect(getHTML(result)).toBe('FooBar')

      await historyPush('/baz')

      expect(getHTML(result)).toBe('404')
    })
    it('Should render optional segment', async () => {
      await historyPush('/')

      const Settings = ({ children }: ChildrenProps) => <div>{children}</div>
      const MainTab = () => 'Main Tab'
      const AccountTab = () => 'Account Tab'
      const NotificationsTab = () => 'Notifications Tab'
      const NotFound = () => 'NotFound Page'

      const routing = createRouting([
        { index: true, component: Home },
        {
          path: 'settings',
          component: Settings,
          children: [
            { index: true, path: 'main?', component: MainTab },
            { index: true, path: 'account', component: AccountTab },
            { index: true, path: 'notifications', component: NotificationsTab },
          ],
        },
        { component: NotFound },
      ])

      const result = render(<Router routing={routing} />)

      expect(getHTML(result)).toBe('Home')

      await historyPush('/settings')

      expect(getHTML(result)).toBe('<div>Main Tab</div>')

      await historyPush('/settings/main')

      expect(getHTML(result)).toBe('<div>Main Tab</div>')

      await historyPush('/settings/account')

      expect(getHTML(result)).toBe('<div>Account Tab</div>')

      await historyPush('/settings/notifications')

      expect(getHTML(result)).toBe('<div>Notifications Tab</div>')

      await historyPush('/settings/foo')

      expect(getHTML(result)).toBe('NotFound Page')

      await historyPush('/foo')

      expect(getHTML(result)).toBe('NotFound Page')
    })
    it('Should work with permissions', async () => {
      await historyPush('/')

      const permissions = new State(new Set<string>())

      const routing = createRouting([
        {
          component: MainLayout,
          children: [
            { index: true, component: Home },
            { index: true, path: 'about', component: About },
            { component: NotFound },
          ],
        },
        {
          component: SecondLayout,
          permissions: ['postlogin'],
          children: [
            { index: true, path: 'settings', component: Settings },
          ],
        },
      ])

      const result = render(<Router routing={routing} permissions={permissions} />)

      expect(getHTML(result)).toBe('<div>Home</div>')

      await historyPush('/about')

      expect(getHTML(result)).toBe('<div>About</div>')

      await historyPush('/settings')

      expect(getHTML(result)).toBe('<div>404</div>')

      permissions.value.add('postlogin')
      permissions.update()

      expect(getHTML(result)).toBe('<span>Settings</span>')

      permissions.value.delete('postlogin')
      permissions.update()

      expect(getHTML(result)).toBe('<div>404</div>')
    })
    it('Should work with different pages for different permissions', async () => {
      await historyPush('/')

      const permissions = new State(new Set<string>())

      const routing = createRouting([
        {
          index: true,
          component: Prelogin,
        },
        {
          component: MainLayout,
          children: [
            { index: true, path: 'about', component: About },
            {
              permissions: ['postlogin'],
              children: [
                { index: true, component: Home },
                { index: true, path: 'settings', component: Settings },
              ],
            },
            { component: NotFound },
          ],
        },
      ])

      const result = render(<Router routing={routing} permissions={permissions} />)

      expect(getHTML(result)).toBe('Prelogin')

      await historyPush('/about')

      expect(getHTML(result)).toBe('<div>About</div>')

      await historyPush('/settings')

      expect(getHTML(result)).toBe('<div>404</div>')

      permissions.value.add('postlogin')
      permissions.update()

      expect(getHTML(result)).toBe('<div>Settings</div>')

      await historyPush('/')

      expect(getHTML(result)).toBe('<div>Home</div>')

      permissions.value.delete('postlogin')
      permissions.update()

      expect(getHTML(result)).toBe('Prelogin')
    })
  })
  describe('lazy', () => {
    it('Should render home page', async () => {
      await historyPush('/')

      const routing = createRouting([
        { index: true, component: lazy(async () => Home) },
      ])

      const result = render(<Router routing={routing} />)

      await new Promise(resolve => setTimeout(resolve))

      expect(getHTML(result)).toBe('Home')

      await historyPush('/test')

      expect(getHTML(result)).toBe('')
    })
    it('Should render fallback', async () => {
      await historyPush('/')

      const routing = createRouting([
        {
          index: true,
          component: lazy(async () => Home),
          fallback: 'Loading...',
        },
      ])

      const result = render(<Router routing={routing} />)

      expect(getHTML(result)).toBe('Loading...')

      await new Promise(resolve => setTimeout(resolve))

      expect(getHTML(result)).toBe('Home')

      await historyPush('/test')

      expect(getHTML(result)).toBe('')
    })
    it('Should render lazy deep', async () => {
      await historyPush('/')

      const routing = createRouting([
        {
          component: lazy(async () => {
            new Promise(resolve => setTimeout(resolve, 300))
            return MainLayout
          }),
          fallback: 'Loading MainLayout...',
          children: [
            {
              index: true,
              component: lazy(async () => {
                new Promise(resolve => setTimeout(resolve, 300))
                return Home
              }),
              fallback: 'Loading Home...',
            },
            {
              component: lazy(async () => {
                await new Promise(resolve => setTimeout(resolve, 300))
                return NotFound
              }),
              fallback: 'Loading NotFound...',
            },
          ],
        },
      ])

      const result = render(<Router routing={routing} />)

      expect(getHTML(result)).toBe('Loading MainLayout...')

      await new Promise(resolve => setTimeout(resolve, 300))

      expect(getHTML(result)).toBe('<div>Home</div>')

      await historyPush('/test')

      expect(getHTML(result)).toBe('<div>Loading NotFound...</div>')

      await new Promise(resolve => setTimeout(resolve, 300))

      expect(getHTML(result)).toBe('<div>404</div>')

      await historyPush('/')

      expect(getHTML(result)).toBe('<div>Home</div>')

      await historyPush('/test')

      expect(getHTML(result)).toBe('<div>404</div>')
    })
    it('Should work with default', async () => {
      await historyPush('/')

      const routing = createRouting([
        {
          index: true,
          component: lazy(async () => ({ default: Home })),
          fallback: 'Loading...',
        },
      ])

      const result = render(<Router routing={routing} />)

      expect(getHTML(result)).toBe('Loading...')

      await new Promise(resolve => setTimeout(resolve))

      expect(getHTML(result)).toBe('Home')

      await historyPush('/test')

      expect(getHTML(result)).toBe('')
    })
  })
  describe('children', () => {
    it('Should work with childrenFallback', async () => {
      await historyPush('/')

      const routing = createRouting([
        { index: true, component: Home },
        {
          childrenFallback: 'Loading...',
          children: [
            {
              index: true,
              path: 'foo',
              component: lazy(async () => {
                await new Promise(resolve => setTimeout(resolve))
                return Foo
              }),
            },
            {
              index: true,
              path: 'bar',
              component: lazy(async () => {
                await new Promise(resolve => setTimeout(resolve))
                return Bar
              }),
            },
          ],
        },
      ])

      const result = render(<Router routing={routing} />)

      expect(getHTML(result)).toBe('Home')

      await historyPush('/foo')

      expect(getHTML(result)).toBe('Loading...')

      await new Promise(resolve => setTimeout(resolve))

      expect(getHTML(result)).toBe('Foo')

      await historyPush('/bar')

      expect(getHTML(result)).toBe('Loading...')

      await new Promise(resolve => setTimeout(resolve))

      expect(getHTML(result)).toBe('Bar')
    })
  })
  describe('optional path segment', () => {
    it('should work with strict params', async () => {
      await historyPush('/')

      const Home = () => {
        const lang = useParam('lang')

        return <>Home: {lang}</>
      }

      const routing = createRouting([
        {
          path: ':lang[en|ru]?',
          children: [
            { index: true, component: Home },
            { index: true, path: 'about', component: About },
          ],
        },
        { component: NotFound },
      ])

      const result = render(<Router routing={routing} />)

      expect(getHTML(result)).toBe('Home: ')

      await historyPush('/en')

      expect(getHTML(result)).toBe('Home: en')

      await historyPush('/ru')

      expect(getHTML(result)).toBe('Home: ru')

      await historyPush('/about')

      expect(getHTML(result)).toBe('About')

      await historyPush('/en/about')

      expect(getHTML(result)).toBe('About')

      await historyPush('/ru/about')

      expect(getHTML(result)).toBe('About')

      await historyPush('/foo')

      expect(getHTML(result)).toBe('404')

      await historyPush('/en/foo')

      expect(getHTML(result)).toBe('404')
    })
  })
  describe('params', () => {
    it('should provide params', async () => {
      await historyPush('/')

      const UserPage = () => {
        const user = useParam('userId')

        return <div>User: {user}</div>
      }

      const routing = createRouting([
        { index: true, component: Home },
        { index: true, path: 'users/:userId', component: UserPage },
        { component: NotFound },
      ])

      const result = render(<Router routing={routing} />)

      expect(getHTML(result)).toBe('Home')

      await historyPush('/users/123')

      expect(getHTML(result)).toBe('<div>User: 123</div>')

      await historyPush('/users')

      expect(getHTML(result)).toBe('404')

      await historyPush('/users/123/321')

      expect(getHTML(result)).toBe('404')
    })
    it('should work with optional params', async () => {
      await historyPush('/')

      const UserPage = () => {
        const user = useParam('userId')

        return <div>User: {user}</div>
      }

      const routing = createRouting([
        { index: true, component: Home },
        { index: true, path: 'users/:userId?', component: UserPage },
        { component: NotFound },
      ])

      const result = render(<Router routing={routing} />)

      expect(getHTML(result)).toBe('Home')

      await historyPush('/users/123')

      expect(getHTML(result)).toBe('<div>User: 123</div>')

      await historyPush('/users')

      expect(getHTML(result)).toBe('<div>User: </div>')

      await historyPush('/users/foo/bar')

      expect(getHTML(result)).toBe('404')
    })
  })
})
