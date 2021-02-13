import express from "express";
import { Origin } from "../entity/Origin";
import { CreateOriginApiRequest } from "../interfaces/origin/create-origin";
import { AuthGuard } from "../middlewares/auth-guards";
import { authService } from "../services/auth.service";

const router = express.Router();

router.get("/", AuthGuard, async (_req, res) => {
  const user = await authService.findUserById(res.locals.user.userId, [
    "regions",
  ]);
  if (user === undefined) {
    const response = {
      error: {
        type: "user_undefined",
        message: "user not found.",
      },
    };
    return res.status(400).send(response);
  }

  const originsDto = user.regions.map((o) => ({
    ...o,
    coffee: undefined,
    createdBy: undefined,
  }));

  return res.status(200).send({
    origins: originsDto,
  });
});

router.post("/", AuthGuard, async (req, res) => {
  const payload: CreateOriginApiRequest = req.body;
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

  let origin = new Origin();
  try {
    origin.country = payload.country;
    origin.region = payload.region;
    origin.farm = payload.farm;
    origin.description = payload.description;
    origin.createdBy = user;
    origin = await origin.save();
  } catch (err) {
    console.error(err);
    const response = {
      error: {
        type: "insert_error",
        message: "an error occured.",
      },
    };
    return res.status(500).send(response);
  }

  const response = {
    origin: {
      id: origin.id,
      country: origin.country,
      region: origin.region,
      farm: origin.farm,
      description: origin.description,
    },
  };
  return res.status(200).send(response);
});

export default router;
