"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { INDUSTRIES } from "@/lib/content";
import type { Industry } from "@/lib/content";
import type { LearnerProfile } from "@/lib/store";

// ─── Types ────────────────────────────────────────────────────────────────────
type Step = "welcome" | "name" | "industry" | "role" | "level" | "goal" | "done";

// ─── Step labels ──────────────────────────────────────────────────────────────
const STEPS: Step[] = ["welcome", "name", "industry", "role", "level", "goal", "done"];

const LEVELS = [
  { id: "beginner"     as const, en: "Beginner",     es: "Básico",      desc: "I know little English", descEs: "Sé poco inglés" },
  { id: "intermediate" as const, en: "Intermediate", es: "Intermedio",  desc: "I can hold basic conversations", descEs: "Puedo tener conversaciones básicas" },
  { id: "advanced"     as const, en: "Advanced",     es: "Avanzado",    desc: "I want to refine professional vocabulary", descEs: "Quiero refinar vocabulario profesional" },
];

const ROLE_SUGGESTIONS: Record<Industry, string[]> = {
  healthcare:    ["Nurse / Enfermero(a)", "Medical Assistant", "CNA", "Phlebotomist", "Home Health Aide", "Dental Assistant"],
  construction:  ["Carpenter / Carpintero", "Electrician / Electricista", "Plumber / Plomero", "Foreman / Capataz", "Project Manager", "Laborer"],
  restaurant:    ["Server / Mesero(a)", "Cook / Cocinero(a)", "Sous Chef", "Dishwasher", "Host / Hostess", "Manager"],
  office:        ["Administrative Assistant", "Receptionist", "Office Manager", "HR Coordinator", "Accountant", "Team Lead"],
  retail:        ["Sales Associate", "Cashier", "Shift Supervisor", "Store Manager", "Visual Merchandiser", "Loss Prevention"],
  technology:    ["Software Developer", "QA Engineer", "IT Support", "Network Admin", "Product Manager", "Data Analyst"],
  logistics:     ["Warehouse Associate", "Forklift Operator", "Driver / Conductor", "Logistics Coordinator", "Dispatcher", "Receiving Clerk"],
  education:     ["Teacher / Maestro(a)", "Teacher's Aide", "Substitute Teacher", "School Counselor", "Principal", "Special Ed Teacher"],
  hospitality:   ["Front Desk Agent", "Housekeeper / Camarero(a)", "Concierge", "Bellhop", "Banquet Server", "Hotel Manager"],
  manufacturing: ["Machine Operator", "Quality Inspector", "Assembly Worker", "Maintenance Tech", "Production Supervisor", "Process Engineer"],
};

