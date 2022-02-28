import microstats from 'microstats'
import { socketEmit } from '../socket'
import { DiskData, MemoryData, MicroStatsEnum } from './types'

const microstatsConnect = () => {
  const options = { frequency: '3s' }

  microstats.on('memory', function (value) {
    socketEmit<MemoryData>({
      topic: MicroStatsEnum.MEMORY,
      message: value
    })
  })

  microstats.on('disk', function (value) {
    const disks: DiskData[] = []
    disks.push(value)

    socketEmit<DiskData[]>({
      topic: MicroStatsEnum.DISK,
      message: value
    })
  })

  microstats.start(options, function (err) {
    if (err) console.log(err)
  })
}
export default microstatsConnect
