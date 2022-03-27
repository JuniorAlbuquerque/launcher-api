export class QueueFn<T> {
  private active: number
  private queue

  constructor(private maxSimultaneously = 1) {
    this.active = 0
    this.queue = []
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async enqueue(func: (...params: any[]) => any): Promise<T> {
    if (++this.active > this.maxSimultaneously) {
      await new Promise((resolve) => this.queue.push(resolve))
    }

    try {
      return await func()
    } catch (err) {
      throw new Error(err)
    } finally {
      this.active--
      if (this.queue.length) {
        this.queue.shift()()
      }
    }
  }
}
