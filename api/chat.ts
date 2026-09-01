// api/chat.ts
/// <reference types="node" />
import { streamText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { AI_CONFIG } from "../server/aiConfig.js";

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      res.writeHead(405, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Method Not Allowed" }));
      return;
    }
    const { messages } = req.body ?? {};

    if (!messages || !Array.isArray(messages)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: 'Missing or invalid "messages" array in request body' }));
      return;
    }

    const anthropicKey = process.env.ANTHROPIC_API_KEY || process.env.VITE_ANTHROPIC_API_KEY;
    const googleKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    let modelInstance: any;

    if (anthropicKey) {
      const anthropic = createAnthropic({ apiKey: anthropicKey });
      modelInstance = anthropic(AI_CONFIG.anthropicModel);
    } else if (googleKey) {
      const google = createGoogleGenerativeAI({ apiKey: googleKey });
      modelInstance = google(AI_CONFIG.googleModel);
    } else {
      console.error("[CineGuide API] Error: No API keys found.");
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        error: "AI Provider API Key missing. Please set ANTHROPIC_API_KEY or GEMINI_API_KEY on the server.",
      }));
      return;
    }

    const result = streamText({
      model: modelInstance,
      system: AI_CONFIG.systemPrompt,
      messages: messages.map((m: any) => ({ role: m.role, content: m.content })),
      temperature: AI_CONFIG.temperature,
      maxTokens: AI_CONFIG.maxTokens,
    } as any);

    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Content-Type-Options": "nosniff",
    });

    const reader = result.textStream.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
    res.end();
  } catch (error: any) {
    console.error("[CineGuide API] Stream error:", error);
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Streaming failed", details: error.message }));
    } else {
      res.end();
    }
  }
}
export const config = {
  maxDuration: 30,
};