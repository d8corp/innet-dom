import { getHTML, render } from '../../../test'
import { Ref } from '../../../utils'
import { history } from '../router'

describe('link', () => {
  it('should work', () => {
    history.push('/')

    const homeLink = new Ref<HTMLAnchorElement>()
    const testLink = new Ref<HTMLAnchorElement>()
    const unknownLink = new Ref<HTMLAnchorElement>()
    const content = new Ref<HTMLDivElement>()

    render(
      <div>
        <a ref={homeLink} href="/">home</a>
        <a ref={testLink} href="/test">test</a>
        <a ref={unknownLink} href="/home">unknown</a>
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

    testLink.value.click()
    expect(getHTML(content.value)).toBe('<div>Test Page</div>')

    unknownLink.value.click()
    expect(getHTML(content.value)).toBe('<div>404</div>')
  })
  it('should work without props', () => {
    history.push('/')

    const app = render(<a>home</a>)

    expect(getHTML(app)).toBe('<a>home</a>')
  })
  it('should contain default props on external', () => {
    history.push('/')

    const app = render(<a href='https://cantinc.com'>CANT inc.</a>)

    expect(getHTML(app)).toBe('<a href="https://cantinc.com" rel="noopener noreferrer nofollow" target="_blank">CANT inc.</a>')
  })
  it('should have active class', () => {
    history.push('/')

    const app = render(
      <a
        href='/'
        exact
        class='test1'
        classes={{ root: 'test2', active: 'active' }}>
        CANT inc.
      </a>,
    )

    expect(getHTML(app)).toBe('<a href="/" class="test1 test2 active">CANT inc.</a>')

    history.push('/test')

    expect(getHTML(app)).toBe('<a href="/" class="test1 test2">CANT inc.</a>')

    history.push('/')

    expect(getHTML(app)).toBe('<a href="/" class="test1 test2 active">CANT inc.</a>')
  })
})
