import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen, Eye, EyeOff, CheckCircle, XCircle, Trophy, RotateCcw,
  Volume2, MessageSquare, GraduationCap, ChevronRight
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import type { LessonData } from "@/data/lessonsData";
import ReactMarkdown from "react-markdown";

interface LessonViewerProps {
  lesson: LessonData;
  onBack: () => void;
}

export default function LessonViewer({ lesson, onBack }: LessonViewerProps) {
  const { isAuthenticated } = useAuth();
  const [showTranslation, setShowTranslation] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | boolean>>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const startTimeRef = useRef(Date.now());

  const saveProgressMutation = trpc.lessons.saveProgress.useMutation();

  const handleAnswer = (questionId: string, answer: string | boolean) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNextQuestion = () => {
    if (currentQ < lesson.quizQuestions.length - 1) {
      setCurrentQ((q) => q + 1);
    } else {
      // Calculate score
      let correct = 0;
      lesson.quizQuestions.forEach((q) => {
        const userAnswer = answers[q.id];
        if (q.type === "multiple-choice") {
          if (Number(userAnswer) === Number(q.correctAnswer)) correct++;
        } else {
          if (userAnswer === q.correctAnswer) correct++;
        }
      });
      const pct = Math.round((correct / lesson.quizQuestions.length) * 100);
      setScore(pct);
      setQuizFinished(true);
      if (isAuthenticated) {
        const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
        saveProgressMutation.mutate({
          lessonId: lesson.id,
          quizScore: pct,
          timeSpent,
          isCompleted: true,
        });
      }
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQ(0);
    setAnswers({});
    setQuizFinished(false);
    setScore(0);
    startTimeRef.current = Date.now();
  };

  const currentQuestion = lesson.quizQuestions[currentQ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Lesson Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border level-${lesson.level}`}>
            {lesson.level}
          </span>
          <Badge variant="outline" className="text-xs">{lesson.topic}</Badge>
        </div>
        <h1 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-foreground mb-1">
          {lesson.title}
        </h1>
        <p className="text-primary font-medium italic text-lg">{lesson.titlePt}</p>
        <p className="text-muted-foreground mt-2">{lesson.description}</p>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="vocabulary">
        <TabsList className="grid grid-cols-4 w-full mb-6">
          <TabsTrigger value="vocabulary" className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" /> Vocabulary
          </TabsTrigger>
          <TabsTrigger value="reading" className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" /> Reading
          </TabsTrigger>
          <TabsTrigger value="grammar" className="flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5" /> Grammar
          </TabsTrigger>
          <TabsTrigger value="quiz" className="flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5" /> Quiz
          </TabsTrigger>
        </TabsList>

        {/* VOCABULARY TAB */}
        <TabsContent value="vocabulary">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lesson.vocabulary.map((item, idx) => (
              <Card
                key={idx}
                className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                  flippedCards.has(idx) ? "border-primary/40 bg-primary/5" : "border-border"
                }`}
                onClick={() =>
                  setFlippedCards((prev) => {
                    const next = new Set(prev);
                    if (next.has(idx)) next.delete(idx);
                    else next.add(idx);
                    return next;
                  })
                }
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="font-bold text-primary text-lg">{item.word}</span>
                  <Volume2 className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                </div>
                <p className="text-xs text-muted-foreground font-mono mb-2">[{item.pronunciation}]</p>
                {flippedCards.has(idx) ? (
                  <div>
                    <p className="text-foreground font-semibold mb-1">{item.translation}</p>
                    {item.example && (
                      <p className="text-sm text-muted-foreground italic border-t border-border pt-2 mt-2">
                        "{item.example}"
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Click to reveal meaning</p>
                )}
              </Card>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Click any card to reveal the translation and example
          </p>
        </TabsContent>

        {/* READING TAB */}
        <TabsContent value="reading">
          <Card className="p-6 border-2 border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-['Playfair_Display'] text-xl font-bold text-foreground">
                Reading Comprehension
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTranslation((v) => !v)}
                className="flex items-center gap-2"
              >
                {showTranslation ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showTranslation ? "Hide" : "Show"} Translation
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Badge className="mb-3 bg-primary text-primary-foreground">Portuguese</Badge>
                <div className="prose-portuguese text-sm leading-relaxed">
                  <ReactMarkdown>{lesson.readingComprehension}</ReactMarkdown>
                </div>
              </div>
              {showTranslation && (
                <div>
                  <Badge className="mb-3 bg-secondary text-secondary-foreground">English Translation</Badge>
                  <div className="prose-portuguese text-sm leading-relaxed text-muted-foreground">
                    <ReactMarkdown>{lesson.readingComprehensionTranslation}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>

            {/* Dialogues */}
            {lesson.dialogues && lesson.dialogues.length > 0 && (
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" /> Dialogues
                </h3>
                <div className="space-y-2">
                  {lesson.dialogues.map((line, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-3 ${line.speaker === "A" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm ${
                          line.speaker === "A"
                            ? "bg-primary text-primary-foreground rounded-tl-none"
                            : "bg-secondary/20 text-foreground rounded-tr-none"
                        }`}
                      >
                        <span className="font-bold mr-2 opacity-70">{line.speaker}:</span>
                        {line.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

        {/* GRAMMAR TAB */}
        <TabsContent value="grammar">
          <Card className="p-6 border-2 border-border">
            <h2 className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-4">
              Grammar Explanation
            </h2>
            {lesson.grammar ? (
              <div className="prose-portuguese">
                <ReactMarkdown>{lesson.grammar}</ReactMarkdown>
              </div>
            ) : (
              <p className="text-muted-foreground">Grammar notes for this lesson are coming soon.</p>
            )}
          </Card>
        </TabsContent>

        {/* QUIZ TAB */}
        <TabsContent value="quiz">
          <Card className="p-6 border-2 border-border">
            {!quizStarted && !quizFinished && (
              <div className="text-center py-8">
                <Trophy className="w-16 h-16 text-secondary mx-auto mb-4" />
                <h2 className="font-['Playfair_Display'] text-2xl font-bold text-foreground mb-2">
                  Ready for the Quiz?
                </h2>
                <p className="text-muted-foreground mb-6">
                  {lesson.quizQuestions.length} questions — multiple choice and true/false
                </p>
                {!isAuthenticated && (
                  <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 mb-4 inline-block">
                    Sign in to save your quiz score and track progress
                  </p>
                )}
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => setQuizStarted(true)}
                >
                  Start Quiz <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            )}

            {quizStarted && !quizFinished && currentQuestion && (
              <div>
                {/* Progress */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">
                    Question {currentQ + 1} of {lesson.quizQuestions.length}
                  </span>
                  <Badge variant="outline">
                    {currentQuestion.type === "multiple-choice" ? "Multiple Choice" : "True / False"}
                  </Badge>
                </div>
                <Progress
                  value={((currentQ) / lesson.quizQuestions.length) * 100}
                  className="h-2 mb-6"
                />

                <h3 className="text-lg font-semibold text-foreground mb-5">
                  {currentQuestion.question}
                </h3>

                {currentQuestion.type === "multiple-choice" && currentQuestion.options && (
                  <div className="space-y-3">
                    {currentQuestion.options.map((opt, idx) => (
                      <button
                        key={idx}
                        className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-150 text-sm font-medium ${
                          answers[currentQuestion.id] === String(idx)
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/40 hover:bg-muted"
                        }`}
                        onClick={() => handleAnswer(currentQuestion.id, String(idx))}
                      >
                        <span className="font-bold mr-2 text-muted-foreground">
                          {["A", "B", "C", "D"][idx]}.
                        </span>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {currentQuestion.type === "true-false" && (
                  <div className="flex gap-4">
                    {[true, false].map((val) => (
                      <button
                        key={String(val)}
                        className={`flex-1 py-4 rounded-lg border-2 font-bold text-lg transition-all duration-150 ${
                          answers[currentQuestion.id] === val
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/40 hover:bg-muted"
                        }`}
                        onClick={() => handleAnswer(currentQuestion.id, val)}
                      >
                        {val ? "✓ True" : "✗ False"}
                      </button>
                    ))}
                  </div>
                )}

                <Button
                  className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90 w-full"
                  disabled={answers[currentQuestion.id] === undefined}
                  onClick={handleNextQuestion}
                >
                  {currentQ < lesson.quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            )}

            {quizFinished && (
              <div className="text-center py-8">
                <div
                  className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    score >= 80
                      ? "bg-primary/10 text-primary"
                      : score >= 60
                      ? "bg-secondary/20 text-secondary"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {score >= 60 ? (
                    <Trophy className="w-12 h-12" />
                  ) : (
                    <RotateCcw className="w-12 h-12" />
                  )}
                </div>
                <h2 className="font-['Playfair_Display'] text-3xl font-bold text-foreground mb-2">
                  {score}%
                </h2>
                <p className="text-muted-foreground mb-2">
                  {score >= 80
                    ? "Excellent! Muito bem!"
                    : score >= 60
                    ? "Good effort! Keep practicing."
                    : "Keep studying and try again!"}
                </p>

                {/* Detailed results */}
                <div className="mt-6 text-left space-y-3 max-w-lg mx-auto">
                  {lesson.quizQuestions.map((q, idx) => {
                    const userAns = answers[q.id];
                    let isCorrect = false;
                    if (q.type === "multiple-choice") {
                      isCorrect = Number(userAns) === Number(q.correctAnswer);
                    } else {
                      isCorrect = userAns === q.correctAnswer;
                    }
                    return (
                      <div
                        key={q.id}
                        className={`flex items-start gap-3 p-3 rounded-lg text-sm ${
                          isCorrect ? "bg-primary/5 border border-primary/20" : "bg-red-50 border border-red-200"
                        }`}
                      >
                        {isCorrect ? (
                          <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="font-medium text-foreground">{q.question}</p>
                          {!isCorrect && q.type === "multiple-choice" && q.options && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Correct: {q.options[Number(q.correctAnswer)]}
                            </p>
                          )}
                          {!isCorrect && q.type === "true-false" && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Correct: {String(q.correctAnswer)}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-3 justify-center mt-6">
                  <Button variant="outline" onClick={resetQuiz}>
                    <RotateCcw className="w-4 h-4 mr-2" /> Retake Quiz
                  </Button>
                  <Button className="bg-primary text-primary-foreground" onClick={onBack}>
                    Back to Courses
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
