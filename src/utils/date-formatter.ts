import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export const formatDateInput = (
  value: string,
  format: "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY/MM/DD" = "DD/MM/YYYY",
): string => {
  // Remover todo excepto números
  const numbers = value.replace(/\D/g, "")

  if (numbers.length === 0) return ""

  let formatted = ""

  switch (format) {
    case "DD/MM/YYYY":
      if (numbers.length >= 1) formatted += numbers.substring(0, 2)
      if (numbers.length >= 3) formatted += "/" + numbers.substring(2, 4)
      if (numbers.length >= 5) formatted += "/" + numbers.substring(4, 8)
      break

    case "MM/DD/YYYY":
      if (numbers.length >= 1) formatted += numbers.substring(0, 2)
      if (numbers.length >= 3) formatted += "/" + numbers.substring(2, 4)
      if (numbers.length >= 5) formatted += "/" + numbers.substring(4, 8)
      break

    case "YYYY/MM/DD":
      if (numbers.length >= 1) formatted += numbers.substring(0, 4)
      if (numbers.length >= 5) formatted += "/" + numbers.substring(4, 6)
      if (numbers.length >= 7) formatted += "/" + numbers.substring(6, 8)
      break
  }

  return formatted
}

export function parseFechaDDMMYYYY(fecha: string): Date {
  const [dia, mes, anio] = fecha.split('/').map(Number)
  // Recuerda: el mes en Date es base 0 (enero = 0)
  return new Date(anio, mes - 1, dia)
}

export const isValidDate = (dateString: string, format: "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY/MM/DD"): boolean => {
  const parts = dateString.split("/")
  if (parts.length !== 3) return false

  let day: number, month: number, year: number

  switch (format) {
    case "DD/MM/YYYY":
      ;[day, month, year] = parts.map(Number)
      break
    case "MM/DD/YYYY":
      ;[month, day, year] = parts.map(Number)
      break
    case "YYYY/MM/DD":
      ;[year, month, day] = parts.map(Number)
      break
    default:
      return false
  }

  const date = new Date(year, month - 1, day)
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
}

export const formatDateReadable = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, "PPP", { locale: es });
  } catch (error) {
    console.error("Error formatting date:", dateString, error);
    return dateString;
  }
};

export const formatTimeReadable = (timeString: string): string => {
  try {
    // Asumimos que timeString está en formato HH:mm
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return format(date, "hh:mm a", { locale: es });
  } catch (error) {
    console.error("Error formatting time:", timeString, error);
    return timeString;
  }
};

export const isDateExpired = (dateString: string | null): boolean => {
  if (!dateString) return false;
  try {
    return parseISO(dateString) < new Date();
  } catch (error) {
    console.error("Error checking date:", dateString, error);
    return false;
  }
};
