import { useChildren } from '@innet/jsx'

import { getHTML, render } from '../../../test'
import { Context, useContext } from './context'

describe('context', () => {
  it('should work', () => {
    const color = new Context('blue')

    function Content () {
      return (
        <h1 style={`color: ${useContext(color)}`}>
          {useChildren()}
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
  it('should work with async function', async () => {
    const color = new Context('blue')

    async function Content () {
      return (
        <h1 style={`color: ${useContext(color)}`}>
          {useChildren()}
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

    await Promise.resolve()

    expect(getHTML(result))
      .toBe('<h1 style="color: blue">Without context</h1><h1 style="color: red">With context</h1>')
  })
})
