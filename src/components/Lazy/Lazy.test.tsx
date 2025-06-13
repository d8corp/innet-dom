import { historyPush } from '@watch-state/history-api'
import { Cache } from 'watch-state'

import { getHTML, render } from '../../test'
import type { Component } from '../../types'
import { isLazy, type LazyResult, parsedSearch } from '../../utils'
import { For } from '../For'
import { type BaseComponentRoute } from '../Router'
import { Lazy } from './Lazy'

const LoginModal = () => 'LoginModal'
const LogoutModal = () => 'LogoutModal'

describe('Lazy', () => {
  it('Should render search modals', async () => {
    await historyPush('/')

    type ModalRoute = BaseComponentRoute & {
      value: string
    }

    const modals: ModalRoute[] = [
      {
        value: 'login',
        permissions: ['prelogin'],
        component: LoginModal,
      },
      {
        value: 'logout',
        permissions: ['postlogin'],
        component: LogoutModal,
      },
    ]

    function Modals () {
      const loadedComponents = new Map<LazyResult, Component>()

      const searchModals = new Cache(() => {
        const searchModal = parsedSearch.value.modal
        const searchModals = typeof searchModal === 'string'
          ? [searchModal]
          : Array.isArray(searchModal)
            ? searchModal.map(String)
            : []

        if (!searchModals.length) return []

        const valueSet = new Set(searchModals)

        return modals.filter(({ value }) => valueSet.has(value))
      })

      return (
        <For
          of={searchModals}
          children={route => (
            <Lazy
              component={() => isLazy(route.value.component) ? route.value.component() : route.value.component}
              fallback={() => route.value.fallback}
              loadedComponents={loadedComponents}
            />
          )}
        />
      )
    }

    const result = render(<Modals />)

    expect(getHTML(result)).toBe('')

    await historyPush('?modal=login')

    expect(getHTML(result)).toBe('LoginModal')

    await historyPush('?modal=logout')

    expect(getHTML(result)).toBe('LogoutModal')

    await historyPush('?modal=login&modal=logout')

    expect(getHTML(result)).toBe('LoginModalLogoutModal')
  })
})
