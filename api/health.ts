import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Allow GET and OPTIONS
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return res.status(200).json({
    status: "ok",
    service: "Inventor Design Studio API",
    canonical: "https://inventordesignstudio.io",
    timestamp: new Date().toISOString(),
  });
}
