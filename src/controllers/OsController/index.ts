import { osInfo } from '@app/services/os'
import { ResponseError } from '@app/types'
import { Router, Request, Response } from 'express'
import { ICpuData } from './types'

export class OsController {
  public router: Router

  constructor() {
    this.router = Router()
    this.routes()
  }

  private index = async (
    req: Request,
    res: Response<ICpuData | ResponseError>
  ) => {
    const cpuInfo = {
      ...osInfo.cpu,
      model: osInfo.cpu.model.trim()
    }

    const cpuData = {
      cpu: cpuInfo,
      platform: osInfo.platform === 'win32' ? 'Windows' : '-'
    }

    res.json(cpuData)
  }

  private routes() {
    this.router.get('/os', this.index)
  }
}
