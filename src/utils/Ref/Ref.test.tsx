import { Ref } from '../..'
import { render } from '../../test'

describe('Ref', () => {
  it('works', () => {
    const element = new Ref()

    const div = render(<div ref={element} />)

    expect(div.childNodes[0]).toBe(element.value)
  })
})
