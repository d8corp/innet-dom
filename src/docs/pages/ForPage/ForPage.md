## For

| Prop      | Type                                                    | Description                                               |
|-----------|---------------------------------------------------------|-----------------------------------------------------------|
| of [*](#) | `StateProp<Iterable<T>>`                                | The collection to iterate over                            |
| key       | `keyof T` \| `(item: T) => any`                         | Unique key for each item, used for DOM optimization       |
| children  | `(item: State<T>, index: State<number>) => JSX.Element` | Function that returns JSX for each item in the collection |

You can use `map` method of an array to put view on data.
```tsx
const names = ['Mike', 'Alex', 'Dan']

export default (
  <ul>
    {names.map(name => (
      <li>
        {name}
      </li>
    ))}
  </ul>
)
```

It's ok for static data, but if you use a state, it's better to use `For` component.
```tsx
import { For } from '@innet/dom'
import { State } from 'watch-state'

const names = new State(['Mike', 'Alex', 'Dan'])

export default (
  <ul>
    <For of={names}>
      {(name, index) => (
        <li>
          #{index}:
          {name}
        </li>
      )}
    </For>
  </ul>
)
```

Use `key` property to improve `DOM` changes when you use an array of objects with some uniq field, like id.

```tsx
import { For } from '@innet/dom'
import { State } from 'watch-state'

const users = new State([
  { id: 1, text: 'test1' },
  { id: 2, text: 'test2' },
  { id: 3, text: 'test3' },
])

export default (
  <ul>
    <For of={users} key='id'>
      {(user, index) => (
        <li>
          #{index}:
          {() => user.value.name}
        </li>
      )}
    </For>
  </ul>
)
```
