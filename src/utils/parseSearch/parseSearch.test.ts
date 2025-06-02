import { parseSearch } from '.'

describe('parseSearch', () => {
  it('should convert query string to object', () => {
    expect(parseSearch('test=1')).toEqual({ test: '1' })
    expect(parseSearch('test=1&test2=2')).toEqual({ test: '1', test2: '2' })
  })
  it('should ignore question mark', () => {
    expect(parseSearch('?test=1')).toEqual({ test: '1' })
    expect(parseSearch('?test=1&test2=2')).toEqual({ test: '1', test2: '2' })
  })
  it('should work with nullish', () => {
    expect(parseSearch('')).toEqual({})
    expect(parseSearch(null as unknown as string)).toEqual({})
    expect(parseSearch(undefined)).toEqual({})
    expect(parseSearch()).toEqual({})
  })
  it('should work with phone', () => {
    expect(parseSearch('search=%2b7+(999)+999-99-99')).toEqual({
      search: '+7 (999) 999-99-99',
    })
  })
})
