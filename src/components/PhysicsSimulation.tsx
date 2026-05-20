import { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Radio, Row, Slider, Space, Switch, Typography } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { Formula } from './Formula';

const { Title, Text, Paragraph } = Typography;

interface PhysicsSimulationProps {
  type: 'inclined-plane' | 'piston-gas' | 'electric-circuit';
  language: 'en' | 'ro';
}

export function PhysicsSimulation({ type, language }: Readonly<PhysicsSimulationProps>) {
  const t = {
    en: {
      play: 'Play',
      pause: 'Pause',
      reset: 'Reset',
      controls: 'Simulation Controls',
      values: 'Calculated Values',
      angle: 'Incline Angle',
      friction: 'Friction Coefficient (μ)',
      mass: 'Mass (m)',
      gravity: 'Gravity (g)',
      acceleration: 'Acceleration (a)',
      velocity: 'Velocity (v)',
      distance: 'Distance (s)',
      time: 'Time (t)',
      normalForce: 'Normal Force (Fn)',
      gravityForce: 'Gravity Force (Fg)',
      frictionForce: 'Friction Force (Ff)',
      netForce: 'Net Force (Fnet)',
      staticState: 'Frictional lock: Gravity cannot overcome static friction!',
      gasProcess: 'Process Type',
      gasTemp: 'Temperature (T)',
      gasVol: 'Volume (V)',
      gasPres: 'Pressure (P)',
      gasEnergy: 'Internal Energy (U)',
      gasWork: 'Cumulative Work (W)',
      addHeat: 'Heat Added (Q)',
      isobaric: 'Isobaric (Const P)',
      isochoric: 'Isochoric (Const V)',
      isothermal: 'Isothermal (Const T)',
      adiabatic: 'Adiabatic (Const S)',
      voltage: 'Source Voltage (E)',
      r1: 'Resistor R1',
      r2: 'Resistor R2',
      circuitConfig: 'Configuration',
      series: 'Series',
      parallel: 'Parallel',
      switchState: 'Circuit Switch',
      closed: 'Closed (ON)',
      open: 'Open (OFF)',
      totalResistance: 'Total Resistance (Req)',
      current: 'Current (I)',
      voltageR1: 'Voltage drop on R1 (V1)',
      voltageR2: 'Voltage drop on R2 (V2)',
      power: 'Total Power (P)',
      particlesSpeed: 'Average Particle Velocity',
    },
    ro: {
      play: 'Pornește',
      pause: 'Pauză',
      reset: 'Resetează',
      controls: 'Control Simulare',
      values: 'Valori Calculate',
      angle: 'Unghi Înclinație',
      friction: 'Coeficient de Frecare (μ)',
      mass: 'Masă (m)',
      gravity: 'Gravitație (g)',
      acceleration: 'Accelerație (a)',
      velocity: 'Viteză (v)',
      distance: 'Distanță (s)',
      time: 'Timp (t)',
      normalForce: 'Forța Normală (Fn)',
      gravityForce: 'Forța de Greutate (Fg)',
      frictionForce: 'Forța de Frecare (Ff)',
      netForce: 'Forța Netă (Fnet)',
      staticState: 'Echilibru static: Greutatea nu poate învinge frecarea!',
      gasProcess: 'Tip Proces',
      gasTemp: 'Temperatură (T)',
      gasVol: 'Volum (V)',
      gasPres: 'Presiune (P)',
      gasEnergy: 'Energie Internă (U)',
      gasWork: 'Lucru Mecanic (W)',
      addHeat: 'Căldură Schimbată (Q)',
      isobaric: 'Izobar (P const.)',
      isochoric: 'Izocor (V const.)',
      isothermal: 'Izoterm (T const.)',
      adiabatic: 'Adiabatic (S const.)',
      voltage: 'Tensiune Sursă (E)',
      r1: 'Rezistor R1',
      r2: 'Rezistor R2',
      circuitConfig: 'Configurație',
      series: 'Serie',
      parallel: 'Paralel',
      switchState: 'Comutator Circuit',
      closed: 'Închis (PORNIT)',
      open: 'Deschis (OPRIT)',
      totalResistance: 'Rezistență Echivalentă (Req)',
      current: 'Curent (I)',
      voltageR1: 'Cădere tensiune pe R1 (V1)',
      voltageR2: 'Cădere tensiune pe R2 (V2)',
      power: 'Putere Totală (P)',
      particlesSpeed: 'Viteza Medie a Particulelor',
    },
  }[language];

  // ----------------------------------------------------
  // SIMULATION 1: INCLINED PLANE
  // ----------------------------------------------------
  const [ipAngle, setIpAngle] = useState(30);
  const [ipFriction, setIpFriction] = useState(0.2);
  const [ipMass, setIpMass] = useState(5);
  const [ipGravity] = useState(9.8);
  const [ipIsRunning, setIpIsRunning] = useState(false);
  const [ipTime, setIpTime] = useState(0);
  const [ipPos, setIpPos] = useState(0); // 0 to 100 representing position down the plane

  const ipTimer = useRef<number | null>(null);

  // Derived physics variables for inclined plane
  const theta = (ipAngle * Math.PI) / 180;
  const Fg = ipMass * ipGravity;
  const Fg_parallel = Fg * Math.sin(theta);
  const Fg_perpendicular = Fg * Math.cos(theta);
  const Fn = Fg_perpendicular;
  const Ff_max = ipFriction * Fn;

  // Actual motion details
  const moves = Fg_parallel > Ff_max;
  const Ff = moves ? ipFriction * Fn : Fg_parallel;
  const Fnet = moves ? Fg_parallel - Ff : 0;
  const ipAccel = moves ? Fnet / ipMass : 0;

  useEffect(() => {
    if (ipIsRunning && moves) {
      let lastTime = performance.now();
      const tick = () => {
        const now = performance.now();
        const dt = (now - lastTime) / 1000; // in seconds
        lastTime = now;

        setIpTime((prevTime) => {
          const nextTime = prevTime + dt;
          // Position formula: s = 0.5 * a * t^2
          // Max distance represented by 100 on screen is 20 meters.
          const maxDistance = 20;
          const s = 0.5 * ipAccel * nextTime * nextTime;
          const posPct = Math.min((s / maxDistance) * 100, 100);

          setIpPos(posPct);

          if (posPct >= 100) {
            setIpIsRunning(false);
            return prevTime;
          }
          return nextTime;
        });

        ipTimer.current = requestAnimationFrame(tick);
      };
      ipTimer.current = requestAnimationFrame(tick);
    } else {
      if (ipTimer.current) {
        cancelAnimationFrame(ipTimer.current);
      }
    }

    return () => {
      if (ipTimer.current) cancelAnimationFrame(ipTimer.current);
    };
  }, [ipIsRunning, ipAccel, moves]);

  const resetInclinedPlane = () => {
    setIpIsRunning(false);
    setIpTime(0);
    setIpPos(0);
  };

  const currentVelocity = ipAccel * ipTime;
  const currentDistance = 0.5 * ipAccel * ipTime * ipTime;

  // ----------------------------------------------------
  // SIMULATION 2: THERMODYNAMIC PISTON & GAS PARTICLES
  // ----------------------------------------------------
  const [gasProcess, setGasProcess] = useState<'isobaric' | 'isochoric' | 'isothermal' | 'adiabatic'>('isobaric');
  const [gasTemp, setGasTemp] = useState(300); // K
  const [gasVol, setGasVol] = useState(2.0); // L
  const [gasPres, setGasPres] = useState(3.0); // atm
  const [gasWork, setGasWork] = useState(0); // J
  const [gasHeat, setGasHeat] = useState(0); // J
  const [gasIsRunning, setGasIsRunning] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number }>>([]);
  const gasTimerRef = useRef<number | null>(null);

  const nR = 0.02; // constant for scale: PV = nRT -> P*V = 0.02*T

  // Recalculations on slider inputs
  const handleTempChange = (T: number) => {
    setGasTemp(T);
    if (gasProcess === 'isobaric') {
      // V = nRT/P
      const newV = (nR * T) / gasPres;
      setGasVol(Math.min(Math.max(newV, 0.8), 5.0));
    } else if (gasProcess === 'isochoric') {
      // P = nRT/V
      const newP = (nR * T) / gasVol;
      setGasPres(Math.min(Math.max(newP, 0.5), 10.0));
    }
  };

  const handleVolChange = (V: number) => {
    setGasVol(V);
    if (gasProcess === 'isobaric') {
      // T = PV/nR
      const newT = (gasPres * V) / nR;
      setGasTemp(Math.min(Math.max(newT, 100), 600));
    } else if (gasProcess === 'isothermal') {
      // P = nRT/V
      const newP = (nR * gasTemp) / V;
      setGasPres(Math.min(Math.max(newP, 0.5), 10.0));
    } else if (gasProcess === 'adiabatic') {
      // P * V^1.67 = const
      // P2 = P1 * (V1/V2)^1.67
      const constant = gasPres * Math.pow(gasVol, 1.67);
      const newP = constant / Math.pow(V, 1.67);
      setGasPres(Math.min(Math.max(newP, 0.5), 10.0));
      // T = PV/nR
      const newT = (newP * V) / nR;
      setGasTemp(Math.min(Math.max(newT, 100), 600));
    }
  };

  const handlePresChange = (P: number) => {
    setGasPres(P);
    if (gasProcess === 'isochoric') {
      // T = PV/nR
      const newT = (P * gasVol) / nR;
      setGasTemp(Math.min(Math.max(newT, 100), 600));
    } else if (gasProcess === 'isothermal') {
      // V = nRT/P
      const newV = (nR * gasTemp) / P;
      setGasVol(Math.min(Math.max(newV, 0.8), 5.0));
    }
  };

  // Setup initial particles
  useEffect(() => {
    const list = [];
    for (let i = 0; i < 40; i++) {
      list.push({
        x: Math.random() * 200 + 10,
        y: Math.random() * 120 + 30,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
      });
    }
    particlesRef.current = list;
  }, []);

  // Animate particles bouncing in cylinder
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Piston dimensions based on gasVol
      // Volume runs from 0.8 to 5.0. Let's map it to cylinder height.
      // Volume = 5 is maximum size.
      // Cylinder width is 220, max height is 160.
      const cylWidth = 220;
      const cylX = 30;
      const cylBottomY = 180;
      // Volume = 5.0 -> height = 150. Volume = 0.8 -> height = 24.
      const pistonHeight = (gasVol / 5.0) * 150;
      const pistonY = cylBottomY - pistonHeight;

      // Draw Cylinder outer lines
      ctx.strokeStyle = '#6b7280';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cylX, 20);
      ctx.lineTo(cylX, cylBottomY);
      ctx.lineTo(cylX + cylWidth, cylBottomY);
      ctx.lineTo(cylX + cylWidth, 20);
      ctx.stroke();

      // Draw Piston head
      ctx.fillStyle = '#9ca3af';
      ctx.fillRect(cylX + 2, pistonY, cylWidth - 4, 12);
      // Piston shaft
      ctx.fillStyle = '#6b7280';
      ctx.fillRect(cylX + cylWidth / 2 - 8, pistonY - 50, 16, 50);

      // Draw Gas particles
      // Particle speed is proportional to sqrt(T)
      const speedMultiplier = Math.sqrt(gasTemp / 300) * 1.5;

      ctx.fillStyle = '#1fd2b2';
      particlesRef.current.forEach((p) => {
        // Move particle
        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;

        // Collision with left/right walls
        if (p.x < cylX + 6) {
          p.x = cylX + 6;
          p.vx = -p.vx;
        } else if (p.x > cylX + cylWidth - 6) {
          p.x = cylX + cylWidth - 6;
          p.vx = -p.vx;
        }

        // Collision with bottom wall
        if (p.y > cylBottomY - 6) {
          p.y = cylBottomY - 6;
          p.vy = -p.vy;
        }

        // Collision with piston head (at pistonY + 12)
        if (p.y < pistonY + 18) {
          p.y = pistonY + 18;
          p.vy = -p.vy;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Renders heat source if running and adding heat
      if (gasIsRunning) {
        ctx.fillStyle = 'rgba(255, 122, 89, 0.4)';
        ctx.beginPath();
        ctx.moveTo(cylX + 10, cylBottomY + 2);
        ctx.lineTo(cylX + 20, cylBottomY + 12);
        ctx.lineTo(cylX + 30, cylBottomY + 2);
        // ... draw simple flame waves
        ctx.fill();
      }

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrame);
    };
  }, [gasVol, gasTemp, gasIsRunning]);

  // Gas dynamic process simulation
  useEffect(() => {
    if (gasIsRunning) {
      const interval = setInterval(() => {
        setGasTemp((T) => {
          const deltaT = 5;
          const nextT = Math.min(T + deltaT, 600);

          if (gasProcess === 'isobaric') {
            // V increases, P const. Work is positive.
            const nextV = (nR * nextT) / gasPres;
            const finalV = Math.min(nextV, 5.0);
            const dV_liters = finalV - (nR * T) / gasPres;
            // Work (J) = P(Pa) * dV(m^3)
            // 1 atm = 101325 Pa, 1 L = 10^-3 m^3 -> W = P(atm)*101.325 * dV(L)
            const W_step = gasPres * 101.325 * dV_liters;
            setGasWork((w) => w + W_step);
            setGasVol(finalV);
            // ΔU = 1.5 * n * R * ΔT. Let's scale heat Q = ΔU + W
            const dU = 1.5 * nR * deltaT * 100; // Scaled to Joules
            setGasHeat((q) => q + dU + W_step);
          } else if (gasProcess === 'isochoric') {
            // V const, P increases. Work = 0.
            const nextP = (nR * nextT) / gasVol;
            setGasPres(Math.min(nextP, 10.0));
            const dU = 1.5 * nR * deltaT * 100;
            setGasHeat((q) => q + dU);
          } else if (gasProcess === 'isothermal') {
            // T const. For isothermal process, we can't just increase T.
            // Let's simulate expansion: Volume increases, Pressure decreases, T is constant.
            setGasVol((V) => {
              const nextV = Math.min(V + 0.05, 5.0);
              const dV = nextV - V;
              // P = nRT/V
              const nextP = (nR * gasTemp) / nextV;
              setGasPres(nextP);
              const W_step = nextP * 101.325 * dV;
              setGasWork((w) => w + W_step);
              // For isothermal, ΔU = 0, so Q = W
              setGasHeat((q) => q + W_step);
              return nextV;
            });
            return T; // Temperature remains constant
          } else if (gasProcess === 'adiabatic') {
            // Q = 0, expansion. Volume increases, P decreases, T decreases.
            // We expand the volume:
            setGasVol((V) => {
              const nextV = Math.min(V + 0.05, 5.0);
              const dV = nextV - V;
              const constant = gasPres * Math.pow(V, 1.67);
              const nextP = constant / Math.pow(nextV, 1.67);
              setGasPres(nextP);
              // Update T = PV/nR
              const newT = (nextP * nextV) / nR;
              // Work is done at expense of internal energy: W = -ΔU
              const W_step = nextP * 101.325 * dV;
              setGasWork((w) => w + W_step);
              // Heat Q = 0
              return nextV;
            });
            // Recompute T from updated state
            const nextV = Math.min(gasVol + 0.05, 5.0);
            const constant = gasPres * Math.pow(gasVol, 1.67);
            const nextP = constant / Math.pow(nextV, 1.67);
            return (nextP * nextV) / nR;
          }

          if (nextT >= 600) {
            setGasIsRunning(false);
          }
          return nextT;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [gasIsRunning, gasProcess, gasPres, gasVol, gasTemp]);

  const resetGas = () => {
    setGasIsRunning(false);
    setGasTemp(300);
    setGasVol(2.0);
    setGasPres(3.0);
    setGasWork(0);
    setGasHeat(0);
  };

  // ----------------------------------------------------
  // SIMULATION 3: ELECTRIC CIRCUIT
  // ----------------------------------------------------
  const [elecVoltage, setElecVoltage] = useState(12);
  const [elecR1, setElecR1] = useState(10);
  const [elecR2, setElecR2] = useState(15);
  const [elecConfig, setElecConfig] = useState<'series' | 'parallel'>('series');
  const [elecIsClosed, setElecIsClosed] = useState(true);
  const [electronOffset, setElectronOffset] = useState(0);

  // Circuit calculations
  const Req = elecConfig === 'series' ? elecR1 + elecR2 : (elecR1 * elecR2) / (elecR1 + elecR2);
  const circuitCurrent = elecIsClosed ? elecVoltage / Req : 0;
  const currentR1 = elecIsClosed ? (elecConfig === 'series' ? circuitCurrent : elecVoltage / elecR1) : 0;
  const currentR2 = elecIsClosed ? (elecConfig === 'series' ? circuitCurrent : elecVoltage / elecR2) : 0;
  const voltDropR1 = elecIsClosed ? (elecConfig === 'series' ? circuitCurrent * elecR1 : elecVoltage) : 0;
  const voltDropR2 = elecIsClosed ? (elecConfig === 'series' ? circuitCurrent * elecR2 : elecVoltage) : 0;
  const totalPower = circuitCurrent * elecVoltage;

  // Animate current flow
  useEffect(() => {
    if (elecIsClosed && circuitCurrent > 0) {
      const interval = setInterval(() => {
        // speed depends on current
        setElectronOffset((prev) => (prev + circuitCurrent * 20) % 1000);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [elecIsClosed, circuitCurrent]);

  return (
    <Card className="physics-simulation-card glass-card">
      <Row gutter={[24, 24]}>
        {/* Render interactive stage */}
        <Col xs={24} md={12}>
          <div className="simulation-stage">
            {type === 'inclined-plane' && (
              <svg viewBox="0 0 400 240" className="ip-svg">
                <defs>
                  <linearGradient id="planeGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(124, 92, 255, 0.2)" />
                    <stop offset="100%" stopColor="rgba(31, 210, 178, 0.1)" />
                  </linearGradient>
                </defs>
                {/* Wedge representing inclined plane */}
                {/* The hypotenuse goes from (50, 200 - h) to (350, 200) */}
                {/* h = 300 * tan(theta) */}
                {(() => {
                  const x1 = 50;
                  const x2 = 350;
                  const y2 = 200;
                  const run = x2 - x1; // 300
                  const rise = run * Math.tan(theta);
                  const y1 = y2 - rise;

                  // Block Position along hypotenuse (from 0 to 1)
                  const progress = ipPos / 100;
                  const blockX = x1 + progress * run;
                  const blockY = y1 + progress * rise;

                  // Block rotation angle (radians, counter-clockwise is negative for upwards, but here angle is positive sliding down)
                  // Rotate around block center
                  const rotationDeg = ipAngle;

                  // Vector arrow scales
                  const arrowScale = 2.5;
                  const vectorFN_x = -Math.sin(theta) * Fn * arrowScale;
                  const vectorFN_y = -Math.cos(theta) * Fn * arrowScale;
                  const vectorFG_y = Fg * arrowScale;
                  const vectorFF_x = -Math.cos(theta) * Ff * arrowScale;
                  const vectorFF_y = -Math.sin(theta) * Ff * arrowScale;
                  const vectorFNet_x = Math.cos(theta) * Fnet * arrowScale;
                  const vectorFNet_y = Math.sin(theta) * Fnet * arrowScale;

                  return (
                    <>
                      {/* Plane path */}
                      <polygon points={`50,200 350,200 ${x1},${y1}`} fill="url(#planeGrad)" stroke="#7c5cff" strokeWidth="3" />
                      <line x1="20" y1="200" x2="380" y2="200" stroke="#6b7280" strokeWidth="2" />
                      
                      {/* Slope Angle indicator */}
                      <path d={`M 320 200 A 30 30 0 0 0 ${350 - 30 * Math.cos(theta)} ${200 - 30 * Math.sin(theta)}`} fill="none" stroke="#ff7a59" strokeWidth="2" />
                      <text x="310" y="190" fill="#ff7a59" fontSize="12" fontWeight="bold">{ipAngle}°</text>

                      {/* Moving Block */}
                      <g transform={`translate(${blockX}, ${blockY}) rotate(${rotationDeg})`}>
                        <rect x="-18" y="-36" width="36" height="36" rx="4" fill="#ffd166" stroke="#d97706" strokeWidth="2" />
                        <circle cx="0" cy="-18" r="3" fill="#000" />
                        
                        {/* Force Vectors inside block local coordinates (but rotated) */}
                        {/* Gravity (needs to point straight down in global space, so we rotate it back) */}
                        <g transform={`rotate(${-rotationDeg})`}>
                          <line x1="0" y1="-18" x2="0" y2={-18 + vectorFG_y} stroke="#ff7a59" strokeWidth="3" markerEnd="url(#arrow)" />
                          <text x="5" y={-18 + vectorFG_y} fill="#ff7a59" fontSize="10" fontWeight="bold">Fg</text>
                        </g>

                        {/* Normal force Fn (points perpendicular up, local y-axis is rotated, so perpendicular is straight up in local space -y) */}
                        <line x1="0" y1="-18" x2="0" y2={-18 - Fn * arrowScale} stroke="#7c5cff" strokeWidth="3" markerEnd="url(#arrow)" />
                        <text x="5" y={-18 - Fn * arrowScale} fill="#7c5cff" fontSize="10" fontWeight="bold">Fn</text>

                        {/* Friction force Ff (points up the slope, local -x direction) */}
                        <line x1="0" y1="-18" x2={-Ff * arrowScale} y2="-18" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow)" />
                        <text x={-Ff * arrowScale - 15} y="-22" fill="#ef4444" fontSize="10" fontWeight="bold">Ff</text>

                        {/* Net force Fnet (points down the slope, local +x direction) */}
                        {moves && (
                          <>
                            <line x1="0" y1="-18" x2={Fnet * arrowScale} y2="-18" stroke="#1fd2b2" strokeWidth="3" markerEnd="url(#arrow)" />
                            <text x={Fnet * arrowScale + 5} y="-22" fill="#1fd2b2" fontSize="10" fontWeight="bold">Fnet</text>
                          </>
                        )}
                      </g>
                    </>
                  );
                })()}

                {/* SVG Arrow Marker */}
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke" />
                  </marker>
                </defs>
              </svg>
            )}

            {type === 'piston-gas' && (
              <div className="gas-canvas-wrapper" style={{ position: 'relative', width: '280px', height: '200px', margin: '0 auto' }}>
                <canvas ref={canvasRef} width="280" height="200" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }} />
                {/* Process state graph overlay */}
                <div className="pv-indicator" style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.5)', padding: '4px 8px', borderRadius: '4px', color: '#fff', fontSize: '11px' }}>
                  PV = { (gasPres * gasVol).toFixed(3) } L·atm
                </div>
              </div>
            )}

            {type === 'electric-circuit' && (
              <svg viewBox="0 0 400 220" className="circuit-svg">
                {/* Wiring lines */}
                {/* Left wire: battery at (60, 110) */}
                <path d="M 120 40 L 60 40 L 60 90" fill="none" stroke="#7c5cff" strokeWidth="3" />
                <path d="M 60 130 L 60 180 L 120 180" fill="none" stroke="#7c5cff" strokeWidth="3" />
                
                {/* Battery Symbol */}
                <line x1="45" y1="95" x2="75" y2="95" stroke="#ff7a59" strokeWidth="4" />
                <line x1="53" y1="105" x2="67" y2="105" stroke="#ff7a59" strokeWidth="2" />
                <line x1="45" y1="115" x2="75" y2="115" stroke="#ff7a59" strokeWidth="4" />
                <line x1="53" y1="125" x2="67" y2="125" stroke="#ff7a59" strokeWidth="2" />
                
                <text x="30" y="115" fill="#ff7a59" fontSize="14" fontWeight="bold">E</text>
                <text x="65" y="85" fill="#ff7a59" fontSize="12" fontWeight="bold">+</text>
                <text x="65" y="145" fill="#ff7a59" fontSize="12" fontWeight="bold">-</text>

                {/* Switch at top wire (120, 40) to (180, 40) */}
                {elecIsClosed ? (
                  <line x1="120" y1="40" x2="180" y2="40" stroke="#1fd2b2" strokeWidth="3" />
                ) : (
                  <line x1="120" y1="40" x2="175" y2="20" stroke="#ef4444" strokeWidth="3" />
                )}
                <circle cx="120" cy="40" r="4" fill="#7c5cff" />
                <circle cx="180" cy="40" r="4" fill="#7c5cff" />
                <text x="140" y="15" fill={elecIsClosed ? '#1fd2b2' : '#ef4444'} fontSize="11" fontWeight="bold">K</text>

                {/* Right side connection paths depending on configuration */}
                {elecConfig === 'series' ? (
                  <>
                    {/* Series Resistors */}
                    <path d="M 180 40 L 340 40 L 340 70" fill="none" stroke="#7c5cff" strokeWidth="3" />
                    
                    {/* Resistor 1 */}
                    <rect x="315" y="70" width="50" height="24" fill="#ffd166" stroke="#d97706" strokeWidth="2" />
                    <text x="285" y="86" fill="#1f2937" fontSize="11" fontWeight="bold">R1</text>
                    
                    <line x1="340" y1="94" x2="340" y2="120" stroke="#7c5cff" strokeWidth="3" />

                    {/* Resistor 2 */}
                    <rect x="315" y="120" width="50" height="24" fill="#ffd166" stroke="#d97706" strokeWidth="2" />
                    <text x="285" y="136" fill="#1f2937" fontSize="11" fontWeight="bold">R2</text>

                    <path d="M 340 144 L 340 180 L 120 180" fill="none" stroke="#7c5cff" strokeWidth="3" />
                  </>
                ) : (
                  <>
                    {/* Parallel Resistors */}
                    <path d="M 180 40 L 260 40 L 260 80" fill="none" stroke="#7c5cff" strokeWidth="3" />
                    <path d="M 260 40 L 340 40 L 340 80" fill="none" stroke="#7c5cff" strokeWidth="3" />

                    {/* Resistor 1 (left branch) */}
                    <rect x="235" y="80" width="50" height="24" fill="#ffd166" stroke="#d97706" strokeWidth="2" />
                    <text x="210" y="96" fill="#1f2937" fontSize="11" fontWeight="bold">R1</text>

                    {/* Resistor 2 (right branch) */}
                    <rect x="315" y="80" width="50" height="24" fill="#ffd166" stroke="#d97706" strokeWidth="2" />
                    <text x="290" y="96" fill="#1f2937" fontSize="11" fontWeight="bold">R2</text>

                    {/* Connections back to main loop */}
                    <path d="M 260 104 L 260 140 L 120 140" fill="none" stroke="#7c5cff" strokeWidth="3" />
                    <path d="M 340 104 L 340 140 L 260 140" fill="none" stroke="#7c5cff" strokeWidth="3" />
                    <path d="M 120 140 L 120 180" fill="none" stroke="#7c5cff" strokeWidth="3" />
                  </>
                )}

                {/* Animated electron dots when closed */}
                {elecIsClosed && circuitCurrent > 0 && (() => {
                  // Setup positions along the circuit loop
                  const dotPositions = [];
                  const count = 12;
                  
                  for (let i = 0; i < count; i++) {
                    const progress = (electronOffset + (i * 1000) / count) % 1000;
                    
                    // Simple path mapping for Series
                    if (elecConfig === 'series') {
                      // Total length of wire series loop ~800px
                      // Let's approximate x, y coordinates based on progress (0 to 1000)
                      let x = 60, y = 40;
                      if (progress < 150) { // Top wire going right: (60,40) -> (340,40)
                        x = 60 + (progress / 150) * 280;
                        y = 40;
                      } else if (progress < 300) { // Going down through R1, R2: (340,40) -> (340,180)
                        x = 340;
                        y = 40 + ((progress - 150) / 150) * 140;
                      } else if (progress < 650) { // Bottom wire going left: (340,180) -> (60,180)
                        x = 340 - ((progress - 300) / 350) * 280;
                        y = 180;
                      } else { // Going up through battery: (60,180) -> (60,40)
                        x = 60;
                        y = 180 - ((progress - 650) / 350) * 140;
                      }
                      dotPositions.push({ x, y });
                    } else {
                      // Parallel path mapping (0 to 1000)
                      let x = 60, y = 40;
                      // Split dots into branch 1 and branch 2
                      const isBranch1 = i % 2 === 0;
                      
                      if (progress < 150) {
                        x = 60 + (progress / 150) * (isBranch1 ? 200 : 280);
                        y = 40;
                      } else if (progress < 300) {
                        x = isBranch1 ? 260 : 340;
                        y = 40 + ((progress - 150) / 150) * 100;
                      } else if (progress < 600) {
                        // Merging back at (120, 140) and going to (60, 180)
                        const prg = (progress - 300) / 300;
                        if (prg < 0.4) {
                          x = (isBranch1 ? 260 : 340) - prg / 0.4 * (isBranch1 ? 140 : 220);
                          y = 140;
                        } else {
                          x = 120 - (prg - 0.4) / 0.6 * 60;
                          y = 140 + (prg - 0.4) / 0.6 * 40;
                        }
                      } else {
                        x = 60;
                        y = 180 - ((progress - 600) / 400) * 140;
                      }
                      dotPositions.push({ x, y });
                    }
                  }

                  return dotPositions.map((dot, idx) => (
                    <circle key={`electron-${idx}`} cx={dot.x} cy={dot.y} r="3" fill="#1fd2b2" opacity="0.8" />
                  ));
                })()}
              </svg>
            )}
          </div>
        </Col>

        {/* Sliders and Calculations panel */}
        <Col xs={24} md={12}>
          <div className="simulation-controls">
            <Title level={4}>{t.controls}</Title>

            {type === 'inclined-plane' && (
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <div>
                  <Text>{t.angle}: <strong>{ipAngle}°</strong></Text>
                  <Slider min={0} max={60} value={ipAngle} onChange={setIpAngle} disabled={ipIsRunning} />
                </div>
                <div>
                  <Text>{t.friction}: <strong>{ipFriction.toFixed(2)}</strong></Text>
                  <Slider min={0} max={80} value={ipFriction * 100} onChange={(v) => setIpFriction(v / 100)} disabled={ipIsRunning} />
                </div>
                <div>
                  <Text>{t.mass}: <strong>{ipMass} kg</strong></Text>
                  <Slider min={1} max={10} value={ipMass} onChange={setIpMass} disabled={ipIsRunning} />
                </div>

                <div style={{ marginTop: 8 }}>
                  <Space>
                    {!ipIsRunning ? (
                      <Button type="primary" icon={<PlayCircleOutlined />} onClick={() => setIpIsRunning(true)} disabled={!moves}>
                        {t.play}
                      </Button>
                    ) : (
                      <Button type="primary" danger icon={<PauseCircleOutlined />} onClick={() => setIpIsRunning(false)}>
                        {t.pause}
                      </Button>
                    )}
                    <Button icon={<ReloadOutlined />} onClick={resetInclinedPlane}>
                      {t.reset}
                    </Button>
                  </Space>
                </div>
              </Space>
            )}

            {type === 'piston-gas' && (
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <div>
                  <Text>{t.gasProcess}:</Text>
                  <div style={{ marginTop: 6 }}>
                    <Radio.Group value={gasProcess} onChange={(e) => { setGasProcess(e.target.value); resetGas(); }} size="small">
                      <Radio.Button value="isobaric">{t.isobaric}</Radio.Button>
                      <Radio.Button value="isochoric">{t.isochoric}</Radio.Button>
                      <Radio.Button value="isothermal">{t.isothermal}</Radio.Button>
                      <Radio.Button value="adiabatic">{t.adiabatic}</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>

                <div>
                  <Text>{t.gasTemp}: <strong>{Math.round(gasTemp)} K</strong></Text>
                  <Slider min={100} max={600} value={gasTemp} onChange={handleTempChange} disabled={gasIsRunning} />
                </div>
                <div>
                  <Text>{t.gasVol}: <strong>{gasVol.toFixed(2)} L</strong></Text>
                  <Slider min={80} max={500} value={gasVol * 100} onChange={(v) => handleVolChange(v / 100)} disabled={gasIsRunning || gasProcess === 'isochoric'} />
                </div>
                <div>
                  <Text>{t.gasPres}: <strong>{gasPres.toFixed(2)} atm</strong></Text>
                  <Slider min={50} max={1000} value={gasPres * 100} onChange={(v) => handlePresChange(v / 100)} disabled={gasIsRunning || gasProcess === 'isobaric' || gasProcess === 'adiabatic'} />
                </div>

                <div>
                  <Space>
                    {!gasIsRunning ? (
                      <Button type="primary" icon={<PlayCircleOutlined />} onClick={() => setGasIsRunning(true)} disabled={gasTemp >= 600}>
                        {t.play}
                      </Button>
                    ) : (
                      <Button type="primary" danger icon={<PauseCircleOutlined />} onClick={() => setGasIsRunning(false)}>
                        {t.pause}
                      </Button>
                    )}
                    <Button icon={<ReloadOutlined />} onClick={resetGas}>
                      {t.reset}
                    </Button>
                  </Space>
                </div>
              </Space>
            )}

            {type === 'electric-circuit' && (
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <div>
                  <Text>{t.circuitConfig}:</Text>
                  <div style={{ marginTop: 6 }}>
                    <Radio.Group value={elecConfig} onChange={(e) => setElecConfig(e.target.value)} size="small">
                      <Radio.Button value="series">{t.series}</Radio.Button>
                      <Radio.Button value="parallel">{t.parallel}</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>

                <div>
                  <Text>{t.voltage}: <strong>{elecVoltage} V</strong></Text>
                  <Slider min={1} max={24} value={elecVoltage} onChange={setElecVoltage} />
                </div>
                <div>
                  <Text>{t.r1}: <strong>{elecR1} Ω</strong></Text>
                  <Slider min={1} max={100} value={elecR1} onChange={setElecR1} />
                </div>
                <div>
                  <Text>{t.r2}: <strong>{elecR2} Ω</strong></Text>
                  <Slider min={1} max={100} value={elecR2} onChange={setElecR2} />
                </div>

                <div>
                  <Text style={{ marginRight: 12 }}>{t.switchState}:</Text>
                  <Switch checked={elecIsClosed} onChange={setElecIsClosed} checkedChildren={t.closed} unCheckedChildren={t.open} />
                </div>
              </Space>
            )}
          </div>

          <Card className="simulation-values-card" style={{ marginTop: 20, background: 'rgba(124, 92, 255, 0.03)' }}>
            <Title level={5} style={{ marginTop: 0 }}>{t.values}</Title>
            
            {type === 'inclined-plane' && (
              <div className="math-results-grid">
                {!moves && <Paragraph type="warning" strong>{t.staticState}</Paragraph>}
                
                <Row gutter={[12, 12]}>
                  <Col span={12}>
                    <Text type="secondary">{t.gravityForce}:</Text>
                    <Paragraph strong>{Fg.toFixed(1)} N</Paragraph>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary">{t.normalForce}:</Text>
                    <Paragraph strong>{Fn.toFixed(1)} N</Paragraph>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary">{t.frictionForce}:</Text>
                    <Paragraph strong>{Ff.toFixed(1)} N</Paragraph>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary">{t.netForce}:</Text>
                    <Paragraph strong>{Fnet.toFixed(1)} N</Paragraph>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary">{t.acceleration}:</Text>
                    <Paragraph strong>{ipAccel.toFixed(2)} m/s²</Paragraph>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary">{t.velocity}:</Text>
                    <Paragraph strong>{currentVelocity.toFixed(2)} m/s</Paragraph>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary">{t.distance}:</Text>
                    <Paragraph strong>{currentDistance.toFixed(2)} m</Paragraph>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary">{t.time}:</Text>
                    <Paragraph strong>{ipTime.toFixed(2)} s</Paragraph>
                  </Col>
                </Row>
                <div style={{ marginTop: 12 }}>
                  <Formula math="a = g \cdot (\sin\theta - \mu\cos\theta)" block />
                </div>
              </div>
            )}

            {type === 'piston-gas' && (
              <div className="math-results-grid">
                <Row gutter={[12, 12]}>
                  <Col span={12}>
                    <Text type="secondary">{t.gasEnergy} (U):</Text>
                    <Paragraph strong>{Math.round(1.5 * nR * gasTemp * 100)} J</Paragraph>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary">{t.gasWork} (W):</Text>
                    <Paragraph strong>{Math.round(gasWork)} J</Paragraph>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary">{t.addHeat} (Q):</Text>
                    <Paragraph strong>{Math.round(gasHeat)} J</Paragraph>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary">{t.particlesSpeed}:</Text>
                    <Paragraph strong>~ {Math.round(Math.sqrt(gasTemp / 300) * 450)} m/s</Paragraph>
                  </Col>
                </Row>
                <div style={{ marginTop: 12 }}>
                  <Formula math="\Delta U = Q - W \quad ; \quad U = \frac{3}{2}nRT" block />
                </div>
              </div>
            )}

            {type === 'electric-circuit' && (
              <div className="math-results-grid">
                <Row gutter={[12, 12]}>
                  <Col span={12}>
                    <Text type="secondary">{t.totalResistance}:</Text>
                    <Paragraph strong>{Req.toFixed(1)} Ω</Paragraph>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary">{t.current} (I):</Text>
                    <Paragraph strong>{circuitCurrent.toFixed(3)} A</Paragraph>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary">{t.voltageR1}:</Text>
                    <Paragraph strong>{voltDropR1.toFixed(2)} V (I₁ = {currentR1.toFixed(2)} A)</Paragraph>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary">{t.voltageR2}:</Text>
                    <Paragraph strong>{voltDropR2.toFixed(2)} V (I₂ = {currentR2.toFixed(2)} A)</Paragraph>
                  </Col>
                  <Col span={24}>
                    <Text type="secondary">{t.power} (P):</Text>
                    <Paragraph strong>{totalPower.toFixed(2)} W</Paragraph>
                  </Col>
                </Row>
                <div style={{ marginTop: 12 }}>
                  <Formula math="U = I \cdot R_{eq} \quad ; \quad P = U \cdot I" block />
                </div>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </Card>
  );
}
