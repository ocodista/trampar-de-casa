'use client'
import { format, subYears } from 'date-fns'
import React from 'react'
import { cn } from '../../global/utils'
import { Button, buttonVariants } from './ui/button'
import { Calendar } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

export function DOBPicker({
  dob,
  setDOB,
}: {
  dob: Date | undefined
  setDOB: React.Dispatch<React.SetStateAction<Date | undefined>>
}) {
  const maxDate = new Date()

  return (
    <div className="w-full border border-gray-200 bg-white border-solid rounded-sm">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'default'}
            className={cn(
              'w-full justify-start font-mono text-left font-normal',
              !dob && 'text-muted-foreground'
            )}
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4.75 8.75C4.75 7.64543 5.64543 6.75 6.75 6.75H17.25C18.3546 6.75 19.25 7.64543 19.25 8.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V8.75Z"
              ></path>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M8 4.75V8.25"
              ></path>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M16 4.75V8.25"
              ></path>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M7.75 10.75H16.25"
              ></path>
            </svg>

            {dob ? (
              format(dob, 'PPP')
            ) : (
              <span>Escolha uma data aproximada</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 font-mono text-black border">
          <Calendar
            classNames={{
              cell: 'text-center text-sm p-0 relative first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
              day: cn(
                buttonVariants({ variant: 'ghost' }),
                'h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-languid-lavendar/10 text-black'
              ),
              day_selected:
                'rounded-full bg-languid-lavendar hover:bg-white/10 text-black',
              caption_label: 'hidden',
              caption_dropdowns:
                'flex w-full items-center justify-center space-x-2 border border-1-solid rounded-md pr-1',
            }}
            mode="single"
            selected={dob}
            fromDate={subYears(new Date(), 100)}
            toDate={maxDate}
            captionLayout="dropdown"
            onSelect={setDOB}
            defaultMonth={
              new Date(
                dob?.getFullYear() ?? maxDate.getFullYear(),
                dob?.getMonth() ?? maxDate.getMonth(),
                1
              )
            }
            required
            initialFocus
            className="border rounded-md border-white/10"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DOBPicker
