"use client";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { INDUSTRIES } from "@/lib/content";

const PHRASE_OF_DAY = {
  en: "Can you walk me through the process?",
  es: "¿Puede explicarme el proceso paso a paso?",
  context: "Office / Professional",
  contextEs: "Oficina / Profesional",
};

export default function Home() {
  const { lang, toggleLang, profile } = useAppStore();
  const ind = profile ? INDUSTRIES.find((i) => i.id === profile.industry) : null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F0EDE6", color: "#0A0A0A" }}>
      {/* Navigation */}
      <nav
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: "#D8D4CC" }}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl font-black tracking-tight">
            Practica<span style={{ color: "#2B5CE6" }}>English</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dialogs" className="text-sm font-medium hover:opacity-60 transition-opacity hidden sm:block">
            {lang === "es" ? "Diálogos" : "Dialogs"}
          </Link>
          <Link href="/roleplay" className="text-sm font-medium hover:opacity-60 transition-opacity hidden sm:block">
            Roleplay
          </Link>
          <Link href="/reading" className="text-sm font-medium hover:opacity-60 transition-opacity hidden sm:block">
            {lang === "es" ? "Lectura" : "Reading"}
          </Link>
          <Link href="/dashboard" className="text-sm font-medium hover:opacity-60 transition-opacity hidden sm:block">
            {lang === "es" ? "Progreso" : "Progress"}
          </Link>
          {/* Profile pill */}
          <Link
            href="/profile"
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 border transition-all hover:bg-black hover:text-white"
            style={{ borderColor: profile ? "#2B5CE6" : "#D8D4CC", color: profile ? "#2B5CE6" : "#888880" }}
          >
            {profile ? (
              <><span>{ind?.icon}</span><span>{profile.name}</span></>
            ) : (
              <span>{lang === "es" ? "Mi Perfil" : "My Profile"}</span>
            )}
          </Link>
          <button
            onClick={toggleLang}
            className="text-xs font-bold border px-3 py-1.5 transition-all hover:bg-black hover:text-white"
            style={{ borderColor: "#0A0A0A" }}
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 pt-16 pb-12 max-w-7xl mx-auto">
        {profile ? (
          /* ── Personalized hero ── */
          <>
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span
                className="text-xs font-bold uppercase tracking-widest px-3 py-1"
                style={{ background: "#2B5CE6", color: "#F0EDE6" }}
              >
                {ind?.icon} {lang === "es" ? ind?.labelEs : ind?.label}
              </span>
              <span className="editorial-label">
                {lang === "es" ? `Nivel: ${profile.level === "beginner" ? "Básico" : profile.level === "intermediate" ? "Intermedio" : "Avanzado"}` : `Level: ${profile.level.charAt(0).toUpperCase() + profile.level.slice(1)}`}
              </span>
            </div>
            <h1 className="editorial-hero mb-6">
              {lang === "es" ? (
                <>¡Hola,<br /><em style={{ color: "#2B5CE6", fontStyle: "italic" }}>{profile.name}!</em></>
              ) : (
                <>Hello,<br /><em style={{ color: "#2B5CE6", fontStyle: "italic" }}>{profile.name}!</em></>
              )}
            </h1>
            <p className="text-lg max-w-xl leading-relaxed mb-4" style={{ color: "#888880" }}>
              {lang === "es"
                ? `Tu práctica está personalizada para ${ind?.labelEs} — ${profile.role}.`
                : `Your practice is personalized for ${ind?.label} — ${profile.role}.`}
            </p>
            <p className="text-base max-w-lg leading-relaxed mb-10 italic" style={{ color: "#2B5CE6" }}>
              &ldquo;{lang === "es" ? profile.goalEs : profile.goalEn}&rdquo;
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/dialogs?industry=${profile.industry}`}
                className="inline-flex items-center gap-2 px-6 py-3 font-bold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "#0A0A0A", color: "#F0EDE6" }}
              >
                {lang === "es" ? `Practicar ${ind?.labelEs} →` : `Practice ${ind?.label} →`}
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 font-bold text-sm border transition-all hover:bg-black hover:text-white"
                style={{ borderColor: "#0A0A0A", color: "#0A0A0A" }}
              >
                {lang === "es" ? "Mi Progreso" : "My Progress"}
              </Link>
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 px-6 py-3 font-bold text-sm border transition-all hover:bg-black hover:text-white"
                style={{ borderColor: "#D8D4CC", color: "#888880" }}
              >
                {lang === "es" ? "Editar Perfil" : "Edit Profile"}
              </Link>
            </div>
          </>
        ) : (
          /* ── Default hero (no profile) ── */
          <>
            <div className="mb-4">
              <span className="editorial-label">
                {lang === "es" ? "Inglés profesional para tu carrera" : "Professional English for your career"}
              </span>
            </div>
            <h1 className="editorial-hero mb-8">
              {lang === "es" ? (
                <>No <em style={{ color: "#2B5CE6", fontStyle: "italic" }}>estudiamos</em><br />inglés.<br />Lo <em style={{ fontStyle: "italic" }}>practicamos.</em></>
              ) : (
                <>We don&apos;t <em style={{ color: "#2B5CE6", fontStyle: "italic" }}>study</em><br />English.<br />We <em style={{ fontStyle: "italic" }}>practice</em> it.</>
              )}
            </h1>
            <p className="text-lg max-w-xl leading-relaxed mb-10" style={{ color: "#888880" }}>
              {lang === "es"
                ? "Diálogos reales, situaciones de trabajo, y actividades de práctica diseñadas para profesionales de habla hispana que quieren avanzar en su carrera."
                : "Real dialogs, workplace situations, and practice activities designed for Spanish-speaking professionals advancing their careers."}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 px-6 py-3 font-bold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "#2B5CE6", color: "#F0EDE6" }}
              >
                {lang === "es" ? "Crear mi Perfil →" : "Create My Profile →"}
              </Link>
              <Link
                href="/dialogs"
                className="inline-flex items-center gap-2 px-6 py-3 font-bold text-sm border transition-all hover:bg-black hover:text-white"
                style={{ borderColor: "#0A0A0A", color: "#0A0A0A" }}
              >
                {lang === "es" ? "Explorar Diálogos" : "Explore Dialogs"}
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Phrase of the Day */}
      <section
        className="mx-6 max-w-7xl lg:mx-auto mb-16 p-8 border"
        style={{ borderColor: "#D8D4CC", backgroundColor: "#E8E4DC" }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="editorial-label mb-3 block">
              {lang === "es" ? "Frase del Día" : "Phrase of the Day"}
            </span>
            <p className="text-2xl font-bold tracking-tight mb-1">
              &ldquo;{PHRASE_OF_DAY.en}&rdquo;
            </p>
            <p className="text-base italic" style={{ color: "#888880" }}>
              &ldquo;{PHRASE_OF_DAY.es}&rdquo;
            </p>
          </div>
          <div
            className="flex-shrink-0 px-4 py-2 text-xs font-bold tracking-wide border"
            style={{ borderColor: "#2B5CE6", color: "#2B5CE6" }}
          >
            {lang === "es" ? PHRASE_OF_DAY.contextEs : PHRASE_OF_DAY.context}
          </div>
        </div>
      </section>

      {/* Practice Modules */}
      <section className="px-6 max-w-7xl mx-auto mb-16">
        <div className="mb-10">
          <span className="editorial-label mb-3 block">
            {lang === "es" ? "Módulos de Práctica" : "Practice Modules"}
          </span>
          <h2 className="editorial-section-title">
            {lang === "es" ? "Elige cómo practicar." : "Choose how to practice."}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "#D8D4CC" }}>
          {/* Dialog Card */}
          <Link href="/dialogs">
            <div
              className="p-8 group cursor-pointer transition-all hover:bg-black hover:text-white"
              style={{ backgroundColor: "#F0EDE6" }}
            >
              <div className="text-3xl mb-4">🗣️</div>
              <h3 className="text-xl font-bold mb-2">
                {lang === "es" ? "Diálogos Diarios" : "Daily Dialogs"}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#888880" }}>
                {lang === "es"
                  ? "Conversaciones reales de trabajo. Practica lo que dirás mañana en tu trabajo."
                  : "Real workplace conversations. Practice what you'll say tomorrow at work."}
              </p>
              <div
                className="mt-6 text-xs font-bold tracking-wide group-hover:text-white"
                style={{ color: "#2B5CE6" }}
              >
                {lang === "es" ? "HABLAR + ESCUCHAR" : "SPEAKING + LISTENING"}
              </div>
            </div>
          </Link>

          {/* Roleplay Card */}
          <Link href="/roleplay">
            <div
              className="p-8 group cursor-pointer transition-all hover:bg-black hover:text-white"
              style={{ backgroundColor: "#F0EDE6" }}
            >
              <div className="text-3xl mb-4">🎭</div>
              <h3 className="text-xl font-bold mb-2">
                {lang === "es" ? "Roleplay por Industria" : "Industry Roleplay"}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#888880" }}>
                {lang === "es"
                  ? "Simula situaciones reales en tu área: salud, construcción, oficina, restaurante y más."
                  : "Simulate real situations in your field: healthcare, construction, office, restaurant, and more."}
              </p>
              <div
                className="mt-6 text-xs font-bold tracking-wide group-hover:text-white"
                style={{ color: "#2B5CE6" }}
              >
                {lang === "es" ? "SIMULACIÓN PROFESIONAL" : "PROFESSIONAL SIMULATION"}
              </div>
            </div>
          </Link>

          {/* Reading Card */}
          <Link href="/reading">
            <div
              className="p-8 group cursor-pointer transition-all hover:bg-black hover:text-white"
              style={{ backgroundColor: "#F0EDE6" }}
            >
              <div className="text-3xl mb-4">📄</div>
              <h3 className="text-xl font-bold mb-2">
                {lang === "es" ? "Lectura Profesional" : "Professional Reading"}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#888880" }}>
                {lang === "es"
                  ? "Emails, memos, reportes e instrucciones reales del trabajo. Lee, comprende y responde."
                  : "Real workplace emails, memos, reports, and instructions. Read, understand, and respond."}
              </p>
              <div
                className="mt-6 text-xs font-bold tracking-wide group-hover:text-white"
                style={{ color: "#2B5CE6" }}
              >
                {lang === "es" ? "LECTURA + COMPRENSIÓN" : "READING + COMPREHENSION"}
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Industry Selector */}
      <section className="px-6 max-w-7xl mx-auto mb-16">
        <div className="mb-8">
          <span className="editorial-label mb-3 block">
            {lang === "es" ? "Por Industria" : "By Industry"}
          </span>
          <h2 className="editorial-section-title">
            {lang === "es" ? "Tu industria.\nTu inglés." : "Your industry.\nYour English."}
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {INDUSTRIES.map((ind) => (
            <Link
              key={ind.id}
              href={`/dialogs?industry=${ind.id}`}
              className="flex items-center gap-2 px-4 py-2 border text-sm font-medium transition-all hover:bg-black hover:text-white hover:border-black"
              style={{ borderColor: "#D8D4CC" }}
            >
              <span>{ind.icon}</span>
              <span>{lang === "es" ? ind.labelEs : ind.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Manifesto Strip */}
      <section
        className="px-6 py-16 mb-0"
        style={{ backgroundColor: "#0A0A0A", color: "#F0EDE6" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <div className="text-5xl font-black mb-2" style={{ color: "#2B5CE6" }}>01</div>
              <h3 className="text-lg font-bold mb-2">
                {lang === "es" ? "Práctica real" : "Real Practice"}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#888880" }}>
                {lang === "es"
                  ? "Cada diálogo está basado en situaciones reales de trabajo, no ejercicios de gramática abstractos."
                  : "Every dialog is based on real work situations, not abstract grammar exercises."}
              </p>
            </div>
            <div>
              <div className="text-5xl font-black mb-2" style={{ color: "#2B5CE6" }}>02</div>
              <h3 className="text-lg font-bold mb-2">
                {lang === "es" ? "Tu industria" : "Your Industry"}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#888880" }}>
                {lang === "es"
                  ? "Aprende el inglés específico de tu oficio: salud, construcción, tecnología, restaurante y más."
                  : "Learn the English specific to your trade: healthcare, construction, technology, restaurant, and more."}
              </p>
            </div>
            <div>
              <div className="text-5xl font-black mb-2" style={{ color: "#2B5CE6" }}>03</div>
              <h3 className="text-lg font-bold mb-2">
                {lang === "es" ? "Confianza profesional" : "Professional Confidence"}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#888880" }}>
                {lang === "es"
                  ? "Con cada práctica, construyes la confianza para comunicarte con fluidez en tu lugar de trabajo."
                  : "With each practice session, you build the confidence to communicate fluently in your workplace."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-8 border-t"
        style={{ borderColor: "#D8D4CC", backgroundColor: "#F0EDE6" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <span className="text-sm font-bold tracking-tight">
            Practica<span style={{ color: "#2B5CE6" }}>English</span>
          </span>
          <p className="text-xs" style={{ color: "#888880" }}>
            {lang === "es"
              ? "No estudiamos inglés. Lo practicamos."
              : "We don't study English. We practice it."}
          </p>
        </div>
      </footer>
    </div>
  );
}
