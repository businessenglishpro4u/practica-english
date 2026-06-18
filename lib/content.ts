// Core content data for PracticaEnglish app

export type Industry =
  | "healthcare"
  | "construction"
  | "restaurant"
  | "office"
  | "retail"
  | "technology"
  | "logistics"
  | "education"
  | "hospitality"
  | "manufacturing";

export type SkillType = "speaking" | "listening" | "reading" | "vocabulary";

export interface Dialog {
  id: string;
  title: string;
  titleEs: string;
  industry: Industry;
  level: "beginner" | "intermediate" | "advanced";
  lines: DialogLine[];
  vocabulary: VocabItem[];
  culturalNote?: string;
  culturalNoteEs?: string;
}

export interface DialogLine {
  speaker: string;
  role: string;
  roleEs: string;
  text: string;
  textEs: string;
  tip?: string;
  tipEs?: string;
}

export interface VocabItem {
  word: string;
  pronunciation: string;
  definitionEn: string;
  definitionEs: string;
  example: string;
}

export interface RoleplayScenario {
  id: string;
  title: string;
  titleEs: string;
  industry: Industry;
  role: string;
  roleEs: string;
  situation: string;
  situationEs: string;
  objective: string;
  objectiveEs: string;
  keyPhrases: string[];
  keyPhrasesEs: string[];
  steps: ScenarioStep[];
}

export interface ScenarioStep {
  prompt: string;
  promptEs: string;
  sampleResponse: string;
  sampleResponseEs: string;
}

export interface ReadingExercise {
  id: string;
  title: string;
  titleEs: string;
  industry: Industry;
  type: "email" | "memo" | "report" | "procedure" | "notice";
  content: string;
  contentEs: string;
  questions: ReadingQuestion[];
}

export interface ReadingQuestion {
  question: string;
  questionEs: string;
  options: string[];
  correct: number;
}

export const INDUSTRIES: { id: Industry; label: string; labelEs: string; icon: string }[] = [
  { id: "healthcare", label: "Healthcare", labelEs: "Salud", icon: "🏥" },
  { id: "construction", label: "Construction", labelEs: "Construcción", icon: "🏗️" },
  { id: "restaurant", label: "Restaurant", labelEs: "Restaurante", icon: "🍽️" },
  { id: "office", label: "Office & Admin", labelEs: "Oficina", icon: "🏢" },
  { id: "retail", label: "Retail", labelEs: "Comercio", icon: "🛍️" },
  { id: "technology", label: "Technology", labelEs: "Tecnología", icon: "💻" },
  { id: "logistics", label: "Logistics", labelEs: "Logística", icon: "📦" },
  { id: "education", label: "Education", labelEs: "Educación", icon: "🎓" },
  { id: "hospitality", label: "Hotel & Tourism", labelEs: "Hotelería", icon: "🏨" },
  { id: "manufacturing", label: "Manufacturing", labelEs: "Manufactura", icon: "⚙️" },
];
