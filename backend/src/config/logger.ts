import pino from "pino";
import { env } from "./env";

const isServerlessRuntime = process.env.VERCEL === "1" || Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME);
const canUsePrettyLogs = env.NODE_ENV !== "production" && !isServerlessRuntime && Boolean(process.stdout.isTTY);

export const logger = pino(
  canUsePrettyLogs
    ? {
        level: "debug",
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: true,
            ignore: "pid,hostname",
          },
        },
      }
    : {
        level: env.NODE_ENV === "production" ? "info" : "debug",
      },
);
