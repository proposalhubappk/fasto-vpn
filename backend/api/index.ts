import { app } from "../src/app";
import { ensureServerReady } from "../src/bootstrap";

export default async function handler(req: any, res: any): Promise<void> {
  await ensureServerReady();
  app(req, res);
}
