'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { ReactNode, forwardRef } from 'react'

export interface SelectProps {
  children: ReactNode
  placeholder: ReactNode
}

// eslint-disable-next-line react/display-name
export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  ({ children, placeholder }, forwardedRef) => {
    return (
      <>
        <SelectPrimitive.Trigger
          ref={forwardedRef}
          className="flex h-11 w-full items-center justify-between gap-2 rounded-lg border border-zinc-300 px-3 py-2 text-center text-zinc-100 shadow-sm focus-within:border-cyan-300 focus-within:ring-2 focus-within:ring-cyan-200 hover:shadow-sm data-[placeholder]:text-zinc-500"
        >
          <SelectPrimitive.Value
            placeholder={placeholder}
            className="text-zinc-500"
          />
          <SelectPrimitive.Icon>
            <ChevronDownIcon className="h-5 w-5 text-zinc-100" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            side="bottom"
            position="popper"
            sideOffset={2}
            className="z-10 w-[--radix-select-trigger-width] rounded-lg border border-zinc-200 bg-white font-semibold"
          >
            <SelectPrimitive.ScrollUpButton>
              <ChevronUpIcon />
            </SelectPrimitive.ScrollUpButton>
            <SelectPrimitive.Viewport className="cursor-pointer">
              {children}
            </SelectPrimitive.Viewport>
            <SelectPrimitive.ScrollDownButton>
              <ChevronDownIcon />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </>
    )
  },
)
