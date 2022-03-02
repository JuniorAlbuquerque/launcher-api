import { Request, Response, Router } from 'express'
import { ResponseError } from '../types'

import axios from 'axios'
import { WeatherMap } from '@app/mappers/WeatherMap'
import { WeatherDataDto } from '@app/dtos/weatherDto'
import { IWeatherResponse } from './types'

const apiKey = '46737a507a404460a2f210730222802'
const location = 'Itacoatiara'
const lang = 'pt'
const baseUrlWeather = 'http://api.weatherapi.com/v1/current.json'

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
    const { data } = await axios.get<IWeatherResponse>(baseUrlWeather, {
      params: {
        key: apiKey,
        q: location,
        lang: lang
      }
    })

    res.json(WeatherMap.toDto(data))
  }

  private routes() {
    this.router.get('/weather', this.index)
  }
}
