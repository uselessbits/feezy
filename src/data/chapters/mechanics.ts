import type { Chapter } from '../types';

export const mechanics: Chapter = {
  id: 'mechanics',
  code: '1',
  title: { en: 'Mechanics', ro: 'Mecanică' },
  summary: {
    en: 'Kinematics, dynamics, mechanical energy, and momentum.',
    ro: 'Cinematica, dinamica, energie mecanică și impuls.',
  },
  pageRefs: [2, 3, 4, 5, 6, 7, 8],
  lessons: [
    {
      id: 'kinematics',
      code: '1.1',
      title: { en: 'Kinematics', ro: 'Cinematica' },
      summary: {
        en: 'Motion description using speed and acceleration.',
        ro: 'Descrierea mișcării folosind viteza și accelerația.',
      },
      pageRefs: [2, 3],
      objectives: {
        en: ['Calculate average and instantaneous velocity', 'Apply equations of uniformly accelerated motion'],
        ro: ['Calculați viteza medie și instantanee', 'Aplicați ecuații de mișcare uniform accelerată'],
      },
      sections: [
        {
          title: { en: 'Speed and acceleration', ro: 'Viteza și accelerația' },
          pageRefs: [2],
          paragraphs: {
            en: [
              'Average velocity is displacement divided by time.',
              'Instantaneous velocity is the limit as time interval approaches zero.',
              'Acceleration measures the rate of change of velocity over time.',
            ],
            ro: [
              'Viteza medie este deplasarea împărțită la timp.',
              'Viteza instantanee este limita când intervalul de timp se apropie de zero.',
              'Accelerația măsoară rata de schimbare a vitezei în timp.',
            ],
          },
          formulas: ['v_m = Δx / Δt', 'v = dx / dt', 'a = dv / dt'],
        },
        {
          title: { en: 'Uniformly accelerated motion', ro: 'Mișcare uniform accelerată' },
          pageRefs: [3],
          paragraphs: {
            en: [
              'When acceleration is constant, kinematic equations simplify.',
              'These equations relate position, velocity, acceleration, and time.',
              'The velocity-time graph is a straight line with slope equal to acceleration.',
            ],
            ro: [
              'Când accelerația este constantă, ecuațiile cinematice se simplifică.',
              'Aceste ecuații leagă poziția, viteza, accelerația și timpul.',
              'Graficul viteză-timp este o linie dreaptă cu panta egală cu accelerația.',
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
        ro: 'Legile lui Newton, forțe și mișcare circulară.',
      },
      pageRefs: [4, 5, 6, 7],
      objectives: {
        en: ['Apply Newtons laws', 'Identify and calculate forces', 'Analyze circular motion'],
        ro: ['Aplicați legile lui Newton', 'Identificați și calculați forțele', 'Analizați mișcarea circulară'],
      },
      sections: [
        {
          title: { en: 'Principles of mechanics', ro: 'Principiile Mecanicii' },
          pageRefs: [4],
          paragraphs: {
            en: [
              'The principle of inertia: a body maintains rest or uniform motion unless external forces act.',
              'Newtons second law: force equals mass times acceleration.',
            ],
            ro: [
              'Principiul inerției: un corp își menține starea de repaus sau de mișcare rectilinie uniformă atât timp cât asupra sa nu acționează alte forțe exterioare.',
              'A doua lege a lui Newton: forța este egală cu masa înmulțită cu accelerația.',
            ],
          },
          formulas: ['F = ma', 'p = mv'],
        },
        {
          title: { en: 'Types of forces', ro: 'Tipuri de forțe' },
          pageRefs: [5, 6, 7],
          paragraphs: {
            en: [
              'Common forces include normal force, friction, tension, and weight.',
              'Centripetal force keeps an object in circular motion.',
            ],
            ro: [
              'Forțele comune includ forța normală, forța de frecare, tensiunea și greutatea.',
              'Forța centripetă menține un corp în mișcare circulară.',
            ],
          },
          formulas: ['N = mg', 'F_c = mv^2/R', 'f = μN'],
        },
      ],
    },
    {
      id: 'energy-momentum',
      code: '1.3',
      title: { en: 'Energy and Momentum', ro: 'Energia și Impulsul' },
      summary: {
        en: 'Work, energy conservation, and momentum.',
        ro: 'Lucru mecanic, conservarea energiei și impuls.',
      },
      pageRefs: [8],
      objectives: {
        en: ['Calculate work and energy', 'Apply conservation laws', 'Understand momentum'],
        ro: ['Calculați lucrul și energia', 'Aplicați legile de conservare', 'Înțelegeți impulsul'],
      },
      sections: [
        {
          title: { en: 'Work and elastic energy', ro: 'Lucru și energie elastică' },
          pageRefs: [8],
          paragraphs: {
            en: [
              'Work is force times displacement times the cosine of the angle between them.',
              'Elastic potential energy is stored in springs and deformable materials.',
            ],
            ro: [
              'Lucrul mecanic este egal cu produsul dintre forță, deplasare și cosinusul unghiului dintre ele.',
              'Energia potențială elastică este stocată în arcuri și materiale deformabile.',
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
              'Impulsul este produsul dintre masă și viteză.',
              'În sistemele izolate, impulsul total se conservă.',
            ],
          },
          formulas: ['p = mv', 'Δp = F · Δt'],
        },
      ],
    },
  ],
};
