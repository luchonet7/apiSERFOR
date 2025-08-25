export const formatTimeInput = (value: string, format: "12" | "24" = "12", showSeconds = false): string => {
    // Remover todo excepto números
    const numbers = value.replace(/\D/g, "")
  
    if (numbers.length === 0) return ""
  
    let formatted = ""
  
    if (showSeconds) {
      if (numbers.length >= 1) formatted += numbers.substring(0, 2)
      if (numbers.length >= 3) formatted += ":" + numbers.substring(2, 4)
      if (numbers.length >= 5) formatted += ":" + numbers.substring(4, 6)
    } else {
      if (numbers.length >= 1) formatted += numbers.substring(0, 2)
      if (numbers.length >= 3) formatted += ":" + numbers.substring(2, 4)
    }
  
    return formatted
  }
  
  export const toggleAmPm = (timeString: string): string => {
    if (timeString.includes("AM")) {
      return timeString.replace("AM", "PM")
    } else if (timeString.includes("PM")) {
      return timeString.replace("PM", "AM")
    } else {
      return timeString + " AM"
    }
  }
  
  export const isValidTime = (timeString: string, format: "12" | "24"): boolean => {
    const timeRegex = format === "12" ? /^(0?[1-9]|1[0-2]):[0-5][0-9](\s?(AM|PM))?$/i : /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
  
    return timeRegex.test(timeString.trim())
  }
  
  export function formatTime(date: Date): string {
    const hours = date.getHours()
    const minutes = date.getMinutes()
  
    // Convert to 12-hour format
    const hour12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
    const ampm = hours >= 12 ? "pm" : "am"
  
    // Format based on whether minutes are zero
    if (minutes === 0) {
      return `${hour12}${ampm}`
    } else {
      return `${hour12}:${minutes.toString().padStart(2, "0")}${ampm}`
    }
  }
  
  export function formatTimeRange(startTime: Date, endTime: Date): string {
    return `${formatTime(startTime)}-${formatTime(endTime)}`
  }
  
  export function getEventDuration(startTime: Date, endTime: Date): number {
    return endTime.getTime() - startTime.getTime()
  }
  
  export function formatDuration(durationMs: number): string {
    const hours = Math.floor(durationMs / (1000 * 60 * 60))
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))
  
    if (hours === 0) {
      return `${minutes}min`
    } else if (minutes === 0) {
      return `${hours}h`
    } else {
      return `${hours}h ${minutes}min`
    }
  }

  export function parseDateTime(fecha: string, hora: string): Date {
    const [dia, mes, anio] = fecha.split('/').map(Number)
    const horaFormateada = hora.replace(/(\d+):(\d+)\s*([AP]M)/, (_, h, m, ampm) => {
      const horaNum = parseInt(h, 10)
      const minutoNum = parseInt(m, 10)
      const hora24 = ampm === 'PM' && horaNum !== 12 ? horaNum + 12 : ampm === 'AM' && horaNum === 12 ? 0 : horaNum
      return `${hora24.toString().padStart(2, '0')}:${minutoNum.toString().padStart(2, '0')}`
    })
    const [horas, minutos] = horaFormateada.split(':').map(Number)
    return new Date(anio, mes - 1, dia, horas, minutos)
  }
  