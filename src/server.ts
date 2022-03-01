import express, { Request, Response } from 'express'
import cors from 'cors'
import http from 'http'
import { Server as SocketServer } from 'socket.io'
import { socketConnect } from '@app/services/socket'
import microstatsConnect from '@app/services/microstats'

class Server {
  private port = 3333
  private app: express.Application
  private httpServer: http.Server

  constructor() {
    this.app = express()
    this.httpServer = http.createServer(this.app)
    this.config()
    this.configSocket()
  }

  public config() {
    this.app.set('port', this.port)
    this.app.use(cors())
  }

  public configSocket() {
    const io = new SocketServer(this.httpServer)
    socketConnect(io)
    microstatsConnect()
  }

  public routes() {
    this.app.get('/', (req: Request, res: Response) => {
      res.json({ message: 'Hello World' })
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
