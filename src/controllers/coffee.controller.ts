import express from 'express';
import { CreateCoffeeApiRequest } from 'src/interfaces/coffee/create-coffee';
import { Coffee } from '../entity/Coffee';
import { Origin } from '../entity/Origin';
import { Process } from '../entity/Process';
import { User } from '../entity/User';
import { AuthGuard } from '../middlewares/auth-guards';

const router = express.Router();

router.get('/', AuthGuard, async (_req, res) => {
  let user: User | undefined = undefined;
  try {
    user = await User.findOne(
      {
        id: res.locals.user.userId,
      },
      { relations: ['coffees', 'coffees.process', 'coffees.origin'] }
    );
  } catch (err) {
    return res.status(500).send('internal server error.');
  }

  if (!user) {
    return res.status(400).send('user not found.');
  }

  const response = {
    coffee: user.coffees.map((c) => ({
      id: c.id,
      variation: c.variation,
      process: {
        id: c.process.id,
        name: c.process.name,
      },
      origin: {
        id: c.origin.id,
        farm: c.origin.farm,
        country: c.origin.country,
        region: c.origin.region,
      },
    })),
  };
  return res.status(200).send(response);
});

router.post('/', AuthGuard, async (req, res) => {
  const payload: CreateCoffeeApiRequest = req.body;
  let user: User | undefined = undefined;
  try {
    user = await User.findOne(
      {
        id: res.locals.user.userId,
      },
      { relations: ['coffees'] }
    );
  } catch (err) {
    console.error(err);
    return res.status(500).send('internal server error');
  }

  if (!user) {
    return res.status(400).send('user not found.');
  }

  let origin: Origin | undefined = undefined;
  try {
    origin = await Origin.findOne({ id: payload.origin });
  } catch (err) {
    console.error(err);
    return res.status(500).send('internal server error');
  }

  if (!origin) {
    return res.status(400).send('origin id invalid.');
  }

  let process: Process | undefined = undefined;
  try {
    process = await Process.findOne({ id: payload.process });
  } catch (err) {
    console.error(err);
    return res.status(500).send('internal server error');
  }

  if (!process) {
    return res.status(400).send('process id invalid.');
  }

  let coffee = new Coffee();
  coffee.origin = origin;
  coffee.process = process;
  coffee.variation = payload.variation;
  coffee.createdBy = user;
  try {
    coffee = await coffee.save();
  } catch (err) {
    console.error(err);
    return res.status(500).send('insert error');
  }

  const response = {
    coffee: {
      ...coffee,
      createdBy: undefined,
    },
  };
  return res.status(201).send(response);
});

export default router;
