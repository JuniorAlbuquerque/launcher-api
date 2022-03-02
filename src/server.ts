import 'dotenv/config'
import express, { Request, Response } from 'express'
import cors from 'cors'
import http from 'http'
import { Server as SocketServer } from 'socket.io'
import { socketConnect } from '@app/services/socket'
import microstatsConnect from '@app/services/microstats'
import { UserController } from './controllers/UserController'
import { OsController } from './controllers/OsController'
import { WeatherController } from './controllers/WeatherController'

class Server {
  private port = 3333
  private baseUrl = '/api'
  private app: express.Application
  private httpServer: http.Server

  private userController: UserController
  private osController: OsController
  private weatherController: WeatherController

  constructor() {
    this.app = express()
    this.httpServer = http.createServer(this.app)
    this.userController = new UserController()
    this.osController = new OsController()
    this.weatherController = new WeatherController()

    this.config()
    this.configSocket()
    this.routes()
  }

  private config() {
    this.app.set('port', this.port)
    this.app.use(cors())
    this.app.use(express.json())
  }

  private configSocket() {
    const io = new SocketServer(this.httpServer)
    socketConnect(io)
    microstatsConnect()
  }

  private routes() {
    this.app.use(this.baseUrl, this.userController.router)
    this.app.use(this.baseUrl, this.osController.router)
    this.app.use(this.baseUrl, this.weatherController.router)

    this.app.get('/', (req: Request, res: Response) => {
      res.json({ message: 'Launcher api :D' })
    })
  }

  public start() {
    this.httpServer.listen(this.app.get('port'), () => {
      console.log(`Server running ir port ${this.app.get('port')}`)
    })
  }
}

const server = new Server()
server.start()
