import { app } from "./app";
import { disconnectDatabase } from "./config/database";
import { env } from "./config/env";
import { ensureServerReady } from "./bootstrap";
import { logger } from "./config/logger";

async function bootstrap(): Promise<void> {
  await ensureServerReady();

  const server = app.listen(env.PORT, () => {
    logger.info(`Fasto VPN backend listening on http://localhost:${env.PORT}`);
  });

  const shutdown = async () => {
    logger.info("Graceful shutdown started");
    server.close(async () => {
      await disconnectDatabase();
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

bootstrap().catch((error) => {
  logger.error({ error }, "Failed to start backend");
  process.exit(1);
});
