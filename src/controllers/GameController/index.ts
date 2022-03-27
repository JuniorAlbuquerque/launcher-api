import { Router, Request, Response } from 'express'
import { exec } from 'child_process'
import util from 'util'
import { gameList, GamesPath } from './types'

export class GameController {
  public router: Router
  private execGame = util.promisify(exec)

  constructor() {
    this.router = Router()
    this.routes()
  }

  private index = async (req: Request, res: Response) => {
    res.json(gameList)
  }

  private launchSteam = async (req: Request, res: Response) => {
    try {
      const { stdout } = await this.execGame(GamesPath.STEAM)

      res.json({
        message: 'Running steam',
        stdout
      })
    } catch (error) {
      res.status(500).json({
        message: 'Error running steam'
      })
      console.log(error)
    }
  }

  private launchCsGo = async (req: Request, res: Response) => {
    try {
      const { stdout } = await this.execGame(GamesPath.CSGO)

      res.json({
        message: 'Running cs go',
        stdout
      })
    } catch (error) {
      res.status(500).json({
        message: 'Error running cs go'
      })
      console.log(error)
    }
  }

  private launchRocketLeague = async (req: Request, res: Response) => {
    try {
      const { stdout } = await this.execGame(GamesPath.ROCKET_LEAGUE)

      res.json({
        message: 'Running rocket league',
        stdout
      })
    } catch (error) {
      res.status(500).json({
        message: 'Error rocket league'
      })
      console.log(error)
    }
  }

  private routes() {
    this.router.get('/games', this.index)
    this.router.get('/launch/steam', this.launchSteam)
    this.router.get('/launch/csgo', this.launchCsGo)
    this.router.get('/launch/rocketleague', this.launchRocketLeague)
  }
}
