'use client'

import { useState } from 'react'
import { DayPicker, DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface CalendarProps {
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  unavailableDates?: Date[]
  minDate?: Date
  maxDate?: Date
}

export function Calendar({
  value,
  onChange,
  placeholder = "Pick a date range",
  disabled = false,
  className,
  unavailableDates = [],
  minDate,
  maxDate
}: CalendarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const modifiers = {
    unavailable: unavailableDates,
  }

  const modifiersClassNames = {
    unavailable: 'bg-red-100 text-red-500 cursor-not-allowed hover:bg-red-100',
  }

  const handleSelect = (range: DateRange | undefined) => {
    onChange?.(range)
    if (range?.from && range?.to) {
      setIsOpen(false)
    }
  }

  const clearSelection = () => {
    onChange?.(undefined)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value?.from && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value?.from ? (
            value.to ? (
              <>
                {format(value.from, "LLL dd, y")} -{" "}
                {format(value.to, "LLL dd, y")}
              </>
            ) : (
              format(value.from, "LLL dd, y")
            )
          ) : (
            <span>{placeholder}</span>
          )}
          {value?.from && (
            <X 
              className="ml-auto h-4 w-4 hover:text-gray-500" 
              onClick={(e) => {
                e.stopPropagation()
                clearSelection()
              }}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <DayPicker
          mode="range"
          defaultMonth={value?.from}
          selected={value}
          onSelect={handleSelect}
          numberOfMonths={2}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
          disabled={(date) => {
            if (minDate && date < minDate) return true
            if (maxDate && date > maxDate) return true
            return unavailableDates.some(unavailableDate => 
              date.toDateString() === unavailableDate.toDateString()
            )
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

interface SingleCalendarProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  unavailableDates?: Date[]
  minDate?: Date
  maxDate?: Date
}

export function SingleCalendar({
  value,
  onChange,
  placeholder = "Pick a date",
  disabled = false,
  className,
  unavailableDates = [],
  minDate,
  maxDate
}: SingleCalendarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const modifiers = {
    unavailable: unavailableDates,
  }

  const modifiersClassNames = {
    unavailable: 'bg-red-100 text-red-500 cursor-not-allowed hover:bg-red-100',
  }

  const handleSelect = (date: Date | undefined) => {
    onChange?.(date)
    if (date) {
      setIsOpen(false)
    }
  }

  const clearSelection = () => {
    onChange?.(undefined)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "LLL dd, y") : <span>{placeholder}</span>}
          {value && (
            <X 
              className="ml-auto h-4 w-4 hover:text-gray-500" 
              onClick={(e) => {
                e.stopPropagation()
                clearSelection()
              }}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <DayPicker
          mode="single"
          selected={value}
          onSelect={handleSelect}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
          disabled={(date) => {
            if (minDate && date < minDate) return true
            if (maxDate && date > maxDate) return true
            return unavailableDates.some(unavailableDate => 
              date.toDateString() === unavailableDate.toDateString()
            )
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
