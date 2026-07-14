import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Send, MessageCircle, Loader2, Trash2, Zap, Settings2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import ReactMarkdown from "react-markdown";
import { TutorWelcomeModal } from "@/components/TutorWelcomeModal";

type Style = "slang" | "casual" | "informal" | "formal" | "diplomatic";

const STYLES: { id: Style; label: string }[] = [
  { id: "slang", label: "Slang" },
  { id: "casual", label: "Casual" },
  { id: "informal", label: "Informal" },
  { id: "formal", label: "Formal" },
  { id: "diplomatic", label: "Diplomatic" },
];

interface Message {
  role: "user" | "assistant";
  content: string;
  model?: string;
}

const QUICK_PROMPTS = [
  "Teach me 10 essential Portuguese phrases for travel",
  "Explain Portuguese verb tenses with examples",
  "What are the most common mistakes English speakers make in Portuguese?",
  "Give me a conversation practice scenario at a restaurant",
  "Explain the difference between 'por' and 'para'",
  "What are some Portuguese tongue twisters?",
  "Teach me Portuguese slang from Lisbon",
  "Explain Portuguese numbers and how to count",
];

export default function Chat() {
  const [style, setStyle] = useState<Style>("informal");
  const [selectedModel, setSelectedModel] = useState("llama-2-70b");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: models = [] } = trpc.publicChat.listModels.useQuery();
  const chatMutation = trpc.publicChat.chat.useMutation();

  useEffect(() => {
    if (models.length > 0 && !models.find((m) => m.id === selectedModel)) {
      setSelectedModel(models[0].id);
    }
  }, [models]);

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
        model: selectedModel,
        conversationHistory: messages.slice(-12),
      });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: result.content, model: result.model },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
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

  const currentModel = models.find((m) => m.id === selectedModel);

  return (
    <>
      <TutorWelcomeModal />
      <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent to-primary py-8 text-primary-foreground">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary/20 border-2 border-secondary/40 flex items-center justify-center">
                <Zap className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h1 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold">
                  Unlimited AI Chat
                </h1>
                <p className="text-primary-foreground/80 text-sm">
                  No restrictions — any topic, any length, any model
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-white/40 text-white hover:bg-white/10 bg-transparent"
              onClick={() => setShowSettings((v) => !v)}
            >
              <Settings2 className="w-4 h-4 mr-2" /> Settings
            </Button>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="mt-4 p-4 bg-white/10 rounded-xl border border-white/20">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-white/80 mb-2 block">AI Model</label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          <div>
                            <div className="font-medium">{m.name}</div>
                            {m.description && (
                              <div className="text-xs text-muted-foreground">{m.description}</div>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-white/80 mb-2 block">Teaching Register</label>
                  <Select value={style} onValueChange={(v) => setStyle(v as Style)}>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STYLES.map((s) => (
                        <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Current Config */}
            <Card className="p-4 border-2 border-border">
              <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
                Current Config
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Model</span>
                  <Badge variant="outline" className="text-xs">
                    {currentModel?.name ?? selectedModel}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Style</span>
                  <Badge variant="outline" className="text-xs capitalize">{style}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Messages</span>
                  <Badge variant="outline" className="text-xs">{messages.length}</Badge>
                </div>
              </div>
            </Card>

            {/* Quick Prompts */}
            <Card className="p-4 border-2 border-border">
              <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
                Quick Prompts
              </h3>
              <div className="space-y-1.5">
                {QUICK_PROMPTS.map((q) => (
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

            {messages.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="w-full text-muted-foreground"
                onClick={() => setMessages([])}
              >
                <Trash2 className="w-4 h-4 mr-2" /> Clear Chat
              </Button>
            )}
          </div>

          {/* Chat */}
          <div className="lg:col-span-3">
            <Card className="border-2 border-border flex flex-col" style={{ height: "calc(100vh - 280px)", minHeight: "500px" }}>
              <ScrollArea className="flex-1 p-4" ref={scrollRef as any}>
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                      <MessageCircle className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-2">
                      Unlimited Portuguese Chat
                    </h2>
                    <p className="text-muted-foreground max-w-sm text-sm">
                      No restrictions — ask anything about Portuguese language, culture, 
                      history, or practice your conversation skills with no limits.
                    </p>
                    <div className="flex gap-2 mt-4 flex-wrap justify-center">
                      <Badge variant="outline">
                        <Zap className="w-3 h-3 mr-1" /> {currentModel?.name ?? selectedModel}
                      </Badge>
                      <Badge variant="outline" className="capitalize">{style}</Badge>
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
                          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center mr-3 shrink-0 mt-1">
                            <Zap className="w-4 h-4 text-primary-foreground" />
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
                          {msg.model && msg.role === "assistant" && (
                            <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
                              {models.find((m) => m.id === msg.model)?.name ?? msg.model}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center mr-3 shrink-0">
                          <Zap className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <div className="bg-card border border-border rounded-2xl rounded-tl-none px-4 py-3">
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Generating response...
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>

              <Separator />

              <div className="p-4">
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask anything about Portuguese — no limits..."
                      className="resize-none min-h-[60px] max-h-[120px] border-border focus:border-primary"
                      rows={2}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter to send · Shift+Enter for new line
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
    </>
  );
}
