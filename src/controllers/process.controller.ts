import express from "express";
import { Process } from "../entity/Process";
import { CreateProcessApiRequest } from "../interfaces/process/create-process";
import { AuthGuard } from "../middlewares/auth-guards";
import { authService } from "../services/auth.service";

const router = express.Router();

router.get("/", AuthGuard, async (_req, res) => {
  let processes = undefined;
  try {
    processes = await Process.find({});
  } catch (err) {
    console.error(err);
    const response = {
      error: {
        type: "fetch_error",
        message: "an error occured.",
      },
    };
    return res.status(400).send(response);
  }

  const dtos = processes.map((p) => ({
    ...p,
    coffees: undefined,
  }));

  return res.status(200).send({
    processes: dtos,
  });
});

router.post("/", AuthGuard, async (req, res) => {
  const payload: CreateProcessApiRequest = req.body;
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

  let process = new Process();
  try {
    process.name = payload.name;
    process.description = payload.description;
    process = await process.save();
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
    process: {
      ...process,
      coffees: undefined,
    },
  };
  return res.status(200).send(response);
});

export default router;
