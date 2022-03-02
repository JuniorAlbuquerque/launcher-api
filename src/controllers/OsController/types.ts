import os from 'os'

export interface ICpuData {
  cpu: os.CpuInfo
  platform: string
}
