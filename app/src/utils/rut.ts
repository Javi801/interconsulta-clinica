const RUT_MAX_LENGTH = 9 // 8-digit body plus verifier

/** Keeps only digits and a trailing K (verifier), uppercased and length-capped. */
export function cleanRut(value: string): string {
  return value
    .toUpperCase()
    .replace(/[^0-9K]/g, '')
    .replace(/K(?=.)/g, '')
    .slice(0, RUT_MAX_LENGTH)
}

/** Formats progressively while typing: 123456785 -> 12.345.678-5 */
export function formatRut(value: string): string {
  const clean = cleanRut(value)
  if (clean.length <= 1) return clean
  const body = clean.slice(0, -1)
  const verifier = clean.slice(-1)
  const grouped = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `${grouped}-${verifier}`
}

function computeVerifier(body: string): string {
  let sum = 0
  let factor = 2
  for (let i = body.length - 1; i >= 0; i--) {
    sum += Number(body[i]) * factor
    factor = factor === 7 ? 2 : factor + 1
  }
  const remainder = 11 - (sum % 11)
  if (remainder === 11) return '0'
  if (remainder === 10) return 'K'
  return String(remainder)
}

export function isValidRut(value: string): boolean {
  const clean = cleanRut(value)
  if (clean.length < 2) return false
  return computeVerifier(clean.slice(0, -1)) === clean.slice(-1)
}
