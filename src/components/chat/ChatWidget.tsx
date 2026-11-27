"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle, Send, X } from "lucide-react";
import { GREETING, matchIntent, type ChatLink } from "@/components/chat/chatKnowledge";

type Message = { id: number; role: "bot" | "user"; text: string; links?: ChatLink[]; suggestions?: string[] };

const DISMISSED_KEY = "gss-chat-dismissed";
const AUTO_OPEN_DELAY = 1400;
const REPLY_DELAY = 650;

let messageCounter = 0;
const nextMessageId = () => ++messageCounter;

function rememberDismissal() {
  try { sessionStorage.setItem(DISMISSED_KEY, "1"); } catch { /* storage unavailable — ignore */ }
}

function wasDismissed() {
  try { return sessionStorage.getItem(DISMISSED_KEY) === "1"; } catch { return false; }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(true);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const seeded = useRef(false);
  const focusOnOpen = useRef(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => { timers.current.forEach((timer) => window.clearTimeout(timer)); }, []);

  const schedule = (callback: () => void, delay: number) => {
    const timer = window.setTimeout(callback, delay);
    timers.current.push(timer);
  };

  const openChat = useCallback((focusInput: boolean) => {
    setOpen(true);
    setUnread(false);
    focusOnOpen.current = focusInput;
    if (seeded.current) return;
    seeded.current = true;
    setTyping(true);
    schedule(() => {
      setTyping(false);
      setMessages([{ id: nextMessageId(), role: "bot", text: GREETING.text, links: GREETING.links, suggestions: GREETING.suggestions }]);
    }, 450);
  }, []);

  const closeChat = useCallback(() => {
    setOpen(false);
    rememberDismissal();
  }, []);

  // Auto-open once per visit unless the visitor dismissed it earlier this session.
  useEffect(() => {
    if (wasDismissed()) return;
    const timer = window.setTimeout(() => openChat(false), AUTO_OPEN_DELAY);
    return () => window.clearTimeout(timer);
  }, [openChat]);

  // Escape closes the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") closeChat(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeChat]);

  // Focus the input once the panel has mounted — but only when opened by the visitor,
  // so the auto-open on page load never steals focus.
  useEffect(() => {
    if (open && focusOnOpen.current) {
      focusOnOpen.current = false;
      inputRef.current?.focus();
    }
  }, [open]);

  // Keep the newest message in view.
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, typing, open]);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    setDraft("");
    setMessages((current) => [...current, { id: nextMessageId(), role: "user", text }]);
    setTyping(true);
    const reply = matchIntent(text);
    schedule(() => {
      setTyping(false);
      setMessages((current) => [...current, { id: nextMessageId(), role: "bot", text: reply.text, links: reply.links, suggestions: reply.suggestions }]);
    }, REPLY_DELAY);
  };

  const lastMessage = messages[messages.length - 1];
  const showSuggestions = !typing && lastMessage?.role === "bot" && lastMessage.suggestions?.length;

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => openChat(true)}
          aria-label="Open chat"
          className="fixed bottom-5 right-5 z-[60] inline-flex h-13 w-13 items-center justify-center rounded-full bg-forest text-ivory shadow-[0_10px_30px_rgba(25,54,75,.35)] transition-transform duration-200 hover:scale-105 sm:bottom-6 sm:right-6"
        >
          <MessageCircle size={22} aria-hidden="true" />
          {unread && <span aria-hidden="true" className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-ivory bg-champagne" />}
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-label="Chat with Global Study Sync"
          className="chat-pop fixed inset-x-4 bottom-4 z-[60] flex h-[min(560px,calc(100dvh-6.5rem))] flex-col overflow-hidden rounded-2xl border border-forest/15 bg-ivory shadow-[0_24px_70px_rgba(25,54,75,.35)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[384px]"
        >
          <div className="flex items-center gap-3 bg-forest px-4 py-3.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-ivory">
              <MessageCircle size={17} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ivory">Global Study Sync</p>
              <p className="flex items-center gap-1.5 text-[11px] text-ivory/75">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-champagne" />
                Site assistant · typically replies quickly
              </p>
            </div>
            <button type="button" onClick={closeChat} aria-label="Close chat" className="rounded-full p-1.5 text-ivory/80 transition-colors hover:bg-white/10 hover:text-ivory">
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <div ref={logRef} role="log" aria-live="polite" aria-label="Chat messages" className="flex-1 space-y-3 overflow-y-auto bg-sage/40 px-4 py-4">
            {messages.map((message) =>
              message.role === "bot" ? (
                <div key={message.id} className="flex flex-col items-start gap-2">
                  <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-forest/10 bg-white px-3.5 py-2.5 text-sm leading-6 text-charcoal shadow-sm">{message.text}</div>
                  {message.links && message.links.length > 0 && (
                    <div className="flex max-w-[90%] flex-wrap gap-2">
                      {message.links.map((link) => (
                        <Link key={link.href + link.label} href={link.href} onClick={closeChat} className="inline-flex items-center gap-1.5 rounded-full border border-forest/20 bg-white px-3 py-1.5 text-xs font-semibold text-forest transition-colors hover:bg-sage">
                          {link.label} <ArrowRight size={12} aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div key={message.id} className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-forest px-3.5 py-2.5 text-sm leading-6 text-ivory">{message.text}</div>
              ),
            )}
            {typing && (
              <div className="flex w-fit items-center gap-1.5 rounded-2xl rounded-bl-md border border-forest/10 bg-white px-4 py-3 shadow-sm" aria-label="Assistant is typing">
                {[0, 150, 300].map((delay) => (
                  <span key={delay} className="h-1.5 w-1.5 animate-bounce rounded-full bg-forest/50" style={{ animationDelay: `${delay}ms` }} />
                ))}
              </div>
            )}
          </div>

          {showSuggestions && (
            <div className="flex flex-wrap gap-2 border-t border-forest/10 bg-ivory px-4 pt-3">
              {lastMessage.suggestions!.map((suggestion) => (
                <button key={suggestion} type="button" onClick={() => send(suggestion)} className="rounded-full border border-champagne/70 bg-white px-3 py-1.5 text-xs font-semibold text-forest transition-colors hover:bg-champagne/15">
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(event) => { event.preventDefault(); send(draft); }}
            className="border-t border-forest/10 bg-ivory p-3"
          >
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Type your question…"
                maxLength={280}
                aria-label="Your question"
                className="h-10 flex-1 rounded-full border border-forest/15 bg-white px-4 text-sm text-charcoal outline-none transition-colors placeholder:text-charcoal/40 focus:border-forest/40"
              />
              <button type="submit" aria-label="Send message" disabled={!draft.trim()} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-ivory transition-colors hover:bg-forest/85 disabled:opacity-40">
                <Send size={15} aria-hidden="true" />
              </button>
            </div>
            <p className="mt-2 px-1 text-center text-[10px] leading-4 text-charcoal/50">
              Answers are informational. For study-specific details, <Link href="/contact" onClick={closeChat} className="underline decoration-champagne underline-offset-2">contact the team</Link>.
            </p>
          </form>
        </div>
      )}
    </>
  );
}
