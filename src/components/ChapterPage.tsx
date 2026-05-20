import { Button, Card, Typography } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { chapters } from '../data/curriculum';
import { lookupFormula } from '../data/formulasRegistry';
import { Formula, FormulaDetailCard } from './Formula';
import { PhysicsChart } from './PhysicsChart';
import { PhysicsSimulation } from './PhysicsSimulation';
import type { ChapterId, Language } from '../data/types';

interface ChapterPageProps {
  language: Language;
}

interface StepperStep {
  type: 'theory' | 'formula' | 'simulation';
  title: { en: string; ro: string };
  paragraphs?: { en: string[]; ro: string[] };
  bullets?: { en: string[]; ro: string[] };
  charts?: any[];
  formulaStr?: string;
  simulationType?: any;
}

export function ChapterPage({ language }: Readonly<ChapterPageProps>) {
  const { chapterId } = useParams();
  const chapter = chapters.find((item) => item.id === (chapterId as ChapterId));
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!chapter) {
    return <Navigate to="/chapters" replace />;
  }

  // Generate steps from lessons and sections
  const stepperSteps = chapter.lessons.flatMap((lesson) =>
    lesson.sections.flatMap((section) => {
      const stepsInSection: StepperStep[] = [];

      const hasTheory =
        (section.paragraphs && (section.paragraphs.en?.length || section.paragraphs.ro?.length)) ||
        (section.bullets && (section.bullets.en?.length || section.bullets.ro?.length)) ||
        (section.charts && section.charts.length > 0);

      // 1. Add theory step if there are paragraphs, bullets, or charts
      if (hasTheory) {
        stepsInSection.push({
          type: 'theory',
          title: section.title,
          paragraphs: section.paragraphs,
          bullets: section.bullets,
          charts: section.charts,
        });
      }

      // 2. Add a separate step for each formula
      if (section.formulas?.length) {
        section.formulas.forEach((formula) => {
          const formulaDetail = lookupFormula(formula);
          const formulaTitle = formulaDetail
            ? formulaDetail.name
            : { en: 'Formula', ro: 'Formulă' };

          stepsInSection.push({
            type: 'formula',
            title: formulaTitle,
            formulaStr: formula,
          });
        });
      }

      // 3. Add a step for the simulation if present
      if (section.simulation) {
        stepsInSection.push({
          type: 'simulation',
          title: {
            en: `Interactive Simulation: ${section.title.en}`,
            ro: `Simulare Interactivă: ${section.title.ro}`,
          },
          simulationType: section.simulation,
        });
      }

      return stepsInSection;
    })
  );

  const totalSteps = stepperSteps.length;

  // Guard step index out of bounds
  const activeStepIndex = Math.min(currentStepIndex, totalSteps - 1);
  const currentStep = stepperSteps[activeStepIndex];

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  if (!currentStep) {
    return null;
  }

  return (
    <div className="chapter-stepper">
      <div className="chapter-hero card">
        <Typography.Text className="chapter-kicker">{chapter.code}</Typography.Text>
        <Typography.Title>{chapter.title[language]}</Typography.Title>
        <Typography.Paragraph>{chapter.summary[language]}</Typography.Paragraph>
      </div>

      <div className="stepper-progress">
        <Typography.Text className="progress-label">
          {language === 'en' ? 'Step' : 'Pasul'} {activeStepIndex + 1} {language === 'en' ? 'of' : 'din'} {totalSteps}
        </Typography.Text>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((activeStepIndex + 1) / totalSteps) * 100}%` }} />
        </div>
      </div>

      {currentStep.type === 'theory' && (
        <article className="lesson-section-card card">
          <Typography.Title level={5}>{currentStep.title[language]}</Typography.Title>
          {currentStep.paragraphs?.[language]?.map((paragraph) => (
            <Typography.Paragraph key={paragraph}>
              <Formula math={paragraph} text />
            </Typography.Paragraph>
          ))}
          {currentStep.bullets?.[language] ? (
            <ul>
              {currentStep.bullets[language].map((bullet) => (
                <li key={bullet}>
                  <Formula math={bullet} text />
                </li>
              ))}
            </ul>
          ) : null}
          {currentStep.charts?.length ? (
            <div className="charts-container">
              {currentStep.charts.map((chart, idx) => (
                <PhysicsChart
                  key={`chart-${activeStepIndex}-${idx}`}
                  type={chart.type}
                  data={chart.data}
                  xKey={chart.xKey}
                  yKeys={chart.yKeys}
                  title={chart.title?.[language]}
                  xLabel={chart.xLabel?.[language]}
                  yLabel={chart.yLabel?.[language]}
                />
              ))}
            </div>
          ) : null}
        </article>
      )}

      {currentStep.type === 'formula' && currentStep.formulaStr && (
        <div className="focused-formula-container">
          <FormulaDetailCard formulaStr={currentStep.formulaStr} language={language} />
        </div>
      )}

      {currentStep.type === 'simulation' && currentStep.simulationType && (
        <div className="focused-simulation-container">
          <Typography.Title level={4} style={{ marginBottom: 16 }}>
            {currentStep.title[language]}
          </Typography.Title>
          <PhysicsSimulation type={currentStep.simulationType} language={language} />
        </div>
      )}

      {/* If the user is on the very last step, show the completed chapter box */}
      {activeStepIndex === totalSteps - 1 && (
        <Card className="lesson-finish-cta glass-card animate-glow" style={{ marginTop: 28, border: '2px dashed #7c5cff', background: 'rgba(124, 92, 255, 0.03)', textAlign: 'center', padding: '16px' }}>
          <Typography.Title level={4} style={{ marginTop: 0 }}>
            {language === 'en' ? '🎉 Chapter Completed!' : '🎉 Capitol Finalizat!'}
          </Typography.Title>
          <Typography.Paragraph>
            {language === 'en'
              ? 'You have completed the theoretical lessons. Put your skills to the test in Quest Mode!'
              : 'Ai parcurs lecțiile teoretice. Pune-ți abilitățile la încercare în Modul Misiune!'}
          </Typography.Paragraph>
          <Link to="/practice">
            <Button type="primary" icon={<RocketOutlined />} size="large">
              {language === 'en' ? 'Start Chapter Quest' : 'Începe Misiunea Capitolului'}
            </Button>
          </Link>
        </Card>
      )}

      <div className="stepper-controls" style={{ marginTop: 24 }}>
        <Button onClick={handlePrev} disabled={activeStepIndex === 0}>
          {language === 'en' ? 'Back' : 'Înapoi'}
        </Button>
        <Typography.Text className="step-counter">
          {activeStepIndex + 1} / {totalSteps}
        </Typography.Text>
        <Button type="primary" onClick={handleNext} disabled={activeStepIndex === totalSteps - 1}>
          {language === 'en' ? 'Next' : 'Următorul'}
        </Button>
      </div>
    </div>
  );
}
