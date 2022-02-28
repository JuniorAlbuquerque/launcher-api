import os from 'os'
import osutils from 'os-utils'

function getCPUUsage() {
  return new Promise((resolve) => {
    osutils.cpuUsage((value) => resolve(value))
  })
}

const cpuInfo = async () => {
  const cpuUsage = await getCPUUsage()
  return cpuUsage
}

const osInfo = {
  cpu: os.cpus()[0],
  memory: os.totalmem(),
  freeMemory: os.freemem(),
  platform: os.platform(),
  cpuCount: osutils.cpuCount()
}

export { osInfo, cpuInfo }
