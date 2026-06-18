"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { DIALOGS } from "@/lib/dialogs";
import { INDUSTRIES } from "@/lib/content";
import type { Dialog, Industry } from "@/lib/content";

// ─── Sub-components ────────────────────────────────────────────────────────

function LangToggle() {
  const { lang, toggleLang } = useAppStore();
  return (
    <button
      onClick={toggleLang}
      style={{ border: "1.5px solid #2B5CE6", color: "#2B5CE6", borderRadius: 2 }}
      className="px-3 py-1 text-xs font-bold tracking-widest uppercase hover:bg-[#2B5CE6] hover:text-white transition-colors"
    >
      {lang === "en" ? "ES" : "EN"}
    </button>
  );
}

function IndustryFilter({
  selected,
  onChange,
}: {
  selected: Industry | null;
  onChange: (v: Industry | null) => void;
}) {
  const { lang } = useAppStore();
  return (
    <div className="flex flex-wrap gap-2 py-4" style={{ borderBottom: "1px solid #D8D4CC" }}>
      <button
        onClick={() => onChange(null)}
        style={{
          border: "1.5px solid #D8D4CC",
          borderRadius: 2,
          background: selected === null ? "#2B5CE6" : "#E8E4DC",
          color: selected === null ? "#fff" : "#0A0A0A",
        }}
        className="px-3 py-1 text-xs font-semibold tracking-wide uppercase transition-colors"
      >
        {lang === "en" ? "All" : "Todos"}
      </button>
      {INDUSTRIES.map((ind) => (
        <button
          key={ind.id}
          onClick={() => onChange(ind.id)}
          style={{
            border: "1.5px solid #D8D4CC",
            borderRadius: 2,
            background: selected === ind.id ? "#2B5CE6" : "#E8E4DC",
            color: selected === ind.id ? "#fff" : "#0A0A0A",
          }}
          className="px-3 py-1 text-xs font-semibold tracking-wide uppercase transition-colors"
        >
          {ind.icon} {lang === "en" ? ind.label : ind.labelEs}
        </button>
      ))}
    </div>
  );
}

// ─── Speech Bubble ─────────────────────────────────────────────────────────

