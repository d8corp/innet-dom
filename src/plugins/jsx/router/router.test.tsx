import { JsxTemplate } from '@innet/jsx'

import { getHTML, render } from '../../../test'
import { getRoute, history } from './router'

describe('router', () => {
  it('should work', () => {
    const result = render(
      <router>
        <slot name='/'>
          Home
        </slot>
        <slot name='test'>
          Test
        </slot>
        Not Found
      </router>,
    )

    expect(getHTML(result)).toBe('Home')

    history.push('/test')
    expect(getHTML(result)).toBe('Test')

    history.push('/404')
    expect(getHTML(result)).toBe('Not Found')

    history.push('/test/1')
    expect(getHTML(result)).toBe('Not Found')
  })
  it('should work with ish', () => {
    history.push('/')

    const result = render(
      <router ish>
        <slot name='/'>
          Home
        </slot>
        <slot name='test'>
          Test
        </slot>
        Not Found
      </router>,
    )

    expect(getHTML(result)).toBe('Home')

    history.push('/test')
    expect(getHTML(result)).toBe('Test')

    history.push('/404')
    expect(getHTML(result)).toBe('Not Found')

    history.push('/test/1')
    expect(getHTML(result)).toBe('Test')
  })
  it('should deep work', () => {
    history.push('/')

    const result = render(
      <router>
        <slot name='/'>
          Home
        </slot>
        <router ish>
          <slot name='strong'>
            <router>
              <slot name='/'>
                Strong
              </slot>
              <slot name='create'>
                Strong Create
              </slot>
              Strong Not Found
            </router>
          </slot>
          <slot name='ish'>
            Ish
          </slot>
          Not Found
        </router>
      </router>,
    )

    expect(getHTML(result)).toBe('Home')

    history.push('/strong')
    expect(getHTML(result)).toBe('Strong')

    history.push('/strong/create')
    expect(getHTML(result)).toBe('Strong Create')

    history.push('/strong/test')
    expect(getHTML(result)).toBe('Strong Not Found')

    history.push('/ish')
    expect(getHTML(result)).toBe('Ish')

    history.push('/ish/test')
    expect(getHTML(result)).toBe('Ish')

    history.push('/404')
    expect(getHTML(result)).toBe('Not Found')
  })
  it('should work with search', () => {
    history.push('/')

    const result = render(
      <router search='modal'>
        <slot name='test1'>
          Test1
        </slot>
        <slot name='test2'>
          Test2
        </slot>
      </router>,
    )

    expect(getHTML(result)).toBe('')

    history.push('?modal=test1')
    expect(getHTML(result)).toBe('Test1')

    history.push('?modal=test')
    expect(getHTML(result)).toBe('')

    history.push('?modal=test2')
    expect(getHTML(result)).toBe('Test2')
  })
  it('should work with mix of source', () => {
    history.push('/')

    const result = render(
      <router search='modal'>
        <slot name='test1'>
          <router>
            <slot name='/'>
              Test1 on home page
            </slot>
            Test1
          </router>
        </slot>
        <slot name='test2'>
          Test2
        </slot>
      </router>,
    )

    expect(getHTML(result)).toBe('')

    history.push('?modal=test1')
    expect(getHTML(result)).toBe('Test1 on home page')

    history.push('/test?modal=test1')
    expect(getHTML(result)).toBe('Test1')

    history.push('?modal=test')
    expect(getHTML(result)).toBe('')

    history.push('?modal=test2')
    expect(getHTML(result)).toBe('Test2')
  })
  it('getRoute', () => {
    history.push('/')

    const App: JsxTemplate = (props, children, handler) => {
      const route = getRoute(handler)
      return route.value
    }

    const result = render(
      <router ish>
        <slot name='/'>
          Home page: <App />
        </slot>
        <slot name='settings'>
          Settings: <App />
        </slot>
        Other: <App />
      </router>,
    )

    expect(getHTML(result)).toBe('Home page:/')

    history.push('/settings')
    expect(getHTML(result)).toBe('Settings:/')

    history.push('/settings/test')
    expect(getHTML(result)).toBe('Settings:test')

    history.push('/any-other')
    expect(getHTML(result)).toBe('Other:any-other')
  })
})
