import express from 'express';
import { Roast } from '../entity';
import { AuthGuard } from '../middlewares/auth-guards';

const router = express.Router();

router.get('/', AuthGuard, async (_req, res) => {
  let roasts = [];
  try {
    roasts = await Roast.find({});
  } catch (err) {
    console.error(err);
    return res.status(500).send('internal server error.');
  }

  const response = {
    roasts: roasts.map((r) => ({
      id: r.id,
      name: r.name,
    })),
  };
  return res.status(200).send(response);
});

export default router;
