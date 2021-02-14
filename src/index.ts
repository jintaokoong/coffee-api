import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import authController from './controllers/auth.controller';
import brewController from './controllers/brew.controller';
import coffeeController from './controllers/coffee.controller';
import originController from './controllers/origin.controller';
import processController from './controllers/process.controller';
import roastController from './controllers/roast.controller';
import roastedCoffeeController from './controllers/roasted-coffee.controller';
import roasteryController from './controllers/roastery.controller';
import userController from './controllers/user.controller';

(async () => {
  const app = express();
  app.use(
    cors({
      origin: 'http://localhost:4000',
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json());

  app.get('/', (_req, res) => {
    res.send('service is up!');
  });

  const prefix = '/api';
  const controllers = [
    { route: '/user', controller: userController },
    { route: '/auth', controller: authController },
    { route: '/brew', controller: brewController },
    { route: '/origin', controller: originController },
    { route: '/process', controller: processController },
    { route: '/roast', controller: roastController },
    { route: '/roastery', controller: roasteryController },
    { route: '/roastedCoffee', controller: roastedCoffeeController },
    { route: '/coffee', controller: coffeeController },
  ];

  controllers.forEach((o) => {
    const concated = prefix.concat(o.route);
    app.use(concated, o.controller);
  });

  await createConnection();
  app.listen(4000, () => {
    console.log('listening to port 4000');
  });

  process.on('SIGINT', function () {
    console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
    // some other closing procedures go here
    process.exit(1);
  });
})();
