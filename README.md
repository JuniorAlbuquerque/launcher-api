# Super Launcher Api

Api for running computer games, monitoring cpu and cryptocurrency information services, weather.

## About Stack

This project uses lot of stuff as:

- [Node](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Express](https://expressjs.com/pt-br/)
- [Socket.io](https://socket.io/)

## Usage

Install dependencies
```bash
yarn 
```

Manually add your games (for now)
```
src
└───controllers
│   └───GameController
│       │   types.ts
```
Add games in enum and configure GameController routes
```typescript
export enum GamesPath {
  CSGO = 'your_path',
  ROCKET_LEAGUE = 'your_path'
}
```

Run
```bash
yarn dev
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
