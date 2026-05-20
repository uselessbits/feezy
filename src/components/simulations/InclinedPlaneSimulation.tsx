import { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Row, Slider, Space, Typography } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { Formula } from '../Formula';

const { Title, Text, Paragraph } = Typography;

interface SimulationProps {
  language: 'en' | 'ro';
}

export function InclinedPlaneSimulation({ language }: Readonly<SimulationProps>) {
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
    },
  }[language];

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

  return (
    <Card className="physics-simulation-card glass-card">
      <Row gutter={[24, 24]}>
        {/* Render interactive stage */}
        <Col xs={24} md={12}>
          <div className="simulation-stage">
            <svg viewBox="0 0 400 240" className="ip-svg">
              <defs>
                <linearGradient id="planeGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(124, 92, 255, 0.2)" />
                  <stop offset="100%" stopColor="rgba(31, 210, 178, 0.1)" />
                </linearGradient>
              </defs>
              {/* Wedge representing inclined plane */}
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

                // Block rotation angle (radians)
                const rotationDeg = ipAngle;

                // Vector arrow scales
                const arrowScale = 2.5;
                const vectorFG_y = Fg * arrowScale;
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

                      {/* Normal force Fn */}
                      <line x1="0" y1="-18" x2="0" y2={-18 - Fn * arrowScale} stroke="#7c5cff" strokeWidth="3" markerEnd="url(#arrow)" />
                      <text x="5" y={-18 - Fn * arrowScale} fill="#7c5cff" fontSize="10" fontWeight="bold">Fn</text>

                      {/* Friction force Ff */}
                      <line x1="0" y1="-18" x2={-Ff * arrowScale} y2="-18" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow)" />
                      <text x={-Ff * arrowScale - 15} y="-22" fill="#ef4444" fontSize="10" fontWeight="bold">Ff</text>

                      {/* Net force Fnet */}
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
          </div>
        </Col>

        {/* Sliders and Calculations panel */}
        <Col xs={24} md={12}>
          <div className="simulation-controls">
            <Title level={4}>{t.controls}</Title>
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
          </div>

          <Card className="simulation-values-card" style={{ marginTop: 20, background: 'rgba(124, 92, 255, 0.03)' }}>
            <Title level={5} style={{ marginTop: 0 }}>{t.values}</Title>
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
          </Card>
        </Col>
      </Row>
    </Card>
  );
}
