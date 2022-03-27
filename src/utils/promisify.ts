export const promosifyFn = async (fn: (callback: () => void) => void) => {
  await new Promise((res) => setTimeout(res, 200)) // wait 200 ms
  fn.apply(this)
}
