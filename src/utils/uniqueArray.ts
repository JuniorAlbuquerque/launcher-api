export function uniqueItemsInArray<T>(arr: T[], fieldCompare: string): T[] {
  return arr.filter(
    (value, index, data) =>
      data.findIndex(
        (t) =>
          t[fieldCompare].toString().toLowerCase() ===
          value[fieldCompare].toString().toLowerCase()
      ) === index
  )
}
