import express from "express";
import { authService } from "src/services/auth.service";
import { AuthGuard } from "../middlewares/auth-guards";

const router = express.Router();

router.get("/", AuthGuard, async (_req, res) => {
  console.log(res.locals.user);
  const user = await authService.findUserById(res.locals.user.userId);
  if (user === undefined) {
    const response = {
      error: {
        type: "user_undefined",
        message: "user not found.",
      },
    };
    return res.status(400).send(response);
  }

  return res.status(200).send(user.coffees ?? []);
});

export default router;
