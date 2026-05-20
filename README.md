# Feezy Physics - Interactive Physics Learning Platform

Feezy is an open-source, bilingual (English & Romanian) interactive physics learning platform designed for high school students preparing for the Baccalaureate exam.

The platform combines theoretical lessons, real-time interactive physics simulations, data charts, and gamified practice quests with detailed explanations to make learning physics intuitive and engaging.

---

## Key Features

1. **Bilingual Support (EN / RO)**: Toggle languages instantly on any page. All lessons, equations, questions, and simulation parameters update automatically.
2. **Interactive Simulations**:
   - **Inclined Plane**: Adjust wedge angle, mass, friction coefficient, and gravity to watch force vectors ($F_g$, $F_N$, $F_f$, $F_{net}$) update dynamically and animate block motion.
   - **Thermodynamic Gas Piston**: Simulate Isobaric, Isochoric, Isothermal, and Adiabatic processes. Bouncing gas particles in the cylinder change speed based on Temperature, while a state point traces the process in a pressure-volume indicator.
   - **Electric DC Circuit**: Build series or parallel circuits, adjust voltage and resistor parameters, toggle the circuit switch, and visualize electron flow speed corresponding to total current.
3. **Practice & Quest Mode**: Solve conceptual multiple-choice and numerical questions for each chapter. Earn XP points, level up, track completed topics, and view KaTeX-rendered mathematical explanations upon checking answers.
4. **Offline and Static Access**: Runs entirely in the browser using static pages and local storage progress tracking. Easy to build, deploy, and host for free on GitHub Pages.
5. **Rich Premium Design**: Glassmorphic elements, modern gradients, dark and light mode theme integration, and smooth interactive animations.

---

## Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [Ant Design](https://ant.design/)
- **Math Formats**: [KaTeX](https://katex.org/) (via `react-katex`)
- **Plots & Charts**: [Recharts](https://recharts.org/)
- **Internationalization**: [i18next](https://www.i18next.com/)

---

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18 or higher is recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/uselessbits/feezy.git
   cd feezy
   ```
2. Install the package dependencies:
   ```bash
   npm install
   ```

### Development

Run the local development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### Build and Deploy

To compile TypeScript and bundle the static assets for production deployment:
```bash
npm run build
```
The output files will be built inside the `dist/` directory.

To deploy the build to GitHub Pages:
```bash
npm run deploy
```

---

## Contributing

We welcome content and simulation contributions! Please read our [CONTRIBUTING.md](file:///Users/paul/Projects/Feezy/CONTRIBUTING.md) to understand how to add chapters, questions, and custom simulation blocks.

---

## License

This project is licensed under the MIT License - see the [LICENSE](file:///Users/paul/Projects/Feezy/LICENSE) file for details.