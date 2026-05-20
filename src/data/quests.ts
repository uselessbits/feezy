import type { ChapterQuest } from './types';

export const quests: ChapterQuest[] = [
  {
    chapterId: 'mechanics',
    questions: [
      {
        id: 'mech-q1',
        type: 'numerical',
        question: {
          en: 'A car starts from rest and accelerates uniformly at $2\\text{ m/s}^2$. How far (in meters) does it travel in $5\\text{ s}$?',
          ro: 'Un automobil pornește din repaus și se deplasează cu o accelerație constantă de $2\\text{ m/s}^2$. Ce distanță (în metri) parcurge în $5\\text{ s}$?',
        },
        correctValue: 25,
        tolerance: 0.1,
        unit: 'm',
        explanation: {
          en: 'For uniformly accelerated motion starting from rest ($v_0 = 0$, $x_0 = 0$), the position equation is $x = \\frac{1}{2}at^2$. Plugging in $a = 2\\text{ m/s}^2$ and $t = 5\\text{ s}$, we get $x = \\frac{1}{2} \\cdot 2 \\cdot 5^2 = 25\\text{ m}$.',
          ro: 'Pentru o mișcare uniform accelerată pornind din repaus ($v_0 = 0$, $x_0 = 0$), ecuația mișcării este $x = \\frac{1}{2}at^2$. Înlocuind $a = 2\\text{ m/s}^2$ și $t = 5\\text{ s}$, obținem $x = \\frac{1}{2} \\cdot 2 \\cdot 5^2 = 25\\text{ m}$.',
        },
      },
      {
        id: 'mech-q2',
        type: 'numerical',
        question: {
          en: 'A block of mass $5\\text{ kg}$ is pulled along a horizontal table by a constant horizontal force of $20\\text{ N}$. If the friction coefficient is $0.2$, what is the acceleration of the block (in $\\text{m/s}^2$)? (Take $g = 10\\text{ m/s}^2$)',
          ro: 'Un corp cu masa de $5\\text{ kg}$ este tras pe o suprafață orizontală de o forță orizontală de $20\\text{ N}$. Dacă coeficientul de frecare este $0,2$, care este accelerația corpului (în $\\text{m/s}^2$)? (Se consideră $g = 10\\text{ m/s}^2$)',
        },
        correctValue: 2,
        tolerance: 0.1,
        unit: 'm/s²',
        explanation: {
          en: 'The friction force is $F_f = \\mu N = \\mu mg = 0.2 \\cdot 5 \\cdot 10 = 10\\text{ N}$. According to Newton\'s second law: $F_{net} = F - F_f = ma \\implies 20 - 10 = 5a \\implies a = 2\\text{ m/s}^2$.',
          ro: 'Forța de frecare este $F_f = \\mu N = \\mu mg = 0,2 \\cdot 5 \\cdot 10 = 10\\text{ N}$. Conform legii a doua a lui Newton: $F_{net} = F - F_f = ma \\implies 20 - 10 = 5a \\implies a = 2\\text{ m/s}^2$.',
        },
      },
      {
        id: 'mech-q3',
        type: 'numerical',
        question: {
          en: 'A body of mass $2\\text{ kg}$ is dropped from a height of $20\\text{ m}$. What is its kinetic energy (in Joules) just before hitting the ground? (Neglect air resistance, take $g = 10\\text{ m/s}^2$)',
          ro: 'Un corp cu masa de $2\\text{ kg}$ este lăsat să cadă liber de la o înălțime de $20\\text{ m}$. Care este energia sa cinetică (în Jouli) chiar înainte de a atinge solul? (Se neglijează rezistența aerului, $g = 10\\text{ m/s}^2$)',
        },
        correctValue: 400,
        tolerance: 1,
        unit: 'J',
        explanation: {
          en: 'By conservation of mechanical energy, the potential energy lost equals the kinetic energy gained: $E_c = E_p = mgh$. Substituting the values: $E_c = 2 \\cdot 10 \\cdot 20 = 400\\text{ J}$.',
          ro: 'Prin conservarea energiei mecanice, energia potențială pierdută este egală cu energia cinetică câștigată: $E_c = E_p = mgh$. Înlocuind valorile: $E_c = 2 \\cdot 10 \\cdot 20 = 400\\text{ J}$.',
        },
      },
      {
        id: 'mech-q4',
        type: 'multiple-choice',
        question: {
          en: 'According to Newton\'s Third Law, if a book lies stationary on a flat horizontal table, the reaction force to the gravitational weight force acting on the book is:',
          ro: 'Conform celei de-a treia legi a lui Newton, dacă o carte stă nemișcată pe o masă orizontală, reacțiunea forței de greutate care acționează asupra cărții este:',
        },
        options: {
          en: [
            'The upward normal force exerted by the table on the book',
            'The upward gravitational force exerted by the book on the Earth',
            'The downward contact force exerted by the book on the table',
            'The frictional force between the book and the table',
          ],
          ro: [
            'Forța normală verticală în sus exercitată de masă asupra cărții',
            'Forța gravitațională în sus exercitată de carte asupra Pământului',
            'Forța de contact în jos exercitată de carte asupra mesei',
            'Forța de frecare dintre carte și masă',
          ],
        },
        correctOptionIndex: 1,
        explanation: {
          en: 'Action-reaction pairs must act on different bodies and represent the exact same type of physical interaction. Weight is the gravitational pull of the Earth on the book. Therefore, its reaction is the gravitational pull of the book on the Earth.',
          ro: 'Perechile acțiune-reacțiune trebuie să acționeze asupra unor corpuri diferite și să reprezinte același tip de interacțiune fizică. Greutatea este atracția gravitațională a Pământului asupra cărții. Prin urmare, reacțiunea sa este forța gravitațională cu care cartea atrage Pământul.',
        },
      },
      {
        id: 'mech-q5',
        type: 'numerical',
        question: {
          en: 'A ball of mass $2\\text{ kg}$ moving at $4\\text{ m/s}$ collides with a stationary ball of mass $2\\text{ kg}$ and sticks to it. What is the velocity of the combined mass (in m/s) after the collision?',
          ro: 'O bilă de $2\\text{ kg}$ care se deplasează cu $4\\text{ m/s}$ se ciocnește de o bilă staționară de $2\\text{ kg}$ și se lipește de ea. Care este viteza corpului format (în m/s) după ciocnire?',
        },
        correctValue: 2,
        tolerance: 0.1,
        unit: 'm/s',
        explanation: {
          en: 'For a perfectly inelastic collision, momentum is conserved: $p_i = p_f \\implies m_1 v_1 + m_2 v_2 = (m_1 + m_2) v_f$. Since $v_2 = 0$, we have $2 \\cdot 4 = (2 + 2) v_f \\implies 8 = 4 v_f \\implies v_f = 2\\text{ m/s}$.',
          ro: 'Pentru o ciocnire perfect inelastică, impulsul se conservă: $p_i = p_f \\implies m_1 v_1 + m_2 v_2 = (m_1 + m_2) v_f$. Deoarece $v_2 = 0$, avem $2 \\cdot 4 = (2 + 2) v_f \\implies 8 = 4 v_f \\implies v_f = 2\\text{ m/s}$.',
        },
      },
    ],
  },
  {
    chapterId: 'thermodynamics',
    questions: [
      {
        id: 'thermo-q1',
        type: 'numerical',
        question: {
          en: 'An ideal gas occupies a volume of $2\\text{ L}$ at a pressure of $3\\text{ atm}$. If the volume is compressed to $1\\text{ L}$ at constant temperature, what is the final pressure (in atm)?',
          ro: 'Un gaz ideal ocupă un volum de $2\\text{ L}$ la o presiune de $3\\text{ atm}$. Dacă volumul este comprimat la $1\\text{ L}$ la temperatură constantă, care este presiunea finală (în atm)?',
        },
        correctValue: 6,
        tolerance: 0.1,
        unit: 'atm',
        explanation: {
          en: 'For an isothermal process (constant temperature), Boyle\'s law applies: $P_1 V_1 = P_2 V_2$. Therefore, $3 \\cdot 2 = P_2 \\cdot 1 \\implies P_2 = 6\\text{ atm}$.',
          ro: 'Pentru un proces izoterm (temperatură constantă), se aplică legea lui Boyle-Mariotte: $P_1 V_1 = P_2 V_2$. Prin urmare, $3 \\cdot 2 = P_2 \\cdot 1 \\implies P_2 = 6\\text{ atm}$.',
        },
      },
      {
        id: 'thermo-q2',
        type: 'numerical',
        question: {
          en: 'During a thermodynamic process, a gas absorbs $500\\text{ J}$ of heat and performs $200\\text{ J}$ of mechanical work. What is the change in the internal energy (in Joules) of the gas?',
          ro: 'În timpul unui proces termodinamic, un gaz absoarbe $500\\text{ J}$ de căldură și efectuează un lucru mecanic de $200\\text{ J}$. Care este variația energiei interne (în Jouli) a gazului?',
        },
        correctValue: 300,
        tolerance: 1,
        unit: 'J',
        explanation: {
          en: 'According to the First Law of Thermodynamics, $\\Delta U = Q - W$, where $Q$ is heat absorbed ($+500\\text{ J}$) and $W$ is work done by the gas ($+200\\text{ J}$). Thus, $\\Delta U = 500 - 200 = 300\\text{ J}$.',
          ro: 'Conform primei legi a termodinamicii, $\\Delta U = Q - W$, unde $Q$ este căldura absorbită ($+500\\text{ J}$) iar $W$ lucrul efectuat de gaz ($+200\\text{ J}$). Astfel, $\\Delta U = 500 - 200 = 300\\text{ J}$.',
        },
      },
      {
        id: 'thermo-q3',
        type: 'multiple-choice',
        question: {
          en: 'For an ideal monoatomic gas, the internal energy is state parameter dependent and is directly proportional only to:',
          ro: 'Pentru un gaz ideal monoatomic, energia internă este un parametru de stare și este direct proporțională doar cu:',
        },
        options: {
          en: [
            'The pressure of the gas',
            'The volume of the gas',
            'The thermodynamic absolute temperature of the gas',
            'The mass density of the gas',
          ],
          ro: [
            'Presiunea gazului',
            'Volumul gazului',
            'Temperatura absolută termodinamică a gazului',
            'Densitatea de masă a gazului',
          ],
        },
        correctOptionIndex: 2,
        explanation: {
          en: 'The internal energy of an ideal monoatomic gas is given by $U = \\frac{3}{2}nRT$. Since $n$ and $R$ are constants for a fixed quantity of gas, $U$ depends purely on the absolute temperature $T$.',
          ro: 'Energia internă a unui gaz ideal monoatomic este dată de formula $U = \\frac{3}{2}nRT$. Deoarece $n$ și $R$ sunt constante pentru o cantitate fixă de gaz, $U$ depinde exclusiv de temperatura absolută $T$.',
        },
      },
      {
        id: 'thermo-q4',
        type: 'numerical',
        question: {
          en: 'A gas expands at a constant pressure of $2 \\times 10^5\\text{ Pa}$ from a volume of $1\\text{ L}$ to $3\\text{ L}$. What is the work done (in Joules) by the gas? ($1\\text{ L} = 10^{-3}\\text{ m}^3$)',
          ro: 'Un gaz se extinde la o presiune constantă de $2 \\times 10^5\\text{ Pa}$ de la un volum de $1\\text{ L}$ la $3\\text{ L}$. Care este lucrul mecanic efectuat (în Jouli) de gaz? ($1\\text{ L} = 10^{-3}\\text{ m}^3$)',
        },
        correctValue: 400,
        tolerance: 1,
        unit: 'J',
        explanation: {
          en: 'In an isobaric process, the work done is $W = P \\Delta V = P(V_f - V_i)$. Given $V_f - V_i = 3\\text{ L} - 1\\text{ L} = 2\\text{ L} = 2 \\times 10^{-3}\\text{ m}^3$, we have $W = 2 \\times 10^5 \\cdot 2 \\times 10^{-3} = 400\\text{ J}$.',
          ro: 'Într-un proces izobar, lucrul mecanic efectuat este $W = P \\Delta V = P(V_f - V_i)$. Având $V_f - V_i = 3\\text{ L} - 1\\text{ L} = 2\\text{ L} = 2 \\times 10^{-3}\\text{ m}^3$, avem $W = 2 \\times 10^5 \\cdot 2 \\times 10^{-3} = 400\\text{ J}$.',
        },
      },
      {
        id: 'thermo-q5',
        type: 'numerical',
        question: {
          en: 'A Carnot heat engine operates between a hot reservoir at $600\\text{ K}$ and a cold reservoir at $300\\text{ K}$. What is the efficiency of this engine (as a percentage, e.g. input 50 for 50%)?',
          ro: 'Un motor Carnot funcționează între o sursă caldă la $600\\text{ K}$ și o sursă rece la $300\\text{ K}$. Care este randamentul acestui motor (exprimat în procente, de ex. introduceți 50 pentru 50%)?',
        },
        correctValue: 50,
        tolerance: 0.1,
        unit: '%',
        explanation: {
          en: 'The maximum efficiency of a Carnot cycle is $\\eta = 1 - \\frac{T_c}{T_h}$. Plugging in the absolute temperatures: $\\eta = 1 - \\frac{300}{600} = 1 - 0.5 = 0.5$, which corresponds to $50\\%$.',
          ro: 'Randamentul maxim al unui ciclu Carnot este $\\eta = 1 - \\frac{T_c}{T_h}$. Înlocuind temperaturile absolute: $\\eta = 1 - \\frac{300}{600} = 1 - 0,5 = 0,5$, ceea ce corespunde la $50\\%$.',
        },
      },
    ],
  },
  {
    chapterId: 'current-electricity',
    questions: [
      {
        id: 'elec-q1',
        type: 'numerical',
        question: {
          en: 'A resistor of resistance $12\\ \\Omega$ is connected across a $24\\text{ V}$ battery. What is the current (in Amperes) flowing through the resistor?',
          ro: 'Un rezistor cu rezistența de $12\\ \\Omega$ este conectat la o baterie de $24\\text{ V}$. Care este intensitatea curentului (în Amperi) prin rezistor?',
        },
        correctValue: 2,
        tolerance: 0.1,
        unit: 'A',
        explanation: {
          en: 'By Ohm\'s Law for a circuit element, $I = \\frac{U}{R}$. Substituting the given values: $I = \\frac{24\\text{ V}}{12\\ \\Omega} = 2\\text{ A}$.',
          ro: 'Conform legii lui Ohm pentru o porțiune de circuit, $I = \\frac{U}{R}$. Înlocuind valorile date: $I = \\frac{24\\text{ V}}{12\\ \\Omega} = 2\\text{ A}$.',
        },
      },
      {
        id: 'elec-q2',
        type: 'numerical',
        question: {
          en: 'Two resistors of resistances $6\\ \\Omega$ and $12\\ \\Omega$ are connected in parallel. What is their equivalent electrical resistance (in $\\Omega$)?',
          ro: 'Două rezistoare cu rezistențele de $6\\ \\Omega$ și $12\\ \\Omega$ sunt conectate în paralel. Care este rezistența lor echivalentă (în $\\Omega$)?',
        },
        correctValue: 4,
        tolerance: 0.1,
        unit: 'Ω',
        explanation: {
          en: 'For parallel resistors, the equivalent resistance is $R_{eq} = \\frac{R_1 \\cdot R_2}{R_1 + R_2}$. Substituting values: $R_{eq} = \\frac{6 \\cdot 12}{6 + 12} = \\frac{72}{18} = 4\\ \\Omega$.',
          ro: 'Pentru rezistoare în paralel, rezistența echivalentă este $R_{eq} = \\frac{R_1 \\cdot R_2}{R_1 + R_2}$. Înlocuind valorile: $R_{eq} = \\frac{6 \\cdot 12}{6 + 12} = \\frac{72}{18} = 4\\ \\Omega$.',
        },
      },
      {
        id: 'elec-q3',
        type: 'numerical',
        question: {
          en: 'A light bulb operates at a voltage of $220\\text{ V}$ and has a resistance of $484\\ \\Omega$. What is the electrical power dissipated by the bulb (in Watts)?',
          ro: 'Un bec funcționează la o tensiune de $220\\text{ V}$ și are o rezistență de $484\\ \\Omega$. Care este puterea electrică disipată de bec (în Wați)?',
        },
        correctValue: 100,
        tolerance: 1,
        unit: 'W',
        explanation: {
          en: 'The power dissipated in a resistor is $P = \\frac{U^2}{R}$. Here, $P = \\frac{220^2}{484} = \\frac{48400}{484} = 100\\text{ W}$.',
          ro: 'Puterea disipată într-un rezistor este $P = \\frac{U^2}{R}$. Aici, $P = \\frac{220^2}{484} = \\frac{48400}{484} = 100\\text{ W}$.',
        },
      },
      {
        id: 'elec-q4',
        type: 'multiple-choice',
        question: {
          en: 'Kirchhoff\'s Current Law (the junction rule) is a direct consequence of the conservation of:',
          ro: 'Prima lege a lui Kirchhoff (legea nodurilor) este o consecință directă a legii conservării:',
        },
        options: {
          en: [
            'Mechanical and electrical energy',
            'Electric charge',
            'Linear momentum',
            'Magnetic flux',
          ],
          ro: [
            'Energiei mecanice și electrice',
            'Sarcinii electrice',
            'Impulsului liniar',
            'Fluxului magnetic',
          ],
        },
        correctOptionIndex: 1,
        explanation: {
          en: 'Kirchhoff\'s Current Law states that the total current entering a junction must equal the total current leaving it. This reflects that electric charge cannot accumulate or disappear at a junction (conservation of charge).',
          ro: 'Prima lege a lui Kirchhoff afirmă că suma curenților care intră într-un nod este egală cu suma curenților care ies din el. Acest lucru reflectă faptul că sarcina electrică nu se poate acumula sau dispărea în nod (conservarea sarcinii).',
        },
      },
      {
        id: 'elec-q5',
        type: 'numerical',
        question: {
          en: 'A battery with electromotive force $E = 12\\text{ V}$ and internal resistance $r = 1\\ \\Omega$ is connected to an external load resistor $R = 5\\ \\Omega$. What is the electric current (in Amperes) in the circuit?',
          ro: 'O baterie cu tensiunea electromotoare $E = 12\\text{ V}$ și rezistența internă $r = 1\\ \\Omega$ este conectată la un rezistor de sarcină extern $R = 5\\ \\Omega$. Care este intensitatea curentului electric (în Amperi) în circuit?',
        },
        correctValue: 2,
        tolerance: 0.1,
        unit: 'A',
        explanation: {
          en: 'By Ohm\'s Law for the entire circuit, $I = \\frac{E}{R + r}$. Substituting the values: $I = \\frac{12}{5 + 1} = \\frac{12}{6} = 2\\text{ A}$.',
          ro: 'Conform legii lui Ohm pentru întregul circuit, $I = \\frac{E}{R + r}$. Înlocuind valorile: $I = \\frac{12}{5 + 1} = \\frac{12}{6} = 2\\text{ A}$.',
        },
      },
    ],
  },
  {
    chapterId: 'optics',
    questions: [
      {
        id: 'opt-q1',
        type: 'numerical',
        question: {
          en: 'An object is placed at a distance of $20\\text{ cm}$ in front of a converging thin lens. If its real image is formed at a distance of $20\\text{ cm}$ on the other side of the lens, what is the focal length of the lens (in cm)?',
          ro: 'Un obiect este plasat la o distanță de $20\\text{ cm}$ în fața unei lentile subțiri convergente. Dacă imaginea sa reală se formează la o distanță de $20\\text{ cm}$ de cealaltă parte a lentilei, care este distanța focală a lentilei (în cm)?',
        },
        correctValue: 10,
        tolerance: 0.1,
        unit: 'cm',
        explanation: {
          en: 'Using the thin lens formula: $\\frac{1}{f} = \\frac{1}{x_2} - \\frac{1}{x_1}$. With the real object distance $x_1 = -20\\text{ cm}$ and the real image distance $x_2 = 20\\text{ cm}$, we have: $\\frac{1}{f} = \\frac{1}{20} - \\frac{1}{-20} = \\frac{2}{20} = \\frac{1}{10}\\text{ cm}^{-1} \\implies f = 10\\text{ cm}$.',
          ro: 'Folosind formula lentilelor subțiri: $\\frac{1}{f} = \\frac{1}{x_2} - \\frac{1}{x_1}$. Având distanța obiectului real $x_1 = -20\\text{ cm}$ și distanța imaginii reale $x_2 = 20\\text{ cm}$, obținem: $\\frac{1}{f} = \\frac{1}{20} - \\frac{1}{-20} = \\frac{2}{20} = \\frac{1}{10}\\text{ cm}^{-1} \\implies f = 10\\text{ cm}$.',
        },
      },
      {
        id: 'opt-q2',
        type: 'numerical',
        question: {
          en: 'A ray of light travels from an unknown medium towards air (refractive index $n = 1$). If the critical angle for total internal reflection is $30^\\circ$, what is the refractive index of the unknown medium?',
          ro: 'O rază de lumină călătorește dintr-un mediu necunoscut spre aer (indice de refracție $n = 1$). Dacă unghiul limită pentru reflexia totală este de $30^\\circ$, care este indicele de refracție al mediului necunoscut?',
        },
        correctValue: 2,
        tolerance: 0.05,
        unit: '',
        explanation: {
          en: 'The critical angle $l$ is given by $\\sin(l) = \\frac{n_{air}}{n_{medium}}$. Since $n_{air} = 1$ and $l = 30^\\circ$, we have $\\sin(30^\\circ) = \\frac{1}{n_{medium}} \\implies 0.5 = \\frac{1}{n_{medium}} \\implies n_{medium} = 2$.',
          ro: 'Unghiul limită $l$ este dat de relația $\\sin(l) = \\frac{n_{aer}}{n_{mediu}}$. Deoarece $n_{aer} = 1$ și $l = 30^\\circ$, avem $\\sin(30^\\circ) = \\frac{1}{n_{mediu}} \\implies 0,5 = \\frac{1}{n_{mediu}} \\implies n_{mediu} = 2$.',
        },
      },
      {
        id: 'opt-q3',
        type: 'multiple-choice',
        question: {
          en: 'Two thin lenses with optical powers of $+3\\text{ diopters}$ and $-1\\text{ diopters}$ are placed in close contact. The resulting lens system is:',
          ro: 'Două lentile subțiri cu convergențele de $+3\\text{ dioptrii}$ și $-1\\text{ dioptrii}$ sunt puse în contact strâns. Sistemul de lentile rezultat este:',
        },
        options: {
          en: [
            'A converging lens system with an equivalent power of +2 diopters',
            'A diverging lens system with an equivalent power of -2 diopters',
            'A converging lens system with an equivalent power of +4 diopters',
            'A diverging lens system with an equivalent power of -4 diopters',
          ],
          ro: [
            'Un sistem convergent de lentile cu o convergență echivalentă de +2 dioptrii',
            'Un sistem divergent de lentile cu o convergență echivalentă de -2 dioptrii',
            'Un sistem convergent de lentile cu o convergență echivalentă de +4 dioptrii',
            'Un sistem divergent de lentile cu o convergență echivalentă de -4 dioptrii',
          ],
        },
        correctOptionIndex: 0,
        explanation: {
          en: 'For lenses in contact, the equivalent optical power is the sum of the individual optical powers: $C_{eq} = C_1 + C_2 = 3\\text{ dpt} + (-1\\text{ dpt}) = +2\\text{ diopters}$. Since the power is positive, the system acts as a converging lens system.',
          ro: 'Pentru lentile în contact, convergența echivalentă este suma convergențelor individuale: $C_{eq} = C_1 + C_2 = 3\\text{ dpt} + (-1\\text{ dpt}) = +2\\text{ dioptrii}$. Deoarece convergența este pozitivă, sistemul se comportă ca un sistem de lentile convergent.',
        },
      },
      {
        id: 'opt-q4',
        type: 'numerical',
        question: {
          en: "In a Young's double-slit experiment, the distance between the slits is $1\\text{ mm}$ and the distance from the slits to the screen is $2\\text{ m}$. If the light source has a wavelength of $500\\text{ nm}$, what is the fringe spacing (interfringe) on the screen in millimeters?",
          ro: 'În experimentul fantei duble al lui Young, distanța dintre fante este de $1\\text{ mm}$, iar distanța de la fante la ecran este de $2\\text{ m}$. Dacă sursa de lumină are o lungime de undă de $500\\text{ nm}$, care este interfranja pe ecran în milimetri?',
        },
        correctValue: 1,
        tolerance: 0.05,
        unit: 'mm',
        explanation: {
          en: 'The fringe spacing (interfringe) is given by $\\Delta i = \\frac{\\lambda D}{2l}$. Converting the units: $\\lambda = 500 \\times 10^{-9}\\text{ m}$, $D = 2\\text{ m}$, and $2l = 10^{-3}\\text{ m}$. Thus, $\\Delta i = \\frac{500 \\times 10^{-9} \\cdot 2}{10^{-3}} = 10^{-3}\\text{ m} = 1\\text{ mm}$.',
          ro: 'Interfranja este dată de relația $\\Delta i = \\frac{\\lambda D}{2l}$. Transformând unitățile de măsură: $\\lambda = 500 \\times 10^{-9}\\text{ m}$, $D = 2\\text{ m}$ și $2l = 10^{-3}\\text{ m}$. Astfel, $\\Delta i = \\frac{500 \\times 10^{-9} \\cdot 2}{10^{-3}} = 10^{-3}\\text{ m} = 1\\text{ mm}$.',
        },
      },
      {
        id: 'opt-q5',
        type: 'multiple-choice',
        question: {
          en: 'The phenomenon that unambiguously demonstrates the transverse wave nature of light (and cannot occur with longitudinal waves like sound) is:',
          ro: 'Fenomenul care demonstrează fără echivoc natura de undă transversală a luminii (și care nu poate avea loc în cazul undelor longitudinele, cum ar fi sunetul) este:',
        },
        options: {
          en: [
            'Reflection',
            'Refraction',
            'Interference',
            'Polarization',
          ],
          ro: [
            'Reflexia',
            'Refracția',
            'Interferența',
            'Polarizarea',
          ],
        },
        correctOptionIndex: 3,
        explanation: {
          en: 'Polarization restricts the oscillations of a wave to a specific direction perpendicular to the direction of propagation. This can only happen for transverse waves. Longitudinal waves (like sound) oscillate along the direction of propagation and cannot be polarized.',
          ro: 'Polarizarea limitează oscilațiile unei unde la o direcție specifică perpendiculară pe direcția de propagare. Acest lucru se poate întâmpla doar pentru undele transversale. Undele longitudinale (cum ar fi sunetul) oscilează de-a lungul direcției de propagare și nu pot fi polarizate.',
        },
      },
    ],
  },
];
