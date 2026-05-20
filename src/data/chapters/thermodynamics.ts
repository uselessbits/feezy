import type { Chapter } from '../types';

export const thermodynamics: Chapter = {
  id: 'thermodynamics',
  code: '2',
  title: { en: 'Thermodynamics', ro: 'Termodinamică' },
  summary: {
    en: 'Heat, work, and the laws of thermodynamics.',
    ro: 'Căldura, lucrul mecanic și legile termodinamicii.',
  },
  pageRefs: [10, 11, 12, 13, 14, 15, 16, 17],
  lessons: [
    {
      id: 'basics',
      code: '2.1',
      title: { en: 'Thermodynamic Basics', ro: 'Noțiuni Fundamentale' },
      summary: {
        en: 'Matter structure, state parameters, and gas transformations.',
        ro: 'Structura materiei, parametri de stare și transformări de gaze.',
      },
      pageRefs: [10, 11],
      objectives: {
        en: ['Understand atomic structure', 'Apply ideal gas law', 'Analyze gas processes'],
        ro: ['Înțelegeți structura atomică', 'Aplicați legea gazelor ideale', 'Analizați procesele de gaze'],
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
              'Materia constă din atomi și molecule legați prin forțe electromagnetice.',
              'Cele trei stări de agregare ale materiei sunt solidă, lichidă și gazoasă.',
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
              'The ideal gas law relates these parameters: $PV = nRT$.',
            ],
            ro: [
              'Presiunea, volumul și temperatura definesc starea unui gaz.',
              'Legea gazelor ideale leagă acești parametri: $PV = nRT$.',
            ],
          },
          formulas: ['PV = nRT', 'P = ρRT/M', 'p1V1/T1 = p2V2/T2'],
          simulation: 'piston-gas',
        },
      ],
    },
    {
      id: 'work-energy',
      code: '2.2',
      title: { en: 'Work and Thermodynamic Energy', ro: 'Lucru și Energie Termică' },
      summary: {
        en: 'Work done by gases and internal energy.',
        ro: 'Lucrul efectuat de gaze și energia internă.',
      },
      pageRefs: [12, 13],
      objectives: {
        en: ['Calculate work in thermodynamic processes', 'Understand internal energy', 'Apply energy conservation'],
        ro: ['Calculați lucrul în procese termodinamice', 'Înțelegeți energia internă', 'Aplicați conservarea energiei'],
      },
      sections: [
        {
          title: { en: 'Work in thermodynamics', ro: 'Lucru în termodinamică' },
          pageRefs: [12],
          paragraphs: {
            en: [
              'Work done by a gas equals pressure times change in volume.',
              'In an isobaric process, pressure remains constant.',
            ],
            ro: [
              'Lucrul efectuat de un gaz este egal cu produsul dintre presiune și variația volumului.',
              'Într-un proces izobar, presiunea rămâne constantă.',
            ],
          },
          formulas: ['W = P·ΔV', 'W = nR·ΔT'],
        },
        {
          title: { en: 'Internal energy', ro: 'Energia internă' },
          pageRefs: [13],
          paragraphs: {
            en: [
              'Internal energy is the total kinetic and potential energy of particles.',
              'For an ideal gas, internal energy depends only on temperature.',
            ],
            ro: [
              'Energia internă este energia cinetică și potențială totală a particulelor.',
              'Pentru un gaz ideal, energia internă depinde numai de temperatură.',
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
        ro: 'Prima și a doua lege, și motoare termice.',
      },
      pageRefs: [14, 15, 16, 17],
      objectives: {
        en: ['Apply the first law', 'Understand entropy', 'Calculate engine efficiency'],
        ro: ['Aplicați prima lege', 'Înțelegeți entropia', 'Calculați randamentul motorului'],
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
              'Energia nu poate fi creată sau distrusă, ci doar transformată.',
              'Căldura adăugată unui sistem este egală cu variația energiei interne plus lucrul mecanic efectuat.',
            ],
          },
          formulas: ['Q = ΔU + W'],
        },
        {
          title: { en: 'Second law and engines', ro: 'A doua lege și motoare' },
          pageRefs: [15, 16, 17],
          paragraphs: {
            en: [
              'Entropy increases in isolated systems undergoing irreversible processes.',
              'Heat engines convert heat into mechanical work with limited efficiency.',
            ],
            ro: [
              'Entropia crește în sistemele izolate care suferă procese ireversibile.',
              'Motoarele termice convertesc căldura în lucru mecanic cu o eficiență limitată.',
            ],
          },
          formulas: ['η = W/Q_in', 'η = 1 - T_c/T_h'],
        },
      ],
    },
  ],
};
