import { lcs } from '.'

describe('lcs', () => {
  it('should return unchanged items, simple example', () => {
    expect(lcs(
      ['1', '2', '3', '4', '5'],
      ['1', '4', '3', '2', '5'],
    )).toEqual(['1', '4', '5'])
  })
  it('should return unchanged items block', () => {
    expect(lcs(
      ['1', '5', '4', '3', '2'],
      ['4', '3', '2', '1', '5'],
    )).toEqual(['4', '3', '2'])
  })
  it('should return unchanged items split block', () => {
    expect(lcs(
      ['1', '4', '5', '3', '2'],
      ['4', '3', '2', '1', '5'],
    )).toEqual(['4', '3', '2'])
  })
  it('should return first element when completely changed', () => {
    expect(lcs(
      ['1', '2', '3', '4', '5'],
      ['5', '4', '3', '2', '1'],
    )).toEqual(['5'])
  })
  it('should return different changed', () => {
    expect(lcs(
      ['1', '2', '3', '4', '5'],
      ['5', '2', '1', '3', '4'],
    )).toEqual(['2', '3', '4'])
  })
  it('should return undefined', () => {
    expect(lcs(
      [],
      ['5'],
    )).toEqual([])
  })
})
