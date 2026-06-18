"use client";
import { useState, use } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { QUIZZES } from "@/lib/quizzes";
import { INDUSTRIES } from "@/lib/content";
import type { QuizQuestion } from "@/lib/quizzes";

// ─── Constants ────────────────────────────────────────────────────────────────
const SKILL_COLORS: Record<string, string> = {
  vocabulary: "#2B5CE6",
  grammar: "#22863a",
  comprehension: "#b08000",
  cultural: "#c0392b",
  speaking: "#6B46C1",
};

// ─── Sub-components ───────────────────────────────────────────────────────────
function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ background: "#D8D4CC", height: 4, borderRadius: 2 }}>
      <div
        style={{
          background: "#2B5CE6",
          height: 4,
          width: `${(current / total) * 100}%`,
          transition: "width 0.3s ease",
          borderRadius: 2,
        }}
      />
    </div>
  );
}

function SkillBadge({ skill, lang }: { skill: string; lang: "en" | "es" }) {
  const labels: Record<string, { en: string; es: string }> = {
    vocabulary:    { en: "Vocabulary",    es: "Vocabulario" },
    grammar:       { en: "Grammar",       es: "Gramática" },
    comprehension: { en: "Comprehension", es: "Comprensión" },
    cultural:      { en: "Cultural",      es: "Cultural" },
    speaking:      { en: "Speaking",      es: "Hablar" },
  };
  const color = SKILL_COLORS[skill] ?? "#888880";
  return (
    <span
      style={{
        border: `1.5px solid ${color}`,
        color,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        padding: "2px 8px",
      }}
    >
      {labels[skill]?.[lang] ?? skill}
    </span>
  );
}

