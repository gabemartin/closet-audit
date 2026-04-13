import React, { useState, useRef, useEffect } from "react";
import type { Conversation, Closet, Item, Message } from "../data/mock";
import { withBase } from "../lib/paths";

type ConversationWithDetails = Conversation & { closet: Closet; item?: Item };

interface Props {
  conversations: ConversationWithDetails[];
  allMessages: Message[];
  initialConversationId?: string;
}

function formatTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  }
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  }
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatMessageTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

const avatarSizes = {
  xs: { outer: "w-8 h-8", inner: "w-[28px] h-[28px]", text: "text-[10px]", gap: "p-[2px]" },
  sm: { outer: "w-10 h-10", inner: "w-[36px] h-[36px]", text: "text-xs", gap: "p-[2px]" },
  md: { outer: "w-11 h-11", inner: "w-[40px] h-[40px]", text: "text-sm", gap: "p-[2.5px]" },
} as const;

function ProfileAvatar({ src, initials, size = "md" }: { src?: string; initials: string; size?: keyof typeof avatarSizes }) {
  const s = avatarSizes[size];
  return (
    <span className={`${s.outer} ${s.gap} rounded-full bg-gradient-to-br from-sage via-lavender to-terracotta shrink-0`}>
      {src ? (
        <img src={src} alt={initials} className={`${s.inner} rounded-full object-cover bg-cream`} loading="lazy" />
      ) : (
        <span className={`${s.inner} ${s.text} rounded-full bg-sage-light text-sage-dark flex items-center justify-center font-display font-bold`}>
          {initials}
        </span>
      )}
    </span>
  );
}

