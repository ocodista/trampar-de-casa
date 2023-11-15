import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cn } from 'app/utils/utils'
import React from 'react'

export const Item = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <AccordionPrimitive.Item
      className={cn(
        'border-border overflow-hidden rounded-2xl border',
        'data-[state=open]:ring data-[state=open]:ring-[#4F46E5]',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Item.displayName = AccordionPrimitive.Item.displayName
