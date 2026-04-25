import mongoose from "mongoose";
import { env } from "./env";
import { logger } from "./logger";

let connectPromise: Promise<void> | null = null;

export async function connectDatabase(): Promise<void> {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!connectPromise) {
    connectPromise = mongoose
      .connect(env.MONGODB_URI, {
        autoIndex: env.NODE_ENV !== "production",
      })
      .then(() => {
        logger.info("MongoDB connected");
      })
      .catch((error) => {
        connectPromise = null;
        throw error;
      });
  }

  await connectPromise;
}

export async function disconnectDatabase(): Promise<void> {
  connectPromise = null;

  if (mongoose.connection.readyState === 0) {
    return;
  }

  await mongoose.disconnect();
  logger.info("MongoDB disconnected");
}
