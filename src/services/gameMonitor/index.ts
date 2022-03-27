import { gameList } from '@app/controllers/GameController/types'
import { promosifyFn } from '@app/utils/promisify'
import { QueueFn } from '@app/utils/queuedFn'
import { checkProccessAndEmit } from '../os/proccess'
import { socketListener } from '../socket'

const initGameListener = async () => {
  const defaultDelay = 1000
  const qfn = new QueueFn(1)

  let listenId: NodeJS.Timer

  const listen = async () => {
    gameList.forEach((game) => {
      qfn.enqueue(
        async () =>
          await promosifyFn(() => checkProccessAndEmit(game?.executable))
      )
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
