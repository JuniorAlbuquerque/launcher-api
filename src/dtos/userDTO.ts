import { IUserData } from '@app/controllers/UserController/types'

export type UserDto = Omit<IUserData, 'password'>
