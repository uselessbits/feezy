import type { Chapter } from '../types';

export const mechanics: Chapter = {
  id: 'mechanics',
  code: '1',
  title: { en: 'Mechanics', ro: 'Mecanica' },
  summary: {
    en: 'Cinematics, dynamics, mechanical energy, and momentum.',
    ro: 'Cinematica, dinamica, energie mecanica si impuls.',
  },
  pageRefs: [2, 3, 4, 5, 6, 7, 8],
  lessons: [
    {
      id: 'kinematics',
      code: '1.1',
      title: { en: 'Kinematics', ro: 'Cinematica' },
      summary: {
        en: 'Motion description using speed and acceleration.',
        ro: 'Descrierea miscarii folosind viteza si acceleratia.',
      },
      pageRefs: [2, 3],
      objectives: {
        en: ['Calculate average and instantaneous velocity', 'Apply equations of uniformly accelerated motion'],
        ro: ['Calculati viteza medie si instantanee', 'Aplicati ecuatii de miscare uniform accelerata'],
      },
      sections: [
        {
          title: { en: 'Speed and acceleration', ro: 'Viteza si acceleratia' },
          pageRefs: [2],
          paragraphs: {
            en: [
              'Average velocity is displacement divided by time. Instantaneous velocity is the limit as time interval approaches zero.',
              'Acceleration measures the rate of change of velocity over time.',
            ],
            ro: [
              'Viteza medie este deplasarea impartita la timp. Viteza instantanee este limita cand intervalul de timp se apropie de zero.',
              'Acceleratia masoara rata de schimbare a vitezei in timp.',
            ],
          },
          formulas: ['v_m = Δx / Δt', 'v = dx / dt', 'a = dv / dt'],
        },
        {
          title: { en: 'Uniformly accelerated motion', ro: 'Miscare uniform accelerata' },
          pageRefs: [3],
          paragraphs: {
            en: [
              'When acceleration is constant, kinematic equations simplify. These equations relate position, velocity, acceleration, and time.',
              'The velocity-time graph is a straight line with slope equal to acceleration.',
            ],
            ro: [
              'Cand acceleratia este constanta, ecuatiile cinematice se simplifica. Aceste ecuatii leaga pozitia, viteza, acceleratia si timpul.',
              'Graficul viteza-timp este o linie dreapta cu panta egala cu acceleratia.',
            ],
          },
          formulas: ['v = v_0 + at', 'x = x_0 + v_0 t + (1/2)at^2', 'v^2 = v_0^2 + 2aΔx'],
          simulation: 'inclined-plane',
        },
      ],
    },
    {
      id: 'dynamics',
      code: '1.2',
      title: { en: 'Dynamics', ro: 'Dinamica' },
      summary: {
        en: 'Newtons laws, forces, and circular motion.',
        ro: 'Legile lui Newton, forte si miscare circulara.',
      },
      pageRefs: [4, 5, 6, 7],
      objectives: {
        en: ['Apply Newtons laws', 'Identify and calculate forces', 'Analyze circular motion'],
        ro: ['Aplicati legile lui Newton', 'Identificati si calculati fortele', 'Analizati miscarea circulara'],
      },
      sections: [
        {
          title: { en: 'Principles of mechanics', ro: 'Principiile mecanicii' },
          pageRefs: [4],
          paragraphs: {
            en: [
              'The principle of inertia: a body maintains rest or uniform motion unless external forces act.',
              'Newtons second law: force equals mass times acceleration.',
            ],
            ro: [
              'Principiul inertiei: un corp mentine repausul sau miscarea uniforma daca nu actioneaza forte externe.',
              'A doua lege a lui Newton: forta este egala cu masa inmultita cu acceleratia.',
            ],
          },
          formulas: ['F = ma', 'p = mv'],
        },
        {
          title: { en: 'Types of forces', ro: 'Tipuri de forte' },
          pageRefs: [5, 6, 7],
          paragraphs: {
            en: [
              'Common forces include normal force, friction, tension, and weight.',
              'Centripetal force keeps an object in circular motion.',
            ],
            ro: [
              'Fortele comune includ forta normala, frecare, tensiune si greutate.',
              'Forta centripeta tine un obiect in miscare circulara.',
            ],
          },
          formulas: ['N = mg', 'F_c = mv^2/R', 'f = μN'],
        },
      ],
    },
    {
      id: 'energy-momentum',
      code: '1.3',
      title: { en: 'Energy and Momentum', ro: 'Energia si Impulsul' },
      summary: {
        en: 'Work, energy conservation, and momentum.',
        ro: 'Lucru mecanic, conservarea energiei si impuls.',
      },
      pageRefs: [8],
      objectives: {
        en: ['Calculate work and energy', 'Apply conservation laws', 'Understand momentum'],
        ro: ['Calculati lucrul si energia', 'Aplicati legile de conservare', 'Intelegeti impulsul'],
      },
      sections: [
        {
          title: { en: 'Work and elastic energy', ro: 'Lucru si energie elastica' },
          pageRefs: [8],
          paragraphs: {
            en: [
              'Work is force times displacement times the cosine of the angle between them.',
              'Elastic potential energy is stored in springs and deformable materials.',
            ],
            ro: [
              'Lucrul este forta inmultita cu deplasarea si cosinusul unghiului dintre ele.',
              'Energia potentiala elastica este stocata in arcuri si materiale deformabile.',
            ],
          },
          formulas: ['W = F · d · cos(θ)', 'E_p = mgh', 'E_elastic = (1/2)kx^2'],
        },
        {
          title: { en: 'Momentum', ro: 'Impulsul' },
          pageRefs: [8],
          paragraphs: {
            en: [
              'Momentum is the product of mass and velocity.',
              'In isolated systems, total momentum is conserved.',
            ],
            ro: [
              'Impulsul este produsul masei si vitezei.',
              'In sisteme izolate, impulsul total se conserva.',
            ],
          },
          formulas: ['p = mv', 'Δp = F · Δt'],
        },
      ],
    },
  ],
};
