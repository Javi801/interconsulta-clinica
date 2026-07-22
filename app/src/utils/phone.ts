/** Formats as "+* 1234 5678": leading "+", digits only, last 8 digits split in groups of 4. */
export const formatPhone = (raw: string): string => {
  const digits = raw.replace(/\D/g, '')
  if (digits === '') return ''
  const parts = [digits.slice(0, -8), digits.slice(-8, -4), digits.slice(-4)].filter(
    (part) => part !== '',
  )
  return `+${parts.join(' ')}`
}
