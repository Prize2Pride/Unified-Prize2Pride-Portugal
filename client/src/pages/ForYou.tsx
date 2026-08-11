import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { microMoments } from "@/data/microMoments";
import { trpc } from "@/lib/trpc";
import { BookOpen, Check, ChevronRight, Flame, Headphones, Play, Sparkles, Star, Volume2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";

const STAGES = [
  { name: "Beginner", range: "A1", note: "Say the first useful thing." },
  { name: "Explorer", range: "A2", note: "Handle daily moments." },
  { name: "Communicator", range: "B1", note: "Keep a real exchange moving." },
  { name: "Confident", range: "B2", note: "Choose the right register." },
  { name: "Hero", range: "C1–C2", note: "Perform when it matters." },
];

export default function ForYou() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const { isAuthenticated } = useAuth();
  const utils = trpc.useUtils();
  const { data: persistedProgress = [] } = trpc.companion.microProgress.useQuery(undefined, { enabled: isAuthenticated });
  const saveMutation = trpc.companion.saveMicroMoment.useMutation({ onSuccess: () => utils.companion.microProgress.invalidate() });
  const completeMutation = trpc.companion.completeMicroMoment.useMutation({ onSuccess: () => utils.companion.microProgress.invalidate() });
  const moment = microMoments[activeIndex] ?? microMoments[0];
  const isCorrect = answer === moment?.correctAnswer;
  const progressStage = STAGES[Math.min(STAGES.length - 1, Math.floor(activeIndex / Math.max(1, Math.ceil(microMoments.length / STAGES.length))))];
  const shownChoices = useMemo(() => moment?.choices.slice(0, 4) ?? [], [moment]);

  function playTarget() {
    if (!moment || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(moment.target);
    utterance.lang = "pt-PT";
    utterance.rate = 0.86;
    window.speechSynthesis.speak(utterance);
  }
  function nextMoment() { setActiveIndex((index) => (index + 1) % microMoments.length); setAnswer(null); }
  const persistedSaved = persistedProgress.filter((item) => item.isSaved).map((item) => item.momentId);
  const allSaved = Array.from(new Set([...saved, ...persistedSaved]));
  function choose(value: string) { setAnswer(value); if (value === moment.correctAnswer) { setStreak((current) => current + 1); if (isAuthenticated) completeMutation.mutate({ momentId: moment.id, isCorrect: true }); } }
  function toggleSaved() { const next = !allSaved.includes(moment.id); setSaved((items) => next ? [...items, moment.id] : items.filter((id) => id !== moment.id)); if (isAuthenticated) saveMutation.mutate({ momentId: moment.id, isSaved: next }); }
  if (!moment) return null;

  return <div className="min-h-screen bg-[#080C16] text-white"><main className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-5 lg:grid-cols-[250px_minmax(0,620px)_280px] lg:items-center">
    <aside className="hidden rounded-3xl border border-white/10 bg-white/[.04] p-5 lg:block"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#F6C35B]">Beginner → Hero</p><h1 className="mt-2 font-['Playfair_Display'] text-3xl font-bold">Your living Portuguese path.</h1><p className="mt-3 text-sm leading-6 text-slate-400">Short moments make the habit. Full lessons make the skill.</p><div className="mt-6 space-y-3">{STAGES.map((stage) => <div key={stage.name} className={`rounded-2xl p-3 ${stage.name === progressStage.name ? "bg-[#F6C35B] text-[#111827]" : "bg-white/[.05] text-slate-300"}`}><p className="text-sm font-bold">{stage.name} <span className="float-right text-xs">{stage.range}</span></p><p className="mt-1 text-xs opacity-75">{stage.note}</p></div>)}</div></aside>
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#09322A] via-[#0D1424] to-[#1B0B32] shadow-2xl"><div className="flex items-center justify-between border-b border-white/10 px-5 py-4"><div><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[#F6C35B]"><Sparkles className="h-3.5 w-3.5" /> For you · Prize2Pride</p><p className="mt-1 text-xs text-slate-400">From the existing {moment.sourceLesson} lesson</p></div><div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold"><Flame className="h-4 w-4 text-orange-400" /> {streak} moment streak</div></div><div className="relative min-h-[570px] p-5 sm:p-8"><div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#F6C35B]/15 blur-2xl" /><div className="relative flex h-full flex-col"><div className="flex items-center justify-between"><span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold">{moment.level} · {moment.kind === "word" ? "Word spark" : "Reply check"}</span><button onClick={toggleSaved} aria-label="Save this learning moment" className={`grid h-9 w-9 place-items-center rounded-full border ${allSaved.includes(moment.id) ? "border-[#F6C35B] bg-[#F6C35B] text-[#111827]" : "border-white/20 bg-white/5 text-white"}`}><Star className="h-4 w-4" /></button></div><div className="mt-12"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#F6C35B]">One useful Portuguese moment</p><h2 className="mt-3 font-['Playfair_Display'] text-4xl font-bold leading-tight sm:text-5xl">{moment.target}</h2><button onClick={playTarget} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm font-bold hover:bg-white/15"><Volume2 className="h-4 w-4" /> {moment.pronunciation}</button><p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">{moment.prompt}</p></div><div className="mt-8 grid gap-2">{shownChoices.map((choice) => <button key={choice} onClick={() => choose(choice)} className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${answer === choice ? (isCorrect ? "border-emerald-300 bg-emerald-300/15 text-emerald-100" : "border-rose-300 bg-rose-300/15 text-rose-100") : "border-white/15 bg-white/[.05] text-white hover:bg-white/10"}`}>{choice}</button>)}</div>{answer && <div className={`mt-4 rounded-2xl p-4 text-sm ${isCorrect ? "bg-emerald-300/15 text-emerald-100" : "bg-rose-300/15 text-rose-100"}`}><p className="flex items-center gap-2 font-bold">{isCorrect ? <Check className="h-4 w-4" /> : <Headphones className="h-4 w-4" />}{isCorrect ? "Exactly. Keep that sound in your ear." : `Not yet. ${moment.explanation}`}</p><p className="mt-1 opacity-80">{moment.example}</p></div>}<div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-8"><Link href="/professor"><Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white"><BookOpen className="mr-2 h-4 w-4" /> Ask a tutor</Button></Link><Button onClick={nextMoment} className="rounded-xl bg-[#F6C35B] font-bold text-[#101827] hover:bg-[#FFD77E]">Next learning moment <ChevronRight className="ml-1 h-4 w-4" /></Button></div></div></div></section>
    <aside className="space-y-4"><div className="rounded-3xl border border-white/10 bg-white/[.04] p-5"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#F6C35B]">The cherry on top</p><h2 className="mt-2 font-['Playfair_Display'] text-2xl font-bold">Turn a scroll into a skill.</h2><p className="mt-3 text-sm leading-6 text-slate-400">Every moment links back to an existing structured lesson, tutor practice, and your wider hero path.</p><div className="mt-5 flex gap-2"><span className="rounded-lg bg-white/10 px-2 py-1 text-xs">{microMoments.length} moments</span><span className="rounded-lg bg-white/10 px-2 py-1 text-xs">{saved.length} saved</span></div></div><div className="rounded-3xl border border-white/10 bg-[#F6C35B] p-5 text-[#101827]"><Play className="h-5 w-5" /><p className="mt-3 text-sm font-bold">No infinite autoplay.</p><p className="mt-1 text-sm leading-6 opacity-80">You decide when to advance, practise, save, or leave. That is the difference between a distraction and a learning habit.</p></div></aside>
  </main></div>;
}
