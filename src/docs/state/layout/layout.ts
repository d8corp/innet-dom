import { Compute, createEvent, State } from 'watch-state'

import { isLaptop, isMobile } from '../window'

export interface TitleLink {
  id: string
  title?: string
}

export const isShowSideMobile = new State(false)
export const isShowAsideDesktop = new State(true)
export const isShowAsideMobile = new State(false)
export const titleLinks = new State(new Set<TitleLink>())

export const isShowSide = new Compute(() => isMobile.value ? isShowSideMobile.value : true)
export const isShowAside = new Compute(() => isLaptop.value ? isShowAsideMobile.value : isShowAsideDesktop.value)
export const hasTitleLinks = new Compute(() => titleLinks.value.size > 1)

export const toggleIsShowSide = () => {
  isShowSideMobile.value = !isShowSideMobile.value
}

export const hideSide = () => {
  isShowSideMobile.value = false
}

export const hideAside = () => {
  if (isLaptop.raw) {
    isShowAsideMobile.value = false
  }
}

export const toggleOnPageMenu = createEvent(() => {
  if (isLaptop.raw) {
    isShowAsideMobile.value = !isShowAsideMobile.raw
  } else {
    isShowAsideDesktop.value = !isShowAsideDesktop.raw
  }
})
