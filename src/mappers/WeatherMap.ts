import { IWeatherResponse } from '@app/controllers/WeatherController/types'
import { WeatherDataDto } from '@app/dtos/weatherDto'

export class WeatherMap {
  static toDto(weatherData: IWeatherResponse): WeatherDataDto {
    const { location, current } = weatherData

    return {
      location: {
        name: location.name,
        country: location.country,
        localtime: location.localtime,
        region: location.region
      },
      current: {
        condition: current.condition,
        cloud: current.cloud,
        humidity: current.humidity,
        is_day: current.is_day,
        last_updated: current.last_updated,
        temp_c: current.temp_c
      }
    }
  }
}
