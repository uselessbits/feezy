import { useState } from 'react';
import { Card, Col, Row, Slider, Space, Typography } from 'antd';
import { Formula } from '../Formula';

const { Title, Text, Paragraph } = Typography;

interface SimulationProps {
  language: 'en' | 'ro';
}

export function RefractionOpticsSimulation({ language }: Readonly<SimulationProps>) {
  const t = {
    en: {
      controls: 'Simulation Controls',
      values: 'Calculated Values',
      incAngle: 'Angle of Incidence (i)',
      refractionIndex1: 'Refractive Index n₁',
      refractionIndex2: 'Refractive Index n₂',
      refractedAngle: 'Angle of Refraction (r)',
      reflectedAngle: 'Angle of Reflection (r\')',
      criticalAngle: 'Critical Angle (l)',
      tirMessage: 'Total Internal Reflection!',
      phaseVelocity1: 'Velocity in Medium 1 (v₁)',
      phaseVelocity2: 'Velocity in Medium 2 (v₂)',
    },
    ro: {
      controls: 'Control Simulare',
      values: 'Valori Calculate',
      incAngle: 'Unghi de Incidență (i)',
      refractionIndex1: 'Indice de Refracție n₁',
      refractionIndex2: 'Indice de Refracție n₂',
      refractedAngle: 'Unghi de Refracție (r)',
      reflectedAngle: 'Unghi de Reflexie (r\')',
      criticalAngle: 'Unghi Limită (l)',
      tirMessage: 'Reflexie Totală Internă!',
      phaseVelocity1: 'Viteza în Mediul 1 (v₁)',
      phaseVelocity2: 'Viteza în Mediul 2 (v₂)',
    },
  }[language];

  const [refAngle, setRefAngle] = useState(45); // degrees
  const [refN1, setRefN1] = useState(1.0); // Medium 1 index
  const [refN2, setRefN2] = useState(1.5); // Medium 2 index

  const theta1 = (refAngle * Math.PI) / 180;
  
  const hasCriticalAngle = refN1 > refN2;
  const criticalAngleRad = hasCriticalAngle ? Math.asin(refN2 / refN1) : null;
  const criticalAngleDeg = criticalAngleRad ? (criticalAngleRad * 180) / Math.PI : null;
  
  const isTIR = hasCriticalAngle && refAngle >= (criticalAngleDeg ?? 90);
  
  let theta2 = 0;
  if (!isTIR) {
    theta2 = Math.asin((refN1 * Math.sin(theta1)) / refN2);
  }
  const refAngleOutDeg = isTIR ? null : (theta2 * 180) / Math.PI;

  const vel1 = 1 / refN1;
  const vel2 = 1 / refN2;

  // Ray geometry
  const R = 100;
  const xStart = 200 - R * Math.sin(theta1);
  const yStart = 120 - R * Math.cos(theta1);
  const xRefl = 200 + R * Math.sin(theta1);
  const yRefl = 120 - R * Math.cos(theta1);
  const xRefr = isTIR ? 200 : 200 + R * Math.sin(theta2);
  const yRefr = isTIR ? 120 : 120 + R * Math.cos(theta2);

  return (
    <Card className="physics-simulation-card glass-card">
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <div className="simulation-stage">
            <svg viewBox="0 0 400 240" className="optics-refraction-svg" style={{ width: '100%', height: 'auto', maxHeight: '240px' }}>
              <rect x="10" y="10" width="380" height="110" rx="8" fill="rgba(31, 210, 178, 0.06)" stroke="rgba(31, 210, 178, 0.2)" strokeWidth="1" />
              <rect x="10" y="120" width="380" height="110" rx="8" fill="rgba(124, 92, 255, 0.08)" stroke="rgba(124, 92, 255, 0.2)" strokeWidth="1" />
              
              <line x1="10" y1="120" x2="390" y2="120" stroke="#7c5cff" strokeWidth="3" />
              <line x1="200" y1="15" x2="200" y2="225" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="5 5" />
              
              <line x1={xStart} y1={yStart} x2="200" y2="120" stroke="#ff5959" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx={(xStart + 200) / 2} cy={(yStart + 120) / 2} r="4" fill="#ff5959" />

              <line x1="200" y1="120" x2={xRefl} y2={yRefl} stroke="#ff5959" strokeWidth={isTIR ? 3.5 : 1.5} opacity={isTIR ? 0.9 : 0.4} strokeLinecap="round" />
              
              {!isTIR && (
                <>
                  <line x1="200" y1="120" x2={xRefr} y2={yRefr} stroke="#1fd2b2" strokeWidth="3.5" strokeLinecap="round" />
                  <circle cx={(200 + xRefr) / 2} cy={(120 + yRefr) / 2} r="4" fill="#1fd2b2" />
                </>
              )}
              
              {refAngle > 5 && (
                <path
                  d={`M 200 ${120 - 25} A 25 25 0 0 0 ${200 - 25 * Math.sin(theta1)} ${120 - 25 * Math.cos(theta1)}`}
                  fill="none"
                  stroke="#ff5959"
                  strokeWidth="1.5"
                />
              )}
              <text x={200 - 32} y={120 - 30} fill="#ff5959" fontSize="11" fontWeight="bold">i = {refAngle}°</text>
              
              {!isTIR && refAngleOutDeg && refAngleOutDeg > 3 && (
                <path
                  d={`M 200 ${120 + 25} A 25 25 0 0 0 ${200 + 25 * Math.sin(theta2)} ${120 + 25 * Math.cos(theta2)}`}
                  fill="none"
                  stroke="#1fd2b2"
                  strokeWidth="1.5"
                />
              )}
              {!isTIR && refAngleOutDeg && (
                <text x={200 + 15} y={120 + 35} fill="#1fd2b2" fontSize="11" fontWeight="bold">r = {refAngleOutDeg.toFixed(1)}°</text>
              )}

              {isTIR && (
                <g className="animate-glow">
                  <rect x="90" y="135" width="220" height="32" rx="6" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="1.5" />
                  <text x="200" y="156" fill="#ef4444" fontSize="12" fontWeight="800" textAnchor="middle" letterSpacing="0.05em">
                    {t.tirMessage}
                  </text>
                </g>
              )}

              <text x="25" y="32" fill="#6b7280" fontSize="12" fontWeight="bold">{language === 'en' ? 'Medium 1 (Air)' : 'Mediul 1 (Aer)'}</text>
              <text x="25" y="48" fill="#1fd2b2" fontSize="11" fontWeight="bold">n₁ = {refN1.toFixed(2)}</text>
              <text x="25" y="200" fill="#6b7280" fontSize="12" fontWeight="bold">{refN2 === 1.5 ? (language === 'en' ? 'Medium 2 (Glass)' : 'Mediul 2 (Sticlă)') : (language === 'en' ? 'Medium 2 (Liquid)' : 'Mediul 2 (Lichid)')}</text>
              <text x="25" y="216" fill="#7c5cff" fontSize="11" fontWeight="bold">n₂ = {refN2.toFixed(2)}</text>
            </svg>
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div className="simulation-controls">
            <Title level={4}>{t.controls}</Title>
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              <div>
                <Text>{t.incAngle}: <strong>{refAngle}°</strong></Text>
                <Slider min={0} max={85} value={refAngle} onChange={setRefAngle} />
              </div>
              <div>
                <Text>{t.refractionIndex1}: <strong>{refN1.toFixed(2)}</strong></Text>
                <Slider min={100} max={250} value={refN1 * 100} onChange={(v) => setRefN1(v / 100)} />
              </div>
              <div>
                <Text>{t.refractionIndex2}: <strong>{refN2.toFixed(2)}</strong></Text>
                <Slider min={100} max={250} value={refN2 * 100} onChange={(v) => setRefN2(v / 100)} />
              </div>
            </Space>
          </div>

          <Card className="simulation-values-card" style={{ marginTop: 20, background: 'rgba(124, 92, 255, 0.03)' }}>
            <Title level={5} style={{ marginTop: 0 }}>{t.values}</Title>
            <div className="math-results-grid">
              <Row gutter={[12, 12]}>
                <Col span={12}>
                  <Text type="secondary">{t.reflectedAngle}:</Text>
                  <Paragraph strong>{refAngle}°</Paragraph>
                </Col>
                <Col span={12}>
                  <Text type="secondary">{t.refractedAngle}:</Text>
                  <Paragraph strong>{isTIR ? t.tirMessage : `${refAngleOutDeg?.toFixed(1)}°`}</Paragraph>
                </Col>
                <Col span={12}>
                  <Text type="secondary">{t.criticalAngle}:</Text>
                  <Paragraph strong>{criticalAngleDeg ? `${criticalAngleDeg.toFixed(1)}°` : 'N/A'}</Paragraph>
                </Col>
                <Col span={12}>
                  <Text type="secondary">{t.phaseVelocity1}:</Text>
                  <Paragraph strong>{vel1.toFixed(2)} c</Paragraph>
                </Col>
                <Col span={12}>
                  <Text type="secondary">{t.phaseVelocity2}:</Text>
                  <Paragraph strong>{vel2.toFixed(2)} c</Paragraph>
                </Col>
              </Row>
              <div style={{ marginTop: 12 }}>
                <Formula math="n_1 \sin(i) = n_2 \sin(r) \quad ; \quad v = \frac{c}{n}" block />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Card>
  );
}
