import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Zap, BookOpen, Loader2, Sparkles, Download, RefreshCw } from "lucide-react";
import { trpc } from "@/lib/trpc";
import ReactMarkdown from "react-markdown";

type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
type ExerciseType = "vocabulary" | "grammar" | "conversation" | "writing";

const LEVELS: Level[] = ["A1", "A2", "B1", "B2", "C1", "C2"];
const EXERCISE_TYPES: { id: ExerciseType; label: string; desc: string }[] = [
  { id: "vocabulary", label: "Vocabulary", desc: "Word matching, fill-in-the-blank, word banks" },
  { id: "grammar", label: "Grammar", desc: "Conjugation, sentence transformation, correction" },
  { id: "conversation", label: "Conversation", desc: "Dialogue completion, role-play scenarios" },
  { id: "writing", label: "Writing", desc: "Sentence prompts, paragraph composition" },
];

const TOPIC_SUGGESTIONS = [
  "Ordering food at a restaurant",
  "Asking for directions in Lisbon",
  "Job interview vocabulary",
  "Portuguese family and relationships",
  "Fado music and Portuguese culture",
  "Shopping and prices",
  "Weather and seasons",
  "Portuguese history and discoveries",
  "Health and medical vocabulary",
  "Travel and transportation",
];

export default function CourseGenerator() {
  const [activeTab, setActiveTab] = useState("lesson");
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState<Level>("A1");
  const [exerciseType, setExerciseType] = useState<ExerciseType>("grammar");
  const [exerciseCount, setExerciseCount] = useState(10);
  const [knowledgeQuery, setKnowledgeQuery] = useState("");
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [generatedTitle, setGeneratedTitle] = useState("");

  const lessonMutation = trpc.courseGenerator.generateLesson.useMutation({
    onSuccess: (data) => {
      setGeneratedContent(data.content);
      setGeneratedTitle(`${data.level} Lesson: ${data.topic}`);
    },
  });

  const exerciseMutation = trpc.courseGenerator.generateExercises.useMutation({
    onSuccess: (data) => {
      setGeneratedContent(data.content);
      setGeneratedTitle(`${data.level} ${data.exerciseType} exercises: ${data.topic}`);
    },
  });

  const knowledgeMutation = trpc.courseGenerator.generateKnowledge.useMutation({
    onSuccess: (data) => {
      setGeneratedContent(data.content);
      setGeneratedTitle(`Cultural Knowledge: ${data.query}`);
    },
  });

  const isLoading = lessonMutation.isPending || exerciseMutation.isPending || knowledgeMutation.isPending;

  const handleGenerate = () => {
    setGeneratedContent(null);
    if (activeTab === "lesson") {
      if (!topic.trim()) return;
      lessonMutation.mutate({ topic, level });
    } else if (activeTab === "exercises") {
      if (!topic.trim()) return;
      exerciseMutation.mutate({ topic, exerciseType, level, exerciseCount });
    } else if (activeTab === "knowledge") {
      if (!knowledgeQuery.trim()) return;
      knowledgeMutation.mutate({ query: knowledgeQuery, depth: "detailed" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent py-8 text-primary-foreground">
        <div className="container">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary/20 border-2 border-secondary/40 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h1 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold">
                AI Course Generator
              </h1>
              <p className="text-primary-foreground/80 text-sm">
                Generate custom lessons, exercises, and cultural knowledge on any topic
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Generator Panel */}
          <div className="lg:col-span-1">
            <Card className="p-5 border-2 border-border sticky top-20">
              <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setGeneratedContent(null); }}>
                <TabsList className="grid grid-cols-3 w-full mb-4">
                  <TabsTrigger value="lesson" className="text-xs">Lesson</TabsTrigger>
                  <TabsTrigger value="exercises" className="text-xs">Exercises</TabsTrigger>
                  <TabsTrigger value="knowledge" className="text-xs">Culture</TabsTrigger>
                </TabsList>

                <TabsContent value="lesson" className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-1.5 block">Topic</label>
                    <Input
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g., Ordering food at a café"
                      onKeyDown={(e) => { if (e.key === "Enter") handleGenerate(); }}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-1.5 block">Level</label>
                    <Select value={level} onValueChange={(v) => setLevel(v as Level)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {LEVELS.map((l) => (
                          <SelectItem key={l} value={l}>{l}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="exercises" className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-1.5 block">Topic</label>
                    <Input
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g., Verb ser and estar"
                      onKeyDown={(e) => { if (e.key === "Enter") handleGenerate(); }}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-1.5 block">Level</label>
                    <Select value={level} onValueChange={(v) => setLevel(v as Level)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {LEVELS.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-1.5 block">Exercise Type</label>
                    <div className="space-y-2">
                      {EXERCISE_TYPES.map((et) => (
                        <button
                          key={et.id}
                          className={`w-full text-left px-3 py-2 rounded-lg border-2 transition-all duration-150 text-sm ${
                            exerciseType === et.id
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/30"
                          }`}
                          onClick={() => setExerciseType(et.id)}
                        >
                          <div className="font-semibold">{et.label}</div>
                          <div className="text-xs text-muted-foreground">{et.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-1.5 block">
                      Number of Exercises: {exerciseCount}
                    </label>
                    <input
                      type="range"
                      min={5}
                      max={20}
                      value={exerciseCount}
                      onChange={(e) => setExerciseCount(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="knowledge" className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-1.5 block">Your Question</label>
                    <Input
                      value={knowledgeQuery}
                      onChange={(e) => setKnowledgeQuery(e.target.value)}
                      placeholder="e.g., What is fado music?"
                      onKeyDown={(e) => { if (e.key === "Enter") handleGenerate(); }}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              {/* Topic Suggestions */}
              {activeTab !== "knowledge" && (
                <div className="mt-4">
                  <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                    Suggestions
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {TOPIC_SUGGESTIONS.slice(0, 6).map((s) => (
                      <button
                        key={s}
                        className="text-xs px-2 py-1 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors border border-border"
                        onClick={() => setTopic(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <Button
                className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                onClick={handleGenerate}
                disabled={isLoading || (!topic.trim() && activeTab !== "knowledge") || (!knowledgeQuery.trim() && activeTab === "knowledge")}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" /> Generate
                  </>
                )}
              </Button>
            </Card>
          </div>

          {/* Output Panel */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <Card className="p-12 border-2 border-border text-center">
                <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-2">
                  Generating your content...
                </h3>
                <p className="text-muted-foreground">
                  Professor Carlos is crafting a comprehensive lesson for you.
                </p>
              </Card>
            ) : generatedContent ? (
              <Card className="p-6 border-2 border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-secondary" />
                    <h2 className="font-semibold text-foreground text-sm">{generatedTitle}</h2>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleGenerate}
                    >
                      <RefreshCw className="w-4 h-4 mr-1" /> Regenerate
                    </Button>
                  </div>
                </div>
                <div className="prose-portuguese">
                  <ReactMarkdown>{generatedContent}</ReactMarkdown>
                </div>
              </Card>
            ) : (
              <Card className="p-12 border-2 border-border text-center">
                <Sparkles className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-foreground mb-3">
                  AI-Powered Content Generation
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Generate complete lessons, targeted exercises, or cultural knowledge on any 
                  Portuguese topic at any level — instantly.
                </p>
                <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
                  {[
                    { icon: BookOpen, label: "Full Lessons", desc: "Vocab, grammar, reading, quiz" },
                    { icon: Zap, label: "Exercises", desc: "Targeted practice sets" },
                    { icon: Sparkles, label: "Culture", desc: "History & cultural notes" },
                  ].map(({ icon: Icon, label, desc }) => (
                    <div key={label} className="text-center p-3 rounded-xl bg-muted/50">
                      <Icon className="w-6 h-6 text-primary mx-auto mb-1" />
                      <div className="text-xs font-semibold text-foreground">{label}</div>
                      <div className="text-xs text-muted-foreground">{desc}</div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
