import { getHTML, render } from '../../test'
import { Pipe } from './Pipe'

describe('Pipe', () => {
  it('should work', () => {
    const result = render(
      <Pipe>
        {(children, deep) => deep < 5 ? <div>{deep}{children}</div> : null}
      </Pipe>,
    )

    expect(getHTML(result)).toBe('<div>0<div>1<div>2<div>3<div>4</div></div></div></div></div>')
  })
})
