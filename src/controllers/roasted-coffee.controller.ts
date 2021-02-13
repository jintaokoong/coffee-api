import express from 'express';
import { getConnection } from 'typeorm';
import { Coffee, Roast, RoastedCoffee, Roastery, User } from '../entity';
import { CreateRoastedCoffeeApiRequest } from '../interfaces/roasted/create-roasted';
import { AuthGuard } from '../middlewares/auth-guards';
import { authService } from '../services/auth.service';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).send('ok');
});

router.post('/', AuthGuard, async (req, res) => {
  let user: User | undefined = undefined;
  try {
    user = await authService.findUserById(res.locals.user.userId);
  } catch (err) {
    console.error(err);
    return res.status(500).send('internal server error.');
  }
  const payload: CreateRoastedCoffeeApiRequest = req.body;

  let roast: Roast | undefined = undefined;
  if (payload.roast.id) {
    roast = await Roast.findOne(payload.roast.id);
  }

  let roastery: Roastery | undefined = undefined;
  try {
    roastery = await Roastery.findOne(payload.roastery);
  } catch (err) {
    console.error(err);
    return res.status(500).send('internal server error.');
  }

  if (roastery === undefined) {
    return res.status(400).send('roastery not found.');
  }

  let coffee: Coffee | undefined = undefined;
  try {
    coffee = await Coffee.findOne(payload.coffee);
  } catch (err) {
    console.error(err);
    return res.status(500).send('internal server error.');
  }

  if (coffee === undefined) {
    return res.status(400).send('coffee not found.');
  }

  let roasted: RoastedCoffee | undefined = undefined;

  const connection = getConnection();
  const queryRunner = connection.createQueryRunner();
  queryRunner.startTransaction();
  const entityManager = connection.createEntityManager();

  try {
    if (roast === undefined) {
      const n_roast = new Roast();
      n_roast.name = payload.roast.name;
      roast = await entityManager.save(n_roast);
    }

    roasted = new RoastedCoffee();
    roasted.weight = payload.weight;
    roasted.roast = roast;
    roasted.roastery = roastery!;
    roasted.coffee = coffee!;
    roasted.createdBy = user!;

    roasted = await entityManager.save(roasted);
    queryRunner.commitTransaction();
  } catch (err) {
    queryRunner.rollbackTransaction();
    console.error(err);
    return res.status(500).send({
      error: {
        type: 'internal_error',
        message: 'internal server error.',
      },
    });
  } finally {
    queryRunner.release();
  }

  const response = {
    roastedCoffee: {
      ...roasted,
      recipes: undefined,
      createdBy: undefined,
    },
  };
  return res.status(200).send(response);
});

const roastedCoffeeController = router;

export default roastedCoffeeController;
