import { ExpressConfig } from "@express-config";
import * as express from "express";
import { config } from "dotenv";
import { DBConfig } from "config/DB.config";

const main = async () => {
  const isDbInitialized = await new DBConfig().init();
  const app = express();
  const Express = new ExpressConfig(app);
  if (isDbInitialized) {
    console.log("Connected to database");
    await Express.init();
  }
};

config();
main();
