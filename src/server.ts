import 'dotenv/config'
import express, { Request, Response } from 'express'
import cors from 'cors'
import http from 'http'
import microstatsConnect from '@app/services/microstats'
import { UserController } from './controllers/UserController'
import { OsController } from './controllers/OsController'
import { WeatherController } from './controllers/WeatherController'
import { useSocket } from '@app/services/socket'
import { GameController } from './controllers/GameController'
import { getPingStatus } from './services/ping'
import {
  gameController,
  osController,
  userController,
  weatherController
} from './controllers'
class Server {
  private port = process.env.PORT
  private baseUrl = process.env.BASE_URL
  private app: express.Application
  private httpServer: http.Server

  constructor(
    private userController: UserController,
    private osController: OsController,
    private weatherController: WeatherController,
    private gameController: GameController
  ) {
    this.app = express()
    this.httpServer = useSocket(this.app)

    this.configuration()
    this.starMicrostats()
    this.routes()
    this.pingConnect()
  }

  private configuration() {
    this.app.set('port', this.port)
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use('/static', express.static(__dirname + '/public'))
  }

  private starMicrostats() {
    microstatsConnect()
  }

  private pingConnect() {
    getPingStatus('discord.com', 2000)
  }

  private routes() {
    this.app.use(this.baseUrl, this.userController.router)
    this.app.use(this.baseUrl, this.osController.router)
    this.app.use(this.baseUrl, this.weatherController.router)
    this.app.use(this.baseUrl, this.gameController.router)

    this.app.get('/', (req: Request, res: Response) => {
      res.json({ message: 'Launcher api :D' })
    })
  }

  public start() {
    this.httpServer.listen(this.app.get('port') || 3333, () => {
      console.log(`Server running ir port ${this.app.get('port')}`)
    })
  }
}

const server = new Server(
  userController,
  osController,
  weatherController,
  gameController
)
server.start()
