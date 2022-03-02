import { Request, Response, Router } from 'express'
import { ResponseError } from '../types'
import { UserDto } from './types'

export class UserController {
  public router: Router
  private user = {
    username: 'jnralb',
    name: 'Júnior Albuquerque',
    level: 20,
    password: 'secret'
  }

  constructor() {
    this.router = Router()
    this.routes()
  }

  public index = async (
    req: Request,
    res: Response<UserDto | ResponseError>
  ) => {
    const { username, password } = req.body

    if (this.user.username === username && this.user.password === password) {
      res.status(200).json({
        user: this.user.username,
        name: this.user.name,
        level: this.user.level
      })

      return
    }

    res.status(401).json({
      message: 'Falha na autenticação'
    })
  }

  public routes() {
    this.router.post('/login', this.index)
  }
}
