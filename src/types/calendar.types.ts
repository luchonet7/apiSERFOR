export interface CalendarEvent {
  id: string
  title: string
  date: Date
  startTime: Date
  endTime: Date
  hora_inicio: string
  hora_fin: string
  color: string
  description?: string
}

export interface CalendarDay {
  date: Date
  events: CalendarEvent[]
  isCurrentMonth: boolean
}

export interface CalendarMonth {
  days: CalendarDay[]
  monthDate: Date
}
