import { ComponentProps } from 'react'

export type PrefixProps = ComponentProps<'div'>

export function Prefix(props: PrefixProps) {
  return <div {...props} className="text-zinc-300" />
}
