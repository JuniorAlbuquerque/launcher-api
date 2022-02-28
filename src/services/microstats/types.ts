export enum MicroStatsEnum {
  MEMORY = 'MEMORY',
  DISK = 'DISK'
}

export type MemoryData = {
  usedpct: number
  total: number
  free: number
}

export type DiskData = {
  filesystem: string
  usedpct: number
  total: number
  free: number
}
