import ping from 'ping'
import { socketEmit } from '../socket'

const getPingStatus = (addr: string, delay = 1500) => {
  const calcPing = () =>
    ping.promise.probe(addr).then(function (res) {
      if (!res.max || !res.min) return

      const pingResult = Math.round((Number(res.max) + Number(res.min)) / 2)
      if (isNaN(pingResult)) return

      socketEmit({
        topic: 'PING',
        message: pingResult
      })
    })

  const id = setInterval(async () => await calcPing(), delay)

  return () => clearInterval(id)
}

export { getPingStatus }
