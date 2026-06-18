"use client";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { DIALOGS } from "@/lib/dialogs";
import { INDUSTRIES } from "@/lib/content";
import { QUIZZES } from "@/lib/quizzes";

// ─── Reading exercises count (synced with reading page) ───────────────────────
const TOTAL_READINGS = 3;
const TOTAL_SCENARIOS = 4; // placeholder from store context

// ─── Badge definitions ────────────────────────────────────────────────────────
type Badge = {
  id: string;
  icon: string;
  label: string;
  labelEs: string;
  desc: string;
  descEs: string;
  check: (s: { completedDialogs: string[]; completedScenarios: string[]; completedReadings: string[]; practiceStreak: number }) => boolean;
};

const BADGES: Badge[] = [
  {
    id: "first-steps",
    icon: "🌱",
    label: "First Steps",
    labelEs: "Primeros Pasos",
    desc: "Complete your first activity",
    descEs: "Completa tu primera actividad",
    check: (s) => s.completedDialogs.length + s.completedScenarios.length + s.completedReadings.length >= 1,
  },
  {
    id: "daily-practitioner",
    icon: "🔥",
    label: "Daily Practitioner",
    labelEs: "Practicante Diario",
    desc: "Reach a 3-day streak",
    descEs: "Logra una racha de 3 días",
    check: (s) => s.practiceStreak >= 3,
  },
  {
    id: "industry-expert",
    icon: "🏆",
    label: "Industry Expert",
    labelEs: "Experto en Industria",
    desc: "Complete 5 activities",
    descEs: "Completa 5 actividades",
    check: (s) => s.completedDialogs.length + s.completedScenarios.length + s.completedReadings.length >= 5,
  },
  {
    id: "word-power",
    icon: "📖",
    label: "Word Power",
    labelEs: "Poder de Palabras",
    desc: "Complete 3 reading exercises",
    descEs: "Completa 3 ejercicios de lectura",
    check: (s) => s.completedReadings.length >= 3,
  },
];

