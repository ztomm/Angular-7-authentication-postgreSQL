import * as config from 'config';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import * as path from 'path';
import * as express from 'express';
import * as morgan from 'morgan';

import * as Sequelize from 'sequelize';

import setRoutes from './routes';

const app = express();
// app.set('trust proxy', 1) // trust first proxy (for reverse proxy)

app.set('host', config.get('host'));
app.set('port', (process.env.PORT || config.get('port')));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

setRoutes(app);

// let logConfig = config.get('log');
// logConfig.options.stream = fs.createWriteStream(path.join(process.cwd(), logConfig.options.fileName), { flags: 'a' });
// app.use(morgan(logConfig.format, logConfig.options));

let dbCheck = new Sequelize(
  config.get('db.database'),
  config.get('db.username'),
  config.get('db.password'), {
    host: config.get('db.host'),
    port: config.get('db.port'),
    dialect: config.get('db.dialect'),
    pool: config.get('db.pool'),
    define: config.get('db.define'),
    //logging: config.get('db.logging')
  }
);

dbCheck
.authenticate()
.then(() => {

  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  app.listen(app.get('port'), () => {
    console.log(`
      Listening: http://${app.get('host')}/${app.get('port')}
      NODE_ENV: ${process.env.NODE_ENV}
      Database: connected
    `);
  });
	
  return true;
})
.catch(err => {
  console.error('Unable to connect to database:', err);
  process.exit(1);

});

if(config.get('log.console.info')) console.log('\n***[ app.ts: EXPRESS SERVER STARTET ]***');

export { app };