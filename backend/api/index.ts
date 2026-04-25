type VercelRequest = {
  url?: string;
  headers?: Record<string, string | string[] | undefined>;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (payload: unknown) => void;
};

function getPathname(req: VercelRequest): string {
  const hostHeader = req.headers?.host;
  const host = Array.isArray(hostHeader) ? hostHeader[0] : hostHeader;
  const base = `http://${host ?? "localhost"}`;
  return new URL(req.url ?? "/", base).pathname;
}

function isHealthPath(pathname: string): boolean {
  return pathname === "/health" || pathname === "/api/v1/health";
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  const pathname = getPathname(req);

  // Liveness endpoint should stay available even if DB/env bootstrap fails.
  if (isHealthPath(pathname)) {
    res.status(200).json({
      success: true,
      status: "ok",
      service: "fasto-vpn-backend",
      timestamp: new Date().toISOString(),
    });
    return;
  }

  try {
    const [{ app }, { ensureServerReady }] = await Promise.all([import("../src/app"), import("../src/bootstrap")]);
    await ensureServerReady();
    app(req as any, res as any);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error";
    res.status(500).json({
      success: false,
      message,
    });
  }
}
