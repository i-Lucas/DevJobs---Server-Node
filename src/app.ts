import cors from "cors";
import express from "express";
import "express-async-errors";

import rateLimit from "express-rate-limit";
import config from "./config/index.js";
import { appMessageErros } from "./errors/index.js";
import errorHandler from "./middlewares/error.js";
import appRouter from "./routes/index.js";

const app = express();

app.set("trust proxy", true);

app.use(
    cors({ origin: "*" }),
    express.json()
);

app.use(rateLimit({
    windowMs: config.api.requests.timeIntervalMinutes,
    max: config.api.requests.maxRequests,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 429,
        message: appMessageErros.api.manyRequests,
    }
}))

app.use(appRouter);
app.use(errorHandler);
export default app;