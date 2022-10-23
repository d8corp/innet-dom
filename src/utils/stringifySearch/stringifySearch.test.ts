import { stringifySearch } from '.'

describe('stringifySearch', () => {
  it('should convert object to query string', () => {
    expect(stringifySearch({ test: '1' })).toEqual('test=1')
    expect(stringifySearch({ test: '1', test2: '2' })).toEqual('test=1&test2=2')
  })
  it('should work with phone', () => {
    expect(stringifySearch({ search: '+7 (999) 999-99-99' })).toBe('search=%2b7+(999)+999-99-99')
  })
})
