import { useState } from 'react';
import { Card, Col, Radio, Row, Slider, Space, Typography } from 'antd';
import { Formula } from '../Formula';

const { Title, Text, Paragraph } = Typography;

interface SimulationProps {
  language: 'en' | 'ro';
}

export function LensOpticsSimulation({ language }: Readonly<SimulationProps>) {
  const t = {
    en: {
      controls: 'Simulation Controls',
      values: 'Calculated Values',
      lensType: 'Lens Type',
      converging: 'Converging (Convex)',
      diverging: 'Diverging (Concave)',
      focalLength: 'Focal Length (f)',
      objectDistance: 'Object Distance (x₁)',
      objectHeight: 'Object Height (y₁)',
      imageDistance: 'Image Distance (x₂)',
      magnification: 'Linear Magnification (β)',
      imageHeight: 'Image Height (y₂)',
      imageProperties: 'Image Type',
      real: 'Real Image',
      virtual: 'Virtual Image',
      upright: 'Upright',
      inverted: 'Inverted',
      magnified: 'Magnified',
      diminished: 'Diminished',
      opticalPower: 'Optical Power (C)',
      infinityMessage: 'Image formed at infinity (parallel rays)',
    },
    ro: {
      controls: 'Control Simulare',
      values: 'Valori Calculate',
      lensType: 'Tipul Lentilei',
      converging: 'Convergentă (Biconvexă)',
      diverging: 'Divergentă (Biconcavă)',
      focalLength: 'Distanță Focală (f)',
      objectDistance: 'Distanță Obiect (x₁)',
      objectHeight: 'Înălțime Obiect (y₁)',
      imageDistance: 'Distanță Imagine (x₂)',
      magnification: 'Mărire Liniară (β)',
      imageHeight: 'Înălțime Imagine (y₂)',
      imageProperties: 'Tipul Imaginii',
      real: 'Imagine Reală',
      virtual: 'Imagine Virtuală',
      upright: 'Dreaptă',
      inverted: 'Răsturnată',
      magnified: 'Mărită',
      diminished: 'Micșorată',
      opticalPower: 'Convergență (C)',
      infinityMessage: 'Imagine formată la infinit (raze paralele)',
    },
  }[language];

  const [lensType, setLensType] = useState<'converging' | 'diverging'>('converging');
  const [lensF, setLensF] = useState(60); // focal length in pixels
  const [lensX1, setLensX1] = useState(120); // object distance in pixels
  const [lensY1, setLensY1] = useState(40); // object height in pixels

  const X1 = -lensX1;
  const F = lensType === 'converging' ? lensF : -lensF;
  
  const isAtFocus = lensType === 'converging' && Math.abs(lensX1 - lensF) < 1e-3;
  
  const X2 = isAtFocus ? Infinity : (F * X1) / (F + X1);
  const lensBeta = isAtFocus ? Infinity : X2 / X1;
  const lensY2 = isAtFocus ? Infinity : lensBeta * lensY1;
  
  const focalMeters = F / 100;
  const opticalPowerValue = 1 / focalMeters;

  const O_x = 200;
  const O_y = 120;
  
  const objX = O_x - lensX1;
  const objY = O_y - lensY1;

  const imgX = isAtFocus ? null : O_x + X2;
  const imgY = isAtFocus ? null : O_y - lensY2;

  // Ray tracing lines
  const r1LensY = objY;
  const m1 = lensType === 'converging' 
    ? (O_y - r1LensY) / (O_x + lensF - O_x)
    : (O_y - r1LensY) / (O_x - lensF - O_x);

  const r1EndX = 370;
  const r1EndY = O_y + m1 * (r1EndX - O_x);

  const r2EndX = 370;
  const r2EndY = O_y + (O_y - objY) / (O_x - objX) * (r2EndX - O_x);

  let r3LensY = O_y;
  if (lensType === 'converging') {
    r3LensY = isAtFocus ? O_y : O_y - lensY2;
  } else {
    const slopeObjToRightF = (O_y - objY) / (O_x + lensF - objX);
    r3LensY = objY + slopeObjToRightF * (O_x - objX);
  }

  return (
    <Card className="physics-simulation-card glass-card">
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <div className="simulation-stage">
            <svg viewBox="0 0 400 240" className="optics-lens-svg" style={{ width: '100%', height: 'auto', maxHeight: '240px' }}>
              <line x1="15" y1={O_y} x2="385" y2={O_y} stroke="#9ca3af" strokeWidth="1.5" />
              <text x="375" y={O_y - 8} fill="#9ca3af" fontSize="10" fontWeight="bold">x</text>

              <circle cx={O_x - lensF} cy={O_y} r="3.5" fill="#7c5cff" />
              <text x={O_x - lensF - 8} y={O_y + 16} fill="#7c5cff" fontSize="10" fontWeight="bold">
                {lensType === 'converging' ? 'F' : 'F\''}
              </text>

              <circle cx={O_x + lensF} cy={O_y} r="3.5" fill="#7c5cff" />
              <text x={O_x + lensF - 8} y={O_y + 16} fill="#7c5cff" fontSize="10" fontWeight="bold">
                {lensType === 'converging' ? 'F\'' : 'F'}
              </text>

              <line x1={O_x} y1="20" x2={O_x} y2="220" stroke="#7c5cff" strokeWidth="2.5" />
              
              {lensType === 'converging' ? (
                <>
                  <path d={`M ${O_x - 8} 30 L ${O_x} 20 L ${O_x + 8} 30`} fill="none" stroke="#7c5cff" strokeWidth="2" strokeLinecap="round" />
                  <path d={`M ${O_x - 8} 210 L ${O_x} 220 L ${O_x + 8} 210`} fill="none" stroke="#7c5cff" strokeWidth="2" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <path d={`M ${O_x - 8} 20 L ${O_x} 30 L ${O_x + 8} 20`} fill="none" stroke="#7c5cff" strokeWidth="2" strokeLinecap="round" />
                  <path d={`M ${O_x - 8} 220 L ${O_x} 210 L ${O_x + 8} 220`} fill="none" stroke="#7c5cff" strokeWidth="2" strokeLinecap="round" />
                </>
              )}
              <text x={O_x + 10} y="32" fill="#7c5cff" fontSize="11" fontWeight="bold">O</text>

              <line x1={objX} y1={O_y} x2={objX} y2={objY} stroke="#ffd166" strokeWidth="4" markerEnd="url(#arrow-obj)" />
              <text x={objX - 12} y={objY - 8} fill="#ffd166" fontSize="10" fontWeight="bold">A</text>
              
              {!isAtFocus && imgX !== null && imgY !== null && (
                <>
                  <line
                    x1={imgX}
                    y1={O_y}
                    x2={imgX}
                    y2={imgY}
                    stroke="#1fd2b2"
                    strokeWidth="4"
                    strokeDasharray={X2 < 0 ? '4 4' : undefined}
                    markerEnd="url(#arrow-img)"
                  />
                  <text x={imgX + 6} y={imgY + (X2 < 0 && lensY2 < 0 ? 12 : -8)} fill="#1fd2b2" fontSize="10" fontWeight="bold">
                    A'
                  </text>
                </>
              )}

              {/* Ray 1: Parallel -> Focus */}
              <line x1={objX} y1={objY} x2={O_x} y2={objY} stroke="#ff5959" strokeWidth="1.5" opacity="0.75" />
              <line x1={O_x} y1={objY} x2={r1EndX} y2={r1EndY} stroke="#ff5959" strokeWidth="1.5" opacity="0.75" />
              {!isAtFocus && X2 < 0 && imgX !== null && imgY !== null && (
                <line x1={O_x} y1={objY} x2={imgX} y2={imgY} stroke="#ff5959" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />
              )}

              {/* Ray 2: Central ray */}
              <line x1={objX} y1={objY} x2={r2EndX} y2={r2EndY} stroke="#ffd166" strokeWidth="1.5" opacity="0.6" />
              {!isAtFocus && X2 < 0 && imgX !== null && imgY !== null && (
                <line x1={O_x} y1={O_y} x2={imgX} y2={imgY} stroke="#ffd166" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />
              )}

              {/* Ray 3: Focal ray */}
              {lensType === 'converging' && !isAtFocus && imgX !== null && imgY !== null && (
                <>
                  <line x1={objX} y1={objY} x2={O_x} y2={r3LensY} stroke="#1fd2b2" strokeWidth="1.5" opacity="0.6" />
                  <line x1={O_x} y1={r3LensY} x2="370" y2={r3LensY} stroke="#1fd2b2" strokeWidth="1.5" opacity="0.6" />
                  {X2 < 0 && (
                    <line x1={O_x} y1={r3LensY} x2={imgX} y2={imgY} stroke="#1fd2b2" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
                  )}
                </>
              )}
              
              {lensType === 'diverging' && !isAtFocus && imgX !== null && imgY !== null && (
                <>
                  <line x1={objX} y1={objY} x2={O_x} y2={r3LensY} stroke="#1fd2b2" strokeWidth="1.5" opacity="0.6" />
                  <line x1={O_x} y1={r3LensY} x2="370" y2={r3LensY} stroke="#1fd2b2" strokeWidth="1.5" opacity="0.6" />
                  <line x1={O_x} y1={r3LensY} x2={imgX} y2={imgY} stroke="#1fd2b2" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
                </>
              )}

              {isAtFocus && (
                <g>
                  <rect x="80" y="190" width="240" height="32" rx="6" fill="rgba(255, 209, 102, 0.12)" stroke="#ffd166" strokeWidth="1.5" />
                  <text x="200" y="210" fill="#d97706" fontSize="11" fontWeight="bold" textAnchor="middle">
                    {t.infinityMessage}
                  </text>
                </g>
              )}

              <defs>
                <marker id="arrow-obj" viewBox="0 0 10 10" refX="5" refY="1" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M 0 10 L 5 0 L 10 10 z" fill="#ffd166" />
                </marker>
                <marker id="arrow-img" viewBox="0 0 10 10" refX="5" refY="1" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M 0 10 L 5 0 L 10 10 z" fill="#1fd2b2" />
                </marker>
              </defs>
            </svg>
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div className="simulation-controls">
            <Title level={4}>{t.controls}</Title>
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              <div>
                <Text>{t.lensType}:</Text>
                <div style={{ marginTop: 6 }}>
                  <Radio.Group value={lensType} onChange={(e) => setLensType(e.target.value)} size="small">
                    <Radio.Button value="converging">{t.converging}</Radio.Button>
                    <Radio.Button value="diverging">{t.diverging}</Radio.Button>
                  </Radio.Group>
                </div>
              </div>
              <div>
                <Text>{t.focalLength}: <strong>{lensF} cm</strong></Text>
                <Slider min={30} max={100} value={lensF} onChange={setLensF} />
              </div>
              <div>
                <Text>{t.objectDistance}: <strong>{lensX1} cm</strong></Text>
                <Slider min={15} max={200} value={lensX1} onChange={setLensX1} />
              </div>
              <div>
                <Text>{t.objectHeight}: <strong>{lensY1} cm</strong></Text>
                <Slider min={10} max={60} value={lensY1} onChange={setLensY1} />
              </div>
            </Space>
          </div>

          <Card className="simulation-values-card" style={{ marginTop: 20, background: 'rgba(124, 92, 255, 0.03)' }}>
            <Title level={5} style={{ marginTop: 0 }}>{t.values}</Title>
            <div className="math-results-grid">
              <Row gutter={[12, 12]}>
                <Col span={12}>
                  <Text type="secondary">{t.imageDistance} (x₂):</Text>
                  <Paragraph strong>{isAtFocus ? '∞' : `${X2.toFixed(1)} cm`}</Paragraph>
                </Col>
                <Col span={12}>
                  <Text type="secondary">{t.magnification} (β):</Text>
                  <Paragraph strong>{isAtFocus ? '∞' : lensBeta.toFixed(2)}</Paragraph>
                </Col>
                <Col span={12}>
                  <Text type="secondary">{t.imageHeight} (y₂):</Text>
                  <Paragraph strong>{isAtFocus ? '∞' : `${Math.abs(lensY2).toFixed(1)} cm`}</Paragraph>
                </Col>
                <Col span={12}>
                  <Text type="secondary">{t.opticalPower} (C):</Text>
                  <Paragraph strong>{opticalPowerValue.toFixed(2)} δ (m⁻¹)</Paragraph>
                </Col>
                <Col span={24}>
                  <Text type="secondary">{t.imageProperties}:</Text>
                  <Paragraph strong style={{ color: '#1fd2b2' }}>
                    {isAtFocus ? (
                      t.infinityMessage
                    ) : (
                      `${X2 > 0 ? t.real : t.virtual}, ${lensBeta > 0 ? t.upright : t.inverted}, ${
                        Math.abs(lensBeta) > 1.01
                          ? t.magnified
                          : Math.abs(lensBeta) < 0.99
                          ? t.diminished
                          : (language === 'en' ? 'Equal Size' : 'Egală ca mărime')
                      }`
                    )}
                  </Paragraph>
                </Col>
              </Row>
              <div style={{ marginTop: 12 }}>
                <Formula math="\frac{1}{f} = \frac{1}{x_2} - \frac{1}{x_1} \quad ; \quad C = \frac{1}{f}" block />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Card>
  );
}
