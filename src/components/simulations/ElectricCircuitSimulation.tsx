import { useEffect, useState } from 'react';
import { Card, Col, Radio, Row, Slider, Space, Switch, Typography } from 'antd';
import { Formula } from '../Formula';

const { Title, Text, Paragraph } = Typography;

interface SimulationProps {
  language: 'en' | 'ro';
}

export function ElectricCircuitSimulation({ language }: Readonly<SimulationProps>) {
  const t = {
    en: {
      controls: 'Simulation Controls',
      values: 'Calculated Values',
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
    },
    ro: {
      controls: 'Control Simulare',
      values: 'Valori Calculate',
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
    },
  }[language];

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
        setElectronOffset((prev) => (prev + circuitCurrent * 20) % 1000);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [elecIsClosed, circuitCurrent]);

  return (
    <Card className="physics-simulation-card glass-card">
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <div className="simulation-stage">
            <svg viewBox="0 0 400 220" className="circuit-svg">
              {/* Wiring lines */}
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

              {/* Switch at top wire */}
              {elecIsClosed ? (
                <line x1="120" y1="40" x2="180" y2="40" stroke="#1fd2b2" strokeWidth="3" />
              ) : (
                <line x1="120" y1="40" x2="175" y2="20" stroke="#ef4444" strokeWidth="3" />
              )}
              <circle cx="120" cy="40" r="4" fill="#7c5cff" />
              <circle cx="180" cy="40" r="4" fill="#7c5cff" />
              <text x="140" y="15" fill={elecIsClosed ? '#1fd2b2' : '#ef4444'} fontSize="11" fontWeight="bold">K</text>

              {/* Right side connection paths */}
              {elecConfig === 'series' ? (
                <>
                  <path d="M 180 40 L 340 40 L 340 70" fill="none" stroke="#7c5cff" strokeWidth="3" />
                  <rect x="315" y="70" width="50" height="24" fill="#ffd166" stroke="#d97706" strokeWidth="2" />
                  <text x="285" y="86" fill="#1f2937" fontSize="11" fontWeight="bold">R1</text>
                  <line x1="340" y1="94" x2="340" y2="120" stroke="#7c5cff" strokeWidth="3" />
                  <rect x="315" y="120" width="50" height="24" fill="#ffd166" stroke="#d97706" strokeWidth="2" />
                  <text x="285" y="136" fill="#1f2937" fontSize="11" fontWeight="bold">R2</text>
                  <path d="M 340 144 L 340 180 L 120 180" fill="none" stroke="#7c5cff" strokeWidth="3" />
                </>
              ) : (
                <>
                  <path d="M 180 40 L 260 40 L 260 80" fill="none" stroke="#7c5cff" strokeWidth="3" />
                  <path d="M 260 40 L 340 40 L 340 80" fill="none" stroke="#7c5cff" strokeWidth="3" />
                  <rect x="235" y="80" width="50" height="24" fill="#ffd166" stroke="#d97706" strokeWidth="2" />
                  <text x="210" y="96" fill="#1f2937" fontSize="11" fontWeight="bold">R1</text>
                  <rect x="315" y="80" width="50" height="24" fill="#ffd166" stroke="#d97706" strokeWidth="2" />
                  <text x="290" y="96" fill="#1f2937" fontSize="11" fontWeight="bold">R2</text>
                  <path d="M 260 104 L 260 140 L 120 140" fill="none" stroke="#7c5cff" strokeWidth="3" />
                  <path d="M 340 104 L 340 140 L 260 140" fill="none" stroke="#7c5cff" strokeWidth="3" />
                  <path d="M 120 140 L 120 180" fill="none" stroke="#7c5cff" strokeWidth="3" />
                </>
              )}

              {/* Animated electrons */}
              {elecIsClosed && circuitCurrent > 0 && (() => {
                const dotPositions = [];
                const count = 12;
                
                for (let i = 0; i < count; i++) {
                  const progress = (electronOffset + (i * 1000) / count) % 1000;
                  
                  if (elecConfig === 'series') {
                    let x = 60, y = 40;
                    if (progress < 150) {
                      x = 60 + (progress / 150) * 280;
                      y = 40;
                    } else if (progress < 300) {
                      x = 340;
                      y = 40 + ((progress - 150) / 150) * 140;
                    } else if (progress < 650) {
                      x = 340 - ((progress - 300) / 350) * 280;
                      y = 180;
                    } else {
                      x = 60;
                      y = 180 - ((progress - 650) / 350) * 140;
                    }
                    dotPositions.push({ x, y });
                  } else {
                    let x = 60, y = 40;
                    const isBranch1 = i % 2 === 0;
                    
                    if (progress < 150) {
                      x = 60 + (progress / 150) * (isBranch1 ? 200 : 280);
                      y = 40;
                    } else if (progress < 300) {
                      x = isBranch1 ? 260 : 340;
                      y = 40 + ((progress - 150) / 150) * 100;
                    } else if (progress < 600) {
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
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div className="simulation-controls">
            <Title level={4}>{t.controls}</Title>
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
          </div>

          <Card className="simulation-values-card" style={{ marginTop: 20, background: 'rgba(124, 92, 255, 0.03)' }}>
            <Title level={5} style={{ marginTop: 0 }}>{t.values}</Title>
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
          </Card>
        </Col>
      </Row>
    </Card>
  );
}
