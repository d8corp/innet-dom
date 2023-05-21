import { type JsxComponent } from '@innet/jsx'
import { historyPush } from '@watch-state/history-api'

import { getHTML, render } from '../../../test'
import { useRoute } from './router'

describe('router', () => {
  it('should work if the router is empty', () => {
    const result = render(
      <router />,
    )

    expect(getHTML(result)).toBe('')
  })
  it('should work', async () => {
    await historyPush('/')

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

    await historyPush('/test')

    expect(getHTML(result)).toBe('Test')

    await historyPush('/404')
    expect(getHTML(result)).toBe('Not Found')

    await historyPush('/test/1')
    expect(getHTML(result)).toBe('Not Found')
  })
  it('should work with ish', async () => {
    await historyPush('/')

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

    await historyPush('/test')
    expect(getHTML(result)).toBe('Test')

    await historyPush('/404')
    expect(getHTML(result)).toBe('Not Found')

    await historyPush('/test/1')
    expect(getHTML(result)).toBe('Test')
  })
  it('should deep work', async () => {
    await historyPush('/')

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

    await historyPush('/strong')
    expect(getHTML(result)).toBe('Strong')

    await historyPush('/strong/create')
    expect(getHTML(result)).toBe('Strong Create')

    await historyPush('/strong/test')
    expect(getHTML(result)).toBe('Strong Not Found')

    await historyPush('/ish')
    expect(getHTML(result)).toBe('Ish')

    await historyPush('/ish/test')
    expect(getHTML(result)).toBe('Ish')

    await historyPush('/404')
    expect(getHTML(result)).toBe('Not Found')
  })
  it('should work with search', async () => {
    await historyPush('/')

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

    await historyPush('?modal=test1')
    expect(getHTML(result)).toBe('Test1')

    await historyPush('?modal=test')
    expect(getHTML(result)).toBe('')

    await historyPush('?modal=test2')
    expect(getHTML(result)).toBe('Test2')
  })
  it('should work with search and ish', async () => {
    await historyPush('/')

    const result = render(
      <router ish search='modal'>
        <slot name='test1'>
          Test1
        </slot>
        <slot name='test2'>
          Test2
        </slot>
      </router>,
    )

    expect(getHTML(result)).toBe('')

    await historyPush('?modal=test1')
    expect(getHTML(result)).toBe('Test1')

    await historyPush('?modal=test2')
    expect(getHTML(result)).toBe('Test2')

    await historyPush('?modal=test2&modal=test1')

    expect(getHTML(result)).toBe('Test2Test1')

    await historyPush('?modal=test1&modal=test2')
    expect(getHTML(result)).toBe('Test1Test2')
  })
  it('should work with mix of source', async () => {
    await historyPush('/')

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

    await historyPush('?modal=test1')

    expect(getHTML(result)).toBe('Test1 on home page')

    await historyPush('/test?modal=test1')
    expect(getHTML(result)).toBe('Test1')

    await historyPush('?modal=test')
    expect(getHTML(result)).toBe('')

    await historyPush('?modal=test2')
    expect(getHTML(result)).toBe('Test2')
  })
  test('useRoute', async () => {
    await historyPush('/')

    const App: JsxComponent = () => {
      const route = useRoute()
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

    await historyPush('/settings')
    expect(getHTML(result)).toBe('Settings:/')

    await historyPush('/settings/test')
    expect(getHTML(result)).toBe('Settings:test')

    await historyPush('/any-other')
    expect(getHTML(result)).toBe('Other:any-other')
  })
  it('should render one with ish', async () => {
    await historyPush('/')

    let count = 0

    const Settings = () => {
      count++

      return 'Settings'
    }

    const result = render(
      <router>
        <slot name='/'>
          Home
        </slot>
        <router ish>
          <slot name='settings'>
            <Settings />
          </slot>
          Not Found
        </router>
      </router>,
    )

    expect(getHTML(result)).toBe('Home')
    expect(count).toBe(0)

    await historyPush('/settings')
    expect(count).toBe(1)
    expect(getHTML(result)).toBe('Settings')

    await historyPush('/settings/test')
    expect(getHTML(result)).toBe('Settings')
    expect(count).toBe(1)

    await historyPush('/any-other')
    expect(getHTML(result)).toBe('Not Found')
    expect(count).toBe(1)
  })
})
