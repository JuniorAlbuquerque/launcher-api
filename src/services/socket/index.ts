import { Application } from 'express'
import { Server } from 'socket.io'
import { SocketEmit } from './types'
import http from 'http'

let _socketService: Server

const socketConnect = (server: Server) => {
  _socketService = server

  server.on('connection', (socket) => {
    socket.on('disconnect', () => {
      console.log('Client disconnected')
    })
  })
}

const socketEmit = <T>({ topic, message }: SocketEmit<T>) => {
  if (_socketService) {
    _socketService.emit(topic, message)
  }
}

const socketListener = <T>(
  message: string,
  listener: (...args: T[]) => void
) => {
  if (_socketService)
    _socketService.on('connection', (socket) => {
      return socket.on(message, listener)
    })
}

const useSocket = (app: Application): http.Server => {
  const httpServer = http.createServer(app)
  const io = new Server(httpServer)
  socketConnect(io)

  return httpServer
}

export { useSocket, socketEmit, socketListener }
