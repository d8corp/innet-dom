import logo from './logo.svg'
import {HTMLProps} from "../../../types";

export function Logo(props: HTMLProps<HTMLImageElement>) {
  return (
    <img src={logo} {...props} />
  )
}
