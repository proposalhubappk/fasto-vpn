import { Router } from "express";
import { env } from "../config/env";
import { healthController } from "../controllers/healthController";

export const healthRoutes = Router();

healthRoutes.get("/health", healthController);
healthRoutes.get(`${env.API_PREFIX}/health`, healthController);
