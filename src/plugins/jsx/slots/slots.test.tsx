import { useChildren } from '@innet/jsx'

import { getHTML, render } from '../../../test'
import { useSlots } from '../slot'

describe('slots', () => {
  it('should work', () => {
    function Content () {
      return (
        <slots from={useChildren()}>
          <div>
            <slot name='header' />
          </div>
          <div>
            <slot />
          </div>
          <div>
            <slot name='footer' />
          </div>
        </slots>
      )
    }

    const result = render(
      <Content>
        <slot name='footer'>
          footer
        </slot>
        custom
        <br />
        <slot name='header'>
          header
        </slot>
        content
      </Content>,
    )

    expect(getHTML(result, true))
      .toBe('<div>header</div><div>custom<br>content</div><div>footer</div>')
  })
  it('should work with default value', () => {
    function Content () {
      return (
        <slots from={useChildren()}>
          <div>
            <slot name='header'>
              default header
            </slot>
          </div>
          <div>
            <slot>
              default content
            </slot>
          </div>
          <div>
            <slot name='footer'>
              default footer
            </slot>
          </div>
        </slots>
      )
    }

    const result = render(
      <Content>
        custom content
      </Content>,
    )

    expect(getHTML(result, true))
      .toBe('<div>default header</div><div>custom content</div><div>default footer</div>')
  })
  it('should work with couple same slots', () => {
    function Content () {
      return (
        <slots from={useChildren()}>
          <div>
            <slot name='header'>
              default header
            </slot>
          </div>
          <div>
            <slot>
              default content
            </slot>
          </div>
          <div>
            <slot name='footer'>
              default footer
            </slot>
          </div>
        </slots>
      )
    }

    const result = render(
      <Content>
        <slot name='header'>
          <span>first header</span>
        </slot>
        <slot name='header'>
          <span>second header</span>
        </slot>
        custom content
      </Content>,
    )

    expect(getHTML(result, true))
      .toBe('<div><span>first header</span><span>second header</span></div><div>custom content</div><div>default footer</div>')
  })
  it('should work with getSlots', () => {
    function Content () {
      const { '': content, header, footer } = useSlots()

      return (
        <>
          {header && (
            <div class='header'>
              {header}
            </div>
          )}
          <div class='content'>
            {content}
          </div>
          {footer && (
            <div class='footer'>
              {footer}
            </div>
          )}
        </>
      )
    }

    const result = render(
      <Content>
        <slot name='header'>
          <span>first header</span>
        </slot>
        <slot name='header'>
          <span>second header</span>
        </slot>
        custom content
      </Content>,
    )

    expect(getHTML(result, true))
      .toBe('<div class="header"><span>first header</span><span>second header</span></div><div class="content">custom content</div>')
  })
})
