import { IWeatherResponse } from '@app/controllers/WeatherController/types'
import { WeatherDataDto } from '@app/dtos/weatherDTO'
import { formatDate } from '@app/utils/formatDate'

export class WeatherMap {
  static toDto(weatherData: IWeatherResponse): WeatherDataDto {
    const { location, current } = weatherData

    return {
      location: {
        city: location.name,
        region: location.region,
        country: location.country,
        localtime: formatDate(location.localtime, {
          dateStyle: 'short',
          timeStyle: 'short'
        })
      },
      condition: {
        text: current.condition.text,
        icon: current.condition.icon.slice(2)
      },
      info: {
        cloud: current.cloud,
        humidity: current.humidity,
        is_day: current.is_day,
        last_updated: current.last_updated,
        temp_c: current.temp_c
      }
    }
  }
}
