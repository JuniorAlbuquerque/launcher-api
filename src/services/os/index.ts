import os from 'os'
import osutils from 'node-os-utils'

const cpuUsageInfo = async () => {
  const cpu = osutils.cpu
  const usage = await cpu.usage()
  return usage
}

const osInfo = {
  cpu: os.cpus()[0],
  platform: os.platform()
}

export { osInfo, cpuUsageInfo }
