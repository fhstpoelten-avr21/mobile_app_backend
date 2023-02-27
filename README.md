<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# NestJS Backend Boilerplate

## Description
[Nest](https://github.com/nestjs/nest) framework TypeScript repository including JWT User Authentication.


## Tech Stack

| Technologie                                                        | Version | Description                                                           |
|--------------------------------------------------------------------|--------|-----------------------------------------------------------------------|
| [Node.js](https://nodejs.org/en/)                                  | 19.4   | Javascript runtime environment                                        |
| [Yarn](https://yarnpkg.com/)                                       | 1.22   | Package manager                                                       |
| [Nest](https://nestjs.com/)                                        | 9.1.5  | Node.js framework using [typescript](https://www.typescriptlang.org/) |
| [MariaDB](https://mariadb.org/)                                    | latest | Open Source relational storage, based on MySQL                        |
| [TypeORM](https://docs.nestjs.com/recipes/sql-typeorm#sql-typeorm) | 8.0.2  | for SQL object modelling                                              |
| [Swagger](https://docs.nestjs.com/openapi/introduction)            | 5.2.1  | for API documentation                                                 |
| [Docker](https://www.docker.com/)  | latest | for building a local virtual environment                              |


## Installation
1. **Environment:** Copy ```.env.example```, rename it to ```.env``` and fill in your configuration
<br><br>
2. **Dependencies:** Install packages - ```yarn```
   <br><br>
3. **Docker:** Build and run Docker containers - ```cd docker && docker-compose up -d```
   <br><br>
4. **Migrate:** Build the DB structure - ```yarn migration:run```
   <br><br>
5. **Seed:** Fill the DB with default data - ```yarn seed:run```


## Running the app

```bash
# development
yarn start

# watch mode
yarn start:dev

# production mode
yarn start:prod

# Check out the API documentation in your browser
localhost:3000/api
```

## Architecture

![logo](architecture.jpeg)


## Test

```bash
# unit tests
yarn test

# e2e tests
yarn test:e2e

# test coverage
yarn test:cov
```

## FAQ
### Nestjs Error: Cannot find module './app.controller' or similar
```bash
# Rebuild application
yarn build
```

## License
[MIT licensed](LICENSE)
