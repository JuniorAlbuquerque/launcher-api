import { Server } from 'socket.io'
import { SocketEmit } from './types'

let _socketService: Server

const socketConnect = (server: Server) => {
  _socketService = server

  server.on('connection', (socket) => {
    console.log('New client connected')

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

export { socketConnect, socketEmit }
