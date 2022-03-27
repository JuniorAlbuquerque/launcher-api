export const promosifyFn = async (fn: (callback: () => void) => void) => {
  await new Promise((res) => setTimeout(res, 1000)) // wait 1s
  fn.apply(this)
}
