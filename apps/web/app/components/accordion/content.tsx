import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cn } from 'app/utils/utils'
import React from 'react'

export const Content = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  return (
    <AccordionPrimitive.Content
      className={cn(
        'data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up',
        'border-border overflow-hidden bg-zinc-100 text-zinc-500',
        className
      )}
      ref={ref}
      {...props}
    >
      <div className="p-6 pt-0">{children}</div>
    </AccordionPrimitive.Content>
  )
})

Content.displayName = AccordionPrimitive.Content.displayName
