'use client'

import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'
import { Root, Item } from '@radix-ui/react-toggle-group'

import { cn } from 'global/utils'

const ToogleGroup = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, children, ...props }, ref) => (
  <Root
    ref={ref}
    className={cn('flex flex-wrap items-center gap-2', className)}
    {...props}
  >
    {children}
  </Root>
))

ToogleGroup.displayName = Root.displayName

const ToogleGroupItem = forwardRef<
  ElementRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item>
>(({ className, children, ...props }, ref) => (
  <Item
    ref={ref}
    className={cn(
      'w-fit rounded-lg bg-zinc-100 px-[10px] py-[6px] text-sm font-medium text-zinc-600 data-[state="on"]:bg-indigo-50 data-[state="on"]:text-indigo-600',
      className
    )}
    {...props}
  >
    {children}
  </Item>
))

ToogleGroupItem.displayName = Item.displayName

export { ToogleGroup, ToogleGroupItem }
