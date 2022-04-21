import { createPortal } from 'react-dom'
import type { AnchorHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'

export type ILink = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>

export const A = (props: ILink) => <a {...props} />
A.defaultProps = {
  target: '_blank',
  rel: 'noreferrer noopener',
}

interface IPortal {
  children: ReactNode
  target?: string
}
export function Portal(props: IPortal) {
  const target = props.target
    ? document.getElementById(props.target)
    : document.body

  if (target === null) {
    throw Error(`portal target "${props.target}" not found`)
  }

  return createPortal(props.children, target)
}
