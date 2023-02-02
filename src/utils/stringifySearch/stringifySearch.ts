import qs, { type IStringifyOptions, type ParsedQs } from 'qs'

export function stringifySearch (search: ParsedQs, options?: IStringifyOptions): string {
  return qs.stringify(search, {
    encoder: str => typeof str === 'string'
      ? str.replaceAll('+', '%2b').replaceAll(' ', '+')
      : str,
    ...options,
  })
}
