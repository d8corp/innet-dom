import { historyPush } from '@watch-state/history-api'

import { getHTML, render } from '../../../test'
import { Ref } from '../../../utils'

describe('link', () => {
  it('should work', async () => {
    await historyPush('/')

    const homeLink = new Ref<HTMLAnchorElement>()
    const testLink = new Ref<HTMLAnchorElement>()
    const unknownLink = new Ref<HTMLAnchorElement>()
    const content = new Ref<HTMLDivElement>()

    render(
      <div>
        <a ref={homeLink} href='/'>home</a>
        <a ref={testLink} href='/test'>test</a>
        <a ref={unknownLink} href='/home'>unknown</a>
        <div ref={content}>
          <router>
            <slot name='/'>
              Home Page
            </slot>
            <slot name='test'>
              Test Page
            </slot>
            404
          </router>
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

    const app = render(<a>home</a>)

    expect(getHTML(app)).toBe('<a>home</a>')
  })
  it('should contain default props on external', async () => {
    await historyPush('/')

    const app = render(<a href='https://cantinc.com'>CANT inc.</a>)

    expect(getHTML(app)).toBe('<a href="https://cantinc.com" rel="noopener noreferrer nofollow" target="_blank">CANT inc.</a>')
  })
  it('should have self class', () => {
    expect(getHTML(render(
      <a href='/' class='test'>
        CANT inc.
      </a>,
    ))).toBe(
      '<a class="test" href="/">CANT inc.</a>',
    )

    expect(getHTML(render(
      <a href='/' class={['test1', false, 0, 'test2']}>
        CANT inc.
      </a>,
    ))).toBe(
      '<a class="test1 test2" href="/">CANT inc.</a>',
    )
  })
  it('should have active class', async () => {
    await historyPush('/')

    const app = render(
      <a
        href='/'
        exact
        class={{ root: 'test', active: 'active' }}>
        CANT inc.
      </a>,
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
      <a class={{ root: 'test', active: 'active' }} href='/test?phone=+7%20(999)%20999-99-99'>
        CANT inc.
      </a>,
    )

    expect(getHTML(app)).toBe('<a class="test" href="/test?phone=+7%20(999)%20999-99-99">CANT inc.</a>')

    await historyPush('/test?phone=+7%20(999)%20999-99-99')

    expect(getHTML(app)).toBe('<a class="test active" href="/test?phone=+7%20(999)%20999-99-99">CANT inc.</a>')
  })
})