function SpeechBubble({
  line,
  index,
  speakMode,
}: {
  line: Dialog["lines"][number];
  index: number;
  speakMode: boolean;
}) {
  const { lang } = useAppStore();
  const [tipOpen, setTipOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const isA = index % 2 === 0;

  return (
    <div className={`flex flex-col ${isA ? "items-start" : "items-end"} gap-1 mb-4`}>
      <div className={`flex items-center gap-2 ${isA ? "" : "flex-row-reverse"}`}>
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#888880]">
          {line.speaker}
        </span>
        <span className="text-[11px] text-[#888880]">
          {lang === "en" ? line.role : line.roleEs}
        </span>
      </div>
      <div
        className="max-w-[85%] px-4 py-3"
        style={{
          border: "1.5px solid #D8D4CC",
          borderRadius: 2,
          background: isA ? "#0A0A0A" : "#E8E4DC",
        }}
      >
        {speakMode && !revealed ? (
          <div className="flex flex-col gap-2">
            <p className="text-sm italic" style={{ color: isA ? "#aaa" : "#888880" }}>
              {line.textEs}
            </p>
            <button
              onClick={() => setRevealed(true)}
              className="text-xs font-bold uppercase tracking-wider px-3 py-1 self-start"
              style={{ background: "#2B5CE6", color: "#fff", borderRadius: 2 }}
            >
              {lang === "en" ? "Reveal" : "Revelar"}
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm font-bold leading-snug" style={{ color: isA ? "#F0EDE6" : "#0A0A0A" }}>
              {line.text}
            </p>
            <p className="text-sm italic mt-1" style={{ color: isA ? "#aaa" : "#888880" }}>
              {line.textEs}
            </p>
            {speakMode && revealed && (
              <button
                onClick={() => setRevealed(false)}
                className="text-[10px] uppercase tracking-wider mt-2 text-[#2B5CE6]"
              >
                ↩ {lang === "en" ? "Hide" : "Ocultar"}
              </button>
            )}
          </>
        )}
        {line.tip && (
          <div className="mt-2">
            <button
              onClick={() => setTipOpen((p) => !p)}
              className="text-[11px] uppercase tracking-widest font-bold"
              style={{ color: "#2B5CE6" }}
            >
              {tipOpen ? "▾" : "▸"} Tip
            </button>
            {tipOpen && (
              <p className="text-[12px] mt-1 leading-snug" style={{ color: isA ? "#ccc" : "#555" }}>
                {lang === "en" ? line.tip : line.tipEs}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Dialog Card ───────────────────────────────────────────────────────────

// ─── Dialog Detail ─────────────────────────────────────────────────────────

function DialogDetail({
  dialog,
  onBack,
}: {
  dialog: Dialog;
  onBack: () => void;
}) {
  const { lang, completeDialog, completedDialogs } = useAppStore();
  const [speakMode, setSpeakMode] = useState(false);
  const done = completedDialogs.includes(dialog.id);
  const ind = INDUSTRIES.find((i) => i.id === dialog.industry);
  const levelLabel: Record<string, string> = {
    beginner: lang === "en" ? "Beginner" : "Básico",
    intermediate: lang === "en" ? "Intermediate" : "Intermedio",
    advanced: lang === "en" ? "Advanced" : "Avanzado",
  };

  return (
    <div>
      {/* Detail header */}
      <div className="flex items-center gap-3 py-4" style={{ borderBottom: "1px solid #D8D4CC" }}>
        <button
          onClick={onBack}
          className="text-sm font-bold uppercase tracking-widest text-[#2B5CE6] hover:underline"
        >
          ← {lang === "en" ? "Back" : "Atrás"}
        </button>
      </div>

      <div className="py-6">
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5"
            style={{ background: "#2B5CE6", color: "#fff", borderRadius: 2 }}>
            {ind?.icon} {lang === "en" ? ind?.label : ind?.labelEs}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5"
            style={{ border: "1.5px solid #D8D4CC", borderRadius: 2 }}>
            {levelLabel[dialog.level]}
          </span>
        </div>
        <h1 className="text-2xl font-black leading-tight text-[#0A0A0A] mt-2">{dialog.title}</h1>
        <p className="text-base italic text-[#888880] mt-1">{dialog.titleEs}</p>
      </div>

      {/* How to use */}
      <div className="p-4 mb-6" style={{ border: "1px solid #D8D4CC", borderRadius: 2, background: "#E8E4DC" }}>
        <p className="text-[11px] font-black uppercase tracking-widest text-[#888880] mb-2">
          {lang === "en" ? "How to Use" : "Cómo Usar"}
        </p>
        <ol className="text-[13px] text-[#0A0A0A] space-y-1 list-decimal list-inside">
          {(lang === "en"
            ? ["Read the English line aloud", "Read the Spanish translation", "Speak the line without looking", "Review the tip for cultural context"]
            : ["Lee la línea en inglés en voz alta", "Lee la traducción en español", "Di la línea sin mirar", "Revisa el tip para contexto cultural"]
          ).map((s, i) => <li key={i}>{s}</li>)}
        </ol>
      </div>

      {/* Speaking mode toggle */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setSpeakMode((p) => !p)}
          className="text-xs font-bold uppercase tracking-widest px-4 py-2 transition-colors"
          style={{
            border: "1.5px solid #2B5CE6",
            borderRadius: 2,
            background: speakMode ? "#2B5CE6" : "transparent",
            color: speakMode ? "#fff" : "#2B5CE6",
          }}
        >
          {speakMode
            ? (lang === "en" ? "▶ Speaking Mode ON" : "▶ Modo Práctica ACTIVO")
            : (lang === "en" ? "▶ Speaking Practice" : "▶ Práctica Oral")}
        </button>
        {speakMode && (
          <p className="text-[12px] text-[#888880]">
            {lang === "en" ? "Spanish shown — say the English line, then reveal." : "Se muestra español — di la línea en inglés, luego revela."}
          </p>
        )}
      </div>

      {/* Lines */}
      <div className="mb-8">
        {dialog.lines.map((line, i) => (
          <SpeechBubble key={i} line={line} index={i} speakMode={speakMode} />
        ))}
      </div>

      {/* Vocabulary */}
      <section className="mb-8">
        <h2 className="text-[11px] font-black uppercase tracking-widest text-[#888880] mb-3"
          style={{ borderBottom: "1px solid #D8D4CC", paddingBottom: "8px" }}>
          {lang === "en" ? "Vocabulary" : "Vocabulario"}
        </h2>
        <div className="space-y-3">
          {dialog.vocabulary.map((v) => (
            <div key={v.word} className="p-3" style={{ border: "1px solid #D8D4CC", borderRadius: 2, background: "#E8E4DC" }}>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="font-black text-[15px] text-[#0A0A0A]">{v.word}</span>
                <span className="text-[12px] font-mono text-[#888880]">{v.pronunciation}</span>
              </div>
              <p className="text-[13px] text-[#0A0A0A] mt-1">{v.definitionEn}</p>
              <p className="text-[13px] italic text-[#888880]">{v.definitionEs}</p>
              <p className="text-[12px] mt-1 text-[#555]">
                <span className="font-bold uppercase text-[10px] tracking-wider mr-1">ex.</span>
                {v.example}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Cultural Note */}
      {dialog.culturalNote && (
        <section className="mb-8">
          <h2 className="text-[11px] font-black uppercase tracking-widest text-[#888880] mb-3"
            style={{ borderBottom: "1px solid #D8D4CC", paddingBottom: "8px" }}>
            {lang === "en" ? "Cultural Note" : "Nota Cultural"}
          </h2>
          <div className="p-4" style={{ border: "1.5px solid #2B5CE6", borderRadius: 2, background: "#E8E4DC" }}>
            <p className="text-[13px] leading-relaxed text-[#0A0A0A]">
              {lang === "en" ? dialog.culturalNote : dialog.culturalNoteEs}
            </p>
          </div>
        </section>
      )}

      {/* Mark Complete */}
      <div className="pb-12">
        <button
          onClick={() => completeDialog(dialog.id)}
          disabled={done}
          className="w-full py-3 font-black uppercase tracking-widest text-sm transition-colors"
          style={{
            borderRadius: 2,
            border: "2px solid #2B5CE6",
            background: done ? "#2B5CE6" : "transparent",
            color: done ? "#fff" : "#2B5CE6",
            cursor: done ? "default" : "pointer",
          }}
        >
          {done
            ? (lang === "en" ? "✓ Completed" : "✓ Completado")
            : (lang === "en" ? "Mark Complete (+20 XP)" : "Marcar como Completado (+20 XP)")}
        </button>
      </div>
    </div>
  );
}

// ─── Dialog Card ───────────────────────────────────────────────────────────

function DialogCard({
  dialog,
  onSelect,
}: {
  dialog: Dialog;
  onSelect: () => void;
}) {
  const { lang, completedDialogs } = useAppStore();
  const done = completedDialogs.includes(dialog.id);
  const ind = INDUSTRIES.find((i) => i.id === dialog.industry);
  const levelColor: Record<string, string> = {
    beginner: "#22863a",
    intermediate: "#b08000",
    advanced: "#c0392b",
  };
  return (
    <button
      onClick={onSelect}
      className="w-full text-left p-4 transition-colors hover:bg-[#E8E4DC] group"
      style={{ border: "1px solid #D8D4CC", borderRadius: 2, background: "#F0EDE6" }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="font-bold text-[15px] leading-tight text-[#0A0A0A] truncate">
            {dialog.title}
          </p>
          <p className="text-[13px] text-[#888880] italic mt-0.5 truncate">{dialog.titleEs}</p>
        </div>
        {done && (
          <span className="text-[#2B5CE6] text-base font-bold shrink-0">✓</span>
        )}
      </div>
      <div className="flex gap-2 mt-3 flex-wrap">
        <span
          className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5"
          style={{ background: "#2B5CE6", color: "#fff", borderRadius: 2 }}
        >
          {ind?.icon} {lang === "en" ? ind?.label : ind?.labelEs}
        </span>
        <span
          className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5"
          style={{
            border: `1.5px solid ${levelColor[dialog.level] ?? "#888880"}`,
            color: levelColor[dialog.level] ?? "#888880",
            borderRadius: 2,
          }}
        >
          {lang === "en" ? dialog.level : { beginner: "Básico", intermediate: "Intermedio", advanced: "Avanzado" }[dialog.level]}
        </span>
        <span className="text-[11px] text-[#888880] px-2 py-0.5 uppercase tracking-wider">
          {dialog.lines.length} {lang === "en" ? "lines" : "líneas"}
        </span>
      </div>
    </button>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

type Level = "beginner" | "intermediate" | "advanced";

const LEVELS: { id: Level; label: string; labelEs: string; color: string }[] = [
  { id: "beginner",     label: "Beginner",     labelEs: "Básico",      color: "#22863a" },
  { id: "intermediate", label: "Intermediate", labelEs: "Intermedio",  color: "#b08000" },
  { id: "advanced",     label: "Advanced",     labelEs: "Avanzado",    color: "#c0392b" },
];

export default function DialogsPage() {
  const { lang, profile } = useAppStore();
  const [industryFilter, setIndustryFilter] = useState<Industry | null>(profile?.industry ?? null);
  const [levelFilter, setLevelFilter]       = useState<Level | null>(null);
  const [selected, setSelected]             = useState<Dialog | null>(null);

  const filtered = DIALOGS.filter((d) => {
    if (industryFilter && d.industry !== industryFilter) return false;
    if (levelFilter    && d.level    !== levelFilter)    return false;
    return true;
  });

  return (
    <div className="min-h-screen" style={{ background: "#F0EDE6", fontFamily: "var(--font-inter, sans-serif)" }}>
      <div className="max-w-2xl mx-auto px-4">
        {/* Top nav */}
        <header
          className="flex items-center justify-between py-4 sticky top-0 z-10"
          style={{ background: "#F0EDE6", borderBottom: "1px solid #D8D4CC" }}
        >
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm font-bold uppercase tracking-widest text-[#2B5CE6] hover:underline"
            >
              ← {lang === "en" ? "Back" : "Inicio"}
            </Link>
            <h1 className="text-sm font-black uppercase tracking-widest text-[#0A0A0A]">
              {lang === "en" ? "Daily Dialogs" : "Diálogos"}
            </h1>
          </div>
          <LangToggle />
        </header>

        {/* Content */}
        {selected ? (
          <DialogDetail dialog={selected} onBack={() => setSelected(null)} />
        ) : (
          <>
            {/* Profile context bar */}
            {profile && (
              <div className="flex items-center justify-between py-2 mb-1" style={{ borderBottom: "1px solid #D8D4CC" }}>
                <span className="text-[11px] text-[#888880]">
                  {lang === "en" ? `Showing: ` : `Mostrando: `}
                  <span className="font-bold text-[#0A0A0A]">{profile.name} · {profile.role}</span>
                </span>
                <Link href="/profile" className="text-[10px] font-bold uppercase tracking-widest text-[#2B5CE6] hover:underline">
                  {lang === "en" ? "Edit" : "Editar"}
                </Link>
              </div>
            )}
            <IndustryFilter selected={industryFilter} onChange={setIndustryFilter} />

            {/* Level filter */}
            <div className="flex flex-wrap gap-2 py-3" style={{ borderBottom: "1px solid #D8D4CC" }}>
              <button
                onClick={() => setLevelFilter(null)}
                className="px-3 py-1 text-xs font-semibold tracking-wide uppercase transition-colors"
                style={{ border: "1.5px solid #D8D4CC", borderRadius: 2, background: levelFilter === null ? "#0A0A0A" : "#E8E4DC", color: levelFilter === null ? "#F0EDE6" : "#0A0A0A" }}
              >
                {lang === "en" ? "All Levels" : "Todos los Niveles"}
              </button>
              {LEVELS.map((lv) => (
                <button
                  key={lv.id}
                  onClick={() => setLevelFilter(lv.id)}
                  className="px-3 py-1 text-xs font-semibold tracking-wide uppercase transition-colors"
                  style={{ border: `1.5px solid ${lv.color}`, borderRadius: 2, background: levelFilter === lv.id ? lv.color : "transparent", color: levelFilter === lv.id ? "#fff" : lv.color }}
                >
                  {lang === "en" ? lv.label : lv.labelEs}
                </button>
              ))}
            </div>

            <div className="py-4">
              <p className="text-[11px] uppercase tracking-widest text-[#888880] mb-4">
                {filtered.length} {lang === "en" ? "dialogs" : "diálogos"}
              </p>
              <div className="flex flex-col gap-3">
                {filtered.map((d) => (
                  <DialogCard key={d.id} dialog={d} onSelect={() => setSelected(d)} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
