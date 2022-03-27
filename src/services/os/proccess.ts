import { exec } from 'child_process'
import { socketEmit } from '../socket'

const isRunning = (query, cb) => {
  const platform = process.platform
  let cmd = ''
  switch (platform) {
    case 'win32':
      cmd = `tasklist`
      break
    case 'darwin':
      cmd = `ps -ax | grep ${query}`
      break
    case 'linux':
      cmd = `ps -A`
      break
    default:
      break
  }
  exec(cmd, (err, stdout) => {
    cb(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1)
  })
}

const checkProccessAndEmit = (process: string) => {
  isRunning(process, (status) => {
    socketEmit({
      topic: process,
      message: status
    })
    console.log(process, status)
  })
}

export { checkProccessAndEmit }
