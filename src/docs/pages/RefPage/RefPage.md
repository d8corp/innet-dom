# Ref

`Ref` helps to get an HTML element.

```tsx
import { Ref } from '@innet/dom'

function * Content () {
  const wrapper = new Ref<HTMLDivElement>()
  
  yield (
    <div ref={wrapper}>
      Hello World!
    </div>
  )

  console.log(wrapper.value)
}
```
