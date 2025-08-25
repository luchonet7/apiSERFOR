"use client"

import { useState, forwardRef } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatDate, addDays, isDateInRange, getDateButtonSize, getDateDisplaySize } from "@/utils/date-navigator"
import type { DateNavigatorProps } from "@/types/date-navigator"
import { Locale } from "date-fns"

export const DateNavigator = forwardRef<HTMLDivElement, DateNavigatorProps>(
  (
    {
      value,
      onChange,
      onBlur,
      disabled = false,
      minDate,
      maxDate,
      className,
      dateFormat = "DD/MM/YYYY",
      locale = "es",
      placeholder = "Seleccionar fecha",
      size = "default",
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(value)

    const currentDate = selectedDate || new Date()

    const handleDateChange = (newDate: Date | undefined) => {
      if (!newDate || disabled) return

      // Verificar si la fecha está en el rango permitido
      if (!isDateInRange(newDate, minDate, maxDate)) return

      setSelectedDate(newDate)
      onChange?.(newDate)
      setOpen(false)
    }

    const handlePreviousDay = () => {
      if (disabled) return

      const previousDay = addDays(currentDate, -1)
      if (isDateInRange(previousDay, minDate, maxDate)) {
        setSelectedDate(previousDay)
        onChange?.(previousDay)
      }
    }

    const handleNextDay = () => {
      if (disabled) return

      const nextDay = addDays(currentDate, 1)
      if (isDateInRange(nextDay, minDate, maxDate)) {
        setSelectedDate(nextDay)
        onChange?.(nextDay)
      }
    }

    const handlePopoverClose = () => {
      setOpen(false)
      onBlur?.()
    }

    const isPreviousDisabled = disabled || (minDate && addDays(currentDate, -1) < minDate)
    const isNextDisabled = disabled || (maxDate && addDays(currentDate, 1) > maxDate)

    const buttonSizeClass = getDateButtonSize(size)
    const displaySizeClass = getDateDisplaySize(size)

    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center gap-1 rounded-lg border bg-background p-1", className)}
        {...props}
      >
        {/* Botón anterior */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handlePreviousDay}
          disabled={isPreviousDisabled}
          className={cn("rounded-md", buttonSizeClass)}
          aria-label="Día anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Display de fecha con popover */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              disabled={disabled}
              className={cn(
                "font-mono justify-center hover:bg-muted/50 rounded-md",
                displaySizeClass,
                !selectedDate && "text-muted-foreground",
              )}
              aria-label="Abrir calendario"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? formatDate(selectedDate, dateFormat) : placeholder}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center" onInteractOutside={handlePopoverClose}>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateChange}
              disabled={(date: Date) => !isDateInRange(date, minDate, maxDate)}
              locale={locale as unknown as Locale}
            />
          </PopoverContent>
        </Popover>

        {/* Botón siguiente */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleNextDay}
          disabled={isNextDisabled}
          className={cn("rounded-md", buttonSizeClass)}
          aria-label="Día siguiente"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    )
  },
)

DateNavigator.displayName = "DateNavigator"
