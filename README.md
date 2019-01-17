# An Angular 7 Application With Authentication (PEAN)
PEAN = [PostgreSQL](https://www.postgresql.org), [Express](https://expressjs.com), [Angular](https://angular.io), [Node.js](https://nodejs.org)

## other technologies used in this app
- [TypeScript](https://www.typescriptlang.org)
- [Skeleton](http://getskeleton.com)
- [jwt-decode](https://www.npmjs.com/package/jwt-decode)
- [sequelize cli](https://github.com/sequelize/cli)
- [config](https://www.npmjs.com/package/config)
- [concurrently](https://www.npmjs.com/package/concurrently)
- [morgan logger](https://github.com/expressjs/morgan)

## install requirements
1. install [Node.js/download](https://nodejs.org/en/download/)

2. install [Angular CLI](https://cli.angular.io/)
```
$ npm install -g @angular/cli
```

3. install postgreSQL and setup a database -> [postgreSQL/docs](https://www.postgresql.org/docs/manuals/archive/)

4. edit config files, especially the database connection in there
```
$ cd /<app folder>/config/default.json
```

5. install sequelize CLI, migrate and seed
```
$ npm install -g sequelize-cli

// change to app folder
$ cd /<app folder>

// migrate the tables
$ sequelize db:migrate

// seed default data
$ sequelize db:seed:all
```

## init the app
```
$ npm install --save
```

## run the app
```
// in dev mode (nodemon is involved)
$ npm run dev

// in prod mode
$ npm run prod
```

## build the app
```
// The build artifacts will be stored in the `dist/` directory
$ ng build

// for a production build
$ ng build --prod
```

### unit tests
```
// Karma
$ ng test

// Protractor
$ ng e2e

// TSLint
$ ng lint 
```

### the tables (<app folder>/server/models/...)
- UserSession 
- UserRole 
- User 
- Todo (to play around)
