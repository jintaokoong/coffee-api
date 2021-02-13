import express from "express";
import { GetRoasteriesApiResponse } from "src/interfaces/roastery/get-roastery";
import { User } from "../entity/User";
import {
  CreateRoasteryApiRequest,
  CreateRoasteryApiResponse,
  CreateRoasteryRequest,
} from "../interfaces/roastery/create-roastery";
import { AuthGuard } from "../middlewares/auth-guards";
import { authService } from "../services/auth.service";
import { roasteryService } from "../services/roastery.service";

const router = express.Router();

router.post("/", AuthGuard, async (req, res) => {
  const payload: CreateRoasteryApiRequest = req.body;
  const user = await authService.findUserById(res.locals.user.userId);
  if (user === undefined) {
    const response: CreateRoasteryApiResponse = {
      error: {
        type: "user_undefined",
        message: "user not found.",
      },
    };
    return res.status(400).send(response);
  }
  const updated: CreateRoasteryRequest = {
    ...payload,
    user: user,
  };

  const createResponse = await roasteryService.createRoastery(updated);
  if (createResponse.error !== undefined) {
    switch (createResponse.error.type) {
      case "server_error":
        return res.status(500).send(createResponse);
      case "insert_error":
        return res.status(400).send(createResponse);
      default:
        return res.status(500).send(createResponse);
    }
  }

  return res.status(200).send(createResponse);
});

router.get("/", AuthGuard, async (_req, res) => {
  const user = await User.findOne(
    { id: res.locals.user.userId },
    { relations: ["roasteries"] }
  );
  if (user === undefined) {
    const response: GetRoasteriesApiResponse = {
      error: {
        type: "user_undefined",
        message: "user not found.",
      },
    };
    return res.status(400).send(response);
  }

  const getResponse = await roasteryService.fetchRoasteries({
    user: user,
  });
  if (getResponse.error !== undefined) {
    return res.status(500).send({
      error: getResponse.error,
    });
  }

  return res.status(200).send(getResponse);
});

const roasteryController = router;

export default roasteryController;
