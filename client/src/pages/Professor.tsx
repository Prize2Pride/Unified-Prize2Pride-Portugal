import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Compass, GraduationCap, Languages, Loader2, Send, Sparkles, Trash2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { EXPLANATION_LANGUAGES, getSituationPreview, TUTOR_IDS, TUTOR_PROFILES, type ExplanationLanguage, type TutorId } from "@shared/learningWorld";
import ReactMarkdown from "react-markdown";

type Style = "slang" | "casual" | "informal" | "formal" | "diplomatic";
type Message = { role: "user" | "assistant"; content: string };

const STYLES: { id: Style; label: string; desc: string; color: string }[] = [
  { id: "slang", label: "Slang", desc: "Street Portuguese — gírias & colloquial", color: "bg-red-100 text-red-800 border-red-300" },
  { id: "casual", label: "Casual", desc: "Friendly everyday speech", color: "bg-orange-100 text-orange-800 border-orange-300" },
  { id: "informal", label: "Informal", desc: "Natural, approachable register", color: "bg-yellow-100 text-yellow-800 border-yellow-300" },
  { id: "formal", label: "Formal", desc: "Professional & academic", color: "bg-blue-100 text-blue-800 border-blue-300" },
  { id: "diplomatic", label: "Diplomatic", desc: "Literary & elevated register", color: "bg-purple-100 text-purple-800 border-purple-300" },
];

const QUESTIONS = [
  "How can I introduce myself at a Portuguese job interview?",
  "Explain ser and estar with examples for Arabic speakers.",
  "Help me order food politely in Lisbon.",
  "How do nasal vowels work in Portuguese?",
  "What is the difference between European and Brazilian Portuguese?",
];

const LANGUAGE_LABELS: Record<ExplanationLanguage, string> = { ar: "العربية", tounsi: "تونسي", pt: "Português", en: "English" };
const SITUATIONS = getSituationPreview(12);

