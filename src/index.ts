import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import authController from "./controllers/auth.controller";
import coffeeController from "./controllers/coffee.controller";
import originController from "./controllers/origin.controller";
import processController from "./controllers/process.controller";
import roasteryController from "./controllers/roastery.controller";
import userController from "./controllers/user.controller";

(async () => {
  const app = express();
  app.use(
    cors({
      origin: "http://localhost:4000",
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json());

  app.get("/", (_req, res) => {
    res.send("service is up!");
  });

  app.use("/api/user", userController);
  app.use("/api/auth", authController);
  app.use("/api/origin", originController);
  app.use("/api/process", processController);
  app.use("/api/roastery", roasteryController);
  app.use("/api/coffee", coffeeController);

  await createConnection();
  app.listen(4000, () => {
    console.log("listening to port 4000");
  });

  process.on("SIGINT", function () {
    console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
    // some other closing procedures go here
    process.exit(1);
  });
})();