// ─── Shared styles ────────────────────────────────────────────────────────────
const S = {
  page:  { minHeight: "100vh", background: "#F0EDE6", color: "#0A0A0A", fontFamily: "var(--font-inter, sans-serif)" } as React.CSSProperties,
  card:  { maxWidth: 560, margin: "0 auto", padding: "40px 24px 60px" } as React.CSSProperties,
  label: { fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#888880" },
  input: { width: "100%", background: "#E8E4DC", border: "2px solid #D8D4CC", padding: "12px 16px", fontSize: 15, fontWeight: 500, color: "#0A0A0A", outline: "none", borderRadius: 2 } as React.CSSProperties,
  btn:   (primary: boolean): React.CSSProperties => ({ padding: "12px 28px", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", border: primary ? "none" : "2px solid #0A0A0A", background: primary ? "#0A0A0A" : "transparent", color: primary ? "#F0EDE6" : "#0A0A0A", borderRadius: 2 }),
};

// ─── Progress dots ────────────────────────────────────────────────────────────
function StepDots({ current }: { current: Step }) {
  const active = STEPS.indexOf(current);
  const total  = STEPS.length - 1; // exclude "done"
  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 40 }}>
      {STEPS.slice(0, total).map((_, i) => (
        <div key={i} style={{ width: i === active ? 20 : 8, height: 8, background: i === active ? "#2B5CE6" : i < active ? "#0A0A0A" : "#D8D4CC", borderRadius: 4, transition: "all 0.2s" }} />
      ))}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const router  = useRouter();
  const { lang, toggleLang, profile, setProfile } = useAppStore();
  const es = lang === "es";

  const [step,     setStep]     = useState<Step>("welcome");
  const [name,     setName]     = useState(profile?.name ?? "");
  const [industry, setIndustry] = useState<Industry | "">(profile?.industry ?? "");
  const [role,     setRole]     = useState(profile?.role ?? "");
  const [level,    setLevel]    = useState<LearnerProfile["level"] | "">(profile?.level ?? "");
  const [goal,     setGoal]     = useState(profile?.goalEs ?? "");

  // Pre-fill if editing existing profile
  useEffect(() => {
    if (profile) { setStep("name"); }
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  function save() {
    if (!name || !industry || !role || !level) return;
    const goalMap: Record<string, { en: string; es: string }> = {
      "Quiero comunicarme mejor en el trabajo":        { en: "I want to communicate better at work",           es: "Quiero comunicarme mejor en el trabajo" },
      "Necesito el inglés para un ascenso":            { en: "I need English for a promotion",                 es: "Necesito el inglés para un ascenso" },
      "Quiero entender mejor a mis clientes":          { en: "I want to understand my customers better",       es: "Quiero entender mejor a mis clientes" },
      "Necesito el inglés para un nuevo trabajo":      { en: "I need English for a new job",                   es: "Necesito el inglés para un nuevo trabajo" },
      "Quiero hablar con más confianza":               { en: "I want to speak with more confidence",           es: "Quiero hablar con más confianza" },
    };
    const matched = goalMap[goal];
    setProfile({
      name: name.trim(),
      industry: industry as Industry,
      role: role.trim(),
      level: level as LearnerProfile["level"],
      goalEs: matched?.es ?? goal,
      goalEn: matched?.en ?? goal,
      onboarded: true,
    });
    setStep("done");
  }

  // ── Step renderers ──────────────────────────────────────────────────────────
  if (step === "welcome") return <WelcomeStep es={es} onStart={() => setStep("name")} toggleLang={toggleLang} />;
  if (step === "done")    return <DoneStep es={es} name={name} industry={industry as Industry} onGo={() => router.push("/")} />;

  return (
    <div style={S.page}>
      <nav style={{ borderBottom: "1px solid #D8D4CC", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#E8E4DC" }}>
        <Link href="/" style={{ fontSize: 13, fontWeight: 700, color: "#2B5CE6", letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none" }}>
          ← {es ? "Inicio" : "Home"}
        </Link>
        <span style={{ fontSize: 13, fontWeight: 900, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          {es ? "Mi Perfil" : "My Profile"}
        </span>
        <button onClick={toggleLang} style={{ background: "#0A0A0A", color: "#F0EDE6", border: "none", padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: "0.06em" }}>
          {lang.toUpperCase()}
        </button>
      </nav>

      <div style={S.card}>
        <StepDots current={step} />

        {step === "name" && (
          <NameStep es={es} value={name} onChange={setName}
            onNext={() => name.trim() ? setStep("industry") : null}
            onBack={() => setStep("welcome")}
          />
        )}
        {step === "industry" && (
          <IndustryStep es={es} value={industry} onChange={(v) => { setIndustry(v); setRole(""); }}
            onNext={() => industry ? setStep("role") : null}
            onBack={() => setStep("name")}
          />
        )}
        {step === "role" && industry && (
          <RoleStep es={es} industry={industry as Industry} value={role} onChange={setRole}
            onNext={() => role.trim() ? setStep("level") : null}
            onBack={() => setStep("industry")}
          />
        )}
        {step === "level" && (
          <LevelStep es={es} value={level} onChange={setLevel}
            onNext={() => level ? setStep("goal") : null}
            onBack={() => setStep("role")}
          />
        )}
        {step === "goal" && (
          <GoalStep es={es} value={goal} onChange={setGoal}
            onNext={save}
            onBack={() => setStep("level")}
          />
        )}
      </div>
    </div>
  );
}

// ─── Step components ──────────────────────────────────────────────────────────

function WelcomeStep({ es, onStart, toggleLang }: { es: boolean; onStart: () => void; toggleLang: () => void }) {
  return (
    <div style={{ minHeight: "100vh", background: "#F0EDE6", fontFamily: "var(--font-inter, sans-serif)" }}>
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "80px 24px 60px", textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888880", marginBottom: 24 }}>
          {es ? "Bienvenido a" : "Welcome to"}
        </div>
        <h1 style={{ fontSize: "clamp(3rem,10vw,5.5rem)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.04em", marginBottom: 32 }}>
          Practica<span style={{ color: "#2B5CE6" }}>English</span>
        </h1>
        <p style={{ fontSize: 15, color: "#888880", lineHeight: 1.7, marginBottom: 48, maxWidth: 400, margin: "0 auto 48px" }}>
          {es
            ? "Cuéntanos un poco sobre ti para personalizar tu experiencia de práctica."
            : "Tell us a little about yourself to personalize your practice experience."}
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={onStart} style={S.btn(true)}>
            {es ? "Crear mi Perfil →" : "Create My Profile →"}
          </button>
          <button onClick={toggleLang} style={{ ...S.btn(false), fontSize: 12 }}>
            {es ? "Switch to English" : "Cambiar a Español"}
          </button>
        </div>
      </div>
    </div>
  );
}

function NameStep({ es, value, onChange, onNext, onBack }: { es: boolean; value: string; onChange: (v: string) => void; onNext: () => void; onBack: () => void }) {
  return (
    <div>
      <div style={S.label}>{es ? "Paso 1 — Tu Nombre" : "Step 1 — Your Name"}</div>
      <h2 style={{ fontSize: "clamp(1.5rem,4vw,2.2rem)", fontWeight: 900, letterSpacing: "-0.03em", margin: "12px 0 32px" }}>
        {es ? "¿Cómo te llamas?" : "What's your name?"}
      </h2>
      <input
        style={S.input}
        placeholder={es ? "Tu nombre o apodo..." : "Your name or nickname..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onNext()}
        autoFocus
      />
      <NavButtons es={es} onNext={onNext} onBack={onBack} nextDisabled={!value.trim()} />
    </div>
  );
}

function IndustryStep({ es, value, onChange, onNext, onBack }: { es: boolean; value: Industry | ""; onChange: (v: Industry) => void; onNext: () => void; onBack: () => void }) {
  return (
    <div>
      <div style={S.label}>{es ? "Paso 2 — Tu Industria" : "Step 2 — Your Industry"}</div>
      <h2 style={{ fontSize: "clamp(1.5rem,4vw,2.2rem)", fontWeight: 900, letterSpacing: "-0.03em", margin: "12px 0 8px" }}>
        {es ? "¿En qué industria trabajas?" : "What industry do you work in?"}
      </h2>
      <p style={{ fontSize: 13, color: "#888880", marginBottom: 28 }}>
        {es ? "Tus diálogos y actividades se mostrarán primero para esta industria." : "Your dialogs and activities will be shown first for this industry."}
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8, marginBottom: 32 }}>
        {INDUSTRIES.map((ind) => (
          <button
            key={ind.id}
            onClick={() => onChange(ind.id)}
            style={{ padding: "14px 12px", textAlign: "left", background: value === ind.id ? "#0A0A0A" : "#E8E4DC", border: `2px solid ${value === ind.id ? "#0A0A0A" : "#D8D4CC"}`, color: value === ind.id ? "#F0EDE6" : "#0A0A0A", cursor: "pointer", borderRadius: 2, transition: "all 0.15s" }}
          >
            <div style={{ fontSize: 20, marginBottom: 4 }}>{ind.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 700 }}>{es ? ind.labelEs : ind.label}</div>
          </button>
        ))}
      </div>
      <NavButtons es={es} onNext={onNext} onBack={onBack} nextDisabled={!value} />
    </div>
  );
}

function RoleStep({ es, industry, value, onChange, onNext, onBack }: { es: boolean; industry: Industry; value: string; onChange: (v: string) => void; onNext: () => void; onBack: () => void }) {
  const suggestions = ROLE_SUGGESTIONS[industry] ?? [];
  return (
    <div>
      <div style={S.label}>{es ? "Paso 3 — Tu Puesto" : "Step 3 — Your Role"}</div>
      <h2 style={{ fontSize: "clamp(1.5rem,4vw,2.2rem)", fontWeight: 900, letterSpacing: "-0.03em", margin: "12px 0 8px" }}>
        {es ? "¿Cuál es tu puesto o cargo?" : "What is your job title or role?"}
      </h2>
      <p style={{ fontSize: 13, color: "#888880", marginBottom: 20 }}>
        {es ? "Escribe tu puesto o selecciona uno de la lista." : "Type your role or pick from the list."}
      </p>
      <input
        style={{ ...S.input, marginBottom: 14 }}
        placeholder={es ? "Ej: Enfermero, Carpintero, Mesero..." : "e.g. Nurse, Carpenter, Server..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onNext()}
        autoFocus
      />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => onChange(s)}
            style={{ padding: "6px 12px", fontSize: 12, fontWeight: 600, background: value === s ? "#2B5CE6" : "#E8E4DC", border: `1.5px solid ${value === s ? "#2B5CE6" : "#D8D4CC"}`, color: value === s ? "#fff" : "#0A0A0A", cursor: "pointer", borderRadius: 2 }}
          >
            {s}
          </button>
        ))}
      </div>
      <NavButtons es={es} onNext={onNext} onBack={onBack} nextDisabled={!value.trim()} />
    </div>
  );
}

function LevelStep({ es, value, onChange, onNext, onBack }: { es: boolean; value: string; onChange: (v: LearnerProfile["level"]) => void; onNext: () => void; onBack: () => void }) {
  return (
    <div>
      <div style={S.label}>{es ? "Paso 4 — Tu Nivel" : "Step 4 — Your Level"}</div>
      <h2 style={{ fontSize: "clamp(1.5rem,4vw,2.2rem)", fontWeight: 900, letterSpacing: "-0.03em", margin: "12px 0 28px" }}>
        {es ? "¿Cuál es tu nivel de inglés?" : "What is your English level?"}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
        {LEVELS.map((lv) => (
          <button
            key={lv.id}
            onClick={() => onChange(lv.id)}
            style={{ padding: "16px 20px", textAlign: "left", background: value === lv.id ? "#0A0A0A" : "#E8E4DC", border: `2px solid ${value === lv.id ? "#0A0A0A" : "#D8D4CC"}`, color: value === lv.id ? "#F0EDE6" : "#0A0A0A", cursor: "pointer", borderRadius: 2, transition: "all 0.15s" }}
          >
            <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 2 }}>{es ? lv.es : lv.en}</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>{es ? lv.descEs : lv.desc}</div>
          </button>
        ))}
      </div>
      <NavButtons es={es} onNext={onNext} onBack={onBack} nextDisabled={!value} />
    </div>
  );
}

function GoalStep({ es, value, onChange, onNext, onBack }: { es: boolean; value: string; onChange: (v: string) => void; onNext: () => void; onBack: () => void }) {
  const goals = [
    "Quiero comunicarme mejor en el trabajo",
    "Necesito el inglés para un ascenso",
    "Quiero entender mejor a mis clientes",
    "Necesito el inglés para un nuevo trabajo",
    "Quiero hablar con más confianza",
  ];
  const goalsEn = [
    "I want to communicate better at work",
    "I need English for a promotion",
    "I want to understand my customers better",
    "I need English for a new job",
    "I want to speak with more confidence",
  ];
  const labels = es ? goals : goalsEn;
  return (
    <div>
      <div style={S.label}>{es ? "Paso 5 — Tu Meta" : "Step 5 — Your Goal"}</div>
      <h2 style={{ fontSize: "clamp(1.5rem,4vw,2.2rem)", fontWeight: 900, letterSpacing: "-0.03em", margin: "12px 0 28px" }}>
        {es ? "¿Por qué estás practicando inglés?" : "Why are you practicing English?"}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 32 }}>
        {labels.map((g, i) => (
          <button
            key={i}
            onClick={() => onChange(goals[i])}
            style={{ padding: "14px 18px", textAlign: "left", fontWeight: 600, fontSize: 14, background: value === goals[i] ? "#2B5CE6" : "#E8E4DC", border: `2px solid ${value === goals[i] ? "#2B5CE6" : "#D8D4CC"}`, color: value === goals[i] ? "#fff" : "#0A0A0A", cursor: "pointer", borderRadius: 2, transition: "all 0.15s" }}
          >
            {g}
          </button>
        ))}
      </div>
      <NavButtons es={es} onNext={onNext} onBack={onBack} nextDisabled={!value} isLast />
    </div>
  );
}

