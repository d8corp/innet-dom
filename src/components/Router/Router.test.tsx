import { historyPush } from '@watch-state/history-api'

import { useParam } from '../../hooks'
import { getHTML, render } from '../../test'
import { type ChildrenProps } from '../../types'
import { createRouting } from './helpers/createRouting'
import { Router } from './Router'

const Home = () => 'Home'
const NotFound = () => '404'
const About = () => 'About'
const Settings = () => 'Settings'

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
        { component: About, path: 'about' },
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
  })
  describe('lazy', () => {
    it('Should render home page', async () => {
      await historyPush('/')

      const routing = createRouting([
        { index: true, component: async () => Home, lazy: true },
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
          component: async () => Home,
          lazy: true,
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
          component: async () => {
            new Promise(resolve => setTimeout(resolve, 300))
            return MainLayout
          },
          lazy: true,
          fallback: 'Loading MainLayout...',
          children: [
            {
              index: true,
              component: async () => {
                new Promise(resolve => setTimeout(resolve, 300))
                return Home
              },
              lazy: true,
              fallback: 'Loading Home...',
            },
            {
              component: async () => {
                await new Promise(resolve => setTimeout(resolve, 300))
                return NotFound
              },
              lazy: true,
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
          component: async () => ({ default: Home }),
          lazy: true,
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
  describe('optional path segment', () => {
    it('should work with strict params', async () => {
      await historyPush('/')

      const routing = createRouting([
        { index: true, path: ':lang[en|ru]?', component: Home },
        { component: NotFound },
      ])

      const result = render(<Router routing={routing} />)

      expect(getHTML(result)).toBe('Home')

      await historyPush('/en')

      expect(getHTML(result)).toBe('Home')

      await historyPush('/ru')

      expect(getHTML(result)).toBe('Home')

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
