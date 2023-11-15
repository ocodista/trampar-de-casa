import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cn } from 'app/utils/utils'
import { Plus } from 'lucide-react'
import React from 'react'

export const Trigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  return (
    <AccordionPrimitive.Trigger
      role="button"
      className={cn(
        'group flex w-full items-center justify-between p-6',
        'text-xl font-semibold focus:outline-none',
        'select-none bg-zinc-100 last:border-b-transparent',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}

      <Plus
        size={28}
        className={cn(
          'text-[#4F46E5] transition-transform duration-300',
          'group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-45'
        )}
      />
    </AccordionPrimitive.Trigger>
  )
})

Trigger.displayName = AccordionPrimitive.Trigger.displayName
