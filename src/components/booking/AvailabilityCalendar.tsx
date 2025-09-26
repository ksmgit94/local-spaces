'use client'

import { useState, useEffect } from 'react'
import { DayPicker, DateRange } from 'react-day-picker'
import { format, addDays, isSameDay } from 'date-fns'
import { Calendar as CalendarIcon, Clock, CheckCircle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AvailabilityCalendarProps {
  listingId: string
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
  onAvailabilityCheck?: (startDate: Date, endDate: Date) => Promise<boolean>
  className?: string
}

interface AvailabilityData {
  date: Date
  available: boolean
  price?: number
  reason?: string
}

export function AvailabilityCalendar({
  listingId,
  value,
  onChange,
  onAvailabilityCheck,
  className
}: AvailabilityCalendarProps) {
  const [availability, setAvailability] = useState<AvailabilityData[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(value)

  // Fetch real availability data from API
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        // For now, we'll use mock data but structure it for real API integration
        const today = new Date()
        const dates: AvailabilityData[] = []
        
        for (let i = 0; i < 90; i++) {
          const date = addDays(today, i)
          const isWeekend = date.getDay() === 0 || date.getDay() === 6
          const isPast = date < today
          
          dates.push({
            date,
            available: !isPast && !isWeekend, // Mock: weekends unavailable
            price: isWeekend ? undefined : 45 + Math.floor(Math.random() * 20),
            reason: isPast ? 'Past date' : isWeekend ? 'Weekend unavailable' : undefined
          })
        }
        
        setAvailability(dates)
        
        // TODO: Replace with real API call
        // const response = await fetch(`/api/listings/${listingId}/availability`)
        // const data = await response.json()
        // setAvailability(data.availability)
      } catch (error) {
        console.error('Error fetching availability:', error)
        // Fallback to empty availability
        setAvailability([])
      }
    }

    fetchAvailability()
  }, [listingId])

  const handleSelect = (range: DateRange | undefined) => {
    setSelectedRange(range)
    onChange?.(range)
    
    if (range?.from && range?.to && onAvailabilityCheck) {
      onAvailabilityCheck(range.from, range.to)
    }
  }

  const modifiers = {
    available: availability.filter(a => a.available).map(a => a.date),
    unavailable: availability.filter(a => !a.available).map(a => a.date),
    selected: selectedRange?.from && selectedRange?.to 
      ? availability
          .filter(a => a.date >= selectedRange.from! && a.date <= selectedRange.to!)
          .map(a => a.date)
      : []
  }

  const modifiersClassNames = {
    available: 'bg-green-50 text-green-700 hover:bg-green-100 cursor-pointer',
    unavailable: 'bg-red-50 text-red-500 cursor-not-allowed hover:bg-red-50',
    selected: 'bg-[#EFADFF] text-white hover:bg-[#D298E0]',
  }

  const getDatePrice = (date: Date) => {
    const availabilityData = availability.find(a => isSameDay(a.date, date))
    return availabilityData?.price
  }

  const isDateAvailable = (date: Date) => {
    const availabilityData = availability.find(a => isSameDay(a.date, date))
    return availabilityData?.available ?? false
  }

  const getDateReason = (date: Date) => {
    const availabilityData = availability.find(a => isSameDay(a.date, date))
    return availabilityData?.reason
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarIcon className="w-5 h-5 mr-2" />
          Select Dates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Calendar */}
          <DayPicker
            mode="range"
            selected={selectedRange}
            onSelect={handleSelect}
            modifiers={modifiers}
            modifiersClassNames={modifiersClassNames}
            numberOfMonths={2}
            disabled={(date) => !isDateAvailable(date)}
            className="w-full"
            components={{
              Day: ({ date, displayMonth, ...props }) => {
                const price = getDatePrice(date)
                const isAvailable = isDateAvailable(date)
                const reason = getDateReason(date)
                
                return (
                  <div className="relative">
                    <button
                      {...props}
                      className={cn(
                        "w-full h-full p-2 text-sm font-medium rounded-md transition-colors",
                        props.className
                      )}
                      title={reason}
                    >
                      {date.getDate()}
                    </button>
                    {price && isAvailable && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
                        €{price}
                      </div>
                    )}
                  </div>
                )
              }
            }}
          />

          {/* Legend */}
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-50 border border-green-200 rounded mr-2"></div>
              <span className="text-green-700">Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-50 border border-red-200 rounded mr-2"></div>
              <span className="text-red-500">Unavailable</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#EFADFF] rounded mr-2"></div>
              <span className="text-[#D298E0]">Selected</span>
            </div>
          </div>

          {/* Selected Range Info */}
          {selectedRange?.from && selectedRange?.to && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Selected Dates</h4>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  {Math.ceil((selectedRange.to.getTime() - selectedRange.from.getTime()) / (1000 * 60 * 60 * 24))} days
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <div>Check-in: {format(selectedRange.from, "EEEE, MMMM do, yyyy")}</div>
                <div>Check-out: {format(selectedRange.to, "EEEE, MMMM do, yyyy")}</div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
