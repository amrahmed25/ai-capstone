import { IncomingMessage, ServerResponse } from "http";
import { streamText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { AI_CONFIG } from "./aiConfig";

// Helper to parse the JSON request body in raw Node/Connect
async function getRequestBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk: any) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err: any) {
        reject(new Error("Invalid JSON payload"));
      }
    });
    req.on("error", (err: any) => {
      reject(err);
    });
  });
}

export async function handleAIChat(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    // 1. Only allow POST requests
    if (req.method !== "POST") {
      res.writeHead(405, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Method Not Allowed" }));
      return;
    }

    // 2. Parse request body
    const body = await getRequestBody(req);
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: 'Missing or invalid "messages" array in request body' }));
      return;
    }

    // 3. Resolve API Keys and Model provider
    const anthropicKey = process.env.ANTHROPIC_API_KEY || process.env.VITE_ANTHROPIC_API_KEY;
    const googleKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    let modelInstance: any;

    if (anthropicKey) {
      const anthropic = createAnthropic({ apiKey: anthropicKey });
      modelInstance = anthropic(AI_CONFIG.anthropicModel);
      console.log(`[CineGuide API] Initialized Anthropic model: ${AI_CONFIG.anthropicModel}`);
    } else if (googleKey) {
      const google = createGoogleGenerativeAI({ apiKey: googleKey });
      modelInstance = google(AI_CONFIG.googleModel);
      console.log(`[CineGuide API] Initialized Google Gemini model: ${AI_CONFIG.googleModel}`);
    } else {
      console.error("[CineGuide API] Error: No API keys found.");
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ 
        error: "AI Provider API Key missing. Please set ANTHROPIC_API_KEY or GEMINI_API_KEY on the server." 
      }));
      return;
    }

    // 4. Call streamText with type assertion to avoid strict options check
    const result = streamText({
      model: modelInstance,
      system: AI_CONFIG.systemPrompt,
      messages: messages.map((m: any) => ({
        role: m.role,
        content: m.content,
      })),
      temperature: AI_CONFIG.temperature,
      maxTokens: AI_CONFIG.maxTokens,
    } as any);

    // 5. Setup Streaming headers for SSE / Stream response
    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Content-Type-Options": "nosniff",
    });

    // Pipe the textStream tokens directly to the client
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
