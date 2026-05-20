import type { Chapter } from '../types';

export const optics: Chapter = {
  id: 'optics',
  code: '4',
  title: { en: 'Optics', ro: 'Optică' },
  summary: {
    en: 'Light propagation, reflection, refraction, lenses, and wave phenomena.',
    ro: 'Propagarea luminii, reflexia, refracția, lentilele și fenomenele ondulatorii.',
  },
  pageRefs: [21, 22, 23, 24, 25],
  lessons: [
    {
      id: 'reflection-refraction',
      code: '4.1',
      title: { en: 'Reflection and Refraction', ro: 'Reflexia și Refracția' },
      summary: {
        en: "Laws of reflection and refraction, Snell's law, and total internal reflection.",
        ro: 'Legile reflexiei și refracției, legea lui Snell și reflexia totală.',
      },
      pageRefs: [21, 22],
      objectives: {
        en: ['Apply the laws of reflection', "Apply Snell's law of refraction", 'Calculate the critical angle for total internal reflection'],
        ro: ['Aplicați legile reflexiei', 'Aplicați legea refracției a lui Snell', 'Calculați unghiul limită pentru reflexia totală'],
      },
      sections: [
        {
          title: { en: 'Reflection of Light', ro: 'Reflexia Luminii' },
          pageRefs: [21],
          paragraphs: {
            en: [
              'Reflection occurs when light bounces off a boundary between two different media.',
              'The angle of incidence equals the angle of reflection.',
              'Both rays and the normal lie in the same plane.',
            ],
            ro: [
              'Reflexia are loc atunci când lumina se întoarce din suprafața de separare dintre două medii diferite.',
              'Unghiul de incidență este egal cu unghiul de reflexie.',
              'Ambele raze și normala se află în același plan.',
            ],
          },
          formulas: ['i = r'],
        },
        {
          title: { en: 'Refraction of Light', ro: 'Refracția Luminii' },
          pageRefs: [22],
          paragraphs: {
            en: [
              "Refraction is the bending of light as it passes from one medium to another due to a change in its speed.",
              "Snell's law relates the indices of refraction and angles of incidence and refraction.",
              'Total internal reflection occurs when light travels from a denser to a less dense medium at an angle greater than the critical angle.',
            ],
            ro: [
              'Refracția este schimbarea direcției luminii la trecerea dintr-un mediu în altul datorită modificării vitezei sale.',
              'Legea lui Snell corelează indicii de refracție cu unghiurile de incidență și de refracție.',
              'Reflexia totală are loc când lumina călătorește dintr-un mediu mai dens într-unul mai puțin dens sub un unghi mai mare decât unghiul limită.',
            ],
          },
          formulas: ['n_1 \\sin(i) = n_2 \\sin(r)', 'n = c / v', '\\sin(l) = n_2 / n_1'],
          simulation: 'refraction-optics',
        },
      ],
    },
    {
      id: 'lenses-systems',
      code: '4.2',
      title: { en: 'Lenses and Optical Systems', ro: 'Lentile și Sisteme Optice' },
      summary: {
        en: "Thin lenses, ray tracing, lens maker's equation, and optical instruments.",
        ro: 'Lentile subțiri, trasarea razelor, ecuația lentilelor și instrumente optice.',
      },
      pageRefs: [23, 24],
      objectives: {
        en: ['Distinguish between converging and diverging lenses', 'Apply the thin lens equation', 'Calculate the magnification of a lens'],
        ro: ['Distingeți între lentilele convergente și divergente', 'Aplicați formula lentilelor subțiri', 'Calculați grosismentul/mărirea unei lentile'],
      },
      sections: [
        {
          title: { en: 'Thin Lenses', ro: 'Lentile Subțiri' },
          pageRefs: [23],
          paragraphs: {
            en: [
              'Lenses are optical devices that focus or disperse light by refraction.',
              'Converging lenses are thicker in the middle and focus parallel rays, while diverging lenses are thinner in the middle and disperse parallel rays.',
            ],
            ro: [
              'Lentilele sunt dispozitive optice care focalizează sau dispersează lumina prin refracție.',
              'Lentilele convergente sunt mai groase la mijloc și focalizează razele paralele, în timp ce lentilele divergente sunt mai subțiri la mijloc și dispersează razele paralele.',
            ],
          },
          formulas: ['\\frac{1}{f} = \\frac{1}{x_2} - \\frac{1}{x_1}', 'C = \\frac{1}{f}', '\\beta = \\frac{x_2}{x_1}'],
          simulation: 'lens-optics',
        },
        {
          title: { en: 'Optical Systems and Instruments', ro: 'Sisteme și Instrumente Optice' },
          pageRefs: [24],
          paragraphs: {
            en: [
              'Optical systems combine multiple lenses or mirrors to form images.',
              'Common optical instruments include the eye, magnifying glasses, microscopes, and telescopes.',
            ],
            ro: [
              'Sistemele optice combină mai multe lentile sau oglinzi pentru a forma imagini.',
              'Instrumentele optice comune includ ochiul, lupa, microscopul și telescopul.',
            ],
          },
          formulas: ['C_{eq} = C_1 + C_2'],
        },
      ],
    },
    {
      id: 'wave-optics',
      code: '4.3',
      title: { en: 'Wave Optics', ro: 'Optica Ondulatorie' },
      summary: {
        en: 'Light as a wave, interference, diffraction, and polarization.',
        ro: 'Lumina ca undă, interferența, difracția și polarizarea.',
      },
      pageRefs: [25],
      objectives: {
        en: ['Understand light interference', "Explain Young's double slit experiment", 'Understand diffraction and polarization'],
        ro: ['Înțelegeți interferența luminii', 'Explicați experimentul fantei duble a lui Young', 'Înțelegeți difracția și polarizarea'],
      },
      sections: [
        {
          title: { en: 'Interference of Light', ro: 'Interferența Luminii' },
          pageRefs: [25],
          paragraphs: {
            en: [
              'Interference is the superposition of coherent light waves, producing regions of constructive and destructive interference.',
              "Young's double-slit experiment demonstrates the wave nature of light.",
            ],
            ro: [
              'Interferența este suprapunerea undelor de lumină coerente, producând regiuni de interferență constructivă și distructivă.',
              'Experimentul fantei duble al lui Young demonstrează natura ondulatorie a luminii.',
            ],
          },
          formulas: ['\\Delta i = \\frac{\\lambda D}{2l}', '\\delta = d \\sin(\\theta)'],
        },
        {
          title: { en: 'Diffraction and Polarization', ro: 'Difracția și Polarizarea' },
          pageRefs: [25],
          paragraphs: {
            en: [
              'Diffraction is the bending of waves around obstacles or through openings.',
              'Polarization restricts the vibration of light waves to a single plane.',
            ],
            ro: [
              'Difracția este curbarea undelor în jurul obstacolelor sau prin fante.',
              'Polarizarea limitează oscilațiile undelor de lumină într-un singur plan.',
            ],
          },
          formulas: ['d \\sin(\\theta) = k \\lambda'],
        },
      ],
    },
  ],
};
