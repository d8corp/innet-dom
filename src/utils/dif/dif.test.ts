import { dif } from '.'

describe('dif', () => {
  it('should return dif', () => {
    expect(dif(
      ['1', '5', '4', '3', '2'],
      ['4', '3', '2', '1', '5'],
    )).toEqual(['4', '3', '2'])
  })
  it('should return undefined', () => {
    expect(dif(
      [],
      ['5'],
    )).toBe(undefined)
  })
})
