import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, CheckCircle, Clock, ChevronLeft, Lock, Star } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { allLessons as lessonsData, type LessonData } from "@/data/lessonsData";
import LessonViewer from "@/components/LessonViewer";

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
type Level = typeof LEVELS[number];

const levelInfo: Record<Level, { name: string; color: string; badge: string; desc: string }> = {
  A1: { name: "Beginner", color: "bg-emerald-50 border-emerald-300", badge: "level-A1", desc: "First steps in Portuguese" },
  A2: { name: "Elementary", color: "bg-green-50 border-green-300", badge: "level-A2", desc: "Building foundations" },
  B1: { name: "Intermediate", color: "bg-yellow-50 border-yellow-300", badge: "level-B1", desc: "Gaining confidence" },
  B2: { name: "Upper-Intermediate", color: "bg-amber-50 border-amber-300", badge: "level-B2", desc: "Complex communication" },
  C1: { name: "Advanced", color: "bg-orange-50 border-orange-300", badge: "level-C1", desc: "Near-fluent expression" },
  C2: { name: "Mastery", color: "bg-red-50 border-red-300", badge: "level-C2", desc: "Literary & diplomatic" },
};

export default function Courses() {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split("?")[1] ?? "");
  const initialLevel = (params.get("level") as Level) ?? "A1";

  const [activeLevel, setActiveLevel] = useState<Level>(initialLevel);
  const [selectedLesson, setSelectedLesson] = useState<LessonData | null>(null);
  const { isAuthenticated } = useAuth();

  const { data: allProgress = [] } = trpc.lessons.getAllProgress.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const levelLessons = lessonsData.filter((l) => l.level === activeLevel);

  const getProgress = (lessonId: number) =>
    allProgress.find((p) => p.lessonId === lessonId);

  if (selectedLesson) {
    return (
      <div className="container py-6">
        <Button
          variant="ghost"
          className="mb-4 text-muted-foreground hover:text-foreground"
          onClick={() => setSelectedLesson(null)}
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Courses
        </Button>
        <LessonViewer lesson={selectedLesson} onBack={() => setSelectedLesson(null)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent py-12 text-primary-foreground">
        <div className="container">
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-2">
            Portuguese Lessons
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            {lessonsData.length} structured lessons from A1 to C2
          </p>
        </div>
      </div>

      <div className="container py-8">
        {/* Level Tabs */}
        <Tabs value={activeLevel} onValueChange={(v) => setActiveLevel(v as Level)}>
          <TabsList className="flex flex-wrap h-auto gap-1 bg-muted p-1 mb-8 w-full">
            {LEVELS.map((level) => (
              <TabsTrigger
                key={level}
                value={level}
                className="flex-1 min-w-[60px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <span className="font-bold">{level}</span>
                <span className="hidden sm:inline ml-1 text-xs opacity-70">
                  — {levelInfo[level].name}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {LEVELS.map((level) => (
            <TabsContent key={level} value={level}>
              {/* Level Header */}
              <div className={`rounded-xl border-2 p-5 mb-6 ${levelInfo[level].color}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border ${levelInfo[level].badge}`}>
                    {level}
                  </span>
                  <h2 className="font-['Playfair_Display'] text-2xl font-bold text-foreground">
                    {levelInfo[level].name}
                  </h2>
                </div>
                <p className="text-muted-foreground">{levelInfo[level].desc}</p>
                {isAuthenticated && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
                      <span>Level Progress</span>
                      <span>
                        {allProgress.filter((p) =>
                          lessonsData.filter((l) => l.level === level).some((l) => l.id === p.lessonId) && p.isCompleted
                        ).length} / {lessonsData.filter((l) => l.level === level).length} completed
                      </span>
                    </div>
                    <Progress
                      value={
                        (allProgress.filter((p) =>
                          lessonsData.filter((l) => l.level === level).some((l) => l.id === p.lessonId) && p.isCompleted
                        ).length /
                          Math.max(1, lessonsData.filter((l) => l.level === level).length)) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                )}
              </div>

              {/* Lesson Grid */}
              {levelLessons.length === 0 ? (
                <div className="text-center py-16">
                  <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <h3 className="font-semibold text-lg text-foreground mb-2">Coming Soon</h3>
                  <p className="text-muted-foreground">
                    More {level} lessons are being prepared. Use the AI Course Generator to create custom lessons now!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {levelLessons.map((lesson) => {
                    const progress = getProgress(lesson.id);
                    const isCompleted = progress?.isCompleted ?? false;
                    const quizScore = progress?.quizScore;

                    return (
                      <Card
                        key={lesson.id}
                        className={`p-5 border-2 cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
                          isCompleted
                            ? "border-primary/40 bg-primary/5"
                            : "border-border hover:border-primary/40"
                        }`}
                        onClick={() => setSelectedLesson(lesson)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${levelInfo[level].badge}`}>
                            {lesson.level}
                          </span>
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-primary" />
                          ) : (
                            <BookOpen className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>

                        <h3 className="font-['Playfair_Display'] font-bold text-foreground text-lg mb-1 leading-snug">
                          {lesson.title}
                        </h3>
                        <p className="text-sm text-primary font-medium italic mb-2">{lesson.titlePt}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-2">
                          {lesson.description}
                        </p>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5" />
                            {lesson.vocabulary.length} words
                          </span>
                          {quizScore !== null && quizScore !== undefined ? (
                            <span className="flex items-center gap-1 text-primary font-medium">
                              <Star className="w-3.5 h-3.5 fill-current" />
                              Quiz: {quizScore}%
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {lesson.quizQuestions.length} quiz questions
                            </span>
                          )}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
