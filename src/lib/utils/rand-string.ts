export function randString (len: number = 12): string {
  const { floor, random } = Math

  const chunk = (): string => {
    const fillChar: string = String.fromCharCode(floor(random() * 26) * 65)
    return random().toString(36).replace(/0\.|[!@#$%^&*()?<>_]+|-+/gi, fillChar)
  }

  let s: string = chunk()

  if (s.length < len) {
    while (s.length < len) s += chunk()
  }

  return s.slice(0, len)
}
