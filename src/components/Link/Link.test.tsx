import { historyPush } from '@watch-state/history-api'

import { getHTML, render } from '../../test'
import { Ref } from '../../utils'
import { Router } from '../Router'
import { createRouting } from '../Router/helpers/createRouting'
import { Link } from './Link'

describe('Link', () => {
  it('should work', async () => {
    await historyPush('/')

    const homeLink = new Ref<HTMLAnchorElement>()
    const testLink = new Ref<HTMLAnchorElement>()
    const unknownLink = new Ref<HTMLAnchorElement>()
    const content = new Ref<HTMLDivElement>()

    const HomePage = () => 'Home Page'
    const TestPage = () => 'Test Page'
    const NotFound = () => '404'

    const routing = createRouting([
      { index: true, component: HomePage },
      { index: true, path: 'test', component: TestPage },
      { component: NotFound },
    ])

    render(
      <div>
        <Link ref={homeLink} href='/'>home</Link>
        <Link ref={testLink} href='/test'>test</Link>
        <Link ref={unknownLink} href='/home'>unknown</Link>
        <div ref={content}>
          <Router routing={routing} />
        </div>
      </div>,
    )

    expect(getHTML(content.value)).toBe('<div>Home Page</div>')

    testLink.value?.click()

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(getHTML(content.value)).toBe('<div>Test Page</div>')

    unknownLink.value?.click()
    await new Promise(resolve => setTimeout(resolve, 100))

    expect(getHTML(content.value)).toBe('<div>404</div>')
  })
  it('should work without props', async () => {
    await historyPush('/')

    const app = render(<Link>home</Link>)

    expect(getHTML(app)).toBe('<a>home</a>')
  })
  it('should contain default props on external', async () => {
    await historyPush('/')

    const app = render(<Link href='https://cantinc.com'>CANT inc.</Link>)

    expect(getHTML(app)).toBe('<a href="https://cantinc.com" rel="noopener noreferrer nofollow" target="_blank">CANT inc.</a>')
  })
  it('should have self class', () => {
    expect(getHTML(render(
      <Link href='/' class='test'>
        CANT inc.
      </Link>,
    ))).toBe(
      '<a class="test" href="/">CANT inc.</a>',
    )

    expect(getHTML(render(
      <Link href='/' class={['test1', false, 0, 'test2']}>
        CANT inc.
      </Link>,
    ))).toBe(
      '<a class="test1 test2" href="/">CANT inc.</a>',
    )
  })
  it('should have active class', async () => {
    await historyPush('/')

    const app = render(
      <Link
        href='/'
        exact
        class={{ root: 'test', active: 'active' }}>
        CANT inc.
      </Link>,
    )

    expect(getHTML(app)).toBe('<a class="test active" href="/">CANT inc.</a>')

    await historyPush('/test')

    expect(getHTML(app)).toBe('<a class="test" href="/">CANT inc.</a>')

    await historyPush('/')

    expect(getHTML(app)).toBe('<a class="test active" href="/">CANT inc.</a>')
  })
  it('should work with any search', async () => {
    await historyPush('/')

    const app = render(
      <Link class={{ root: 'test', active: 'active' }} href='/test?phone=+7%20(999)%20999-99-99'>
        CANT inc.
      </Link>,
    )

    expect(getHTML(app)).toBe('<a class="test" href="/test?phone=+7%20(999)%20999-99-99">CANT inc.</a>')

    await historyPush('/test?phone=+7%20(999)%20999-99-99')

    expect(getHTML(app)).toBe('<a class="test active" href="/test?phone=+7%20(999)%20999-99-99">CANT inc.</a>')
  })
})
