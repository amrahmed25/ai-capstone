/// <reference types="vitest/config" />
import path from "node:path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { handleAIChat } from "./server/aiChatHandler";

export default defineConfig(({ mode }) => {
  // Load all environment variables (including those without VITE_ prefix) from .env
  const env = loadEnv(mode, process.cwd(), "");
  process.env = { ...process.env, ...env };

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "api-chat-route",
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === "/api/chat") {
              try {
                await handleAIChat(req, res);
              } catch (err: any) {
                console.error("Vite Dev Server API Error:", err);
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Internal Server Error", details: err.message }));
              }
            } else {
              next();
            }
          });
        },
        configurePreviewServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === "/api/chat") {
              try {
                await handleAIChat(req, res);
              } catch (err: any) {
                console.error("Vite Preview Server API Error:", err);
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Internal Server Error", details: err.message }));
              }
            } else {
              next();
            }
          });
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    test: {
      environment: "jsdom",
      setupFiles: "./src/test/setup.ts",
      css: true,
      include: ["src/**/*.test.{ts,tsx}", "playground/**/*.test.{ts,tsx}"],
    },
  };
});

