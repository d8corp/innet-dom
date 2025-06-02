import { historyPush } from '@watch-state/history-api'

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

    await historyPush('/about/something')

    expect(getHTML(result)).toBe('About')
  })
  it('Should render index about page', async () => {
    await historyPush('/')

    const routing = createRouting([
      { index: true, component: Home },
      { index: true, component: About, path: 'about' },
      { component: NotFound },
    ])

    const result = render(<Router routing={routing} />)

    expect(getHTML(result)).toBe('Home')

    await historyPush('/about')

    expect(getHTML(result)).toBe('About')

    await historyPush('/about/something')

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
          { path: '*/test', component: About },
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
