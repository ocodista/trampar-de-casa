import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cn } from 'app/utils/utils'
import React from 'react'

export const Root = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <AccordionPrimitive.Root
      className={cn('flex flex-col gap-4', className)}
      ref={ref}
      {...props}
    />
  )
})

Root.displayName = AccordionPrimitive.Root.displayName
