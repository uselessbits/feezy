# Contributing to Feezy Physics

Thank you for your interest in contributing to Feezy Physics! This platform is built to make physics interactive, intuitive, and accessible to high school students preparing for their baccalaureate.

As an open-source project, we welcome contributions of all kinds: content expansion, bug fixes, UI improvements, and new interactive simulations.

---

## Codebase Architecture

Feezy is a static React application built with TypeScript, Vite, and Ant Design. It does not require a database; progress is stored in the browser's `localStorage`, making deployment to services like GitHub Pages simple and free.

```
├── public/                 # Static assets
└── src/
    ├── components/         # Reusable UI components
    │   ├── Formula.tsx           # KaTeX math formula renderer
    │   ├── PhysicsChart.tsx      # Recharts plotting wrapper
    │   ├── PhysicsSimulation.tsx # Interactive simulations (inclined plane, piston, circuits)
    │   └── PracticePage.tsx      # Quest dashboard and runner
    ├── data/               # Structured learning curriculum
    │   ├── chapters/             # Subject content data files
    │   │   ├── mechanics.ts
    │   │   ├── thermodynamics.ts
    │   │   └── currentElectricity.ts
    │   ├── curriculum.ts         # Index loading all chapters
    │   ├── quests.ts             # Practice mode questions data
    │   └── types.ts              # TypeScript interface schemas
    ├── styles/             # Application styles (global.css)
    ├── App.tsx             # Routing and main shell layout
    ├── i18n.ts             # Bilingual translations (EN & RO)
    └── main.tsx            # React application mount
```

---

## How to Contribute Content

### 1. Adding a New Chapter or Lesson
All lessons and sections are defined as static TypeScript data.
To add or modify curriculum content:
1. Check the type definitions in `src/data/types.ts` (`Chapter`, `Lesson`, `LessonSection`).
2. Add a new file in `src/data/chapters/` (e.g. `optics.ts`) conforming to the `Chapter` interface:
   ```typescript
   import type { Chapter } from '../types';

   export const optics: Chapter = {
     id: 'optics',
     code: '4',
     title: { en: 'Optics', ro: 'Optică' },
     summary: { en: 'Reflection, refraction, lenses, and mirrors.', ro: 'Reflexie, refracție, lentile și oglinzi.' },
     pageRefs: [22, 23],
     lessons: [ ... ]
   };
   ```
3. Import and add your chapter to the list in `src/data/curriculum.ts`.
4. Ensure all text properties provide bilingual support for English (`en`) and Romanian (`ro`).

### 2. Adding Practice Questions
Each chapter has an associated Quest chain. To add questions to a chapter:
1. Open `src/data/quests.ts`.
2. Locate the chapter's quest entry, or create a new one conforming to the `ChapterQuest` interface.
3. Append your question. We support two question types:
   - **Multiple Choice**:
     ```typescript
     {
       id: 'optics-q1',
       type: 'multiple-choice',
       question: { en: 'Which lens converges parallel rays?', ro: 'Care lentilă converge razele paralele?' },
       options: {
         en: ['Convex lens', 'Concave lens', 'Flat glass', 'Diverging lens'],
         ro: ['Lentilă convexă', 'Lentilă concavă', 'Sticlă plană', 'Lentilă divergentă']
       },
       correctOptionIndex: 0,
       explanation: {
         en: 'A convex lens is thicker in the middle and bends parallel light rays inward to a focal point.',
         ro: 'O lentilă convexă este mai groasă în mijloc și deviază razele de lumină paralele spre interior, într-un punct focal.'
       }
     }
     ```
   - **Numerical Input**:
     ```typescript
     {
       id: 'optics-q2',
       type: 'numerical',
       question: { en: 'Find focal power in diopters for a lens with focal length $f = 0.5\\text{ m}$.', ro: 'Aflați puterea focală în dioptrii pentru o lentilă cu distanța focală $f = 0,5\\text{ m}$.' },
       correctValue: 2,
       tolerance: 0.05,
       unit: 'm⁻¹',
       explanation: {
         en: 'Focal power is the reciprocal of focal length: $P = 1/f = 1/0.5 = 2\\text{ diopters}$.',
         ro: 'Puterea focală este inversul distanței focale: $P = 1/f = 1/0,5 = 2\\text{ dioptrii}$.'
       }
     }
     ```

### 3. Creating a New Simulation
Interactive simulations are embedded directly within lesson sections:
1. In your chapter file, add the simulation identifier to the section:
   ```typescript
   simulation: 'lens-simulator'
   ```
2. Register your new simulation type in `src/data/types.ts`:
   ```typescript
   export type SimulationType = 'inclined-plane' | 'piston-gas' | 'electric-circuit' | 'lens-simulator';
   ```
3. Open `src/components/PhysicsSimulation.tsx` and implement the rendering layout and logic inside the component. We recommend using inline responsive SVGs for rendering diagrams and vectors, or Canvas for particle animation.

---

## Local Development Setup

To test your changes locally:
1. Make sure you have Node.js installed.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Verify compiling and linting before submitting a Pull Request:
   ```bash
   npm run build
   ```
