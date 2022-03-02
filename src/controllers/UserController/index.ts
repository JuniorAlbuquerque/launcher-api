import { UserDto } from '@app/dtos/userDTO'
import { UserMap } from '@app/mappers/UserMap'
import { ResponseError } from '@app/types'
import { Request, Response, Router } from 'express'
import { userInfo } from 'os'
import { IUserData } from './types'

export class UserController {
  public router: Router
  private user: IUserData = {
    username: 'jnralb',
    name: userInfo().username,
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
      res.status(200).json(UserMap.toDto(this.user))

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
