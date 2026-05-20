import { InclinedPlaneSimulation } from './simulations/InclinedPlaneSimulation';
import { PistonGasSimulation } from './simulations/PistonGasSimulation';
import { ElectricCircuitSimulation } from './simulations/ElectricCircuitSimulation';
import { RefractionOpticsSimulation } from './simulations/RefractionOpticsSimulation';
import { LensOpticsSimulation } from './simulations/LensOpticsSimulation';

interface PhysicsSimulationProps {
  type: 'inclined-plane' | 'piston-gas' | 'electric-circuit' | 'refraction-optics' | 'lens-optics';
  language: 'en' | 'ro';
}

export function PhysicsSimulation({ type, language }: Readonly<PhysicsSimulationProps>) {
  switch (type) {
    case 'inclined-plane':
      return <InclinedPlaneSimulation language={language} />;
    case 'piston-gas':
      return <PistonGasSimulation language={language} />;
    case 'electric-circuit':
      return <ElectricCircuitSimulation language={language} />;
    case 'refraction-optics':
      return <RefractionOpticsSimulation language={language} />;
    case 'lens-optics':
      return <LensOpticsSimulation language={language} />;
    default:
      return null;
  }
}
