export type Language = 'en' | 'ro';

export type LocalizedText = Record<Language, string>;
export type LocalizedTextArray = Record<Language, string[]>;

export type ChartType = 'line' | 'bar' | 'scatter';

export interface ChartDataPoint {
  name?: string;
  [key: string]: string | number | undefined;
}

export interface SectionChart {
  type: ChartType;
  data: ChartDataPoint[];
  xKey: string;
  yKeys: string[];
  title?: LocalizedText;
  xLabel?: LocalizedText;
  yLabel?: LocalizedText;
}

export type ChapterId = 'mechanics' | 'thermodynamics' | 'current-electricity' | 'optics';

export type SimulationType = 'inclined-plane' | 'piston-gas' | 'electric-circuit' | 'refraction-optics' | 'lens-optics';

export interface LessonSection {
  title: LocalizedText;
  paragraphs: LocalizedTextArray;
  bullets?: LocalizedTextArray;
  formulas?: string[];
  charts?: SectionChart[];
  simulation?: SimulationType;
  pageRefs: number[];
}

export interface Lesson {
  id: string;
  code: string;
  title: LocalizedText;
  summary: LocalizedText;
  pageRefs: number[];
  objectives: LocalizedTextArray;
  sections: LessonSection[];
}

export interface Chapter {
  id: ChapterId;
  code: string;
  title: LocalizedText;
  summary: LocalizedText;
  pageRefs: number[];
  lessons: Lesson[];
}

export type QuestQuestionType = 'multiple-choice' | 'numerical';

export interface QuestQuestion {
  id: string;
  type: QuestQuestionType;
  question: LocalizedText;
  options?: LocalizedTextArray;
  correctOptionIndex?: number;
  correctValue?: number;
  tolerance?: number;
  unit?: string;
  explanation: LocalizedText;
}

export interface ChapterQuest {
  chapterId: ChapterId;
  questions: QuestQuestion[];
}