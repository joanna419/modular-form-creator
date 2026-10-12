// Arrays (team members) are compared as sets: selection order is not a change.
const isSameValue = (a: unknown, b: unknown): boolean =>
  Array.isArray(a) && Array.isArray(b)
    ? a.length === b.length && a.every((item) => b.includes(item))
    : a === b

/** True when every field of `edited` equals the persisted module value. */
export const isSameModule = <T extends object>(edited: T, persisted: T): boolean =>
  (Object.keys(edited) as (keyof T)[]).every((key) =>
    isSameValue(edited[key], persisted[key]),
  )
