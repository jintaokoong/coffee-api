import express from "express";
import { User } from "../entity/User";
import { AuthGuard } from "../middlewares/auth-guards";

const router = express.Router();

router.get("/", AuthGuard, async (_req, res) => {
  console.log(res.locals.user);
  let user: User | undefined = undefined;
  try {
    user = await User.findOne({
      where: {
        id: res.locals.user.userId,
      },
    });
  } catch (err) {
    return res.status(400).send("user not found.");
  }

  if (!user) {
    return res.status(400).send("user not found.");
  }

  return res.status(200).send(user.coffees ?? []);
});

export default router;
