import type { Chapter } from '../types';

export const currentElectricity: Chapter = {
  id: 'current-electricity',
  code: '3',
  title: { en: 'Current Electricity', ro: 'Electricitate Continua' },
  summary: {
    en: 'Electric current, resistance, and power.',
    ro: 'Curent electric, rezistenta si putere.',
  },
  pageRefs: [18, 19, 20],
  lessons: [
    {
      id: 'quantities',
      code: '3.1',
      title: { en: 'Electric Quantities', ro: 'Marimi Electrice' },
      summary: {
        en: 'Current, voltage, and resistance fundamentals.',
        ro: 'Fundamentele curentului, tensiunii si rezistentei.',
      },
      pageRefs: [18, 19],
      objectives: {
        en: ['Define electric current', 'Apply Ohms law', 'Calculate resistance'],
        ro: ['Definiti curentul electric', 'Aplicati legea lui Ohm', 'Calculati rezistenta'],
      },
      sections: [
        {
          title: { en: 'Electric current intensity', ro: 'Intensitatea curentului electric' },
          pageRefs: [18],
          paragraphs: {
            en: [
              'Electric current is the flow of charge per unit time.',
              'The unit of current is the ampere (A), defined as coulombs per second.',
            ],
            ro: [
              'Curentul electric este fluxul de sarcina pe unitatea de timp.',
              'Unitatea de curent este amperul (A), definit ca coulombi pe secunda.',
            ],
          },
          formulas: ['I = Δq / Δt', 'I = nqvA'],
        },
        {
          title: { en: 'Voltage and resistance', ro: 'Tensiune si rezistenta' },
          pageRefs: [19],
          paragraphs: {
            en: [
              'Voltage is the energy per unit charge in an electric field.',
              'Resistance opposes the flow of current and depends on material properties.',
            ],
            ro: [
              'Tensiunea este energia pe unitatea de sarcina in camp electric.',
              'Rezistenta se opune fluxului curentului si depinde de proprietatile materialului.',
            ],
          },
          formulas: ['U = W/q', 'R = ρl/A', 'U = IR'],
          simulation: 'electric-circuit',
        },
      ],
    },
    {
      id: 'circuit-laws',
      code: '3.2',
      title: { en: 'Circuit Laws', ro: 'Legile Circuitelor' },
      summary: {
        en: 'Kirchhoff laws and circuit analysis.',
        ro: 'Legile lui Kirchhoff si analiza circuitelor.',
      },
      pageRefs: [19],
      objectives: {
        en: ['Apply Kirchhoff laws', 'Analyze series and parallel circuits'],
        ro: ['Aplicati legile lui Kirchhoff', 'Analizati circuite in serie si paralel'],
      },
      sections: [
        {
          title: { en: 'Kirchhoff laws', ro: 'Legile lui Kirchhoff' },
          pageRefs: [19],
          paragraphs: {
            en: [
              'Current law: sum of currents entering a node equals sum leaving the node.',
              'Voltage law: sum of voltages around a closed loop equals zero.',
            ],
            ro: [
              'Legea curentului: suma curentilor care intra intr-un nod este egala cu suma curentilor care pleaca.',
              'Legea tensiunii: suma tensiunilor in jurul unei ochiuri inchise este zero.',
            ],
          },
          formulas: ['Σ I_in = Σ I_out', 'Σ U = 0'],
        },
      ],
    },
    {
      id: 'energy-power',
      code: '3.3',
      title: { en: 'Electrical Energy and Power', ro: 'Energie si Putere Electrica' },
      summary: {
        en: 'Power dissipation and energy calculations.',
        ro: 'Disiparea puterii si calcule de energie.',
      },
      pageRefs: [20],
      objectives: {
        en: ['Calculate electrical power', 'Determine energy consumption'],
        ro: ['Calculati puterea electrica', 'Determinati consumul de energie'],
      },
      sections: [
        {
          title: { en: 'Electric power', ro: 'Putere electrica' },
          pageRefs: [20],
          paragraphs: {
            en: [
              'Power is the rate of energy transfer, measured in watts.',
              'In resistive loads, power is dissipated as heat.',
            ],
            ro: [
              'Puterea este rata de transfer de energie, masurata in wati.',
              'In sarcini rezistive, puterea se disipa sub forma de caldura.',
            ],
          },
          formulas: ['P = U·I', 'P = I^2·R', 'P = U^2/R'],
        },
      ],
    },
  ],
};