export default function MessagesView({ conversations = [], allMessages = [], initialConversationId }: Props) {
  const [activeId, setActiveId] = useState<string | null>(initialConversationId ?? conversations[0]?.id ?? null);
  const [draft, setDraft] = useState("");
  const [localMessages, setLocalMessages] = useState<Message[]>(allMessages);
  const [mobileShowThread, setMobileShowThread] = useState(!!initialConversationId);
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeConv = conversations.find((c) => c.id === activeId);
  const threadMessages = localMessages.filter((m) => m.conversationId === activeId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeId, localMessages]);

  useEffect(() => {
    if (mobileShowThread) {
      inputRef.current?.focus();
    }
  }, [mobileShowThread]);

  function selectConversation(id: string) {
    setActiveId(id);
    setMobileShowThread(true);
  }

  function handleSend() {
    const text = draft.trim();
    if (!text || !activeId) return;

    const newMsg: Message = {
      id: `m-local-${Date.now()}`,
      conversationId: activeId,
      fromMe: true,
      text,
      timestamp: new Date().toISOString(),
    };
    setLocalMessages((prev) => [...prev, newMsg]);
    setDraft("");
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  if (!mounted) return null;

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-cream">
      {/* Conversation list */}
      <aside
        className={`${
          mobileShowThread ? "hidden md:flex" : "flex"
        } w-full md:w-96 flex-col border-r border-border bg-warm-white`}
      >
        <div className="p-4 border-b border-border">
          <h1 className="font-display font-bold text-xl">Messages</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <div className="w-14 h-14 rounded-full bg-sage-light flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-sage-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-sm text-muted">No conversations yet</p>
              <p className="text-xs text-muted/60 mt-1">Message a closet to get started</p>
            </div>
          ) : (
            conversations.map((conv) => {
              const isActive = conv.id === activeId && !mobileShowThread ? false : conv.id === activeId;
              const threadMsgs = localMessages.filter((m) => m.conversationId === conv.id);
              const lastMsg = threadMsgs[threadMsgs.length - 1];

              return (
                <button
                  key={conv.id}
                  onClick={() => selectConversation(conv.id)}
                  className={`w-full flex items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-sage-light/20 ${
                    conv.id === activeId ? "bg-sage-light/30" : ""
                  }`}
                >
                  <ProfileAvatar src={conv.closet.profileImage} initials={conv.closet.avatar} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-sm font-semibold truncate">{conv.closet.name}</p>
                      <span className="text-[11px] text-muted shrink-0">
                        {mounted ? formatTime(lastMsg?.timestamp ?? conv.lastMessageAt) : ""}
                      </span>
                    </div>
                    {conv.item && (
                      <p className="text-[11px] text-sage-dark font-medium truncate">
                        Re: {conv.item.title}
                      </p>
                    )}
                    <p className="text-xs text-muted truncate mt-0.5">
                      {lastMsg?.fromMe && <span className="text-muted/80">You: </span>}
                      {lastMsg?.text ?? conv.lastMessage}
                    </p>
                  </div>
                  {conv.unreadCount > 0 && (
                    <span className="mt-1 w-5 h-5 rounded-full bg-sage text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      {conv.unreadCount}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </aside>

      {/* Thread view */}
      <div
        className={`${
          mobileShowThread ? "flex" : "hidden md:flex"
        } flex-1 flex-col bg-cream`}
      >
        {activeConv ? (
          <>
            {/* Thread header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-warm-white">
              <button
                onClick={() => setMobileShowThread(false)}
                className="md:hidden p-1 -ml-1 text-muted hover:text-charcoal"
                aria-label="Back to conversations"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <a href={withBase(`/closet/${activeConv.closet.id}`)} className="flex items-center gap-3 flex-1 min-w-0 group">
                <ProfileAvatar src={activeConv.closet.profileImage} initials={activeConv.closet.avatar} size="xs" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold group-hover:text-sage-dark transition-colors truncate">
                    {activeConv.closet.name}
                  </p>
                  <p className="text-[11px] text-muted truncate">
                    @{activeConv.closet.handle} · {activeConv.closet.location}
                  </p>
                </div>
              </a>
              {activeConv.item && (
                <a
                  href={withBase(`/item/${activeConv.item.id}`)}
                  className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-button bg-sage-light/40 hover:bg-sage-light transition-colors text-xs text-sage-dark font-medium shrink-0"
                >
                  <span className="w-6 h-6 rounded overflow-hidden bg-border/40 shrink-0">
                    <img src={activeConv.item.images[0]} alt="" className="w-full h-full object-cover" />
                  </span>
                  {activeConv.item.title}
                </a>
              )}
            </div>

            {/* Item context banner */}
            {activeConv.item && (
              <a
                href={withBase(`/item/${activeConv.item.id}`)}
                className="flex sm:hidden items-center gap-3 px-4 py-2.5 border-b border-border bg-sage-light/10 hover:bg-sage-light/20 transition-colors"
              >
                <span className="w-10 h-10 rounded-lg overflow-hidden bg-border/40 shrink-0">
                  <img src={activeConv.item.images[0]} alt="" className="w-full h-full object-cover" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold truncate">{activeConv.item.title}</p>
                  <p className="text-[11px] text-sage-dark">${activeConv.item.rentPrice} to rent</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            )}

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
              {threadMessages.map((msg, i) => {
                const prevMsg = threadMessages[i - 1];
                const showTimestamp =
                  !prevMsg ||
                  new Date(msg.timestamp).getTime() - new Date(prevMsg.timestamp).getTime() > 30 * 60 * 1000;
                const sameSender = prevMsg?.fromMe === msg.fromMe;

                return (
                  <div key={msg.id}>
                    {showTimestamp && (
                      <p className="text-center text-[11px] text-muted/60 py-3">
                        {mounted ? (
                          <>
                            {new Date(msg.timestamp).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}{" "}
                            · {formatMessageTime(msg.timestamp)}
                          </>
                        ) : (
                          ""
                        )}
                      </p>
                    )}
                    <div
                      className={`flex ${msg.fromMe ? "justify-end" : "justify-start"} ${
                        sameSender && !showTimestamp ? "mt-0.5" : "mt-3"
                      }`}
                    >
                      <div
                        className={`max-w-[75%] sm:max-w-[60%] px-3.5 py-2 text-sm leading-relaxed ${
                          msg.fromMe
                            ? "bg-sage text-white rounded-2xl rounded-br-md"
                            : "bg-white border border-border text-charcoal rounded-2xl rounded-bl-md"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input */}
            <div className="border-t border-border bg-warm-white px-4 py-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Message ${activeConv.closet.name}...`}
                  className="flex-1 px-4 py-2.5 text-sm bg-cream border border-border rounded-button focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30 placeholder:text-muted/50"
                />
                <button
                  onClick={handleSend}
                  disabled={!draft.trim()}
                  className="p-2.5 rounded-button bg-sage text-white hover:bg-sage-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Send message"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <div className="w-16 h-16 rounded-full bg-sage-light flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-sage-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h2 className="font-display font-bold text-lg">Your Messages</h2>
            <p className="text-sm text-muted mt-1 max-w-xs">
              Select a conversation or message a closet to start chatting about rentals.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
