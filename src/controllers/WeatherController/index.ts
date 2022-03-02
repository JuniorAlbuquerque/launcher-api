import { Request, Response, Router } from 'express'
import axios from 'axios'
import { WeatherMap } from '@app/mappers/WeatherMap'
import { WeatherDataDto } from '@app/dtos/weatherDTO'
import { IWeatherResponse } from './types'
import { ResponseError } from '@app/types'

const location = 'Itacoatiara'
const lang = 'pt'

export class WeatherController {
  public router: Router

  constructor() {
    this.router = Router()
    this.routes()
  }

  private index = async (
    req: Request,
    res: Response<WeatherDataDto | ResponseError>
  ) => {
    const { data } = await axios.get<IWeatherResponse>(
      process.env.WEATHER_API_URL,
      {
        params: {
          key: process.env.WEATHER_API_KEY,
          q: location,
          lang: lang
        }
      }
    )

    res.json(WeatherMap.toDto(data))
  }

  private routes() {
    this.router.get('/weather', this.index)
  }
}
