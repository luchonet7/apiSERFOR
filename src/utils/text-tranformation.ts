import type { TextTransformStyle } from "@/types/custom-input"

export const transformText = (text: string, style: TextTransformStyle = "original"): string => {
  if (!text) return text

  switch (style) {
    case "uppercase":
      return text.toUpperCase()
    case "lowercase":
      return text.toLowerCase()
    case "capitalize":
      return text
        .split(" ")
        .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : ""))
        .join(" ")
    case "sentence":
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    case "original":
    default:
      return text
  }
}
