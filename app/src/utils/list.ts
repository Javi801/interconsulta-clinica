export const patchAt = <T>(list: T[], index: number, patch: Partial<T>): T[] =>
  list.map((item, i) => (i === index ? { ...item, ...patch } : item))

export const setAt = <T>(list: T[], index: number, item: T): T[] =>
  list.map((existing, i) => (i === index ? item : existing))

export const removeAt = <T>(list: T[], index: number): T[] => list.filter((_, i) => i !== index)
