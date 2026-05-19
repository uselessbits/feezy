import type { Chapter } from '../types';

export const thermodynamics: Chapter = {
  id: 'thermodynamics',
  code: '2',
  title: { en: 'Thermodynamics', ro: 'Termodinamica' },
  summary: {
    en: 'Heat, work, and the laws of thermodynamics.',
    ro: 'Caldura, lucru si legile termodinamicii.',
  },
  pageRefs: [10, 11, 12, 13, 14, 15, 16, 17],
  lessons: [
    {
      id: 'basics',
      code: '2.1',
      title: { en: 'Thermodynamic Basics', ro: 'Notiuni Fundamentale' },
      summary: {
        en: 'Matter structure, state parameters, and gas transformations.',
        ro: 'Structura materiei, parametri de stare si transformari de gaze.',
      },
      pageRefs: [10, 11],
      objectives: {
        en: ['Understand atomic structure', 'Apply ideal gas law', 'Analyze gas processes'],
        ro: ['Intelegeti structura atomica', 'Aplicati legea gazelor ideale', 'Analizati procesele de gaze'],
      },
      sections: [
        {
          title: { en: 'Structure of matter', ro: 'Structura materiei' },
          pageRefs: [10],
          paragraphs: {
            en: [
              'Matter consists of atoms and molecules held together by electromagnetic forces.',
              'The three states of matter are solid, liquid, and gas.',
            ],
            ro: [
              'Materia consta din atomi si molecule legate de forte electromagnetice.',
              'Trei stari ale materiei sunt solid, lichid si gaz.',
            ],
          },
          formulas: ['N = n · N_A'],
        },
        {
          title: { en: 'State parameters', ro: 'Parametri de stare' },
          pageRefs: [11],
          paragraphs: {
            en: [
              'Pressure, volume, and temperature define the state of a gas.',
              'The ideal gas law relates these parameters: PV = nRT.',
            ],
            ro: [
              'Presiunea, volumul si temperatura definesc starea unui gaz.',
              'Legea gazelor ideale leaga acesti parametri: PV = nRT.',
            ],
          },
          formulas: ['PV = nRT', 'P = ρRT/M', 'p1V1/T1 = p2V2/T2'],
        },
      ],
    },
    {
      id: 'work-energy',
      code: '2.2',
      title: { en: 'Work and Thermodynamic Energy', ro: 'Lucru si Energie Termica' },
      summary: {
        en: 'Work done by gases and internal energy.',
        ro: 'Lucrul efectuat de gaze si energia interna.',
      },
      pageRefs: [12, 13],
      objectives: {
        en: ['Calculate work in thermodynamic processes', 'Understand internal energy', 'Apply energy conservation'],
        ro: ['Calculati lucrul in procese termodinamice', 'Intelegeti energia interna', 'Aplicati conservarea energiei'],
      },
      sections: [
        {
          title: { en: 'Work in thermodynamics', ro: 'Lucru in termodinamica' },
          pageRefs: [12],
          paragraphs: {
            en: [
              'Work done by a gas equals pressure times change in volume.',
              'In an isobaric process, pressure remains constant.',
            ],
            ro: [
              'Lucrul efectuat de un gaz este presiunea inmultit cu variatea volumului.',
              'Intr-un proces izobar, presiunea ramane constanta.',
            ],
          },
          formulas: ['W = P·ΔV', 'W = nR·ΔT'],
        },
        {
          title: { en: 'Internal energy', ro: 'Energia interna' },
          pageRefs: [13],
          paragraphs: {
            en: [
              'Internal energy is the total kinetic and potential energy of particles.',
              'For an ideal gas, internal energy depends only on temperature.',
            ],
            ro: [
              'Energia interna este energia cinetica si potentiala totala a particulelor.',
              'Pentru un gaz ideal, energia interna depinde numai de temperatura.',
            ],
          },
          formulas: ['U = (3/2)nRT', 'ΔU = Q - W'],
        },
      ],
    },
    {
      id: 'principles',
      code: '2.3',
      title: { en: 'Laws of Thermodynamics', ro: 'Legile Termodinamicii' },
      summary: {
        en: 'First and second laws, and heat engines.',
        ro: 'Prima si a doua lege, si motoare termice.',
      },
      pageRefs: [14, 15, 16, 17],
      objectives: {
        en: ['Apply the first law', 'Understand entropy', 'Calculate engine efficiency'],
        ro: ['Aplicati prima lege', 'Intelegeti entropia', 'Calculati eficienta motorului'],
      },
      sections: [
        {
          title: { en: 'First law of thermodynamics', ro: 'Prima lege a termodinamicii' },
          pageRefs: [14],
          paragraphs: {
            en: [
              'Energy cannot be created or destroyed, only transformed.',
              'Heat added to a system equals change in internal energy plus work done by the system.',
            ],
            ro: [
              'Energia nu poate fi creata sau distrusa, doar transformata.',
              'Caldura adaugata la un sistem este egala cu variatea energiei interne plus lucrul efectuat.',
            ],
          },
          formulas: ['Q = ΔU + W'],
        },
        {
          title: { en: 'Second law and engines', ro: 'A doua lege si motoare' },
          pageRefs: [15, 16, 17],
          paragraphs: {
            en: [
              'Entropy increases in isolated systems undergoing irreversible processes.',
              'Heat engines convert heat into mechanical work with limited efficiency.',
            ],
            ro: [
              'Entropia creste in sisteme izolate care sufera procese ireversibile.',
              'Motoarele termice convertesc caldura in lucru mecanic cu eficienta limitata.',
            ],
          },
          formulas: ['η = W/Q_in', 'η = 1 - T_c/T_h'],
        },
      ],
    },
  ],
};
