import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Send, GraduationCap, Loader2, Trash2, ChevronDown } from "lucide-react";
import { trpc } from "@/lib/trpc";
import ReactMarkdown from "react-markdown";

type Style = "slang" | "casual" | "informal" | "formal" | "diplomatic";

const STYLES: { id: Style; label: string; desc: string; color: string }[] = [
  { id: "slang", label: "Slang", desc: "Street Portuguese — gírias & colloquial", color: "bg-red-100 text-red-800 border-red-300" },
  { id: "casual", label: "Casual", desc: "Friendly everyday speech", color: "bg-orange-100 text-orange-800 border-orange-300" },
  { id: "informal", label: "Informal", desc: "Natural, approachable register", color: "bg-yellow-100 text-yellow-800 border-yellow-300" },
  { id: "formal", label: "Formal", desc: "Professional & academic", color: "bg-blue-100 text-blue-800 border-blue-300" },
  { id: "diplomatic", label: "Diplomatic", desc: "Literary & elevated register", color: "bg-purple-100 text-purple-800 border-purple-300" },
];

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What is the difference between ser and estar?",
  "How do I use the subjunctive in Portuguese?",
  "Explain the pretérito perfeito vs imperfeito",
  "What are common Portuguese false friends with Spanish?",
  "How do nasal vowels work in Portuguese?",
  "What is saudade and how is it used?",
  "Explain the difference between European and Brazilian Portuguese",
  "How do I conjugate irregular verbs?",
];

export default function Professor() {
  const [style, setStyle] = useState<Style>("formal");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const chatMutation = trpc.professor.chat.useMutation();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sendMessage = async (messageText?: string) => {
    const text = (messageText ?? input).trim();
    if (!text || isLoading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await chatMutation.mutateAsync({
        message: text,
        style,
        conversationHistory: messages.slice(-10),
      });
      setMessages((prev) => [...prev, { role: "assistant", content: result.content }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent py-8 text-primary-foreground">
        <div className="container">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-secondary/20 border-2 border-secondary/40 flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-secondary" />
            </div>
            <div>
              <h1 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold">
                رواد الفاضل
              </h1>
              <p className="text-primary-foreground/80">
                Your personal AI Portuguese tutor — ask anything, anytime
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Style Selector */}
            <Card className="p-4 border-2 border-border">
              <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
                Teaching Register
              </h3>
              <div className="space-y-2">
                {STYLES.map((s) => (
                  <button
                    key={s.id}
                    className={`w-full text-left px-3 py-2.5 rounded-lg border-2 transition-all duration-150 ${
                      style === s.id
                        ? s.color + " border-current"
                        : "border-transparent hover:bg-muted"
                    }`}
                    onClick={() => setStyle(s.id)}
                  >
                    <div className="font-semibold text-sm">{s.label}</div>
                    <div className="text-xs opacity-70 mt-0.5">{s.desc}</div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Suggested Questions */}
            <Card className="p-4 border-2 border-border">
              <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
                Suggested Questions
              </h3>
              <div className="space-y-1.5">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    className="w-full text-left text-xs text-muted-foreground hover:text-foreground hover:bg-muted px-2 py-1.5 rounded-md transition-colors"
                    onClick={() => sendMessage(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </Card>

            {/* Clear Chat */}
            {messages.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="w-full text-muted-foreground"
                onClick={() => setMessages([])}
              >
                <Trash2 className="w-4 h-4 mr-2" /> Clear Conversation
              </Button>
            )}
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="border-2 border-border flex flex-col" style={{ height: "calc(100vh - 280px)", minHeight: "500px" }}>
              {/* Messages */}
              <ScrollArea className="flex-1 p-4" ref={scrollRef as any}>
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <GraduationCap className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-2">
                      Olá! I'm رواد الفاضل
                    </h2>
                    <p className="text-muted-foreground max-w-sm text-sm">
                      Ask me anything about Portuguese — grammar, vocabulary, pronunciation, 
                      culture, or the difference between EP and BP. I'm here to help!
                    </p>
                    <div className="mt-4">
                      <Badge className="bg-secondary text-secondary-foreground">
                        Current style: {STYLES.find((s) => s.id === style)?.label}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {msg.role === "assistant" && (
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-3 shrink-0 mt-1">
                            <GraduationCap className="w-4 h-4 text-primary-foreground" />
                          </div>
                        )}
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                            msg.role === "user"
                              ? "bg-primary text-primary-foreground rounded-tr-none"
                              : "bg-card border border-border rounded-tl-none"
                          }`}
                        >
                          {msg.role === "assistant" ? (
                            <div className="prose-portuguese">
                              <ReactMarkdown>{msg.content}</ReactMarkdown>
                            </div>
                          ) : (
                            <p>{msg.content}</p>
                          )}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-3 shrink-0">
                          <GraduationCap className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <div className="bg-card border border-border rounded-2xl rounded-tl-none px-4 py-3">
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Loader2 className="w-4 h-4 animate-spin" />
رواد الفاضل is thinking...
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>

              <Separator />

              {/* Input */}
              <div className="p-4">
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <Textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask رواد الفاضل anything about Portuguese..."
                      className="resize-none min-h-[60px] max-h-[120px] border-border focus:border-primary"
                      rows={2}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Press Enter to send, Shift+Enter for new line
                    </p>
                  </div>
                  <Button
                    className="bg-primary text-primary-foreground hover:bg-primary/90 h-[60px] px-5 shrink-0"
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
