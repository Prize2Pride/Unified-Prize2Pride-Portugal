import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  TrendingUp, Trophy, Clock, BookOpen, Star, CheckCircle,
  Lock, ArrowRight, Target, Zap
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { allLessons as lessonsData } from "@/data/lessonsData";
import { Link } from "wouter";

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
type Level = typeof LEVELS[number];

const levelColors: Record<Level, { bg: string; text: string; border: string; badge: string }> = {
  A1: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-300", badge: "level-A1" },
  A2: { bg: "bg-green-50", text: "text-green-700", border: "border-green-300", badge: "level-A2" },
  B1: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-300", badge: "level-B1" },
  B2: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-300", badge: "level-B2" },
  C1: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-300", badge: "level-C1" },
  C2: { bg: "bg-red-50", text: "text-red-700", border: "border-red-300", badge: "level-C2" },
};

function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  return `${Math.round(seconds / 3600)}h ${Math.round((seconds % 3600) / 60)}m`;
}

export default function ProgressPage() {
  const { isAuthenticated } = useAuth();
  const { data: stats = {} } = trpc.lessons.getStats.useQuery(undefined, { enabled: isAuthenticated });
  const { data: allProgress = [] } = trpc.lessons.getAllProgress.useQuery(undefined, { enabled: isAuthenticated });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-gradient-to-r from-primary to-accent py-12 text-primary-foreground">
          <div className="container">
            <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-2">
              Your Progress
            </h1>
            <p className="text-primary-foreground/80">Track your Portuguese learning journey</p>
          </div>
        </div>
        <div className="container py-16 text-center">
          <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-['Playfair_Display'] text-2xl font-bold text-foreground mb-3">
            Sign In to Track Progress
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Create a free account to save your quiz scores, track lesson completion, 
            and see your learning statistics across all levels.
          </p>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => startLogin()}
          >
            Sign In Free <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  const totalLessons = lessonsData.length;
  const totalCompleted = allProgress.filter((p) => p.isCompleted).length;
  const totalTime = allProgress.reduce((a, p) => a + (p.timeSpent ?? 0), 0);
  const allScores = allProgress.filter((p) => p.quizScore !== null).map((p) => p.quizScore!);
  const avgScore = allScores.length > 0 ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length) : 0;
  const overallPct = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent py-12 text-primary-foreground">
        <div className="container">
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-2">
            Your Progress
          </h1>
          <p className="text-primary-foreground/80">
            Track your Portuguese learning journey from A1 to C2
          </p>
        </div>
      </div>

      <div className="container py-8 space-y-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: BookOpen,
              label: "Lessons Completed",
              value: `${totalCompleted} / ${totalLessons}`,
              color: "text-primary",
              bg: "bg-primary/10",
            },
            {
              icon: Star,
              label: "Average Quiz Score",
              value: allScores.length > 0 ? `${avgScore}%` : "—",
              color: "text-secondary",
              bg: "bg-secondary/10",
            },
            {
              icon: Clock,
              label: "Total Study Time",
              value: totalTime > 0 ? formatTime(totalTime) : "—",
              color: "text-primary",
              bg: "bg-primary/10",
            },
            {
              icon: Target,
              label: "Overall Progress",
              value: `${overallPct}%`,
              color: "text-secondary",
              bg: "bg-secondary/10",
            },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <Card key={label} className="p-5 border-2 border-border">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div className="text-2xl font-bold text-foreground font-['Playfair_Display']">{value}</div>
              <div className="text-sm text-muted-foreground mt-1">{label}</div>
            </Card>
          ))}
        </div>

        {/* Overall Progress Bar */}
        <Card className="p-6 border-2 border-border">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-['Playfair_Display'] text-xl font-bold text-foreground">
              Overall Journey
            </h2>
            <Badge className="bg-primary text-primary-foreground">{overallPct}% Complete</Badge>
          </div>
          <Progress value={overallPct} className="h-3 mb-2" />
          <p className="text-sm text-muted-foreground">
            {totalCompleted} of {totalLessons} lessons completed across all levels
          </p>
        </Card>

        {/* Level-by-Level Stats */}
        <div>
          <h2 className="font-['Playfair_Display'] text-2xl font-bold text-foreground mb-4">
            Progress by Level
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {LEVELS.map((level) => {
              const levelStats = (stats as any)[level] ?? { total: 0, completed: 0, avgScore: 0, totalTime: 0 };
              const levelLessons = lessonsData.filter((l) => l.level === level);
              const total = levelLessons.length;
              const completed = allProgress.filter(
                (p) => p.isCompleted && levelLessons.some((l) => l.id === p.lessonId)
              ).length;
              const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
              const colors = levelColors[level];

              return (
                <Card key={level} className={`p-5 border-2 ${colors.border} ${colors.bg}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${colors.badge}`}>
                      {level}
                    </span>
                    {completed === total && total > 0 ? (
                      <CheckCircle className={`w-5 h-5 ${colors.text}`} />
                    ) : total === 0 ? (
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <span className={`text-sm font-bold ${colors.text}`}>{pct}%</span>
                    )}
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Lessons</span>
                      <span className="font-medium text-foreground">{completed} / {total}</span>
                    </div>
                    <Progress value={pct} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div>
                      <span className="block font-medium text-foreground">
                        {levelStats.avgScore > 0 ? `${levelStats.avgScore}%` : "—"}
                      </span>
                      Avg Score
                    </div>
                    <div>
                      <span className="block font-medium text-foreground">
                        {levelStats.totalTime > 0 ? formatTime(levelStats.totalTime) : "—"}
                      </span>
                      Study Time
                    </div>
                  </div>

                  {total > 0 && (
                    <Link href={`/courses?level=${level}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`w-full mt-3 border-current ${colors.text}`}
                      >
                        {completed === total ? "Review" : "Continue"} {level}
                        <ArrowRight className="ml-1 w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        {allProgress.length > 0 && (
          <div>
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-foreground mb-4">
              Recent Activity
            </h2>
            <Card className="border-2 border-border">
              <div className="divide-y divide-border">
                {allProgress
                  .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                  .slice(0, 10)
                  .map((p) => {
                    const lesson = lessonsData.find((l) => l.id === p.lessonId);
                    if (!lesson) return null;
                    const colors = levelColors[lesson.level as Level];
                    return (
                      <div key={p.id} className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${colors.badge} shrink-0`}>
                          {lesson.level}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground text-sm truncate">{lesson.title}</p>
                          <p className="text-xs text-muted-foreground">{lesson.titlePt}</p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          {p.quizScore !== null && p.quizScore !== undefined && (
                            <div className="flex items-center gap-1 text-xs">
                              <Star className="w-3.5 h-3.5 text-secondary fill-current" />
                              <span className="font-medium">{p.quizScore}%</span>
                            </div>
                          )}
                          {p.isCompleted ? (
                            <CheckCircle className="w-4 h-4 text-primary" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </Card>
          </div>
        )}

        {/* Empty state */}
        {allProgress.length === 0 && (
          <Card className="p-12 border-2 border-border text-center">
            <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-2">
              Start Your Journey
            </h3>
            <p className="text-muted-foreground mb-6">
              Complete your first lesson to start tracking your progress!
            </p>
            <Link href="/courses">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Browse Lessons <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}
