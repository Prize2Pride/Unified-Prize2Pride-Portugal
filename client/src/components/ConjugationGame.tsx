import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  CheckCircle, XCircle, Trophy, RotateCcw, ChevronRight, Zap, BookOpen
} from "lucide-react";

type Verb = "ser" | "estar" | "ter" | "fazer" | "ir";
type Tense = "present" | "past" | "future";
type Mode = "fill-blank" | "multiple-choice";

const VERBS: Verb[] = ["ser", "estar", "ter", "fazer", "ir"];

const verbMeanings: Record<Verb, string> = {
  ser: "to be (permanent)",
  estar: "to be (temporary)",
  ter: "to have",
  fazer: "to do / make",
  ir: "to go",
};

const conjugations: Record<Verb, Record<Tense, Record<string, string>>> = {
  ser: {
    present: { eu: "sou", tu: "és", "ele/ela": "é", nós: "somos", vós: "sois", "eles/elas": "são" },
    past: { eu: "fui", tu: "foste", "ele/ela": "foi", nós: "fomos", vós: "fostes", "eles/elas": "foram" },
    future: { eu: "serei", tu: "serás", "ele/ela": "será", nós: "seremos", vós: "sereis", "eles/elas": "serão" },
  },
  estar: {
    present: { eu: "estou", tu: "estás", "ele/ela": "está", nós: "estamos", vós: "estais", "eles/elas": "estão" },
    past: { eu: "estive", tu: "estiveste", "ele/ela": "esteve", nós: "estivemos", vós: "estivestes", "eles/elas": "estiveram" },
    future: { eu: "estarei", tu: "estarás", "ele/ela": "estará", nós: "estaremos", vós: "estareis", "eles/elas": "estarão" },
  },
  ter: {
    present: { eu: "tenho", tu: "tens", "ele/ela": "tem", nós: "temos", vós: "tendes", "eles/elas": "têm" },
    past: { eu: "tive", tu: "tiveste", "ele/ela": "teve", nós: "tivemos", vós: "tivestes", "eles/elas": "tiveram" },
    future: { eu: "terei", tu: "terás", "ele/ela": "terá", nós: "teremos", vós: "tereis", "eles/elas": "terão" },
  },
  fazer: {
    present: { eu: "faço", tu: "fazes", "ele/ela": "faz", nós: "fazemos", vós: "fazeis", "eles/elas": "fazem" },
    past: { eu: "fiz", tu: "fizeste", "ele/ela": "fez", nós: "fizemos", vós: "fizestes", "eles/elas": "fizeram" },
    future: { eu: "farei", tu: "farás", "ele/ela": "fará", nós: "faremos", vós: "fareis", "eles/elas": "farão" },
  },
  ir: {
    present: { eu: "vou", tu: "vais", "ele/ela": "vai", nós: "vamos", vós: "ides", "eles/elas": "vão" },
    past: { eu: "fui", tu: "foste", "ele/ela": "foi", nós: "fomos", vós: "fostes", "eles/elas": "foram" },
    future: { eu: "irei", tu: "irás", "ele/ela": "irá", nós: "iremos", vós: "ireis", "eles/elas": "irão" },
  },
};

const tenseLabels: Record<Tense, string> = {
  present: "Present (Presente)",
  past: "Past (Pretérito Perfeito)",
  future: "Future (Futuro Simples)",
};

const persons = ["eu", "tu", "ele/ela", "nós", "vós", "eles/elas"];

interface Question {
  verb: Verb;
  tense: Tense;
  person: string;
  correct: string;
  options?: string[];
}

function generateQuestions(verb: Verb, tense: Tense, mode: Mode): Question[] {
  const tenseConj = conjugations[verb][tense];
  return persons.map((person) => {
    const correct = tenseConj[person];
    let options: string[] | undefined;
    if (mode === "multiple-choice") {
      // Get wrong answers from other verbs/persons
      const wrongPool: string[] = [];
      for (const v of VERBS) {
        for (const t of (["present", "past", "future"] as Tense[])) {
          for (const p of persons) {
            const val = conjugations[v][t][p];
            if (val !== correct) wrongPool.push(val);
          }
        }
      }
      // Pick 3 unique wrong answers
      const shuffled = wrongPool.sort(() => Math.random() - 0.5);
      const wrongs = Array.from(new Set(shuffled)).slice(0, 3);
      options = [correct, ...wrongs].sort(() => Math.random() - 0.5);
    }
    return { verb, tense, person, correct, options };
  });
}

interface ConjugationGameProps {
  standalone?: boolean;
}

