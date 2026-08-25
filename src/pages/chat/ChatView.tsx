import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { MarkdownRenderer } from "../../components/MarkdownRenderer";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatView() {
  const { user } = useAuth();
  
  // 1. Initial State from localStorage or default message
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem("cineguide_messages");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load messages from localStorage:", e);
    }
    return [
      {
        id: "welcome",
        role: "assistant",
        content: `Hello ${user ? user.email?.split("@")[0] : ""}! I am **CineGuide**, your AI cinema assistant. 🍿\n\nTell me about your favorite movies, actors, directors, or describe the mood you are in. I will analyze your taste and curate some hidden gems you might have missed!`,
      },
    ];
  });

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPinnedToBottom, setIsPinnedToBottom] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // 2. Persist messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cineguide_messages", JSON.stringify(messages));
    } catch (e) {
      console.error("Failed to save messages to localStorage:", e);
    }
  }, [messages]);

  // 3. Flawless Auto-scroll: Only scroll to bottom if user is pinned
  const lastMsgContent = messages[messages.length - 1]?.content;
  
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      setIsPinnedToBottom(true);
    }
  };

  useEffect(() => {
    if (isPinnedToBottom && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length, lastMsgContent, isPinnedToBottom]);

  // Check scroll position to release pin when user scrolls up
  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    // Tolerance of 30px
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 30;
    setIsPinnedToBottom(isAtBottom);
  };

  // 4. Auto-grow input text area height
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
    }
  }, [input]);

  // 5. Send message & process stream
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setError(null);
    const userText = input.trim();
    setInput("");

    // Append user message
    const userMsgId = Date.now().toString();
    const userMsg: Message = { id: userMsgId, role: "user", content: userText };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);

    // Set loading and setup placeholder for assistant response
    setIsLoading(true);
    const assistantMsgId = (Date.now() + 1).toString();
    const assistantMsg: Message = { id: assistantMsgId, role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantMsg]);

    // Setup abort controller for the "Stop" button
    const controller = new AbortController();
    abortControllerRef.current = controller;

    let assistantText = "";

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No stream reader available");
      }

      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const token = decoder.decode(value, { stream: true });
        assistantText += token;

        // Update assistant message with current chunk of text
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId ? { ...msg, content: assistantText } : msg
          )
        );
      }
    } catch (err: any) {
      if (err.name === "AbortError") {
        console.log("Chat stream generation aborted by user.");
      } else {
        console.error("Chat error:", err);
        setError(err.message || "Failed to stream message. Please try again.");
        // Append error suffix to the assistant message
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId
              ? {
                  ...msg,
                  content:
                    assistantText +
                    "\n\n*(Error: Connection lost or generation failed. You can resend your message.)*",
                }
              : msg
          )
        );
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
      // Focus back on text box
      setTimeout(() => textareaRef.current?.focus(), 10);
    }
  };

  // 6. Stop stream generation
  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  // 7. Clear chat conversation
  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear the conversation?")) {
      handleStop();
      const defaultWelcome: Message = {
        id: "welcome",
        role: "assistant",
        content: `Hello ${user ? user.email?.split("@")[0] : ""}! I am **CineGuide**, your AI cinema assistant. 🍿\n\nTell me about your favorite movies, actors, directors, or describe the mood you are in. I will analyze your taste and curate some hidden gems you might have missed!`,
      };
      setMessages([defaultWelcome]);
      setError(null);
      localStorage.removeItem("cineguide_messages");
    }
  };

  // Handle enter key on textarea to submit form (Shift+Enter for newline)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <main className="flex flex-col h-[calc(100vh-73px)] max-h-[calc(100vh-73px)] bg-slate-950 text-slate-100 overflow-hidden relative">
      {/* App bar / Subheader */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/40 px-6 py-3.5 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="relative flex h-3 w-3">
            <span className={`absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75 ${isLoading ? "animate-ping" : "animate-pulse"}`}></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-indigo-500"></span>
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
              CineGuide AI Assistant
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">Curating cinema gems based on your mood & favorites</p>
          </div>
        </div>
        <button
          onClick={handleClear}
          type="button"
          className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          Clear History
        </button>
      </div>

      {/* Messages Thread Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-6 md:px-6 space-y-6 scroll-smooth"
      >
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.map((message, index) => {
            const isUser = message.role === "user";
            const isLatest = index === messages.length - 1;
            
            // Handoff logic: Show thinking indicator if assistant is typing and the message is empty
            const showThinking = !isUser && isLatest && isLoading && message.content.length === 0;

            return (
              <div
                key={message.id}
                className={`flex gap-3 md:gap-4 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {/* Avatar Icon */}
                {!isUser && (
                  <div className="flex h-9 w-9 shrink-0 select-none items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 font-bold text-white shadow shadow-indigo-500/20 text-sm">
                    CG
                  </div>
                )}

                {/* Message Bubble Container */}
                <div
                  className={`flex flex-col max-w-[85%] md:max-w-[75%] rounded-2xl px-4.5 py-3 shadow-md ${
                    isUser
                      ? "bg-indigo-600/90 text-white rounded-tr-none border border-indigo-500/20"
                      : "bg-slate-900/95 border border-slate-800 rounded-tl-none backdrop-blur-sm"
                  }`}
                >
                  {/* Thinking Handoff container */}
                  {showThinking ? (
                    <div className="flex items-center gap-1.5 py-1 text-indigo-400">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-400" style={{ animationDelay: "0ms" }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-400" style={{ animationDelay: "150ms" }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-400" style={{ animationDelay: "300ms" }} />
                      <span className="ml-1 text-xs font-semibold uppercase tracking-wider text-indigo-400/80">Thinking</span>
                    </div>
                  ) : (
                    /* Inline styling with smooth transition wrapper */
                    <div
                      className={`transition-opacity duration-300 ${
                        !isUser && isLatest && isLoading && message.content.length === 0 ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      {isUser ? (
                        <p className="whitespace-pre-wrap text-sm text-indigo-50 leading-relaxed">{message.content}</p>
                      ) : (
                        <MarkdownRenderer content={message.content} />
                      )}
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="flex h-9 w-9 shrink-0 select-none items-center justify-center rounded-xl bg-slate-800 font-bold text-slate-300 text-xs uppercase border border-slate-700">
                    U
                  </div>
                )}
              </div>
            );
          })}

          {error && (
            <div className="flex justify-center">
              <div className="rounded-xl border border-red-900/30 bg-red-950/20 px-4 py-3 text-center text-sm text-red-300 max-w-md shadow">
                <p className="font-semibold mb-1">CineGuide Connection Error</p>
                <p className="text-xs text-red-400/80">{error}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Jump to Latest Button */}
      {!isPinnedToBottom && (
        <button
          onClick={scrollToBottom}
          type="button"
          className="absolute bottom-26 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-xl hover:bg-indigo-500 border border-indigo-400/30 transition-all hover:scale-105 active:scale-95 z-10"
        >
          <svg
            className="h-3.5 w-3.5 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 13l-7 7-7-7" />
          </svg>
          Jump to Latest
        </button>
      )}

      {/* Input Form Bar */}
      <div className="border-t border-slate-800/80 bg-slate-950/95 p-4 backdrop-blur-md">
        <form onSubmit={handleSend} className="mx-auto max-w-3xl flex items-end gap-2.5">
          <div className="relative flex-1 flex items-center rounded-xl border border-slate-800 bg-slate-900/50 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/10 transition px-3 py-2">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask CineGuide to recommend films (e.g. 'I want a tense cyberpunk mystery...')"
              className="w-full resize-none bg-transparent text-sm text-white outline-none max-h-40 min-h-[20px] placeholder:text-slate-500 pr-10"
              disabled={isLoading && messages[messages.length - 1]?.content.length === 0}
            />
          </div>

          {/* Brain Button: multi-state send / stop button */}
          {isLoading ? (
            <button
              onClick={handleStop}
              type="button"
              className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-xl bg-red-600/90 hover:bg-red-500 text-white shadow-md hover:shadow-red-500/20 active:scale-95 transition-all"
              title="Stop generating"
              aria-label="Stop generating"
            >
              <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="6" width="12" height="12" rx="1.5" />
              </svg>
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className={`flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-xl shadow-md transition-all active:scale-95 ${
                input.trim()
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white hover:shadow-indigo-500/20"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-800/40"
              }`}
              title="Send message"
              aria-label="Send message"
            >
              <svg className="h-4.5 w-4.5 transform rotate-90" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          )}
        </form>
        <div className="mx-auto max-w-3xl flex justify-between items-center mt-2 px-1 text-[10px] text-slate-500">
          <span>Press Enter to send, Shift+Enter for a new line</span>
          <span>Conversation history saved automatically</span>
        </div>
      </div>
    </main>
  );
}
