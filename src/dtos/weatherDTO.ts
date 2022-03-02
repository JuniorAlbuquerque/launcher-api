export interface WeatherCondition {
  text: string
  icon: string
  code: number
}

export interface WeatherLocation {
  name: string
  region: string
  country: string
  localtime: string
}

export interface WeatherCurrent {
  last_updated: string
  temp_c: number
  is_day: number
  condition: WeatherCondition
  humidity: number
  cloud: number
}

export type WeatherDataDto = {
  location: WeatherLocation
  current: WeatherCurrent
}
