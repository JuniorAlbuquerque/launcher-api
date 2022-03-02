import os from 'os'

export type CpuDataDto = {
  cpu: os.CpuInfo
  platform: string
}
