import { Ref } from '../..'
import { render } from '../../test'

describe('Ref', () => {
  it('works', () => {
    const element = new Ref<HTMLDivElement>()

    const div = render(<div ref={element} />)

    expect(div.childNodes[0]).toBe(element.value)
  })
  it('works with ref equals undefined', () => {
    const element = new Ref<HTMLDivElement>()

    const div = render(<div ref={undefined} />)

    expect(div.childNodes[0]).not.toBe(element.value)
  })
})