// ─── Question Card ─────────────────────────────────────────────────────────────
function QuestionCard({
  question,
  index,
  total,
  lang,
  onAnswer,
}: {
  question: QuizQuestion;
  index: number;
  total: number;
  lang: "en" | "es";
  onAnswer: (correct: boolean) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const es = lang === "es";

  function handleSelect(i: number) {
    if (selected !== null) return;
    setSelected(i);
  }

  const questionText = es ? question.questionEs : question.question;
  const options = es ? question.optionsEs : question.options;
  const explanation = es ? question.explanationEs : question.explanation;

  return (
    <div style={{ fontFamily: "var(--font-inter, sans-serif)" }}>
      <div className="mb-4 flex items-center gap-3">
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888880" }}>
          {es ? "Pregunta" : "Question"} {index + 1} / {total}
        </span>
        <SkillBadge skill={question.skill} lang={lang} />
      </div>

      <h2 style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)", fontWeight: 800, lineHeight: 1.35, color: "#0A0A0A", marginBottom: 24 }}>
        {questionText}
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
        {options.map((opt, i) => {
          let bg = "#E8E4DC";
          let border = "1.5px solid #D8D4CC";
          let color = "#0A0A0A";
          if (selected !== null) {
            if (i === question.correct) { bg = "#d4edda"; border = "2px solid #22863a"; color = "#22863a"; }
            else if (i === selected && i !== question.correct) { bg = "#f8d7da"; border = "2px solid #c0392b"; color = "#c0392b"; }
          }
          if (selected === null && true) { /* hover handled by class */ }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              style={{ background: bg, border, color, padding: "12px 16px", textAlign: "left", fontSize: 14, fontWeight: selected !== null && i === question.correct ? 700 : 500, cursor: selected !== null ? "default" : "pointer", transition: "all 0.2s" }}
            >
              <span style={{ fontWeight: 700, marginRight: 8, color: selected !== null && i === question.correct ? "#22863a" : selected !== null && i === selected ? "#c0392b" : "#888880" }}>
                {["A","B","C","D"][i]}.
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div style={{ background: "#E8E4DC", border: "1.5px solid #D8D4CC", padding: 16, marginBottom: 24 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888880", marginBottom: 6 }}>
            {es ? "Explicación" : "Explanation"}
          </p>
          <p style={{ fontSize: 14, color: "#0A0A0A", lineHeight: 1.6 }}>{explanation}</p>
        </div>
      )}

      {selected !== null && (
        <button
          onClick={() => onAnswer(selected === question.correct)}
          style={{ background: "#0A0A0A", color: "#F0EDE6", border: "none", padding: "12px 32px", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", width: "100%" }}
        >
          {index + 1 < total ? (es ? "Siguiente Pregunta →" : "Next Question →") : (es ? "Ver Resultados →" : "See Results →")}
        </button>
      )}
    </div>
  );
}

// ─── Results Screen ────────────────────────────────────────────────────────────
function ResultsScreen({
  score,
  total,
  passed,
  industry,
  lang,
  onRetry,
}: {
  score: number;
  total: number;
  passed: boolean;
  industry: string;
  lang: "en" | "es";
  onRetry: () => void;
}) {
  const es = lang === "es";
  const pct = Math.round((score / total) * 100);
  const ind = INDUSTRIES.find((i) => i.id === industry);

  return (
    <div style={{ textAlign: "center", paddingTop: 40, paddingBottom: 60 }}>
      <div style={{ fontSize: "clamp(4rem, 12vw, 7rem)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.04em", color: passed ? "#22863a" : "#c0392b", marginBottom: 8 }}>
        {pct}%
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888880", marginBottom: 32 }}>
        {score} / {total} {es ? "correctas" : "correct"}
        {" · "}
        {ind?.icon} {es ? ind?.labelEs : ind?.label}
      </div>

      <div style={{ border: `2px solid ${passed ? "#22863a" : "#c0392b"}`, padding: "24px 32px", maxWidth: 480, margin: "0 auto 40px", background: passed ? "#d4edda" : "#f8d7da" }}>
        <p style={{ fontSize: "clamp(1.2rem, 3vw, 1.6rem)", fontWeight: 800, color: passed ? "#22863a" : "#c0392b", letterSpacing: "-0.02em", marginBottom: 8 }}>
          {passed ? (es ? "¡Aprobado! 🎉" : "Passed! 🎉") : (es ? "Sigue Practicando 💪" : "Keep Practicing 💪")}
        </p>
        <p style={{ fontSize: 14, color: "#0A0A0A", lineHeight: 1.6 }}>
          {passed
            ? (es ? `Dominaste el inglés profesional de ${ind?.labelEs}. ¡Excelente trabajo!` : `You've mastered professional ${ind?.label} English. Excellent work!`)
            : (es ? `Necesitas un 70% para aprobar. Repasa los diálogos y el roleplay de ${ind?.labelEs} e intenta de nuevo.` : `You need 70% to pass. Review the ${ind?.label} dialogs and roleplay, then try again.`)}
        </p>
      </div>

      {passed && (
        <div style={{ background: "#0A0A0A", color: "#F0EDE6", padding: "12px 24px", display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 32 }}>
          +{passed ? 50 : 20} XP {es ? "ganados" : "earned"}
        </div>
      )}

      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={onRetry} style={{ border: "2px solid #0A0A0A", background: "transparent", color: "#0A0A0A", padding: "10px 24px", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer" }}>
          {es ? "↩ Reintentar" : "↩ Retry Quiz"}
        </button>
        <Link href={`/dialogs?industry=${industry}`} style={{ border: "2px solid #2B5CE6", background: "#2B5CE6", color: "#fff", padding: "10px 24px", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none" }}>
          {es ? "Practicar más →" : "Practice More →"}
        </Link>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function QuizPage({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = use(params);
  const { lang, toggleLang, saveQuizResult } = useAppStore();
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore]       = useState(0);
  const [done, setDone]         = useState(false);
  const [saved, setSaved]       = useState(false);

  const quiz = QUIZZES.find((q) => q.industry === industry);
  const ind  = INDUSTRIES.find((i) => i.id === industry);
  const es   = lang === "es";

  function handleAnswer(correct: boolean) {
    const newScore = correct ? score + 1 : score;
    if (currentQ + 1 >= (quiz?.questions.length ?? 0)) {
      const total = quiz!.questions.length;
      const pct   = Math.round((newScore / total) * 100);
      if (!saved) {
        saveQuizResult({ industry: industry as never, score: newScore, total, pct, passed: pct >= quiz!.passingScore, completedAt: new Date().toISOString() });
        setSaved(true);
      }
      setScore(newScore);
      setDone(true);
    } else {
      setScore(newScore);
      setCurrentQ((q) => q + 1);
    }
  }

  function handleRetry() {
    setCurrentQ(0); setScore(0); setDone(false); setSaved(false);
  }

  if (!quiz) {
    return (
      <div style={{ minHeight: "100vh", background: "#F0EDE6", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
            {es ? "Quiz no encontrado para esta industria." : "Quiz not found for this industry."}
          </p>
          <Link href="/" style={{ color: "#2B5CE6", fontWeight: 700 }}>← {es ? "Inicio" : "Home"}</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F0EDE6", color: "#0A0A0A", fontFamily: "var(--font-inter, sans-serif)" }}>
      {/* Nav */}
      <nav style={{ borderBottom: "1px solid #D8D4CC", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#E8E4DC", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/" style={{ fontSize: 13, fontWeight: 700, color: "#2B5CE6", letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none" }}>
            ← {es ? "Inicio" : "Home"}
          </Link>
          <span style={{ fontSize: 13, fontWeight: 900, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            {ind?.icon} {es ? quiz.titleEs : quiz.title}
          </span>
        </div>
        <button onClick={toggleLang} style={{ background: "#0A0A0A", color: "#F0EDE6", border: "none", padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: "0.06em" }}>
          {lang.toUpperCase()}
        </button>
      </nav>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 24px" }}>
        {!done ? (
          <>
            <ProgressBar current={currentQ} total={quiz.questions.length} />
            <div style={{ marginTop: 32 }}>
              <QuestionCard
                key={currentQ}
                question={quiz.questions[currentQ]}
                index={currentQ}
                total={quiz.questions.length}
                lang={lang}
                onAnswer={handleAnswer}
              />
            </div>
          </>
        ) : (
          <ResultsScreen
            score={score}
            total={quiz.questions.length}
            passed={Math.round((score / quiz.questions.length) * 100) >= quiz.passingScore}
            industry={industry}
            lang={lang}
            onRetry={handleRetry}
          />
        )}
      </div>
    </div>
  );
}
