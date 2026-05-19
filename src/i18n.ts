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
          cardTitle: 'Start with the core curriculum',
          cardBody: 'Mechanics, thermodynamics, and current electricity are already modeled from the source PDF and ready to expand.',
          cardMeta: 'Built for GitHub Pages and future open-source contributions.',
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
          cardTitle: 'Începe cu programa de bază',
          cardBody: 'Mecanica, termodinamica și curentul continuu sunt deja modelate din PDF și pot fi extinse.',
          cardMeta: 'Gândit pentru GitHub Pages și contribuții open-source.',
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