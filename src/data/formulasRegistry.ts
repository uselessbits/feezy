import type { Language } from './types';

export interface FormulaDetails {
  name: Record<Language, string>;
  variables: Record<Language, string[]>;
  theory: Record<Language, string>;
}

// Normalized key lookup to prevent spacing/backslash mismatch issues
export function normalizeFormulaKey(key: string): string {
  return key
    .replace(/\s+/g, '')        // remove all whitespace
    .replace(/\\+/g, '/')       // convert backslashes to slashes
    .replace(/[·•*]/g, '')      // remove multiplication dots/stars
    .replace(/[()]/g, '')       // remove parentheses for relaxed matching
    .toLowerCase()
    .trim();
}

export const formulasRegistry: Record<string, FormulaDetails> = {
  // --- OPTICS ---
  [normalizeFormulaKey('i = r')]: {
    name: {
      en: 'Law of Reflection',
      ro: 'Legea Reflexiei',
    },
    variables: {
      en: [
        '$i$ = angle of incidence (angle between the incident ray and the surface normal)',
        '$r$ = angle of reflection (angle between the reflected ray and the surface normal)',
      ],
      ro: [
        '$i$ = unghiul de incidență (format de raza incidentă cu normala la suprafață)',
        '$r$ = unghiul de reflexie (format de raza reflectată cu normala la suprafață)',
      ],
    },
    theory: {
      en: 'The law of reflection states that when a light ray hits a reflective surface, the angle of incidence is equal to the angle of reflection ($i = r$). Furthermore, the incident ray, the reflected ray, and the normal to the surface at the point of incidence all lie in the same plane. This behavior can be derived from Huygens\' Principle of wave fronts or Fermat\'s Principle of Least Time.',
      ro: 'Legea reflexiei afirmă că atunci când o rază de lumină întâlnește o suprafață reflectantă, unghiul de incidență este egal cu unghiul de reflexie ($i = r$). De asemenea, raza incidentă, raza reflectată și normala la suprafață în punctul de incidență se găsesc în același plan. Acest comportament poate fi dedus din Principiul lui Huygens pentru fronturile de undă sau din Principiul lui Fermat al timpului minim.',
    },
  },

  [normalizeFormulaKey('n_1 \\sin(i) = n_2 \\sin(r)')]: {
    name: {
      en: "Snell's Law of Refraction",
      ro: 'Legea Refracției (Legea lui Snell)',
    },
    variables: {
      en: [
        '$n_1$ = refractive index of the first medium',
        '$n_2$ = refractive index of the second medium',
        '$i$ = angle of incidence',
        '$r$ = angle of refraction',
      ],
      ro: [
        '$n_1$ = indicele de refracție al primului mediu',
        '$n_2$ = indicele de refracție al celui de-al doilea mediu',
        '$i$ = unghiul de incidență',
        '$r$ = unghiul de refracție',
      ],
    },
    theory: {
      en: "Snell's Law describes how a light wave bends when passing from one transparent medium to another. It states that the ratio of the sines of the angles of incidence and refraction is equivalent to the ratio of phase velocities in the two media, or opposite to the ratio of the indices of refraction. This is a direct consequence of Fermat's Principle: light travels along the path that minimizes travel time, which bends the light toward the normal in slower media (higher refractive index).",
      ro: "Legea lui Snell descrie modul în care o rază de lumină se îndoaie la trecerea dintr-un mediu transparent în altul. Aceasta arată că raportul dintre sinusul unghiului de incidență și sinusul unghiului de refracție este egal cu raportul invers al indicilor de refracție ai celor două medii. Este o consecință directă a Principiului lui Fermat: lumina alege drumul care minimizează timpul de propagare, ceea ce face ca raza să se apropie de normală în medii mai lente (cu indice de refracție mai mare).",
    },
  },

  [normalizeFormulaKey('n = c / v')]: {
    name: {
      en: 'Absolute Refractive Index',
      ro: 'Indicele de Refracție Absolut',
    },
    variables: {
      en: [
        '$n$ = refractive index of the medium (dimensionless)',
        '$c$ = speed of light in vacuum (approx. $3 \\times 10^8\\text{ m/s}$)',
        '$v$ = phase velocity of light in the medium',
      ],
      ro: [
        '$n$ = indicele de refracție al mediului (adimensional)',
        '$c$ = viteza luminii în vid (aprox. $3 \\times 10^8\\text{ m/s}$)',
        '$v$ = viteza de fază a luminii în mediul respectiv',
      ],
    },
    theory: {
      en: 'The absolute refractive index of a medium is a measure of how much the speed of light is reduced inside that medium compared to a vacuum. Because light interacts with the electrons of the material, it propagates slower ($v < c$), making $n \\ge 1$ for all material media.',
      ro: 'Indicele de refracție absolut al unui mediu măsoară de câte ori viteza luminii este mai mică în acel mediu decât în vid. Deoarece lumina interacționează cu electronii din atomii materialului, ea se propagă mai lent ($v < c$), ceea ce face ca $n \\ge 1$ pentru orice mediu material.',
    },
  },

  [normalizeFormulaKey('\\sin(l) = n_2 / n_1')]: {
    name: {
      en: 'Critical Angle for Total Internal Reflection',
      ro: 'Unghiul Limită pentru Reflexia Totală',
    },
    variables: {
      en: [
        '$l$ = critical angle (limit angle)',
        '$n_1$ = refractive index of the optically denser medium (from which light originates)',
        '$n_2$ = refractive index of the optically less dense medium ($n_2 < n_1$)',
      ],
      ro: [
        '$l$ = unghiul limită',
        '$n_1$ = indicele de refracție al mediului mai dens optic (din care provine lumina)',
        '$n_2$ = indicele de refracție al mediului mai puțin dens ($n_2 < n_1$)',
      ],
    },
    theory: {
      en: "When light travels from a medium with a higher refractive index ($n_1$) to a lower one ($n_2$), it bends away from the normal. At a specific angle of incidence, called the critical angle ($l$), the angle of refraction becomes $90^\\circ$, and the refracted ray travels along the boundary interface. Setting $r = 90^\\circ$ in Snell's Law ($n_1 \\sin(l) = n_2 \\sin(90^\\circ)$) yields $\\sin(l) = n_2/n_1$. For any incidence angle $i > l$, no light is transmitted; it is entirely reflected back into the denser medium.",
      ro: "Când lumina trece dintr-un mediu mai dens optic ($n_1$) într-unul mai puțin dens ($n_2$), raza refractată se depărtează de normală. La un anumit unghi de incidență, numit unghi limită ($l$), unghiul de refracție devine $90^\\circ$, iar raza refractată se propagă de-a lungul suprafeței de separare. Introducând $r = 90^\\circ$ în legea lui Snell ($n_1 \\sin(l) = n_2 \\sin(90^\\circ)$) obținem $\\sin(l) = n_2/n_1$. Pentru orice unghi de incidență $i > l$, lumina nu se mai refractă, ci se reflectă integral înapoi în primul mediu.",
    },
  },

  [normalizeFormulaKey('\\frac{1}{f} = \\frac{1}{x_2} - \\frac{1}{x_1}')]: {
    name: {
      en: 'Thin Lens Equation (Conjugate Points)',
      ro: 'Formula Lentilelor Subțiri (Puncte Conjugate)',
    },
    variables: {
      en: [
        '$f$ = focal length of the lens',
        '$x_1$ = position coordinate of the object along the optical axis (usually negative in sign conventions)',
        '$x_2$ = position coordinate of the image along the optical axis',
      ],
      ro: [
        '$f$ = distanța focală a lentilei',
        '$x_1$ = coordonata de poziție a obiectului pe axa optică (negativă în convenția standard de semne)',
        '$x_2$ = coordonata de poziție a imaginii pe axa optică',
      ],
    },
    theory: {
      en: 'The thin lens formula relates the focal length of a lens to the distances of the object and the formed image from the optical center. Derived using geometric similarities of light rays passing through the focal points and optical center, it is valid under paraxial approximations (rays close to the optical axis). Note the sign convention: $x_1$ is negative for real objects, and $x_2$ is positive for real images.',
      ro: 'Formula lentilelor subțiri leagă distanța focală a lentilei de coordonatele poziției obiectului și imaginii față de centrul optic. Deducerea se bazează pe asemănarea triunghiurilor formate de razele de lumină ce trec prin focare și prin centrul optic, sub aproximația paraxială (raze aproape de axul optic). Atenție la convenția de semne: $x_1$ este negativ pentru obiecte reale, iar $x_2$ este pozitiv pentru imagini reale.',
    },
  },

  [normalizeFormulaKey('C = \\frac{1}{f}')]: {
    name: {
      en: 'Optical Power',
      ro: 'Convergența Lentilei (Puterea Optică)',
    },
    variables: {
      en: [
        '$C$ = optical power (convergency), measured in Diopters ($\\text{m}^{-1}$)',
        '$f$ = focal length of the lens (must be in meters)',
      ],
      ro: [
        '$C$ = convergența lentilei, măsurată în Dioptrii ($\\text{m}^{-1}$)',
        '$f$ = distanța focală a lentilei (exprimată obligatoriu în metri)',
      ],
    },
    theory: {
      en: 'Optical power measures a lens\'s ability to refract and bend light. A shorter focal length means the lens bends light rays more sharply, corresponding to a higher absolute optical power. Converging lenses have positive power ($C > 0$), while diverging lenses have negative power ($C < 0$).',
      ro: 'Convergența măsoară capacitatea unei lentile de a devia razele de lumină. O distanță focală mai scurtă înseamnă că lentila deviază razele mai puternic, ceea ce corespunde unei convergențe absolute mai mari. Lentilele convergente au convergență pozitivă ($C > 0$), iar cele divergente au convergență negativă ($C < 0$).',
    },
  },

  [normalizeFormulaKey('\\beta = \\frac{x_2}{x_1}')]: {
    name: {
      en: 'Linear Magnification',
      ro: 'Mărirea Liniară Transversală',
    },
    variables: {
      en: [
        '$\\beta$ = linear magnification (dimensionless)',
        '$x_1$ = object coordinate position',
        '$x_2$ = image coordinate position',
      ],
      ro: [
        '$\\beta$ = mărirea liniară transversală (adimensională)',
        '$x_1$ = coordonata obiectului',
        '$x_2$ = coordonata imaginii',
      ],
    },
    theory: {
      en: 'Linear magnification is the ratio of the image height to the object height ($y_2 / y_1$). From similar triangles formed by the chief ray passing straight through the optical center of the lens, this ratio is equal to $x_2 / x_1$. If $\\beta < 0$, the image is inverted; if $\\beta > 0$, the image is upright.',
      ro: 'Mărirea liniară transversală este raportul dintre înălțimea imaginii și înălțimea obiectului ($y_2 / y_1$). Din asemănarea triunghiurilor determinate de raza care trece prin centrul optic al lentilei fără abatere, acest raport se demonstrează a fi egal cu $x_2 / x_1$. Dacă $\\beta < 0$, imaginea este răsturnată; dacă $\\beta > 0$, imaginea este dreaptă.',
    },
  },

  [normalizeFormulaKey('C_{eq} = C_1 + C_2')]: {
    name: {
      en: 'Equivalent Power of Lenses in Contact',
      ro: 'Convergența Echivalentă a Lentilelor Alipite',
    },
    variables: {
      en: [
        '$C_{eq}$ = equivalent optical power of the system',
        '$C_1, C_2$ = individual optical powers of the two thin lenses placed in contact',
      ],
      ro: [
        '$C_{eq}$ = convergența echivalentă a sistemului de lentile',
        '$C_1, C_2$ = convergențele individuale ale celor două lentile subțiri alipite',
      ],
    },
    theory: {
      en: 'When two thin lenses are placed in close contact, the focal deviations add up linearly. The image formed by the first lens acts as the virtual object for the second lens. Applying the thin lens equation successively yields that the total equivalent optical power is the sum of the individual powers ($C_{eq} = C_1 + C_2$).',
      ro: 'Când două lentile subțiri sunt lipite strâns una de cealaltă, abaterile lor convergente se adună liniar. Imaginea formată de prima lentilă devine obiect virtual pentru cea de-a doua. Aplicând succesiv formula lentilelor subțiri rezultă că puterea optică totală (convergența echivalentă) este suma algebrică a convergențelor individuale.',
    },
  },

  [normalizeFormulaKey('\\Delta i = \\frac{\\lambda D}{2l}')]: {
    name: {
      en: 'Interfringe Spacing (Young\'s Double Slit)',
      ro: 'Interfranja (Dispozitivul Young)',
    },
    variables: {
      en: [
        '$\\Delta i$ = distance between two consecutive bright or dark fringes',
        '$\\lambda$ = wavelength of light',
        '$D$ = distance from the double slit plane to the screen',
        '$2l$ = distance between the two coherent source slits',
      ],
      ro: [
        '$\\Delta i$ = interfranja (distanța dintre două maxime sau minime consecutive)',
        '$\\lambda$ = lungimea de undă a luminii',
        '$D$ = distanța de la planul fantelor la ecran',
        '$2l$ = distanța dintre cele două fante (surse coerente)',
      ],
    },
    theory: {
      en: 'Interfringe spacing measures the width of the interference bands formed on a screen due to light wave superposition from two coherent slits. Derived by calculating path difference under paraxial approximations ($2l \\ll D$), it shows that interference fringes are wider for larger wavelengths or longer screen distances, and narrower when source slits are spaced further apart.',
      ro: 'Interfranja reprezintă lățimea benzilor de interferență obținute pe ecran prin suprapunerea undelor luminoase coerente emise de cele două fante. Deducerea se face calculând diferența de drum optic în aproximația unghiurilor mici ($2l \\ll D$). Ea arată că franjele sunt mai distanțate pentru lungimi de undă mai mari sau distanțe mai mari până la ecran, și mai strânse dacă sursele sunt mai depărtate.',
    },
  },

  [normalizeFormulaKey('\\delta = d \\sin(\\theta)')]: {
    name: {
      en: 'Optical Path Difference',
      ro: 'Diferența de Drum Optic',
    },
    variables: {
      en: [
        '$\\delta$ = optical path difference',
        '$d$ = slit spacing (distance between adjacent slits)',
        '$\\theta$ = diffraction/observation angle',
      ],
      ro: [
        '$\\delta$ = diferența de drum optic',
        '$d$ = distanța dintre două fante succesive',
        '$\\theta$ = unghiul de difracție/observație',
      ],
    },
    theory: {
      en: 'When light waves travel from two different slits at an angle $\\theta$ toward a distant screen, they travel different distances. The extra geometric distance covered by the lower wave is $d \\sin(\\theta)$. This path difference determines the phase shift between waves and whether they interfere constructively (bright fringes) or destructively (dark fringes).',
      ro: 'Când undele luminoase pleacă din două fante vecine sub un unghi $\\theta$ spre un ecran îndepărtat, ele parcurg distanțe diferite. Drumul suplimentar parcurs de unda de jos este $d \\sin(\\theta)$. Această diferență determină decalajul de fază dintre unde și stabilește dacă interferența este constructivă (maxim) sau distructivă (minim).',
    },
  },

  [normalizeFormulaKey('d \\sin(\\theta) = k \\lambda')]: {
    name: {
      en: 'Diffraction Grating Maxima',
      ro: 'Condiția de Maxim pentru Rețeaua de Difracție',
    },
    variables: {
      en: [
        '$d$ = grating constant (distance between slit centers)',
        '$\\theta$ = angle of diffraction maxima',
        '$k$ = diffraction order integer ($0, \\pm 1, \\pm 2, \\dots$)',
        '$\\lambda$ = wavelength of light',
      ],
      ro: [
        '$d$ = constanta rețelei (distanța dintre centrele a două fante vecine)',
        '$\\theta$ = unghiul maximelor de difracție',
        '$k$ = ordinul maximului (număr întreg $0, \\pm 1, \\pm 2, \\dots$)',
        '$\\lambda$ = lungimea de undă a luminii',
      ],
    },
    theory: {
      en: 'A diffraction grating consists of many closely spaced parallel slits. Principal intensity maxima occur in directions where waves from all adjacent slits arrive in phase. This constructive interference condition requires that the path difference between adjacent slits, $d \\sin(\\theta)$, must be an integer multiple of the wavelength ($k \\lambda$).',
      ro: 'O rețea de difracție este formată dintr-un număr mare de fante paralele foarte apropiate. Maximele principale de intensitate apar în direcțiile în care undele de la toate fantele vecine sosesc în fază. Această condiție de interferență constructivă cere ca diferența de drum dintre fante adiacente, $d \\sin(\\theta)$, să fie un multiplu întreg al lungimii de undă ($k \\lambda$).',
    },
  },

  // --- THERMODYNAMICS ---
  [normalizeFormulaKey('N = n * N_A')]: {
    name: {
      en: 'Number of Particles and Moles',
      ro: 'Relația dintre Numărul de Particule și de Moli',
    },
    variables: {
      en: [
        '$N$ = total number of particles (atoms or molecules)',
        '$n$ = amount of substance in moles',
        '$N_A$ = Avogadro\'s constant (approx. $6.022 \\times 10^{23}\\text{ mol}^{-1}$)',
      ],
      ro: [
        '$N$ = numărul total de particule (atomi sau molecule)',
        '$n$ = cantitatea de substanță exprimată în moli',
        '$N_A$ = numărul lui Avogadro (aprox. $6.022 \\times 10^{23}\\text{ mol}^{-1}$)',
      ],
    },
    theory: {
      en: 'This formula bridges the microscopic and macroscopic descriptions of matter. One mole is defined as the amount of substance containing exactly Avogadro\'s number ($N_A$) of particles. Therefore, the total number of particles is directly proportional to the amount in moles.',
      ro: 'Această formulă face legătura între descrierea microscopică și macroscopică a materiei. Un mol este definit ca acea cantitate de substanță care conține exact numărul lui Avogadro ($N_A$) de particule. Astfel, numărul total de particule este direct proporțional cu cantitatea de substanță exprimată în moli.',
    },
  },

  [normalizeFormulaKey('PV = nRT')]: {
    name: {
      en: 'Ideal Gas Law (Equation of State)',
      ro: 'Ecuația de Stare a Gazului Ideal (Clapeyron-Mendeleev)',
    },
    variables: {
      en: [
        '$P$ = absolute pressure of the gas (Pa)',
        '$V$ = volume of the gas ($\\text{m}^3$)',
        '$n$ = number of moles',
        '$R$ = universal gas constant (approx. $8.314\\text{ J/(mol}\\cdot\\text{K)}$)',
        '$T$ = absolute temperature in Kelvin',
      ],
      ro: [
        '$P$ = presiunea absolută a gazului (Pa)',
        '$V$ = volumul ocupat de gaz ($\\text{m}^3$)',
        '$n$ = numărul de moli',
        '$R$ = constanta universală a gazelor (aprox. $8.314\\text{ J/(mol}\\cdot\\text{K)}$)',
        '$T$ = temperatura absolută în Kelvin',
      ],
    },
    theory: {
      en: 'The ideal gas law is an equation of state that describes the relationship between pressure, volume, temperature, and quantity of an ideal gas. It combines several empirical laws: Boyle\'s Law (isothermal), Charles\'s Law (isobaric), Gay-Lussac\'s Law (isochoric), and Avogadro\'s Law. It assumes non-interacting point particles undergoing elastic collisions.',
      ro: 'Ecuația de stare a gazului ideal descrie legătura dintre presiune, volum, temperatură și numărul de moli pentru un gaz ideal. Ea reunește legile empirice: legea Boyle-Mariotte (izotermă), legea lui Charles (izobară), legea Gay-Lussac (izocoră) și legea lui Avogadro. Aceasta presupune particule punctiforme care nu interacționează între ele și se ciocnesc perfect elastic.',
    },
  },

  [normalizeFormulaKey('P = ρRT/M')]: {
    name: {
      en: 'Ideal Gas Law in Terms of Density',
      ro: 'Ecuația de Stare în funcție de Densitate',
    },
    variables: {
      en: [
        '$P$ = pressure of the gas',
        '$\\rho$ = density of the gas ($m / V$)',
        '$R$ = universal gas constant',
        '$T$ = absolute temperature',
        '$M$ = molar mass of the gas',
      ],
      ro: [
        '$P$ = presiunea gazului',
        '$\\rho$ = densitatea gazului ($m / V$)',
        '$R$ = constanta universală a gazelor',
        '$T$ = temperatura absolută',
        '$M$ = masa molară a gazului',
      ],
    },
    theory: {
      en: 'Substituting $n = m/M$ into the ideal gas law ($PV = nRT$) yields $PV = (m/M)RT$. Dividing both sides by $V$ and substituting the mass density $\\rho = m/V$ gives $P = \\rho RT / M$. This form is particularly useful in meteorology and aerodynamics to describe the state of the atmosphere without knowing the total volume.',
      ro: 'Substituind $n = m/M$ în ecuația de stare ($PV = nRT$) rezultă $PV = (m/M)RT$. Împărțind ambele părți la volumul $V$ și înlocuind densitatea $\\rho = m/V$ se obține $P = \\rho RT / M$. Această formă este foarte utilă în meteorologie și aerodinamică pentru a descrie starea atmosferei fără a cunoaște volumul total de gaz.',
    },
  },

  [normalizeFormulaKey('p1V1/T1 = p2V2/T2')]: {
    name: {
      en: 'Combined Gas Law',
      ro: 'Ecuația Transformării Generale',
    },
    variables: {
      en: [
        '$p_1, V_1, T_1$ = initial pressure, volume, and absolute temperature',
        '$p_2, V_2, T_2$ = final pressure, volume, and absolute temperature',
      ],
      ro: [
        '$p_1, V_1, T_1$ = presiunea, volumul și temperatura absolută în starea inițială',
        '$p_2, V_2, T_2$ = presiunea, volumul și temperatura absolută în starea finală',
      ],
    },
    theory: {
      en: 'For a constant mass of gas (where $n$ is constant), the ratio $PV/T$ remains constant ($PV/T = nR = \\text{const}$). This combined gas law is used to compute the properties of a gas when it undergoes a change of state from state 1 to state 2.',
      ro: 'Pentru o masă constantă de gaz (unde $n$ este constant), raportul $PV/T$ rămâne constant ($PV/T = nR = \\text{const}$). Această ecuație permite determinarea parametrilor unui gaz atunci când acesta trece printr-o transformare din starea inițială 1 în starea finală 2.',
    },
  },

  [normalizeFormulaKey('W = P*ΔV')]: {
    name: {
      en: 'Isobaric Work',
      ro: 'Lucrul Mecanic în Transformare Izobară',
    },
    variables: {
      en: [
        '$W$ = work done by the gas (J)',
        '$P$ = constant pressure (Pa)',
        '$\\Delta V$ = change in volume ($V_{\\text{final}} - V_{\\text{initial}}$)',
      ],
      ro: [
        '$W$ = lucrul mecanic efectuat de gaz (J)',
        '$P$ = presiunea constantă (Pa)',
        '$\\Delta V$ = variația de volum ($V_{\\text{final}} - V_{\\text{initial}}$)',
      ],
    },
    theory: {
      en: 'Mechanical work is defined geometrically as the integral of pressure over volume change ($W = \\int P dV$). For an isobaric process, the pressure $P$ is constant and can be taken out of the integral, simplifying the equation to $W = P\\Delta V$. If the gas expands ($\\Delta V > 0$), it performs positive work on the surroundings. If it contracts ($\\Delta V < 0$), work is done on the gas.',
      ro: 'Lucrul mecanic este definit geometric ca integrala presiunii în raport cu variația de volum ($W = \\int P dV$). În cazul unei transformări izobare, presiunea $P$ fiind constantă poate fi scoasă de sub integrală, ecuația simplificându-se la $W = P\\Delta V$. Dacă gazul se destinde ($\\Delta V > 0$), el efectuează lucru mecanic pozitiv. Dacă gazul se comprimă ($\\Delta V < 0$), lucrul mecanic este negativ (efectuat din exterior asupra gazului).',
    },
  },

  [normalizeFormulaKey('W = nR*ΔT')]: {
    name: {
      en: 'Isobaric Work in Terms of Temperature',
      ro: 'Lucrul Mecanic Izobar în funcție de Temperatură',
    },
    variables: {
      en: [
        '$W$ = work done by the gas',
        '$n$ = number of moles',
        '$R$ = universal gas constant',
        '$\\Delta T$ = change in absolute temperature ($T_2 - T_1$)',
      ],
      ro: [
        '$W$ = lucrul mecanic efectuat de gaz',
        '$n$ = numărul de moli',
        '$R$ = constanta universală a gazelor',
        '$\\Delta T$ = variația temperaturii absolute ($T_2 - T_1$)',
      ],
    },
    theory: {
      en: 'This is derived by applying the ideal gas law ($PV = nRT$) to the isobaric work formula. Since $P$ is constant, we have $P V_2 = n R T_2$ and $P V_1 = n R T_1$. Subtracting the equations gives $P(V_2 - V_1) = n R (T_2 - T_1)$, which directly proves $W = nR\\Delta T$.',
      ro: 'Această relație se obține prin aplicarea ecuației de stare a gazului ideal ($PV = nRT$) formulei lucrului mecanic izobar. Întrucât $P$ este constantă, avem $P V_2 = n R T_2$ și $P V_1 = n R T_1$. Scăzând cele două relații rezultă $P(V_2 - V_1) = n R (T_2 - T_1)$, ceea ce demonstrează că $W = nR\\Delta T$.',
    },
  },

  [normalizeFormulaKey('U = 3/2nRT')]: {
    name: {
      en: 'Internal Energy of a Monoatomic Ideal Gas',
      ro: 'Energia Internă a Gazului Ideal Monoatomic',
    },
    variables: {
      en: [
        '$U$ = internal energy of the gas (J)',
        '$n$ = number of moles',
        '$R$ = universal gas constant',
        '$T$ = absolute temperature',
      ],
      ro: [
        '$U$ = energia internă a gazului (J)',
        '$n$ = numărul de moli',
        '$R$ = constanta universală a gazelor',
        '$T$ = temperatura absolută',
      ],
    },
    theory: {
      en: 'According to the kinetic theory of gases, the internal energy of an ideal gas represents the sum of the kinetic energies of all its individual particles. For a monoatomic gas, each atom has 3 translational degrees of freedom, each contributing $\\frac{1}{2} k_B T$ to the average kinetic energy (equipartition theorem). Summing over $N$ particles gives $U = \\frac{3}{2} N k_B T = \\frac{3}{2} n R T$.',
      ro: 'Conform teoriei cinetico-moleculare, energia internă a unui gaz ideal reprezintă suma energiilor cinetice de mișcare termică ale tuturor particulelor. Pentru un gaz monoatomic, fiecare atom are 3 grade de libertate de translație, fiecare grad având o energie medie de $\\frac{1}{2} k_B T$ (teorema echipartiției energiei). Însumând pentru toate cele $N$ particule obținem $U = \\frac{3}{2} N k_B T = \\frac{3}{2} n R T$.',
    },
  },

  [normalizeFormulaKey('ΔU = Q - W')]: {
    name: {
      en: 'First Law of Thermodynamics (Standard)',
      ro: 'Principiul I al Termodinamicii (Standard)',
    },
    variables: {
      en: [
        '$\\Delta U$ = change in internal energy',
        '$Q$ = heat exchanged with the surroundings',
        '$W$ = work done by the system',
      ],
      ro: [
        '$\\Delta U$ = variația energiei interne',
        '$Q$ = căldura schimbată de sistem',
        '$W$ = lucrul mecanic efectuat de sistem',
      ],
    },
    theory: {
      en: 'The First Law of Thermodynamics is a statement of the conservation of energy. It states that the change in internal energy of a closed system ($\\Delta U$) equals the heat added to the system ($Q$) minus the thermodynamic work done by the system on its surroundings ($W$).',
      ro: 'Principiul I al termodinamicii exprimă legea conservării energiei pentru sistemele termodinamice. El afirmă că variația energiei interne a unui sistem închis ($\\Delta U$) este egală cu căldura primită de sistem ($Q$) din care se scade lucrul mecanic efectuat de sistem asupra exteriorului ($W$).',
    },
  },

  [normalizeFormulaKey('Q = ΔU + W')]: {
    name: {
      en: 'First Law of Thermodynamics (Energy Input Form)',
      ro: 'Principiul I al Termodinamicii (Forma Conservării)',
    },
    variables: {
      en: [
        '$Q$ = heat received by the system',
        '$\\Delta U$ = change in internal energy',
        '$W$ = work performed by the system',
      ],
      ro: [
        '$Q$ = căldura primită de sistem',
        '$\\Delta U$ = variația energiei interne a sistemului',
        '$W$ = lucrul mecanic efectuat de sistem',
      ],
    },
    theory: {
      en: 'This is a rearrangement of the standard conservation equation ($Q = \\Delta U + W$). It describes that the heat energy absorbed by a system ($Q$) is converted into two forms: increasing the internal thermal energy of its particles ($\\Delta U$) and doing external mechanical work ($W$) by expanding against pressure.',
      ro: 'Aceasta reprezintă o rearanjare a principiului conservării energiei ($Q = \\Delta U + W$). Ea arată că energia sub formă de căldură absorbită de un sistem ($Q$) este folosită în două scopuri: creșterea energiei termice interne a particulelor ($\\Delta U$) și efectuarea de lucru mecanic extern ($W$) prin destindere.',
    },
  },

  [normalizeFormulaKey('η = W/Q_in')]: {
    name: {
      en: 'Thermal Efficiency',
      ro: 'Randamentul Motorului Termic',
    },
    variables: {
      en: [
        '$\\eta$ = thermal efficiency (dimensionless ratio, $0 < \\eta < 1$)',
        '$W$ = net mechanical work output performed by the engine',
        '$Q_{in}$ = total heat absorbed from the hot reservoir',
      ],
      ro: [
        '$\\eta$ = randamentul motorului termic (adimensional, $0 < \\eta < 1$)',
        '$W$ = lucrul mecanic util efectuat de motor',
        '$Q_{in}$ = căldura primită de la sursa caldă (notată deseori cu $Q_1$)',
      ],
    },
    theory: {
      en: 'The thermal efficiency of a heat engine is the ratio of the useful mechanical work output to the total heat energy input. According to the Second Law of Thermodynamics (Kelvin-Planck statement), it is impossible to construct a cycle that converts all absorbed heat into work; some heat must always be discarded to a cold reservoir, meaning $\\eta$ is always less than 1 (or 100%).',
      ro: 'Randamentul unui motor termic reprezintă raportul dintre lucrul mecanic util obținut și căldura consumată. Conform Principiului al II-lea al termodinamicii, este imposibil să se realizeze un motor care să transforme integral căldura absorbită în lucru mecanic; o parte din căldură trebuie cedată sursei reci, ceea ce înseamnă că randamentul este întotdeauna mai mic decât 1 (sau 100%).',
    },
  },

  [normalizeFormulaKey('η = 1 - T_c/T_h')]: {
    name: {
      en: 'Carnot Cycle Efficiency',
      ro: 'Randamentul Ciclului Carnot',
    },
    variables: {
      en: [
        '$\\eta$ = efficiency of a reversible Carnot engine',
        '$T_c$ = absolute temperature of the cold reservoir (Kelvin)',
        '$T_h$ = absolute temperature of the hot reservoir (Kelvin)',
      ],
      ro: [
        '$\\eta$ = randamentul ciclului Carnot reversibil',
        '$T_c$ = temperatura absolută a sursei reci (Kelvin)',
        '$T_h$ = temperatura absolută a sursei calde (Kelvin)',
      ],
    },
    theory: {
      en: 'The Carnot cycle consists of two isothermal processes and two adiabatic processes. Reversible in nature, Carnot\'s theorem states it represents the maximum possible efficiency for any heat engine operating between temperatures $T_h$ and $T_c$. The efficiency depends solely on the ratio of the absolute temperatures of the two reservoirs, rather than the working fluid.',
      ro: 'Ciclul Carnot este alcătuit din două transformări izoterme și două transformări adiabatice. Fiind un ciclu reversibil ideal, teorema lui Carnot arată că acesta oferă cel mai mare randament posibil pentru orice motor care funcționează între temperaturile extreme $T_h$ și $T_c$. Randamentul depinde exclusiv de temperaturile absolute ale surselor și este independent de natura agentului termic.',
    },
  },

  // --- CURRENT ELECTRICITY ---
  [normalizeFormulaKey('I = Δq / Δt')]: {
    name: {
      en: 'Electric Current Intensity',
      ro: 'Intensitatea Curentului Electric',
    },
    variables: {
      en: [
        '$I$ = electric current intensity, measured in Amperes (A)',
        '$\\Delta q$ = electric charge passing through the cross-section of a conductor (C)',
        '$\\Delta t$ = time duration (s)',
      ],
      ro: [
        '$I$ = intensitatea curentului electric, măsurată în Amperi (A)',
        '$\\Delta q$ = sarcina electrică ce traversează secțiunea transversală a conductorului (C)',
        '$\\Delta t$ = intervalul de timp (s)',
      ],
    },
    theory: {
      en: 'Electric current intensity is defined as the rate at which electric charge flows through a cross-sectional area of a conductor. If the flow of charge is steady, the current is constant over time, giving this algebraic relation. Microscopically, current is driven by the electric field forcing free charge carriers (like electrons in metals) to drift.',
      ro: 'Intensitatea curentului electric este o mărime fizică scalară ce măsoară sarcina electrică ce traversează secțiunea transversală a unui conductor în unitatea de timp. Dacă curentul este continuu, intensitatea are o valoare constantă în timp. Din punct de vedere microscopic, curentul este determinat de mișcarea ordonată a purtătorilor de sarcină liberi (electronii, în cazul metalelor) sub acțiunea unui câmp electric.',
    },
  },

  [normalizeFormulaKey('I = nqvA')]: {
    name: {
      en: 'Microscopic Description of Current',
      ro: 'Relația Micro-Macro pentru Intensitatea Curentului',
    },
    variables: {
      en: [
        '$I$ = electric current intensity',
        '$n$ = charge carrier concentration (number of carriers per cubic meter)',
        '$q$ = electric charge of a single carrier (e.g., $1.6 \\times 10^{-19}\\text{ C}$ for electrons)',
        '$v$ = drift velocity of the charge carriers',
        '$A$ = cross-sectional area of the conductor',
      ],
      ro: [
        '$I$ = intensitatea curentului electric',
        '$n$ = concentrația purtătorilor de sarcină (numărul lor în unitatea de volum)',
        '$q$ = sarcina electrică a unui purtător (ex. $1.6 \\times 10^{-19}\\text{ C}$ pentru electroni)',
        '$v$ = viteza medie de transport (viteza de drift) a purtătorilor',
        '$A$ = aria secțiunii transversale a conductorului',
      ],
    },
    theory: {
      en: 'This formula connects the macroscopic current $I$ to microscopic parameters inside the conductor. Consider a conductor segment of length $L = v \\Delta t$. The volume is $A \\cdot L$. The number of carriers is $N = n A v \\Delta t$. The total moving charge is $\\Delta q = N q = n q v A \\Delta t$. Dividing by $\\Delta t$ yields $I = nqvA$. It demonstrates that even though electrons move at a slow drift velocity ($v \\approx 10^{-4}\\text{ m/s}$), the massive concentration ($n \\approx 10^{28}\\text{ m}^{-3}$ in metals) creates high currents.',
      ro: 'Această formulă leagă intensitatea macroscopică $I$ de parametrii microscopici ai purtătorilor de sarcină din metal. Considerând un tronson de conductor de lungime $L = v \\Delta t$, volumul său este $A \\cdot L$. Numărul total de electroni din tronson este $N = n A v \\Delta t$. Sarcina totală ce trece prin secțiune în timpul $\\Delta t$ este $\\Delta q = N q = n q v A \\Delta t$. Împărțind la $\\Delta t$ rezultă $I = nqvA$. Formula arată că deși viteza de drift a electronilor este extrem de mică ($v \\approx 10^{-4}\\text{ m/s}$), curentul este mare datorită concentrației uriașe de electroni liberi ($n \\approx 10^{28}\\text{ m}^{-3}$).',
    },
  },

  [normalizeFormulaKey('U = W/q')]: {
    name: {
      en: 'Electric Voltage Definition',
      ro: 'Definiția Tensiunii Electrice',
    },
    variables: {
      en: [
        '$U$ = electric voltage (potential difference), in Volts (V)',
        '$W$ = work done by the electric field to move the charge $q$ between two points (J)',
        '$q$ = test electric charge (C)',
      ],
      ro: [
        '$U$ = tensiunea electrică (diferența de potențial), în Volți (V)',
        '$W$ = lucrul mecanic efectuat de forțele câmpului electric pentru a deplasa sarcina $q$ (J)',
        '$q$ = sarcina electrică deplasată (C)',
      ],
    },
    theory: {
      en: 'Electric voltage (or potential difference) between two points is a measure of the work required to move a unit charge from one point to another in an electrostatic field ($U = W/q$). It represents the change in electrical potential energy per unit charge.',
      ro: 'Tensiunea electrică între două puncte ale unui circuit măsoară lucrul mecanic efectuat de câmpul electric pentru a transporta unitatea de sarcină între cele două puncte ($U = W/q$). Aceasta reprezintă diferența de potențial dintre cele două capete ale circuitului.',
    },
  },

  [normalizeFormulaKey('R = ρl/A')]: {
    name: {
      en: 'Resistance of a Cylindrical Conductor',
      ro: 'Rezistența unui Conductor Cilindric',
    },
    variables: {
      en: [
        '$R$ = electrical resistance, measured in Ohms ($\\Omega$)',
        '$\\rho$ = electrical resistivity of the material ($\\Omega\\cdot\\text{m}$)',
        '$l$ = length of the conductor (m)',
        '$A$ = cross-sectional area ($\\text{m}^2$)',
      ],
      ro: [
        '$R$ = rezistența electrică a conductorului, măsurată în Ohmi ($\\Omega$)',
        '$\\rho$ = rezistivitatea electrică a materialului ($\\Omega\\cdot\\text{m}$)',
        '$l$ = lungimea conductorului (m)',
        '$A$ = aria secțiunii transversale a conductorului ($\\text{m}^2$)',
      ],
    },
    theory: {
      en: 'The resistance of a uniform conductor is proportional to its length (more collisions for electrons as they travel further) and inversely proportional to its cross-sectional area (more space for electrons to flow, equivalent to wider roads). The resistivity $\\rho$ is an intrinsic material property that depends on temperature and how strongly the material opposes charge flow.',
      ro: 'Rezistența electrică a unui conductor liniar este proporțională cu lungimea sa (electronii se ciocnesc de mai multe ori pe un drum mai lung) și invers proporțională cu aria secțiunii sale (o secțiune mai mare oferă mai mult spațiu de trecere electronilor). Rezistivitatea $\\rho$ este o proprietate intrinsecă a materialului care depinde de structura atomica și de temperatură.',
    },
  },

  [normalizeFormulaKey('U = IR')]: {
    name: {
      en: "Ohm's Law",
      ro: 'Legea lui Ohm pentru o porțiune de circuit',
    },
    variables: {
      en: [
        '$U$ = voltage applied across the conductor (V)',
        '$I$ = electric current (A)',
        '$R$ = electrical resistance of the conductor ($\\Omega$)',
      ],
      ro: [
        '$U$ = tensiunea la bornele conductorului (V)',
        '$I$ = intensitatea curentului electric (A)',
        '$R$ = rezistența electrică a conductorului ($\\Omega$)',
      ],
    },
    theory: {
      en: "Ohm's Law states that for many materials (referred to as ohmic materials), the electric current flowing through them is directly proportional to the applied voltage across their ends and inversely proportional to their electrical resistance ($I = U/R$, rearranged as $U = IR$). It assumes the temperature of the conductor remains constant.",
      ro: "Legea lui Ohm stabilește că intensitatea curentului ce străbate o porțiune de circuit este direct proporțională cu tensiunea aplicată la capetele acesteia și invers proporțională cu rezistența electrică a porțiunii respective ($I = U/R$, scrisă adesea $U = IR$). Este valabilă sub rezerva menținerii constante a temperaturii conductorului.",
    },
  },

  [normalizeFormulaKey('Σ I_in = Σ I_out')]: {
    name: {
      en: "Kirchhoff's Junction Rule (First Law)",
      ro: 'Prima Lege a lui Kirchhoff (Legea Nodurilor)',
    },
    variables: {
      en: [
        '$\\Sigma I_{in}$ = sum of currents entering the junction node',
        '$\\Sigma I_{out}$ = sum of currents leaving the junction node',
      ],
      ro: [
        '$\\Sigma I_{in}$ = suma intensităților curenților care intră în nod',
        '$\\Sigma I_{out}$ = suma intensităților curenților care ies din nod',
      ],
    },
    theory: {
      en: "Kirchhoff's first law is a statement of the conservation of electric charge. Since electric charge cannot accumulate or deplete at a circuit junction node, the total charge entering the node per unit time must equal the total charge leaving the node. Thus, the sum of incoming currents equals the sum of outgoing currents.",
      ro: "Prima lege a lui Kirchhoff reprezintă o consecință directă a legii conservării sarcinii electrice. Deoarece sarcina electrică nu se poate acumula și nici nu poate dispărea într-un nod de circuit, sarcina ce intră în nod în unitatea de timp trebuie să fie egală cu sarcina care părăsește nodul. Suma curenților care intră este egală cu suma celor care ies.",
    },
  },

  [normalizeFormulaKey('Σ U = 0')]: {
    name: {
      en: "Kirchhoff's Loop Rule (Second Law)",
      ro: 'A doua Lege a lui Kirchhoff (Legea Ochiurilor)',
    },
    variables: {
      en: [
        '$\\Sigma U$ = algebraic sum of voltages and electromotive forces around a closed loop',
      ],
      ro: [
        '$\\Sigma U$ = suma algebrică a tensiunilor electrice și forțelor electromotoare de-a lungul unui ochi de circuit închis',
      ],
    },
    theory: {
      en: "Kirchhoff's second law is based on the conservation of energy in a conservative electrostatic field. When moving around any closed loop in a circuit, the total change in electrical potential energy must be zero. Consequently, the algebraic sum of the electromotive forces ($E$) in the loop equals the algebraic sum of the voltage drops ($IR$) across the resistors: $\\Sigma E = \\Sigma IR$, which simplifies to $\\Sigma U = 0$ when potential differences are added algebraically.",
      ro: "A doua lege a lui Kirchhoff se bazează pe principiul conservării energiei într-un câmp electric conservativ. La parcurgerea completă a oricărui circuit închis (ochi de circuit), variația netă a potențialului electric este nulă. Prin urmare, suma algebrică a tensiunilor electromotoare ale surselor este egală cu suma algebrică a căderilor de tensiune din ochiul de circuit: $\\Sigma E = \\Sigma IR$.",
    },
  },

  [normalizeFormulaKey('P = U*I')]: {
    name: {
      en: 'Electrical Power',
      ro: 'Puterea Electrică',
    },
    variables: {
      en: [
        '$P$ = electrical power, in Watts (W)',
        '$U$ = electric voltage drop (V)',
        '$I$ = electric current intensity (A)',
      ],
      ro: [
        '$P$ = puterea electrică, în Wați (W)',
        '$U$ = tensiunea electrică la borne (V)',
        '$I$ = intensitatea curentului electric (A)',
      ],
    },
    theory: {
      en: 'Electrical power represents the rate at which electrical energy is transferred or converted into other forms of energy (such as mechanical work, heat, or radiation). It is defined as the work done by the electric field per unit time ($W / t$). Substituting $W = U q$ and $q = I t$ gives $P = U I$.',
      ro: 'Puterea electrică reprezintă rata la care energia electrică este transferată sau transformată în alte forme de energie (căldură, lucru mecanic sau lumină). Ea este definită ca lucrul mecanic efectuat în unitatea de timp ($P = W / t$). Înlocuind lucrul mecanic cu $W = U q$ și sarcina cu $q = I t$, se obține $P = U I$.',
    },
  },

  [normalizeFormulaKey('P = I^2*R')]: {
    name: {
      en: "Joule Heating Power (Current Form)",
      ro: 'Puterea disipată prin efect Joule (în funcție de curent)',
    },
    variables: {
      en: [
        '$P$ = electrical power dissipated as heat',
        '$I$ = electric current',
        '$R$ = resistance of the conductor',
      ],
      ro: [
        '$P$ = puterea electrică disipată sub formă de căldură',
        '$I$ = intensitatea curentului',
        '$R$ = rezistența conductorului',
      ],
    },
    theory: {
      en: "This formula is derived by substituting Ohm's Law ($U = IR$) into the electrical power formula ($P = UI$). It describes the rate of thermal energy generation (Joule heating) inside a resistor due to collisions between flowing charge carriers (electrons) and the lattice ions of the conductor.",
      ro: "Această formulă se obține înlocuind tensiunea din relația puterii ($P = UI$) cu expresia legii lui Ohm ($U = IR$). Ea descrie rata la care energia electrică se disipă sub formă de căldură (efectul Joule) într-un rezistor din cauza ciocnirilor purtătorilor de sarcină cu rețeaua cristalină a conductorului.",
    },
  },

  [normalizeFormulaKey('P = U^2/R')]: {
    name: {
      en: 'Joule Heating Power (Voltage Form)',
      ro: 'Puterea disipată prin efect Joule (în funcție de tensiune)',
    },
    variables: {
      en: [
        '$P$ = power dissipated',
        '$U$ = electrical voltage drop',
        '$R$ = electrical resistance',
      ],
      ro: [
        '$P$ = puterea electrică disipată',
        '$U$ = tensiunea electrică aplicată',
        '$R$ = rezistența electrică a conductorului',
      ],
    },
    theory: {
      en: "Derived by substituting $I = U/R$ (Ohm's Law) into the electric power equation $P = UI$, yielding $P = U^2/R$. This formulation is particularly useful for parallel connections where the voltage $U$ is constant across resistors.",
      ro: "Dedicată conexiunilor în paralel unde tensiunea $U$ este aceeași pentru toate elementele, formula se obține prin substituirea intensității $I = U/R$ din legea lui Ohm în formula puterii electrice $P = UI$, rezultând $P = U^2/R$.",
    },
  },

  // --- MECHANICS ---
  [normalizeFormulaKey('v_m = Δx / Δt')]: {
    name: {
      en: 'Average Velocity',
      ro: 'Viteza Medie',
    },
    variables: {
      en: [
        '$v_m$ = average velocity (m/s)',
        '$\\Delta x$ = displacement ($x_{\\text{final}} - x_{\\text{initial}}$)',
        '$\\Delta t$ = elapsed time duration',
      ],
      ro: [
        '$v_m$ = viteza medie (m/s)',
        '$\\Delta x$ = deplasarea corpului ($x_{\\text{final}} - x_{\\text{initial}}$)',
        '$\\Delta t$ = intervalul de timp în care s-a produs mișcarea',
      ],
    },
    theory: {
      en: 'Average velocity is a vector quantity that represents the rate of change of position in a given direction over a finite time interval. It describes the net displacement per unit of time, regardless of the intermediate path fluctuations.',
      ro: 'Viteza medie este o mărime fizică vectorială care reprezintă raportul dintre vectorul deplasare și intervalul de timp în care s-a efectuat mișcarea. Ea măsoară rapiditatea medie a schimbării poziției, fără a lua în considerare abaterile sau opririle pe traseu.',
    },
  },

  [normalizeFormulaKey('v = dx / dt')]: {
    name: {
      en: 'Instantaneous Velocity',
      ro: 'Viteza Momentană (Instantanee)',
    },
    variables: {
      en: [
        '$v$ = instantaneous velocity',
        '$dx / dt$ = derivative of position $x$ with respect to time $t$',
      ],
      ro: [
        '$v$ = viteza instantanee',
        '$dx / dt$ = derivata coordonatei de poziție $x$ în raport cu timpul $t$',
      ],
    },
    theory: {
      en: 'Instantaneous velocity describes the velocity of a particle at a specific instant in time. It is defined as the limit of average velocity as the time interval $\\Delta t$ approaches zero, which corresponds mathematically to the first derivative of the position function with respect to time.',
      ro: 'Viteza momentană descrie rapiditatea și direcția de mișcare a unui corp la un moment specific. Ea este definită ca limita la care tinde viteza medie când intervalul de timp $\\Delta t$ tinde spre zero, reprezentând din punct de vedere matematic derivata de ordinul întâi a legii de mișcare în raport cu timpul.',
    },
  },

  [normalizeFormulaKey('a = dv / dt')]: {
    name: {
      en: 'Instantaneous Acceleration',
      ro: 'Accelerația Momentană',
    },
    variables: {
      en: [
        '$a$ = instantaneous acceleration ($\\text{m/s}^2$)',
        '$dv / dt$ = first derivative of velocity $v$ with respect to time $t$',
      ],
      ro: [
        '$a$ = accelerația instantanee ($\\text{m/s}^2$)',
        '$dv / dt$ = derivata vitezei $v$ în raport cu timpul $t$',
      ],
    },
    theory: {
      en: 'Instantaneous acceleration measures how fast velocity changes at an exact moment. Defined as the limit of average acceleration as the time interval becomes infinitesimally small, it corresponds to the first derivative of velocity (or the second derivative of position) with respect to time.',
      ro: 'Accelerația măsoară variația vitezei în unitatea de timp la un moment dat. Din punct de vedere matematic, reprezintă derivata de ordinul întâi a vitezei în raport cu timpul (sau derivata a doua a coordonatei de poziție).',
    },
  },

  [normalizeFormulaKey('v = v_0 + at')]: {
    name: {
      en: 'Velocity-Time Equation (Uniformly Accelerated Motion)',
      ro: 'Ecuația Vitezei (Mișcarea Uniform Variată)',
    },
    variables: {
      en: [
        '$v$ = velocity at time $t$',
        '$v_0$ = initial velocity at $t = 0$',
        '$a$ = constant acceleration',
        '$t$ = elapsed time',
      ],
      ro: [
        '$v$ = viteza la momentul $t$',
        '$v_0$ = viteza inițială la momentul $t = 0$',
        '$a$ = accelerația constantă',
        '$t$ = timpul parcurs',
      ],
    },
    theory: {
      en: 'For motion with constant acceleration, acceleration is defined as $a = \\frac{v - v_0}{t}$. Rearranging this definition yields the linear velocity-time relationship: $v = v_0 + at$. This shows that velocity increases or decreases by equal amounts in equal time intervals.',
      ro: 'În mișcarea cu accelerație constantă, accelerația este definită ca $a = \\frac{v - v_0}{t}$. Reordonând termenii acestei definiții obținem ecuația liniară a vitezei: $v = v_0 + at$. Ea arată că viteza variază direct proporțional cu timpul.',
    },
  },

  [normalizeFormulaKey('x = x_0 + v_0t + 1/2at^2')]: {
    name: {
      en: 'Law of Motion (Uniformly Accelerated Motion)',
      ro: 'Legea Mișcării (Ecuația de Poziție)',
    },
    variables: {
      en: [
        '$x$ = position coordinate at time $t$',
        '$x_0$ = initial position coordinate at $t = 0$',
        '$v_0$ = initial velocity',
        '$a$ = constant acceleration',
        '$t$ = elapsed time',
      ],
      ro: [
        '$x$ = coordonata de poziție la momentul $t$',
        '$x_0$ = coordonata de poziție inițială la $t = 0$',
        '$v_0$ = viteza inițială',
        '$a$ = accelerația constantă',
        '$t$ = timpul parcurs',
      ],
    },
    theory: {
      en: 'The position equation is derived by integrating the velocity equation $v(t) = v_0 + at$ over time. Geometrically, displacement $\\Delta x = x - x_0$ represents the area under the velocity-time curve (a trapezoid bounded by $v_0$ and $v_0 + at$), yielding $v_0 t + \\frac{1}{2} a t^2$.',
      ro: 'Legea mișcării uniform variate se obține prin integrarea ecuației vitezei $v(t) = v_0 + at$ în raport cu timpul. Din punct de vedere geometric, deplasarea $\\Delta x = x - x_0$ este reprezentată de aria de sub graficul vitezei în funcție de timp (un trapez cu bazele $v_0$ și $v_0 + at$, și înălțimea $t$).',
    },
  },

  [normalizeFormulaKey('v^2 = v_0^2 + 2aΔx')]: {
    name: {
      en: 'Galilei\'s Formula (Timeless Equation)',
      ro: 'Formula lui Galilei (Ecuația fără timp)',
    },
    variables: {
      en: [
        '$v$ = final velocity',
        '$v_0$ = initial velocity',
        '$a$ = constant acceleration',
        '$\\Delta x$ = displacement coordinate distance ($x - x_0$)',
      ],
      ro: [
        '$v$ = viteza finală',
        '$v_0$ = viteza inițială',
        '$a$ = accelerația constantă',
        '$\\Delta x$ = deplasarea efectuată ($x - x_0$)',
      ],
    },
    theory: {
      en: 'This timeless equation is derived by eliminating $t$ from the kinematic equations. Solving $v = v_0 + at$ for time gives $t = \\frac{v - v_0}{a}$. Substituting this into the displacement formula $\\Delta x = v_0 t + \\frac{1}{2} a t^2$ and simplifying algebraically yields $v^2 = v_0^2 + 2a\\Delta x$. It relates initial and final velocities directly to acceleration and displacement.',
      ro: 'Formula lui Galilei se obține eliminând timpul $t$ din ecuațiile mișcării uniform variate. Din relația $v = v_0 + at$ rezultă $t = \\frac{v - v_0}{a}$. Înlocuind această expresie în legea deplasării $\\Delta x = v_0 t + \\frac{1}{2} a t^2$ și simplificând, rezultă $v^2 = v_0^2 + 2a\\Delta x$. Relația este utilă deoarece nu depinde direct de timp.',
    },
  },

  [normalizeFormulaKey('F = ma')]: {
    name: {
      en: "Newton's Second Law of Motion",
      ro: 'Principiul al II-lea al Dinamicii (Newton)',
    },
    variables: {
      en: [
        '$F$ = net force acting on the body, in Newtons (N)',
        '$m$ = inertial mass of the body (kg)',
        '$a$ = acceleration vector produced ($\\text{m/s}^2$)',
      ],
      ro: [
        '$F$ = forța rezultantă care acționează asupra corpului, în Newtoni (N)',
        '$m$ = masa inertă a corpului (kg)',
        '$a$ = accelerația imprimată corpului ($\\text{m/s}^2$)',
      ],
    },
    theory: {
      en: "Newton's Second Law states that the acceleration of an object is directly proportional to the net force acting on it, and inversely proportional to its mass ($a = F/m$). Physically, force is defined as the rate of change of linear momentum over time ($F = \\frac{dp}{dt}$). Under constant mass, this simplifies to $F = m\\frac{dv}{dt} = ma$.",
      ro: "Principiul al doilea al dinamicii afirmă că accelerația unui corp este direct proporțională cu forța rezultantă care acționează asupra lui și invers proporțională cu masa corpului ($a = F/m$). În forma sa generală, forța măsoară variația impulsului în timp ($F = \\frac{dp}{dt}$), ceea ce, pentru o masă constantă, se reduce la relația clasică $F = ma$.",
    },
  },

  [normalizeFormulaKey('p = mv')]: {
    name: {
      en: 'Linear Momentum',
      ro: 'Impulsul Corpului (Cantitatea de Mișcare)',
    },
    variables: {
      en: [
        '$p$ = linear momentum vector ($\\text{kg}\\cdot\\text{m/s}$)',
        '$m$ = mass of the body',
        '$v$ = velocity vector of the body',
      ],
      ro: [
        '$p$ = impulsul corpului ($\\text{kg}\\cdot\\text{m/s}$)',
        '$m$ = masa corpului',
        '$v$ = viteza corpului',
      ],
    },
    theory: {
      en: 'Linear momentum represents the product of a body\'s mass and its velocity. It is a vector quantity that measures the "quantity of motion" and is conserved in closed systems free of external forces, making it fundamental in collision analysis.',
      ro: 'Impulsul (sau cantitatea de mișcare) reprezintă produsul dintre masă și viteză. Este o mărime vectorială care măsoară dinamica mișcării corpului. În absența forțelor externe, impulsul total al unui sistem se conservă, fiind esențial în studiul ciocnirilor.',
    },
  },

  [normalizeFormulaKey('N = mg')]: {
    name: {
      en: 'Normal Force (Horizontal Plane)',
      ro: 'Forța de Reacțiune Normală (Plan Orizontal)',
    },
    variables: {
      en: [
        '$N$ = normal reaction force exerted by the surface (N)',
        '$m$ = mass of the object',
        '$g$ = gravitational acceleration (approx. $9.81\\text{ m/s}^2$)',
      ],
      ro: [
        '$N$ = forța de reacțiune normală exercitată de suprafață (N)',
        '$m$ = masa corpului',
        '$g$ = accelerația gravitațională (aprox. $9.81\\text{ m/s}^2$)',
      ],
    },
    theory: {
      en: 'When a body rests on a flat horizontal surface under gravity, it exerts a downward action force equal to its weight ($G = mg$). According to Newton\'s Third Law (Action-Reaction), the surface exerts an equal and opposite upward reaction force, called the normal force ($N = mg$), preventing the body from sinking into the surface.',
      ro: 'Atunci când un corp este așezat pe o suprafață orizontală, el apasă pe aceasta cu forța de greutate ($G = mg$). Conform principiului acțiunii și reacțiunii (Newton III), suprafața răspunde cu o forță egală și de sens contrar, orientată perpendicular pe suprafață, numită reacțiune normală ($N = mg$).',
    },
  },

  [normalizeFormulaKey('F_c = mv^2/R')]: {
    name: {
      en: 'Centripetal Force',
      ro: 'Forța Centripetă',
    },
    variables: {
      en: [
        '$F_c$ = centripetal force directed toward the center of curvature (N)',
        '$m$ = mass of the object',
        '$v$ = tangential velocity',
        '$R$ = radius of the circular path curvature trajectory',
      ],
      ro: [
        '$F_c$ = forța centripetă, orientată spre centrul curburii (N)',
        '$m$ = masa corpului',
        '$v$ = viteza tangențială a corpului',
        '$R$ = raza traiectoriei circulare',
      ],
    },
    theory: {
      en: 'For an object to travel along a curved or circular path of radius $R$, it must experience a continuous radial acceleration directed toward the center, called centripetal acceleration ($a_c = v^2/R$). According to Newton\'s Second Law, this acceleration requires a net radial force: $F_c = m a_c = m v^2/R$. Centripetal force is not a new force type, but a role played by gravity, tension, or friction.',
      ro: 'Pentru ca un corp să execute o mișcare circulară de rază $R$, el trebuie să aibă o accelerație orientată spre centrul cercului, numită accelerație centripetă ($a_c = v^2/R$). Conform legii a doua a lui Newton, forța rezultantă responsabilă de această accelerație este forța centripetă ($F_c = m v^2/R$). Ea nu este o forță de sine stătătoare, ci rolul asumat de o altă forță din sistem (tensiune, frecare, atracție gravitațională).',
    },
  },

  [normalizeFormulaKey('f = μN')]: {
    name: {
      en: 'Sliding Friction Force',
      ro: 'Forța de Frecare la Alunecare',
    },
    variables: {
      en: [
        '$f$ = sliding friction force opposing motion (N)',
        '$\\mu$ = coefficient of sliding friction (dimensionless, depending on surface materials)',
        '$N$ = normal force pushing the surfaces together',
      ],
      ro: [
        '$f$ = forța de frecare la alunecare (N)',
        '$\\mu$ = coeficientul de frecare la alunecare (adimensional, depinde de natura suprafețelor)',
        '$N$ = forța de reacțiune normală la suprafață',
      ],
    },
    theory: {
      en: 'The friction force opposes the relative sliding motion between two contacting surfaces. Experimentally (Coulomb-Amontons friction laws), sliding friction is directly proportional to the normal force pressing the surfaces together, and is independent of the contact surface area. The constant of proportionality $\\mu$ depends on micro-roughness and molecular adhesion between the contact materials.',
      ro: 'Forța de frecare la alunecare acționează în planul de contact dintre corpuri și se opune mișcării relative. Legile empirice ale frecării (Coulomb-Amontons) arată că forța de frecare este direct proporțională cu forța de apăsare normală ($N$) pe suprafața de contact și nu depinde de aria geometrică a suprafeței. Coeficientul de frecare $\\mu$ reflectă gradul de aderență a materialelor aflate în contact.',
    },
  },

  [normalizeFormulaKey('W = F * d * cos(θ)')]: {
    name: {
      en: 'Mechanical Work',
      ro: 'Lucrul Mecanic al unei Forțe Constante',
    },
    variables: {
      en: [
        '$W$ = mechanical work performed, in Joules (J)',
        '$F$ = magnitude of the force applied',
        '$d$ = displacement distance magnitude covered by the object',
        '$\\theta$ = angle between the force vector and the displacement direction vector',
      ],
      ro: [
        '$W$ = lucrul mecanic efectuat de forță, în Joule (J)',
        '$F$ = modulul forței aplicate',
        '$d$ = modulul vectorului deplasare al punctului de aplicație',
        '$\\theta$ = unghiul dintre vectorul forță și vectorul deplasare',
      ],
    },
    theory: {
      en: 'Mechanical work measures energy transfer when a force displaces an object. Geometrically, it is the dot product of the force and displacement vectors ($W = \\vec{F} \\cdot \\vec{d} = F d \\cos(\\theta)$). Work is active and positive ($W > 0$) if the force has a component in the direction of motion ($\\theta < 90^\\circ$), resistive and negative ($W < 0$) if it opposes motion ($\\theta > 90^\\circ$), and zero if the force is perpendicular to displacement ($\\cos(90^\\circ) = 0$).',
      ro: 'Lucrul mecanic măsoară transferul de energie produs prin intermediul unei forțe. Este egal cu produsul scalar dintre forță și deplasare ($W = \\vec{F} \\cdot \\vec{d} = F d \\cos(\\theta)$). Lucrul mecanic este motor (pozitiv) dacă forța ajută mișcarea ($\\theta < 90^\\circ$), rezistent (negativ) dacă se opune mișcării ($\\theta > 90^\\circ$) și nul dacă forța este perpendiculară pe direcția deplasării ($\\theta = 90^\\circ$).',
    },
  },

  [normalizeFormulaKey('E_p = mgh')]: {
    name: {
      en: 'Gravitational Potential Energy',
      ro: 'Energia Potențială Gravitațională',
    },
    variables: {
      en: [
        '$E_p$ = gravitational potential energy (J)',
        '$m$ = mass of the body',
        '$g$ = gravitational acceleration',
        '$h$ = height elevation coordinate relative to a chosen reference baseline ($h = 0$)',
      ],
      ro: [
        '$E_p$ = energia potențială gravitațională (J)',
        '$m$ = masa corpului',
        '$g$ = accelerația gravitațională',
        '$h$ = înălțimea corpului față de un nivel de referință ales ($h = 0$)',
      ],
    },
    theory: {
      en: 'Gravitational potential energy is the energy stored in an object due to its position in a gravitational field. It represents the mechanical work required to lift an object of mass $m$ to a height $h$ at constant speed against gravity ($W = F \\cdot h = mg \\cdot h$). It depends on the choice of the reference level where $h = 0$.',
      ro: 'Energia potențială gravitațională este energia acumulată de un corp datorită poziției sale într-un câmp gravitațional uniform. Ea este egală cu lucrul mecanic efectuat pentru a ridica corpul de masă $m$ la înălțimea $h$ împotriva forței gravitaționale ($W = G \\cdot h = mgh$). Depinde direct de nivelul zero ales ca referință.',
    },
  },

  [normalizeFormulaKey('E_elastic = 1/2kx^2')]: {
    name: {
      en: 'Elastic Potential Energy',
      ro: 'Energia Potențială Elastică',
    },
    variables: {
      en: [
        '$E_{elastic}$ = elastic potential energy stored in the spring (J)',
        '$k$ = spring constant stiffness (N/m)',
        '$x$ = deformation displacement length (extension or compression)',
      ],
      ro: [
        '$E_{elastic}$ = energia potențială elastică stocată în resort (J)',
        '$k$ = constanta elastică a resortului (N/m)',
        '$x$ = deformarea (alungirea sau comprimarea) resortului față de starea nedeformată',
      ],
    },
    theory: {
      en: 'Deforming a spring requires overcoming the restoring force ($F = kx$, Hooke\'s Law). Because the force varies linearly from 0 to $kx$, the average force required during deformation is $\\frac{1}{2} kx$. The work done in deforming the spring is $W = F_{avg} \\cdot x = \\frac{1}{2} kx^2$. This work is stored as elastic potential energy in the deformed molecular bonds of the spring.',
      ro: 'Deformarea unui resort necesită învingerea forței elastice ($F = kx$, legea lui Hooke). Deoarece forța crește liniar de la 0 la $kx$, forța medie pe parcursul deformării este $\\frac{1}{2} kx$. Lucrul mecanic efectuat pentru deformare este $W = F_{med} \\cdot x = \\frac{1}{2} kx^2$. Acest lucru mecanic se stochează sub formă de energie potențială elastică.',
    },
  },

  [normalizeFormulaKey('Δp = F * Δt')]: {
    name: {
      en: 'Impulse-Momentum Theorem',
      ro: 'Teorema Variației Impulsului',
    },
    variables: {
      en: [
        '$\\Delta p$ = change in momentum of the body ($p_{\\text{final}} - p_{\\text{initial}}$)',
        '$F$ = constant average force acting on the body',
        '$\\Delta t$ = time duration over which the force acts',
      ],
      ro: [
        '$\\Delta p$ = variația impulsului corpului ($p_{\\text{final}} - p_{\\text{initial}}$)',
        '$F$ = forța constantă (sau medie) aplicată asupra corpului',
        '$\\Delta t$ = intervalul de timp în care acționează forța',
      ],
    },
    theory: {
      en: 'This theorem is directly derived from Newton\'s Second Law ($F = \\frac{dp}{dt} \\approx \\frac{\\Delta p}{\\Delta t}$). Rearranging gives $\\Delta p = F \\Delta t$. The product $F \\Delta t$ is defined as the Impulse of the force. It states that the impulse applied to an object equals the change in its momentum. This is highly useful in analysis of short-duration impact forces like collisions.',
      ro: 'Această teoremă este o consecință a legii a doua a lui Newton scrisă sub forma $F = \\frac{\\Delta p}{\\Delta t}$. Rezultă direct $\\Delta p = F \\Delta t$. Produsul $F \\Delta t$ reprezintă impulsul forței. Teorema arată că impulsul unei forțe aplicate unui corp este egal cu variația impulsului corpului, fiind utilă în studiul ciocnirilor rapide sau impacturilor.',
    },
  },
};

export function lookupFormula(formulaStr: string): FormulaDetails | undefined {
  const normalizedQuery = normalizeFormulaKey(formulaStr);
  
  // Try exact normalized match
  if (formulasRegistry[normalizedQuery]) {
    return formulasRegistry[normalizedQuery];
  }
  
  // Try partial matching if a formula matches after stripping leading symbols/subscripts
  // to make the matching extremely relaxed and robust
  const registryKeys = Object.keys(formulasRegistry);
  const foundKey = registryKeys.find(key => 
    key.includes(normalizedQuery) || normalizedQuery.includes(key)
  );
  
  if (foundKey) {
    return formulasRegistry[foundKey];
  }
  
  return undefined;
}
