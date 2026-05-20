import { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Radio, Row, Slider, Space, Typography } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { Formula } from '../Formula';

const { Title, Text, Paragraph } = Typography;

interface SimulationProps {
  language: 'en' | 'ro';
}

export function PistonGasSimulation({ language }: Readonly<SimulationProps>) {
  const t = {
    en: {
      play: 'Play',
      pause: 'Pause',
      reset: 'Reset',
      controls: 'Simulation Controls',
      values: 'Calculated Values',
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
      particlesSpeed: 'Average Particle Velocity',
    },
    ro: {
      play: 'Pornește',
      pause: 'Pauză',
      reset: 'Resetează',
      controls: 'Control Simulare',
      values: 'Valori Calculate',
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
      particlesSpeed: 'Viteza Medie a Particulelor',
    },
  }[language];

  const [gasProcess, setGasProcess] = useState<'isobaric' | 'isochoric' | 'isothermal' | 'adiabatic'>('isobaric');
  const [gasTemp, setGasTemp] = useState(300); // K
  const [gasVol, setGasVol] = useState(2.0); // L
  const [gasPres, setGasPres] = useState(3.0); // atm
  const [gasWork, setGasWork] = useState(0); // J
  const [gasHeat, setGasHeat] = useState(0); // J
  const [gasIsRunning, setGasIsRunning] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number }>>([]);

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
      const cylWidth = 220;
      const cylX = 30;
      const cylBottomY = 180;
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

        // Collision with piston head
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
            const W_step = gasPres * 101.325 * dV_liters;
            setGasWork((w) => w + W_step);
            setGasVol(finalV);
            const dU = 1.5 * nR * deltaT * 100; // Scaled to Joules
            setGasHeat((q) => q + dU + W_step);
          } else if (gasProcess === 'isochoric') {
            // V const, P increases. Work = 0.
            const nextP = (nR * nextT) / gasVol;
            setGasPres(Math.min(nextP, 10.0));
            const dU = 1.5 * nR * deltaT * 100;
            setGasHeat((q) => q + dU);
          } else if (gasProcess === 'isothermal') {
            // T const, simulate expansion: Volume increases, Pressure decreases
            setGasVol((V) => {
              const nextV = Math.min(V + 0.05, 5.0);
              const dV = nextV - V;
              const nextP = (nR * gasTemp) / nextV;
              setGasPres(nextP);
              const W_step = nextP * 101.325 * dV;
              setGasWork((w) => w + W_step);
              setGasHeat((q) => q + W_step);
              return nextV;
            });
            return T; // Temperature remains constant
          } else if (gasProcess === 'adiabatic') {
            // Q = 0, expansion. Volume increases, P decreases, T decreases.
            setGasVol((V) => {
              const nextV = Math.min(V + 0.05, 5.0);
              const dV = nextV - V;
              const constant = gasPres * Math.pow(V, 1.67);
              const nextP = constant / Math.pow(nextV, 1.67);
              setGasPres(nextP);
              const W_step = nextP * 101.325 * dV;
              setGasWork((w) => w + W_step);
              return nextV;
            });
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

  return (
    <Card className="physics-simulation-card glass-card">
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <div className="simulation-stage">
            <div className="gas-canvas-wrapper" style={{ position: 'relative', width: '280px', height: '200px', margin: '0 auto' }}>
              <canvas ref={canvasRef} width="280" height="200" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }} />
              <div className="pv-indicator" style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.5)', padding: '4px 8px', borderRadius: '4px', color: '#fff', fontSize: '11px' }}>
                PV = {(gasPres * gasVol).toFixed(3)} L·atm
              </div>
            </div>
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div className="simulation-controls">
            <Title level={4}>{t.controls}</Title>
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
          </div>

          <Card className="simulation-values-card" style={{ marginTop: 20, background: 'rgba(124, 92, 255, 0.03)' }}>
            <Title level={5} style={{ marginTop: 0 }}>{t.values}</Title>
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
          </Card>
        </Col>
      </Row>
    </Card>
  );
}