function DoneStep({ es, name, industry, onGo }: { es: boolean; name: string; industry: Industry; onGo: () => void }) {
  const ind = INDUSTRIES.find((i) => i.id === industry);
  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-inter, sans-serif)" }}>
      <div style={{ maxWidth: 520, padding: "60px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888880", marginBottom: 24 }}>
          {es ? "Perfil creado" : "Profile created"}
        </div>
        <h1 style={{ fontSize: "clamp(2.5rem,8vw,4.5rem)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.04em", color: "#F0EDE6", marginBottom: 24 }}>
          {es ? `¡Listo,\n${name}!` : `Ready,\n${name}!`}
        </h1>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, border: "1.5px solid #2B5CE6", padding: "8px 18px", marginBottom: 40 }}>
          <span style={{ fontSize: 18 }}>{ind?.icon}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#2B5CE6", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            {es ? ind?.labelEs : ind?.label}
          </span>
        </div>
        <p style={{ fontSize: 14, color: "#888880", lineHeight: 1.7, marginBottom: 48 }}>
          {es
            ? `Tu experiencia está personalizada para ${ind?.labelEs}. Tus diálogos, roleplay y actividades de lectura mostrarán primero el contenido de tu industria.`
            : `Your experience is personalized for ${ind?.label}. Your dialogs, roleplay, and reading activities will show your industry content first.`}
        </p>
        <button onClick={onGo} style={{ ...S.btn(false), background: "#F0EDE6", color: "#0A0A0A", border: "none", padding: "14px 36px", fontSize: 14 }}>
          {es ? "Empezar a Practicar →" : "Start Practicing →"}
        </button>
      </div>
    </div>
  );
}

function NavButtons({ es, onNext, onBack, nextDisabled, isLast }: { es: boolean; onNext: () => void; onBack: () => void; nextDisabled: boolean; isLast?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
      <button onClick={onBack} style={S.btn(false)}>{es ? "← Atrás" : "← Back"}</button>
      <button onClick={onNext} disabled={nextDisabled} style={{ ...S.btn(true), opacity: nextDisabled ? 0.4 : 1, cursor: nextDisabled ? "not-allowed" : "pointer" }}>
        {isLast ? (es ? "Guardar Perfil ✓" : "Save Profile ✓") : (es ? "Siguiente →" : "Next →")}
      </button>
    </div>
  );
}
