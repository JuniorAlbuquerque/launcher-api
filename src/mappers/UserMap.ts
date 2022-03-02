import { IUserData } from '@app/controllers/UserController/types'
import { UserDto } from '@app/dtos/userDTO'

export class UserMap {
  static toDto(userData: IUserData): UserDto {
    return {
      username: userData.username,
      name: userData.name,
      level: userData.level
    }
  }
}
