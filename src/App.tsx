import { BulbOutlined, BookOutlined, HomeOutlined, RocketOutlined, TrophyOutlined, ExperimentOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Layout, Card, Menu, Select, Space, Switch, Typography, theme } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { HashRouter, Link, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n, { supportedLanguages } from './i18n';
import { chapters } from './data/curriculum';
import { Formula, FormulaDetailCard } from './components/Formula';
import { lookupFormula } from './data/formulasRegistry';
import { PhysicsChart } from './components/PhysicsChart';
import { PhysicsSimulation } from './components/PhysicsSimulation';
import { PracticePage } from './components/PracticePage';
import type { ChapterId, Language } from './data/types';

const { Header, Content, Footer } = Layout;

function AppShell() {
  const { t, i18n: i18nInstance } = useTranslation();
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [xp, setXp] = useState(0);
  const contentLanguage = getContentLanguage(i18nInstance.language);

  useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  }, [isDark, language]);

  // Load and sync XP from localStorage for the header badge
  useEffect(() => {
    const updateXp = () => {
      const savedXp = localStorage.getItem('feezy_xp');
      if (savedXp) setXp(parseInt(savedXp, 10));
    };
    updateXp();
    const interval = setInterval(updateXp, 1000);
    return () => clearInterval(interval);
  }, []);

  const algorithm = isDark ? theme.darkAlgorithm : theme.defaultAlgorithm;

  const menuItems = useMemo(
    () => [
      { key: '/', icon: <HomeOutlined />, label: <Link to="/">{t('nav.home')}</Link> },
      { key: '/chapters', icon: <BookOutlined />, label: <Link to="/chapters">{t('nav.chapters')}</Link> },
      { key: '/practice', icon: <RocketOutlined />, label: <Link to="/practice">{t('nav.practice')}</Link> },
    ],
    [t],
  );

  return (
    <ConfigProvider
      theme={{
        algorithm,
        token: {
          colorPrimary: '#7c5cff',
          borderRadius: 14,
          fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
        },
      }}
    >
      <Layout className="app-shell">
        <Header className="app-header">
          <div className="brand">
            <svg className="brand-icon" viewBox="0 0 64 64" width="32" height="32">
              <circle cx="32" cy="32" r="8" fill="#7c5cff" />
              <circle cx="32" cy="32" r="24" fill="none" stroke="#7c5cff" strokeWidth="2" />
              <circle cx="56" cy="20" r="4" fill="#7c5cff" />
              <circle cx="20" cy="56" r="4" fill="#7c5cff" />
              <circle cx="32" cy="8" r="4" fill="#7c5cff" />
            </svg>
            <Typography.Title level={4} className="brand-title">Feezy</Typography.Title>
          </div>
          <Menu mode="horizontal" selectedKeys={[location.pathname]} items={menuItems} className="top-nav" />
          <Space size="middle" className="header-actions">
            {xp > 0 && (
              <span className="header-xp-badge glass-card" style={{ padding: '4px 12px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, color: '#7c5cff', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <TrophyOutlined style={{ color: '#ffd166' }} />
                {xp} XP
              </span>
            )}
            <Select value={language} options={supportedLanguages} onChange={(value) => setLanguage(value)} style={{ width: 96 }} />
            <Switch checkedChildren={<BulbOutlined />} unCheckedChildren={<BulbOutlined />} checked={isDark} onChange={setIsDark} />
          </Space>
        </Header>
        <Content className="app-content">
          <Routes>
            <Route path="/" element={<HomePage language={contentLanguage} />} />
            <Route path="/chapters" element={<ChaptersPage language={contentLanguage} />} />
            <Route path="/chapters/:chapterId" element={<ChapterPage language={contentLanguage} />} />
            <Route path="/practice" element={<PracticePage language={contentLanguage} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Content>
        <Footer className="app-footer">{t('footer.copy')}</Footer>
      </Layout>
    </ConfigProvider>
  );
}

function HomePage({ language }: Readonly<{ language: Language }>) {
  const { t } = useTranslation();
  const featuredChapter = chapters[0];
  const totalLessons = chapters.reduce((acc, c) => acc + c.lessons.length, 0);

  return (
    <section className="hero">
      {/* 1. Full-Width Hero Stage */}
      <div className="hero-stage card full-width-hero">
        <div className="stage-copy">
          <Typography.Text className="eyebrow">{t('home.stageEyebrow')}</Typography.Text>
          <Typography.Title style={{ fontSize: '38px', lineHeight: '1.2', margin: '12px 0 20px 0' }}>
            {t('home.title')}
          </Typography.Title>
          <Typography.Paragraph className="hero-lead" style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '28px' }}>
            {t('home.lead')}
          </Typography.Paragraph>
          <Space wrap size={16} style={{ marginBottom: '32px' }}>
            <Button type="primary" size="large" icon={<RocketOutlined />} href={`#/chapters/${featuredChapter.id}`} className="hero-cta-btn">
              {t('home.primaryCta')}
            </Button>
            <Button size="large" href="#/practice" className="hero-cta-btn secondary">
              {t('home.secondaryCta')}
            </Button>
          </Space>
          
          {/* Quick Stats Row */}
          <div className="hero-stats-row">
            <div className="stat-item">
              <span className="stat-val">{chapters.length}</span>
              <span className="stat-lbl">{language === 'en' ? 'Chapters' : 'Capitole'}</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-val">{totalLessons}</span>
              <span className="stat-lbl">{language === 'en' ? 'Lessons' : 'Lecții'}</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-val">5</span>
              <span className="stat-lbl">{language === 'en' ? 'Simulators' : 'Simulări'}</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-val">20+</span>
              <span className="stat-lbl">{language === 'en' ? 'Quests' : 'Misiuni'}</span>
            </div>
          </div>
        </div>
        <div className="illustration-frame">
          <CourseIllustration />
        </div>
      </div>

      {/* 2. Linear Chapter Directory List (Vertical Flow) */}
      <div className="chapters-section" style={{ marginTop: '24px' }}>
        <div className="section-header" style={{ marginBottom: '28px', textAlign: 'center' }}>
          <Typography.Text className="eyebrow">{t('home.eyebrow')}</Typography.Text>
          <Typography.Title level={2} style={{ marginTop: '8px' }}>{t('home.railTitle')}</Typography.Title>
          <Typography.Paragraph style={{ maxWidth: '600px', margin: '8px auto 0 auto', fontSize: '15px' }}>
            {t('home.railBody')}
          </Typography.Paragraph>
        </div>
        
        <div className="chapters-flow-list">
          {chapters.map((chapter, idx) => (
            <Link className="chapters-flow-card card" to={`/chapters/${chapter.id}`} key={chapter.id}>
              <div className="flow-card-num">{idx + 1}</div>
              <div className="flow-card-content">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                  <Typography.Title level={3} style={{ margin: 0 }}>
                    {chapter.title[language]}
                  </Typography.Title>
                  <span className="flow-card-badge">{chapter.code}</span>
                </div>
                <Typography.Paragraph type="secondary" style={{ margin: '0 0 12px 0', fontSize: '15px' }}>
                  {chapter.summary[language]}
                </Typography.Paragraph>
                
                {/* Micro lessons preview bullet row */}
                <div className="flow-card-lessons-preview">
                  {chapter.lessons.slice(0, 3).map((lesson) => (
                    <span className="preview-pill" key={lesson.id}>
                      {lesson.title[language]}
                    </span>
                  ))}
                  {chapter.lessons.length > 3 && (
                    <span className="preview-pill more">
                      +{chapter.lessons.length - 3} {language === 'en' ? 'more' : 'în plus'}
                    </span>
                  )}
                </div>
              </div>
              <div className="flow-card-action">
                <span className="lessons-count-text">
                  {chapter.lessons.length} {language === 'en' ? 'lessons' : 'lecții'}
                </span>
                <Button type="default" icon={<ArrowRightOutlined />} className="action-arrow-btn" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. Feature Cards Grid */}
      <div className="feature-grid" style={{ marginTop: '40px' }}>
        <div className="feature-card card" style={{ padding: '24px 28px' }}>
          <TrophyOutlined style={{ fontSize: 36, color: '#7c5cff', marginBottom: 16 }} />
          <Typography.Title level={4}>{t('home.feature1Title')}</Typography.Title>
          <Typography.Paragraph type="secondary" style={{ fontSize: 14, margin: 0 }}>
            {t('home.feature1Body')}
          </Typography.Paragraph>
        </div>
        <div className="feature-card card" style={{ padding: '24px 28px' }}>
          <ExperimentOutlined style={{ fontSize: 36, color: '#1fd2b2', marginBottom: 16 }} />
          <Typography.Title level={4}>{t('home.feature2Title')}</Typography.Title>
          <Typography.Paragraph type="secondary" style={{ fontSize: 14, margin: 0 }}>
            {t('home.feature2Body')}
          </Typography.Paragraph>
        </div>
        <div className="feature-card card" style={{ padding: '24px 28px' }}>
          <BookOutlined style={{ fontSize: 36, color: '#ffd166', marginBottom: 16 }} />
          <Typography.Title level={4}>{t('home.feature3Title')}</Typography.Title>
          <Typography.Paragraph type="secondary" style={{ fontSize: 14, margin: 0 }}>
            {t('home.feature3Body')}
          </Typography.Paragraph>
        </div>
      </div>
    </section>
  );
}

function CourseIllustration() {
  return (
    <svg className="course-illustration" viewBox="0 0 640 420" role="img" aria-label="Physics illustration">
      <defs>
        <linearGradient id="illusBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff9f4" />
          <stop offset="100%" stopColor="#f1f8ff" />
        </linearGradient>
        <linearGradient id="illusAccent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c5cff" />
          <stop offset="100%" stopColor="#1fd2b2" />
        </linearGradient>
      </defs>
      <rect x="18" y="18" width="604" height="384" rx="36" fill="url(#illusBg)" stroke="rgba(17,24,39,0.12)" strokeWidth="3" />
      <circle cx="160" cy="126" r="58" fill="#ffe9d6" />
      <circle cx="196" cy="126" r="14" fill="#ffd166" />
      <path d="M136 126c24-22 60-22 84 0" fill="none" stroke="#e7a97f" strokeWidth="6" strokeLinecap="round" />
      <rect x="96" y="228" width="182" height="124" rx="24" fill="#ffffff" stroke="rgba(17,24,39,0.12)" strokeWidth="3" />
      <rect x="124" y="252" width="126" height="18" rx="9" fill="#dbeafe" />
      <rect x="124" y="286" width="98" height="18" rx="9" fill="#c7f9ef" />
      <rect x="124" y="320" width="78" height="18" rx="9" fill="#f6d8ff" />
      <rect x="340" y="108" width="210" height="144" rx="28" fill="#fff" stroke="rgba(17,24,39,0.12)" strokeWidth="3" />
      <path d="M366 180c26-34 52-34 78 0s52 34 78 0" fill="none" stroke="url(#illusAccent)" strokeWidth="8" strokeLinecap="round" />
      <circle cx="386" cy="144" r="10" fill="#7c5cff" />
      <circle cx="470" cy="144" r="10" fill="#1fd2b2" />
      <circle cx="532" cy="176" r="10" fill="#ff7a59" />
      <path d="M478 64l14 40 40 14-40 14-14 40-14-40-40-14 40-14z" fill="#ffd166" opacity="0.85" />
      <path d="M64 88c34-18 66-18 100 0" fill="none" stroke="#94b3ff" strokeWidth="6" strokeLinecap="round" strokeDasharray="8 14" />
      <path d="M548 272c22-10 42-10 64 0" fill="none" stroke="#ff9f7a" strokeWidth="6" strokeLinecap="round" />
      <path d="M250 70l18 28-28 18-18-28z" fill="#c7f9ef" opacity="0.9" />
      <path d="M318 304c22-10 42-10 64 0" fill="none" stroke="#ffd166" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

function ChaptersPage({ language }: Readonly<{ language: Language }>) {
  return (
    <div className="stack">
      {chapters.map((chapter) => (
        <Link className="chapter-list-item" to={`/chapters/${chapter.id}`} key={chapter.id}>
          <div>
            <Typography.Text className="chapter-kicker">{chapter.code}</Typography.Text>
            <Typography.Title level={3}>{chapter.title[language]}</Typography.Title>
            <Typography.Paragraph>{chapter.summary[language]}</Typography.Paragraph>
          </div>
          <Typography.Text>{chapter.lessons.length} {language === 'en' ? 'lessons' : 'lecții'}</Typography.Text>
        </Link>
      ))}
    </div>
  );
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

function ChapterPage({ language }: Readonly<{ language: Language }>) {
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
            <Typography.Paragraph key={paragraph}>{paragraph}</Typography.Paragraph>
          ))}
          {currentStep.bullets?.[language] ? (
            <ul>
              {currentStep.bullets[language].map((bullet) => (
                <li key={bullet}>{bullet}</li>
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

function getContentLanguage(value: string): Language {
  return value.toLowerCase().startsWith('ro') ? 'ro' : 'en';
}

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <HashRouter>
        <AppShell />
      </HashRouter>
    </I18nextProvider>
  );
}