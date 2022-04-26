import { getHTML, render } from '../../../test'
import { Context } from './context'

describe('context', () => {
  it('should work', () => {
    const color = new Context('blue')

    function Content (props, children, handler) {
      return (
        <h1 style={`color: ${color.get(handler)}`}>
          {children}
        </h1>
      )
    }

    const result = render(
      <>
        <Content>
          Without context
        </Content>
        <context for={color} set='red'>
          <Content>
            With context
          </Content>
        </context>
      </>,
    )

    expect(getHTML(result, true))
      .toBe('<h1 style="color: blue">Without context</h1><h1 style="color: red">With context</h1>')
  })
})
