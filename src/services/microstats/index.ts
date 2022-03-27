import { formatBytes } from '@app/utils/formatBytes'
import { uniqueItemsInArray } from '@app/utils/uniqueArray'
import microstats from 'microstats'
import { cpuUsageInfo } from '../os'
import { socketEmit } from '../socket'
import {
  DiskData,
  MemoryData,
  MemoryDataResonse,
  MicroStatsEnum
} from './types'

const microstatsConnect = () => {
  const options = { frequency: '1s' }
  let disks: DiskData[] = []

  microstats.on('memory', function (value: MemoryData) {
    const memory: MemoryDataResonse = {
      actualUse: `${value.usedpct} %`,
      total: formatBytes(value.total),
      free: formatBytes(value.free)
    }

    socketEmit<MemoryDataResonse>({
      topic: MicroStatsEnum.MEMORY,
      message: memory
    })
  })

  microstats.on('disk', function (value) {
    const disk = {
      filesystem: value.filesystem,
      usedpct: value.usedpct,
      total: formatBytes(value.total),
      free: formatBytes(value.free)
    }

    disks = [...disks, disk]
    const pcDisks = uniqueItemsInArray(disks, 'filesystem')

    socketEmit<DiskData[]>({
      topic: MicroStatsEnum.DISK,
      message: pcDisks
    })
  })

  microstats.on('cpu', async function () {
    const cpuUsage = await cpuUsageInfo()
    const cpuUsageInPercentage = `${cpuUsage} %`

    socketEmit({
      topic: MicroStatsEnum.CPU,
      message: {
        cpuUsageInPercentage
      }
    })
  })

  microstats.start(options, function (err) {
    if (err) console.log(err)
  })
}
export default microstatsConnect
