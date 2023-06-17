import { type Plugin, useApp } from 'innet'

export const callFunction: Plugin = () => () => {
  useApp<Function>()()
}
