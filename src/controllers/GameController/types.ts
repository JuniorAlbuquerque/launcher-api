export enum GamesPath {
  STEAM = '"C:\\Program Files (x86)\\Steam\\steam"',
  CSGO = '"C:\\Users\\Junior\\Desktop\\Counter-Strike Global Offensive.url"',
  ROCKET_LEAGUE = '"D:\\Games\\rocketleague\\Binaries\\Win64\\RocketLeague"'
}

export const gameList = [
  {
    id: 0,
    name: 'Counter Strike Global Offensive',
    bg: 'http://localhost:3333/static/images/cs/csbg.png',
    character: 'http://localhost:3333/static/images/cs/person.png',
    path: 'csgo',
    executable: 'csgo.exe'
  },
  {
    id: 1,
    name: 'Rocket League',
    bg: 'http://localhost:3333/static/images/rl/rlbg.png',
    character: 'http://localhost:3333/static/images/rl/car.png',
    path: 'rocketleague',
    executable: 'rocketleague.exe'
  },
  {
    id: 2,
    name: 'Brawhalla',
    bg: 'http://localhost:3333/static/images/brawhalla/brawhallabg.png',
    character: 'http://localhost:3333/static/images/brawhalla/character.png',
    path: 'brawhalla',
    executable: 'brawhalla.exe'
  }
]
