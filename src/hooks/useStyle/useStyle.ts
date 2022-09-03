import { useProps } from '@innet/jsx'
import classes, { ClassesArgument } from 'html-classes'

export interface Style<S = any> {
  class?: ClassesArgument<keyof S> | Record<keyof S, ClassesArgument<keyof S>>
}

export function getStyles<S> (styles: S, props: any): S {
  if (!props || !props.class) {
    return styles
  }

  const className = props.class

  if (typeof className !== 'object' || Array.isArray(className)) {
    const result = { ...styles }
    Object.defineProperty(result, 'root', {
      get () {
        // @ts-ignore
        return classes([styles.root, className])
      },
    })

    return result
  }

  const result = {} as S

  for (const key in styles) {
    Object.defineProperty(result, key, {
      get () {
        return classes([
          styles[key],
          className[key],
        ])
      },
    })
  }

  return result
}

export function style<S> (styles: S) {
  return function useStyle (): S {
    const props = useProps()

    return getStyles(styles, props)
  }
}