export default function ConjugationGame({ standalone = false }: ConjugationGameProps) {
  const [selectedVerb, setSelectedVerb] = useState<Verb>("ser");
  const [selectedTense, setSelectedTense] = useState<Tense>("present");
  const [mode, setMode] = useState<Mode>("multiple-choice");
  const [gameStarted, setGameStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [answers, setAnswers] = useState<{ correct: boolean; userAnswer: string }[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const startGame = useCallback(() => {
    const qs = generateQuestions(selectedVerb, selectedTense, mode);
    setQuestions(qs);
    setCurrentIdx(0);
    setAnswers([]);
    setUserInput("");
    setSelectedOption(null);
    setRevealed(false);
    setShowResult(false);
    setGameStarted(true);
  }, [selectedVerb, selectedTense, mode]);

  const handleAnswer = (answer: string) => {
    const q = questions[currentIdx];
    const isCorrect = answer.trim().toLowerCase() === q.correct.toLowerCase();
    const newAnswers = [...answers, { correct: isCorrect, userAnswer: answer }];
    setAnswers(newAnswers);
    setRevealed(true);

    setTimeout(() => {
      if (currentIdx < questions.length - 1) {
        setCurrentIdx((i) => i + 1);
        setUserInput("");
        setSelectedOption(null);
        setRevealed(false);
      } else {
        setShowResult(true);
      }
    }, 1200);
  };

  const handleMultipleChoice = (option: string) => {
    if (revealed) return;
    setSelectedOption(option);
    handleAnswer(option);
  };

  const handleFillBlank = () => {
    if (!userInput.trim() || revealed) return;
    handleAnswer(userInput);
  };

  const resetGame = () => {
    setGameStarted(false);
    setShowResult(false);
    setAnswers([]);
    setCurrentIdx(0);
    setUserInput("");
    setSelectedOption(null);
    setRevealed(false);
  };

  const score = answers.filter((a) => a.correct).length;
  const currentQ = questions[currentIdx];

  if (!gameStarted) {
    return (
      <Card className={`${standalone ? "max-w-2xl mx-auto" : ""} p-6 border-2 border-border`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h2 className="font-['Playfair_Display'] text-xl font-bold text-foreground">
              Conjugation Game
            </h2>
            <p className="text-sm text-muted-foreground">Practice the 5 essential Portuguese verbs</p>
          </div>
        </div>

        {/* Verb Selection */}
        <div className="mb-5">
          <label className="text-sm font-semibold text-foreground mb-2 block">Choose a Verb</label>
          <div className="flex flex-wrap gap-2">
            {VERBS.map((v) => (
              <button
                key={v}
                className={`px-4 py-2 rounded-lg border-2 font-medium text-sm transition-all duration-150 ${
                  selectedVerb === v
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary/40 hover:bg-muted"
                }`}
                onClick={() => setSelectedVerb(v)}
              >
                <span className="font-bold">{v}</span>
                <span className="text-xs ml-1.5 opacity-70">— {verbMeanings[v]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tense Selection */}
        <div className="mb-5">
          <label className="text-sm font-semibold text-foreground mb-2 block">Choose a Tense</label>
          <div className="flex flex-wrap gap-2">
            {(["present", "past", "future"] as Tense[]).map((t) => (
              <button
                key={t}
                className={`px-4 py-2 rounded-lg border-2 font-medium text-sm transition-all duration-150 ${
                  selectedTense === t
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary/40 hover:bg-muted"
                }`}
                onClick={() => setSelectedTense(t)}
              >
                {tenseLabels[t]}
              </button>
            ))}
          </div>
        </div>

        {/* Mode Selection */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-foreground mb-2 block">Exercise Mode</label>
          <div className="flex gap-2">
            {[
              { id: "multiple-choice" as Mode, label: "Multiple Choice" },
              { id: "fill-blank" as Mode, label: "Fill in the Blank" },
            ].map((m) => (
              <button
                key={m.id}
                className={`px-4 py-2 rounded-lg border-2 font-medium text-sm transition-all duration-150 flex-1 ${
                  mode === m.id
                    ? "border-secondary bg-secondary/20 text-foreground"
                    : "border-border hover:border-secondary/40 hover:bg-muted"
                }`}
                onClick={() => setMode(m.id)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Preview Table */}
        <div className="mb-6 overflow-x-auto">
          <p className="text-sm font-semibold text-foreground mb-2">
            Preview: <span className="text-primary font-bold">{selectedVerb}</span> — {tenseLabels[selectedTense]}
          </p>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left px-3 py-2 bg-primary text-primary-foreground rounded-tl-lg">Person</th>
                <th className="text-left px-3 py-2 bg-primary text-primary-foreground rounded-tr-lg">Conjugation</th>
              </tr>
            </thead>
            <tbody>
              {persons.map((p, idx) => (
                <tr key={p} className={idx % 2 === 0 ? "bg-muted/50" : ""}>
                  <td className="px-3 py-1.5 text-muted-foreground font-medium">{p}</td>
                  <td className="px-3 py-1.5 text-primary font-bold">
                    {conjugations[selectedVerb][selectedTense][p]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Button
          size="lg"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          onClick={startGame}
        >
          Start Practice <ChevronRight className="ml-2 w-4 h-4" />
        </Button>
      </Card>
    );
  }

  if (showResult) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <Card className={`${standalone ? "max-w-2xl mx-auto" : ""} p-6 border-2 border-border text-center`}>
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
          pct >= 80 ? "bg-primary/10" : pct >= 60 ? "bg-secondary/20" : "bg-red-100"
        }`}>
          <Trophy className={`w-10 h-10 ${pct >= 80 ? "text-primary" : pct >= 60 ? "text-secondary" : "text-red-500"}`} />
        </div>
        <h2 className="font-['Playfair_Display'] text-3xl font-bold text-foreground mb-1">
          {score} / {questions.length}
        </h2>
        <p className="text-2xl font-bold text-primary mb-2">{pct}%</p>
        <p className="text-muted-foreground mb-6">
          {pct >= 80 ? "Excelente! You've mastered this conjugation!" :
           pct >= 60 ? "Bom trabalho! Keep practicing." :
           "Keep studying — practice makes perfect!"}
        </p>

        {/* Answer Review */}
        <div className="text-left space-y-2 mb-6">
          {questions.map((q, idx) => {
            const ans = answers[idx];
            return (
              <div key={idx} className={`flex items-center gap-3 p-3 rounded-lg text-sm ${
                ans?.correct ? "bg-primary/5 border border-primary/20" : "bg-red-50 border border-red-200"
              }`}>
                {ans?.correct ? (
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                )}
                <div className="flex-1">
                  <span className="text-muted-foreground">{q.person}</span>
                  <span className="font-bold text-primary ml-2">{q.correct}</span>
                  {!ans?.correct && (
                    <span className="text-red-500 ml-2 line-through">{ans?.userAnswer}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={startGame}>
            <RotateCcw className="w-4 h-4 mr-2" /> Try Again
          </Button>
          <Button className="flex-1 bg-primary text-primary-foreground" onClick={resetGame}>
            <BookOpen className="w-4 h-4 mr-2" /> New Practice
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`${standalone ? "max-w-2xl mx-auto" : ""} p-6 border-2 border-border`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Badge className="bg-primary text-primary-foreground capitalize">{selectedVerb}</Badge>
          <Badge variant="outline" className="capitalize">{selectedTense}</Badge>
        </div>
        <span className="text-sm text-muted-foreground">
          {currentIdx + 1} / {questions.length}
        </span>
      </div>

      <Progress value={((currentIdx) / questions.length) * 100} className="h-2 mb-6" />

      {/* Score */}
      <div className="flex items-center gap-2 mb-5">
        <CheckCircle className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-foreground">{score} correct</span>
        {currentIdx > 0 && (
          <span className="text-xs text-muted-foreground">
            ({Math.round((score / currentIdx) * 100)}% so far)
          </span>
        )}
      </div>

      {/* Question */}
      {currentQ && (
        <div>
          <div className="text-center mb-6">
            <p className="text-muted-foreground text-sm mb-2">Conjugate in {tenseLabels[selectedTense]}</p>
            <div className="inline-flex items-center gap-3 bg-muted rounded-xl px-6 py-4">
              <span className="text-2xl font-bold text-muted-foreground">{currentQ.person}</span>
              <span className="text-2xl font-bold text-primary">{currentQ.verb}</span>
            </div>
          </div>

          {mode === "multiple-choice" && currentQ.options && (
            <div className="grid grid-cols-2 gap-3">
              {currentQ.options.map((opt) => {
                let cls = "border-border hover:border-primary/40 hover:bg-muted";
                if (revealed) {
                  if (opt === currentQ.correct) cls = "border-primary bg-primary/10 text-primary";
                  else if (opt === selectedOption) cls = "border-red-400 bg-red-50 text-red-600";
                } else if (selectedOption === opt) {
                  cls = "border-primary bg-primary/10 text-primary";
                }
                return (
                  <button
                    key={opt}
                    className={`px-4 py-3 rounded-xl border-2 font-bold text-lg transition-all duration-150 ${cls}`}
                    onClick={() => handleMultipleChoice(opt)}
                    disabled={revealed}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          )}

          {mode === "fill-blank" && (
            <div>
              <div className="flex gap-3">
                <Input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleFillBlank(); }}
                  placeholder="Type the conjugation..."
                  className={`text-lg font-bold text-center border-2 ${
                    revealed
                      ? answers[currentIdx]?.correct
                        ? "border-primary bg-primary/5"
                        : "border-red-400 bg-red-50"
                      : "border-border focus:border-primary"
                  }`}
                  disabled={revealed}
                  autoFocus
                />
                <Button
                  className="bg-primary text-primary-foreground px-6"
                  onClick={handleFillBlank}
                  disabled={!userInput.trim() || revealed}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
              {revealed && (
                <div className={`mt-3 p-3 rounded-lg text-sm font-medium ${
                  answers[currentIdx]?.correct
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}>
                  {answers[currentIdx]?.correct ? (
                    <span>✓ Correct! <strong>{currentQ.correct}</strong></span>
                  ) : (
                    <span>✗ The correct answer is: <strong>{currentQ.correct}</strong></span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
