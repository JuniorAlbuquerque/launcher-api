import { formatBytes } from '@app/utils/formatBytes'
import microstats from 'microstats'
import { cpuUsageInfo, osInfo } from '../os'
import { socketEmit } from '../socket'
import {
  CpuData,
  DiskData,
  MemoryData,
  MemoryDataResonse,
  MicroStatsEnum
} from './types'

const microstatsConnect = () => {
  const options = { frequency: '3s' }

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
    const disks: DiskData[] = []
    disks.push(value)

    socketEmit<DiskData[]>({
      topic: MicroStatsEnum.DISK,
      message: value
    })
  })

  microstats.on('cpu', async function () {
    const cpuUsageInPercentage = await cpuUsageInfo()
    const cpuData: CpuData = {
      cpu: osInfo.cpu,
      platform: osInfo.platform === 'win32' ? 'Windows' : '-',
      cpuUsage: `${cpuUsageInPercentage} %`
    }

    socketEmit<CpuData>({
      topic: MicroStatsEnum.CPU,
      message: cpuData
    })
  })

  microstats.start(options, function (err) {
    if (err) console.log(err)
  })
}
export default microstatsConnect
