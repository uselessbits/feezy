import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const supportedLanguages = [
  { label: 'EN', value: 'en' },
  { label: 'RO', value: 'ro' },
];

void i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        nav: { home: 'Home', chapters: 'Chapters', practice: 'Practice' },
        brand: { tagline: 'Physics quests for baccalaureate prep' },
        home: {
          eyebrow: 'Romanian high school physics',
          railTitle: 'Chapter directory',
          railBody: 'Navigate through all available lessons and chapters.',
          stageEyebrow: 'Learn physics at your own pace',
          title: 'Learn physics chapter by chapter, like a quest.',
          lead: 'A static, bilingual learning platform for the Romanian baccalaureate curriculum, with reusable lessons, quizzes, and progress tracking.',
          primaryCta: 'Start learning',
          secondaryCta: 'Practice mode',
          feature1Title: 'Interactive Practice',
          feature1Body: 'Solve quizzes and physics problems, earn XP, and level up your mastery.',
          feature2Title: 'Visual Simulations',
          feature2Body: 'Toggle DC circuits, heat up gas pistons, and slide blocks down inclined planes to see formulas in action.',
          feature3Title: 'Baccalaureate Focused',
          feature3Body: 'Curriculum structured according to official Romanian physics syllabus specifications.',
        },
        practice: {
          title: 'Quest mode',
          body: 'Practice blocks will unlock after each lesson, turning theory into short challenge chains.',
          note: 'This POC includes the structure for quest progression and future scoring.',
        },
        footer: { copy: 'Feezy Physics is open-source and donation-friendly.' },
      },
    },
    ro: {
      translation: {
        nav: { home: 'Acasă', chapters: 'Capitole', practice: 'Practică' },
        brand: { tagline: 'Misiuni de fizică pentru bacalaureat' },
        home: {
          eyebrow: 'Fizică pentru liceu în România',
          railTitle: 'Directorul capitolelor',
          railBody: 'Navigați prin toate lecțiile și capitolele disponibile.',
          stageEyebrow: 'Învață fizica cu ritmul tău',
          title: 'Învață fizica pe capitole, ca într-un joc.',
          lead: 'O platformă statică, bilingvă, pentru programa de bacalaureat, cu lecții reutilizabile, quiz-uri și progres.',
          primaryCta: 'Începe să înveți',
          secondaryCta: 'Mod practică',
          feature1Title: 'Practică Interactivă',
          feature1Body: 'Rezolvă teste și probleme de fizică, adună puncte de experiență (XP) și crește în nivel.',
          feature2Title: 'Simulări Vizuale',
          feature2Body: 'Modifică circuite electrice, încălzește pistoane cu gaz și simulează planuri înclinate pentru a vedea legile fizicii.',
          feature3Title: 'Orientat pe Bacalaureat',
          feature3Body: 'Conținut structurat special conform programei oficiale pentru examenul de fizică.',
        },
        practice: {
          title: 'Modul misiune',
          body: 'Blocurile de practică se vor debloca după fiecare lecție și vor transforma teoria în provocări scurte.',
          note: 'Acest POC include structura pentru progres și punctaj viitor.',
        },
        footer: { copy: 'Feezy Physics este open-source și orientat spre donații.' },
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;