// ─── Stat callout ─────────────────────────────────────────────────────────────
function StatBox({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="border border-[#D8D4CC] p-6 flex-1" style={{ background: "#E8E4DC" }}>
      <div className="text-5xl font-black tracking-tighter text-[#0A0A0A] leading-none mb-2">{value}</div>
      <div className="text-xs font-bold tracking-widest uppercase text-[#888880]">{label}</div>
    </div>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ProgressRow({ label, completed, total }: { label: string; completed: number; total: number }) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-sm font-semibold">{label}</span>
        <span className="text-xs text-[#888880]">{completed} / {total}</span>
      </div>
      <div className="h-2 border border-[#D8D4CC]" style={{ background: "#D8D4CC" }}>
        <div className="h-full transition-all" style={{ width: `${pct}%`, background: "#2B5CE6" }} />
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { lang, toggleLang, completedDialogs, completedScenarios, completedReadings, quizResults, practiceStreak, totalXP, profile } = useAppStore();
  const profileInd = profile ? INDUSTRIES.find((i) => i.id === profile.industry) : null;

  const totalActivities = completedDialogs.length + completedScenarios.length + completedReadings.length;

  const T = {
    title: lang === "en" ? "My Progress" : "Mi Progreso",
    back: lang === "en" ? "← Back" : "← Atrás",
    streakLabel: lang === "en" ? "Day Streak" : "Días Seguidos",
    xpLabel: lang === "en" ? "Total XP" : "XP Total",
    activitiesLabel: lang === "en" ? "Completed" : "Completadas",
    progressTitle: lang === "en" ? "Progress by Category" : "Progreso por Categoría",
    dialogsLabel: lang === "en" ? "Dialogs" : "Diálogos",
    scenariosLabel: lang === "en" ? "Roleplay Scenarios" : "Escenarios de Roleplay",
    readingsLabel: lang === "en" ? "Reading Exercises" : "Ejercicios de Lectura",
    recentTitle: lang === "en" ? "Recent Activity" : "Actividad Reciente",
    badgesTitle: lang === "en" ? "Skill Badges" : "Insignias de Habilidad",
    nextTitle: lang === "en" ? "Next Recommended" : "Próxima Recomendada",
    nextCta: lang === "en" ? "Start Activity →" : "Iniciar Actividad →",
    noActivity: lang === "en" ? "No activity yet — start practicing!" : "Sin actividad aún — ¡empieza a practicar!",
    locked: lang === "en" ? "Locked" : "Bloqueado",
    earned: lang === "en" ? "Earned" : "Ganada",
    motivational: lang === "en"
      ? "Every word you learn opens a new door."
      : "Cada palabra que aprendes abre una nueva puerta.",
  };

  // Recent activity: merge completed arrays with dialog/reading titles
  const recentItems: { id: string; title: string; type: string }[] = [
    ...completedDialogs.map((id) => {
      const d = DIALOGS.find((x) => x.id === id);
      return { id, title: lang === "en" ? d?.title ?? id : d?.titleEs ?? id, type: lang === "en" ? "Dialog" : "Diálogo" };
    }),
    ...completedReadings.map((id) => ({
      id,
      title: id,
      type: lang === "en" ? "Reading" : "Lectura",
    })),
    ...completedScenarios.map((id) => ({
      id,
      title: id,
      type: lang === "en" ? "Scenario" : "Escenario",
    })),
  ].slice(-5).reverse();

  // Next uncompleted dialog
  const nextDialog = DIALOGS.find((d) => !completedDialogs.includes(d.id));

  const badgeState = { completedDialogs, completedScenarios, completedReadings, practiceStreak };

  return (
    <div className="min-h-screen" style={{ background: "#F0EDE6", color: "#0A0A0A" }}>
      {/* Nav */}
      <nav className="border-b border-[#D8D4CC] px-6 py-4 flex items-center justify-between" style={{ background: "#E8E4DC" }}>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm text-[#888880] hover:text-[#0A0A0A] transition-colors">{T.back}</Link>
          <span className="font-bold text-lg tracking-tight">{T.title}</span>
        </div>
        <button
          onClick={toggleLang}
          className="border border-[#D8D4CC] px-3 py-1 text-xs font-bold tracking-widest hover:border-[#2B5CE6] hover:text-[#2B5CE6] transition-colors"
        >
          {lang === "en" ? "ES" : "EN"}
        </button>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">

        {/* Profile card */}
        {profile ? (
          <div className="border p-5 flex items-center justify-between gap-4 flex-wrap" style={{ borderColor: "#2B5CE6", background: "#E8E4DC" }}>
            <div className="flex items-center gap-4">
              <div className="text-3xl">{profileInd?.icon}</div>
              <div>
                <div className="font-black text-lg leading-tight">{profile.name}</div>
                <div className="text-xs font-bold tracking-wide mt-0.5" style={{ color: "#2B5CE6" }}>
                  {lang === "en" ? profileInd?.label : profileInd?.labelEs} · {profile.role}
                </div>
                <div className="text-xs italic mt-1" style={{ color: "#888880" }}>
                  &ldquo;{lang === "en" ? profile.goalEn : profile.goalEs}&rdquo;
                </div>
              </div>
            </div>
            <Link
              href="/profile"
              className="text-xs font-bold border px-3 py-2 uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
              style={{ borderColor: "#D8D4CC" }}
            >
              {lang === "en" ? "Edit Profile" : "Editar Perfil"}
            </Link>
          </div>
        ) : (
          <div className="border border-dashed p-5 flex items-center justify-between gap-4" style={{ borderColor: "#D8D4CC" }}>
            <p className="text-sm" style={{ color: "#888880" }}>
              {lang === "en" ? "No profile set — personalize your experience." : "Sin perfil — personaliza tu experiencia."}
            </p>
            <Link
              href="/profile"
              className="text-xs font-bold border px-3 py-2 uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
              style={{ borderColor: "#2B5CE6", color: "#2B5CE6" }}
            >
              {lang === "en" ? "Create Profile →" : "Crear Perfil →"}
            </Link>
          </div>
        )}

        {/* Hero stats */}
        <div className="flex gap-4">
          <StatBox value={`🔥 ${practiceStreak}`} label={T.streakLabel} />
          <StatBox value={totalXP} label={T.xpLabel} />
          <StatBox value={totalActivities} label={T.activitiesLabel} />
        </div>

        {/* Progress by category */}
        <div>
          <div className="text-xs font-bold tracking-widest uppercase text-[#888880] mb-4">{T.progressTitle}</div>
          <div className="border border-[#D8D4CC] p-6 space-y-5" style={{ background: "#E8E4DC" }}>
            <ProgressRow label={T.dialogsLabel} completed={completedDialogs.length} total={DIALOGS.length} />
            <ProgressRow label={T.scenariosLabel} completed={completedScenarios.length} total={TOTAL_SCENARIOS} />
            <ProgressRow label={T.readingsLabel} completed={completedReadings.length} total={TOTAL_READINGS} />
          </div>
        </div>

        {/* Recent activity */}
        <div>
          <div className="text-xs font-bold tracking-widest uppercase text-[#888880] mb-4">{T.recentTitle}</div>
          <div className="border border-[#D8D4CC]" style={{ background: "#E8E4DC" }}>
            {recentItems.length === 0 ? (
              <p className="p-6 text-sm text-[#888880]">{T.noActivity}</p>
            ) : (
              recentItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 px-5 py-3 border-b border-[#D8D4CC] last:border-b-0">
                  <span className="text-[#2B5CE6] font-bold">✓</span>
                  <span className="text-sm font-medium flex-1">{item.title}</span>
                  <span className="text-xs text-[#888880] uppercase tracking-wide">{item.type}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Badges */}
        <div>
          <div className="text-xs font-bold tracking-widest uppercase text-[#888880] mb-4">{T.badgesTitle}</div>
          <div className="grid grid-cols-2 gap-3">
            {BADGES.map((badge) => {
              const earned = badge.check(badgeState);
              return (
                <div
                  key={badge.id}
                  className="border p-4 flex gap-3 items-start"
                  style={{
                    borderColor: earned ? "#2B5CE6" : "#D8D4CC",
                    background: earned ? "#EEF2FF" : "#E8E4DC",
                    opacity: earned ? 1 : 0.55,
                  }}
                >
                  <span className="text-2xl" style={{ filter: earned ? "none" : "grayscale(1)" }}>{badge.icon}</span>
                  <div>
                    <div className="font-bold text-sm">
                      {lang === "en" ? badge.label : badge.labelEs}
                    </div>
                    <div className="text-xs text-[#888880] mt-0.5">
                      {lang === "en" ? badge.desc : badge.descEs}
                    </div>
                    <div className="text-xs font-bold tracking-widest uppercase mt-1" style={{ color: earned ? "#2B5CE6" : "#888880" }}>
                      {earned ? T.earned : T.locked}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next recommended */}
        {nextDialog && (
          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-[#888880] mb-4">{T.nextTitle}</div>
            <div className="border border-[#2B5CE6] p-5 flex items-center justify-between" style={{ background: "#E8E4DC" }}>
              <div>
                <div className="text-xs font-bold tracking-widest uppercase text-[#888880] mb-1">{nextDialog.industry}</div>
                <div className="font-bold text-base">{lang === "en" ? nextDialog.title : nextDialog.titleEs}</div>
              </div>
              <Link
                href="/dialogs"
                className="border border-[#2B5CE6] px-4 py-2 text-xs font-bold text-[#2B5CE6] tracking-wide hover:bg-[#2B5CE6] hover:text-white transition-colors whitespace-nowrap"
              >
                {T.nextCta}
              </Link>
            </div>
          </div>
        )}

        {/* Industry Quizzes */}
        <div>
          <div className="text-xs font-bold tracking-widest uppercase text-[#888880] mb-1">
            {lang === "en" ? "Industry Quizzes" : "Quizzes por Industria"}
          </div>
          <p className="text-xs text-[#888880] mb-4">
            {lang === "en"
              ? "Complete the quiz for each industry after practicing its dialogs, roleplay, and reading activities."
              : "Completa el quiz de cada industria después de practicar sus diálogos, roleplay y actividades de lectura."}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {QUIZZES.map((quiz) => {
              const ind = INDUSTRIES.find((i) => i.id === quiz.industry);
              const result = quizResults[quiz.industry];
              const passed = result?.passed ?? false;
              return (
                <div
                  key={quiz.industry}
                  className="border p-4 flex items-center justify-between gap-3"
                  style={{ borderColor: passed ? "#22863a" : "#D8D4CC", background: passed ? "#d4edda" : "#E8E4DC" }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">{ind?.icon}</span>
                      <span className="text-sm font-bold truncate">
                        {lang === "en" ? ind?.label : ind?.labelEs}
                      </span>
                    </div>
                    {result ? (
                      <div className="text-xs" style={{ color: passed ? "#22863a" : "#c0392b", fontWeight: 700 }}>
                        {result.score}/{result.total} ({result.pct}%) — {passed ? (lang === "en" ? "Passed ✓" : "Aprobado ✓") : (lang === "en" ? "Not yet" : "Aún no")}
                      </div>
                    ) : (
                      <div className="text-xs text-[#888880]">
                        {quiz.questions.length} {lang === "en" ? "questions · 70% to pass" : "preguntas · 70% para aprobar"}
                      </div>
                    )}
                  </div>
                  <Link
                    href={`/quiz/${quiz.industry}`}
                    className="text-xs font-bold px-3 py-2 whitespace-nowrap transition-colors"
                    style={{ border: `1.5px solid ${passed ? "#22863a" : "#2B5CE6"}`, color: passed ? "#22863a" : "#2B5CE6", background: "transparent", textDecoration: "none" }}
                  >
                    {result ? (lang === "en" ? "↩ Retry" : "↩ Reintentar") : (lang === "en" ? "Take Quiz →" : "Tomar Quiz →")}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Motivational footer */}
        <div className="border border-[#0A0A0A]" style={{ background: "#0A0A0A" }}>
          <p className="text-white text-2xl font-black tracking-tight leading-tight p-8">
            {T.motivational}
          </p>
        </div>
      </div>
    </div>
  );
}
