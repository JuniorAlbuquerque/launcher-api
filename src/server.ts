import express from 'express'
import microstatsConnect from './services/microstats'
import { Server } from 'socket.io'
import http from 'http'
import { socketConnect } from './services/socket'
import cors from 'cors'

const app = express()
app.use(cors())

const httpServer = http.createServer(app)
const io = new Server(httpServer)

app.get('/', (req, res) => {
  return res.json({ message: 'Ola 2' })
})

socketConnect(io)
microstatsConnect()

httpServer.listen(3333, async () => {
  console.log('Server listening')
})
