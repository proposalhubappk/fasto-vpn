import { connectDatabase } from "./config/database";
import { initFirebaseIfNeeded } from "./config/firebase";
import { logger } from "./config/logger";
import { ensureBaseAppConfig } from "./services/appConfigService";

let bootstrapPromise: Promise<void> | null = null;

export async function ensureServerReady(): Promise<void> {
  if (bootstrapPromise) {
    return bootstrapPromise;
  }

  bootstrapPromise = (async () => {
    await connectDatabase();
    initFirebaseIfNeeded();
    await ensureBaseAppConfig();
    logger.info("Backend bootstrap completed");
  })().catch((error) => {
    bootstrapPromise = null;
    throw error;
  });

  return bootstrapPromise;
}
