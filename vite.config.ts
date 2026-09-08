import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const devApiPlugin = () => ({
  name: "dev-api-middleware",
  configureServer(server: any) {
    server.middlewares.use((req: any, res: any, next: any) => {
      if (req.url === "/api/newsletter" && req.method === "POST") {
        let body = "";
        req.on("data", (chunk: any) => { body += chunk; });
        req.on("end", () => {
          try {
            const parsed = JSON.parse(body || "{}");
            if (!parsed.email) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: false, error: "Email address is required." }));
              return;
            }
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: true, message: "Thank you for subscribing to our newsletter!" }));
          } catch (e: any) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: false, error: "Invalid request payload." }));
          }
        });
        return;
      }

      if (req.url === "/api/contact" && req.method === "POST") {
        let body = "";
        req.on("data", (chunk: any) => { body += chunk; });
        req.on("end", () => {
          try {
            const parsed = JSON.parse(body || "{}");
            if (!parsed.email || !parsed.name || !parsed.message) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: false, error: "Name, email and message are required." }));
              return;
            }
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: true, message: "Your message has been sent successfully!" }));
          } catch (e: any) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: false, error: "Invalid request payload." }));
          }
        });
        return;
      }

      next();
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), devApiPlugin(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Handle image files with uppercase extensions
  assetsInclude: [
    '**/*.JPG',
    '**/*.jpg', 
    '**/*.PNG',
    '**/*.png',
    '**/*.JPEG',
    '**/*.jpeg',
    '**/*.WEBP',
    '**/*.webp',
    '**/*.SVG',
    '**/*.svg'
  ],
}));