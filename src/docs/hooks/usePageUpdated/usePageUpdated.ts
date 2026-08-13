import { Context, useContext } from '@innet/jsx'

export interface PageUpdatedData {
  updated: boolean
}

export const pageUpdated = new Context<PageUpdatedData, PageUpdatedData>({ updated: true })

export function usePageUpdated () {
  return useContext(pageUpdated).updated
}
