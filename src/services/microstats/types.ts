export enum MicroStatsEnum {
  MEMORY = 'MEMORY',
  DISK = 'DISK',
  CPU = 'CPU'
}

export type MemoryData = {
  usedpct: number
  total: number
  free: number
}

export type MemoryDataResonse = {
  actualUse: string
  total: string
  free: string
}

export type DiskData = {
  filesystem: string
  usedpct: number
  total: number
  free: number
}
