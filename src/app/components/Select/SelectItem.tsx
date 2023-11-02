'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import { CheckIcon } from 'lucide-react'
import { ReactNode, forwardRef } from 'react'

export type SelectItemProps = SelectPrimitive.SelectItemProps & {
  children: ReactNode
}

// eslint-disable-next-line react/display-name
export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <>
        <SelectPrimitive.Item
          {...props}
          ref={forwardedRef}
          className="flex items-center gap-3 px-3 py-1 outline-none data-[highlighted]:rounded-lg data-[highlighted]:bg-zinc-100"
        >
          <SelectPrimitive.ItemText className="text-zinc-100">
            {children}
          </SelectPrimitive.ItemText>
          <SelectPrimitive.ItemIndicator>
            <CheckIcon />
          </SelectPrimitive.ItemIndicator>
        </SelectPrimitive.Item>
      </>
    )
  },
)
