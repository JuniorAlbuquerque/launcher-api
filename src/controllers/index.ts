import { GameController } from './GameController'
import { OsController } from './OsController'
import { UserController } from './UserController'
import { WeatherController } from './WeatherController'

const userController = new UserController()
const osController = new OsController()
const weatherController = new WeatherController()
const gameController = new GameController()

export { userController, osController, weatherController, gameController }
