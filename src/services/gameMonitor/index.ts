import { gameList } from '@app/controllers/GameController/types'
import { promosifyFn } from '@app/utils/promisify'
import { QueueFn } from '@app/utils/queuedFn'
import { isRunning } from '../os/proccess'
import { socketEmit, socketListener } from '../socket'

const initGameListener = async () => {
  const defaultDelay = 2000
  const listener: { [key: string]: boolean } = {}
  const qfn = new QueueFn(1)

  let listenId: NodeJS.Timer

  const listen = async () => {
    gameList.forEach((game) => {
      qfn.enqueue(
        async () =>
          await promosifyFn(() =>
            isRunning(game?.executable, (value: boolean) => {
              listener[game?.executable] = value
            })
          )
      )
    })

    if (Object.keys(listener).length === 0) return

    socketEmit({
      topic: 'GAME_RUNNING',
      message: listener
    })
  }

  socketListener('GAME_LISTEN', (value: boolean) => {
    if (value) {
      listenId = setInterval(async () => await listen(), defaultDelay)
      return
    }

    clearInterval(listenId)
  })

  socketListener('disconnect', () => {
    clearInterval(listenId)
  })
}

export { initGameListener }
