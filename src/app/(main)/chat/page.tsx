"use client";

import { useChat } from "ai/react";
import { Bot, User } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="absolute bottom-12 left-0 right-0 mx-auto flex h-full max-h-[80vh] w-full max-w-3xl flex-col justify-end text-black">
      <div
        ref={scrollRef}
        className="bottom-0 flex-col-reverse overflow-y-scroll"
      >
        <div className="messages pr-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className="my-4 flex flex-1 gap-3 text-sm text-gray-600"
            >
              <span
                className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full"
                style={{ margin: "30px", marginTop: "0px" }}
              >
                <div className="rounded-full border bg-gray-100 p-1">
                  {m.role === "user" ? <User /> : <Bot />}
                </div>
              </span>
              <p className="leading-relaxed text-black">
                <span className="block font-bold text-black">{m.role}</span>
                {m.content}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="chat-window flex items-center pt-0">
        <form
          className="flex w-full items-center justify-center space-x-2"
          onSubmit={handleSubmit}
        >
          <input
            value={input}
            onChange={handleInputChange}
            className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#030712] placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Ask what you have in mind"
          />
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-[#f9fafb] hover:bg-[#111827E6] disabled:pointer-events-none disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
