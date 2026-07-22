/** Formats a month input value: 2025-03 -> 03/2025 */
export const formatMonth = (month: string): string => {
  const [year, monthPart] = month.split('-')
  return year && monthPart ? `${monthPart}/${year}` : month
}

export const calculateAge = (birthDate: string): number | null => {
  if (!birthDate) return null
  const birth = new Date(`${birthDate}T00:00:00`)
  if (Number.isNaN(birth.getTime())) return null
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const hadBirthday =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate())
  if (!hadBirthday) age -= 1
  return age >= 0 ? age : null
}
