import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ConjugationGame from "@/components/ConjugationGame";
import { Badge } from "@/components/ui/badge";
import { BookOpen, MessageCircle, TrendingUp, Zap, Star, Users, ArrowRight, GraduationCap, Globe } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";

const levels = [
  { level: "A1", name: "Beginner", desc: "Greetings, numbers, basic phrases, and everyday vocabulary.", color: "bg-emerald-50 border-emerald-200 hover:border-emerald-400", badge: "level-A1", available: true },
  { level: "A2", name: "Elementary", desc: "Past tense, family, shopping, and simple conversations.", color: "bg-green-50 border-green-200 hover:border-green-400", badge: "level-A2", available: true },
  { level: "B1", name: "Intermediate", desc: "Complex sentences, opinions, travel, and work contexts.", color: "bg-yellow-50 border-yellow-200 hover:border-yellow-400", badge: "level-B1", available: true },
  { level: "B2", name: "Upper-Intermediate", desc: "Fluent discussions, abstract topics, and nuanced grammar.", color: "bg-amber-50 border-amber-200 hover:border-amber-400", badge: "level-B2", available: true },
  { level: "C1", name: "Advanced", desc: "Academic writing, idiomatic expressions, and cultural depth.", color: "bg-orange-50 border-orange-200 hover:border-orange-400", badge: "level-C1", available: true },
  { level: "C2", name: "Mastery", desc: "Near-native fluency, literary Portuguese, and diplomacy.", color: "bg-red-50 border-red-200 hover:border-red-400", badge: "level-C2", available: true },
];

const features = [
  {
    icon: BookOpen,
    title: "Structured Lessons",
    desc: "A 10,000-template A1–C2 curriculum map with real-life situation objectives and explicit listening, reading, writing, and speaking actions.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: GraduationCap,
    title: "Roued & Chandra",
    desc: "Choose Professor Roued El Fadhel or Chandra for Portuguese guidance with Arabic, Tunisian Arabic, Portuguese, or English explanations.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Zap,
    title: "AI Course Generator",
    desc: "Generate custom lessons and exercises on any topic, level, and exercise type instantly with AI.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    desc: "Track your completion, quiz scores, and time spent across all levels with a detailed dashboard.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: MessageCircle,
    title: "Guided AI Conversation",
    desc: "Situation-based Portuguese conversation with clear learning goals, tutor prompts, and editorial review boundaries.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Globe,
    title: "EP & BP Coverage",
    desc: "Learn both European Portuguese (Portugal) and Brazilian Portuguese with cultural context for each.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
];

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent py-24 md:py-32">
        {/* Decorative flag stripe */}
        <div className="absolute inset-y-0 left-0 w-[38%] bg-secondary/10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="container relative z-10 text-center">
          <Badge className="mb-4 bg-secondary text-secondary-foreground border-0 px-4 py-1 text-sm font-semibold">
            🇵🇹 A1 to C2 — Complete Portuguese
          </Badge>
          <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Master Portuguese<br />
            <span className="text-secondary italic">with Prize2Pride</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            From your first "Olá" to advanced professional communication — 10,000 original curriculum routes,
            guided tutors, interactive practice, and progress tracking in one learning platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/curriculum">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold px-8 shadow-lg">
                Start Learning <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            {!isAuthenticated && (
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 bg-transparent font-semibold px-8"
                onClick={() => startLogin()}
              >
                Sign In Free
              </Button>
            )}
          </div>

          {/* Stats row */}
          <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { value: "10,000", label: "Curriculum routes" },
              { value: "6", label: "Levels" },
              { value: "2", label: "Tutor profiles" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-secondary font-['Playfair_Display']">{value}</div>
                <div className="text-white/70 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Level Cards */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-foreground mb-3">
              Six Levels of Mastery
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Follow the CEFR framework from complete beginner to near-native fluency.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {levels.map(({ level, name, desc, color, badge }) => (
              <Link key={level} href={`/courses?level=${level}`}>
                <Card className={`p-6 border-2 transition-all duration-200 cursor-pointer hover:shadow-md hover:-translate-y-0.5 ${color}`}>
                  <div className="flex items-start justify-between mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${badge}`}>
                      {level}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-2">{name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/40">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-foreground mb-3">
              A Four-Skill Portuguese Learning System
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              A learning ecosystem built around original situations, deliberate practice, and transparent editorial review.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc, color, bg }) => (
              <Card key={title} className="p-6 border border-border hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Prize2Pride tutor CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-center md:text-left">
              <Badge className="mb-4 bg-secondary text-secondary-foreground border-0">
                AI-Powered Teaching
              </Badge>
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Meet Professor Roued El Fadhel and Chandra —<br />
                <span className="text-secondary italic">Your Prize2Pride Tutors</span>
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed max-w-lg">
                Choose a tutor, explanation language, and real-life situation. Practise grammar,
                pronunciation, cultural nuance, and practical communication while preserving clear learning goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/professor">
                  <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold px-6">
                    <GraduationCap className="mr-2 w-4 h-4" /> Practise with a tutor
                  </Button>
                </Link>
                <Link href="/chat">
                  <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 bg-transparent font-semibold px-6">
                    <Zap className="mr-2 w-4 h-4" /> Open guided chat
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="w-48 h-48 rounded-full bg-secondary/20 border-4 border-secondary/40 flex items-center justify-center shadow-2xl">
                <GraduationCap className="w-24 h-24 text-secondary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conjugation Game Preview */}
      <section className="py-20 bg-muted/40">
        <div className="container">
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-secondary text-secondary-foreground border-0">
              Interactive Practice
            </Badge>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-foreground mb-3">
              Master Portuguese Verb Conjugations
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Practice the 5 essential verbs — ser, estar, ter, fazer, ir — with interactive 
              fill-in-the-blank and multiple-choice exercises.
            </p>
          </div>
          <ConjugationGame />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-background text-center">
        <div className="container max-w-2xl">
          <Star className="w-10 h-10 text-secondary mx-auto mb-4" />
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-foreground mb-4">
            Ready to speak Portuguese?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Start with a real-life situation, build all four skills, and use the curriculum map to plan your next step.
          </p>
          <Link href="/curriculum">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-10">
              Explore the 10K Path <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
