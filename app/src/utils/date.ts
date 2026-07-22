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
