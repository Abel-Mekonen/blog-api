import { Express, NextFunction, Request, Response } from "express";
import * as bodyParser from "body-parser";
import { userRoute } from "webapi/routes/auth.route";
import { blogRoute } from "webapi/routes/blog.route";
import * as cors from "cors";
import { commentRoute } from "webapi/routes/comment.route";
import { errorHandler } from "webapi/middlewares/error.handler.middleware";
import * as swaggerUi from "swagger-ui-express";

export class ExpressConfig {
  private app: Express;
  private port = Number(process.env.PORT) || 3000;

  constructor(express: Express) {
    this.app = express;
  }

  public async init(): Promise<void> {
    try {
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: false }));
      this.app.use(cors(
        {origin: '*'}

      ));

      this.app.use("/api/v1/auth", userRoute);
      this.app.use("/api/v1/blogs", blogRoute);
      this.app.use("/api/v1/comments", commentRoute)

      this.app.use(errorHandler)
      this.app.listen(this.port, () => {
        console.log("⚡️[bootup]: Server running on port 3000")
      });

    } catch (error) {
      console.error(error);
    }
  }
}