export default function Professor() {
  const [style, setStyle] = useState<Style>("formal");
  const [tutor, setTutor] = useState<TutorId>("roued");
  const [explanationLanguage, setExplanationLanguage] = useState<ExplanationLanguage>("ar");
  const [situationId, setSituationId] = useState(SITUATIONS[0]?.id ?? "situation-1");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatMutation = trpc.professor.chat.useMutation();
  const selectedTutor = TUTOR_PROFILES[tutor];

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, isLoading]);

  async function sendMessage(messageText?: string) {
    const text = (messageText ?? input).trim();
    if (!text || isLoading) return;
    setMessages((previous) => [...previous, { role: "user", content: text }]);
    setInput("");
    setIsLoading(true);
    try {
      const result = await chatMutation.mutateAsync({ message: text, style, tutor, explanationLanguage, situationId, conversationHistory: messages.slice(-10) });
      setMessages((previous) => [...previous, { role: "assistant", content: result.content }]);
    } catch {
      setMessages((previous) => [...previous, { role: "assistant", content: "I could not prepare that practice just now. Please try again." }]);
    } finally { setIsLoading(false); }
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-r from-primary to-accent py-8 text-primary-foreground"><div className="container flex items-center gap-4"><div className="grid h-14 w-14 place-items-center rounded-full border-2 border-secondary/40 bg-secondary/20"><GraduationCap className="h-7 w-7 text-secondary" /></div><div><p className="text-xs font-bold uppercase tracking-[.16em] text-secondary">Prize2Pride companion</p><h1 className="font-['Playfair_Display'] text-2xl font-bold md:text-3xl">{selectedTutor.name}</h1><p className="text-primary-foreground/80">Portuguese practice built around real Tunisian learner situations</p></div></div></section>
      <main className="container py-6"><div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <aside className="space-y-4">
          <Card className="border-2 border-border p-4"><h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">Choose your tutor</h2><div className="grid grid-cols-2 gap-2">{TUTOR_IDS.map((id) => <button key={id} onClick={() => setTutor(id)} className={`rounded-xl border-2 px-3 py-3 text-left transition ${tutor === id ? "border-primary bg-primary/5" : "border-border hover:bg-muted"}`}><p className="text-sm font-semibold">{TUTOR_PROFILES[id].shortName}</p><p className="mt-1 text-[11px] leading-4 text-muted-foreground">{TUTOR_PROFILES[id].role}</p></button>)}</div></Card>
          <Card className="border-2 border-border p-4"><h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground"><Languages className="mr-1 inline h-3.5 w-3.5" /> Explanation language</h2><div className="grid grid-cols-2 gap-2">{EXPLANATION_LANGUAGES.map((language) => <button key={language} onClick={() => setExplanationLanguage(language)} className={`rounded-lg px-2 py-2 text-xs font-semibold ${explanationLanguage === language ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>{LANGUAGE_LABELS[language]}</button>)}</div></Card>
          <Card className="border-2 border-border p-4"><h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground"><Compass className="mr-1 inline h-3.5 w-3.5" /> Today’s situation</h2><select value={situationId} onChange={(event) => setSituationId(event.target.value)} className="w-full rounded-lg border border-input bg-background px-2 py-2 text-xs text-foreground">{SITUATIONS.map((situation) => <option key={situation.id} value={situation.id}>{situation.level} · {situation.title}</option>)}</select></Card>
          <Card className="border-2 border-border p-4"><h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">Teaching register</h2><div className="space-y-2">{STYLES.map((item) => <button key={item.id} onClick={() => setStyle(item.id)} className={`w-full rounded-lg border-2 px-3 py-2.5 text-left transition ${style === item.id ? `${item.color} border-current` : "border-transparent hover:bg-muted"}`}><p className="text-sm font-semibold">{item.label}</p><p className="mt-0.5 text-xs opacity-70">{item.desc}</p></button>)}</div></Card>
          <Card className="border-2 border-border p-4"><h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">Try asking</h2><div className="space-y-1.5">{QUESTIONS.map((question) => <button key={question} onClick={() => sendMessage(question)} className="w-full rounded-md px-2 py-1.5 text-left text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">{question}</button>)}</div></Card>
          {messages.length > 0 && <Button variant="outline" size="sm" className="w-full text-muted-foreground" onClick={() => setMessages([])}><Trash2 className="mr-2 h-4 w-4" /> Clear conversation</Button>}
        </aside>
        <section className="lg:col-span-3"><Card className="flex min-h-[540px] flex-col border-2 border-border" style={{ height: "calc(100vh - 280px)" }}><ScrollArea className="flex-1 p-4" ref={scrollRef as any}>{messages.length === 0 ? <div className="flex h-full flex-col items-center justify-center py-12 text-center"><div className="mb-4 grid h-20 w-20 place-items-center rounded-full bg-primary/10"><Sparkles className="h-10 w-10 text-primary" /></div><h2 className="font-['Playfair_Display'] text-xl font-bold text-foreground">Olá! I’m {selectedTutor.name}</h2><p className="mt-2 max-w-sm text-sm text-muted-foreground">Choose a tutor, explanation language, and situation. Then practise Portuguese you can use today.</p><Badge className="mt-4 bg-secondary text-secondary-foreground">{SITUATIONS.find((situation) => situation.id === situationId)?.title}</Badge></div> : <div className="space-y-4">{messages.map((message, index) => <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>{message.role === "assistant" && <div className="mr-3 mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary"><Sparkles className="h-4 w-4 text-primary-foreground" /></div>}<div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${message.role === "user" ? "rounded-tr-none bg-primary text-primary-foreground" : "rounded-tl-none border border-border bg-card"}`}>{message.role === "assistant" ? <div className="prose-portuguese"><ReactMarkdown>{message.content}</ReactMarkdown></div> : <p>{message.content}</p>}</div></div>)}{isLoading && <div className="flex justify-start"><div className="mr-3 grid h-8 w-8 place-items-center rounded-full bg-primary"><Sparkles className="h-4 w-4 text-primary-foreground" /></div><div className="rounded-2xl rounded-tl-none border border-border bg-card px-4 py-3"><div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />{selectedTutor.shortName} is preparing your practice…</div></div></div>}</div>}</ScrollArea><Separator /><div className="p-4"><div className="flex items-end gap-3"><div className="flex-1"><Textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(); } }} dir={explanationLanguage === "ar" || explanationLanguage === "tounsi" ? "rtl" : "ltr"} placeholder={`Ask ${selectedTutor.shortName} anything about Portuguese...`} className="min-h-[60px] max-h-[120px] resize-none border-border focus:border-primary" rows={2} /><p className="mt-1 text-xs text-muted-foreground">Enter to send · Shift+Enter for a new line</p></div><Button className="h-[60px] shrink-0 bg-primary px-5 text-primary-foreground hover:bg-primary/90" onClick={() => sendMessage()} disabled={!input.trim() || isLoading}>{isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}</Button></div></div></Card></section>
      </div></main>
    </div>
  );
}
