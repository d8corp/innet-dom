import { useContextWatcher } from '../useContextWatcher'

export function useUpdated (): boolean {
  return useContextWatcher()?.updated || false
}
