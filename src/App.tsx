import { BulbOutlined, BookOutlined, HomeOutlined, RocketOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Layout, Menu, Select, Space, Switch, Typography, theme } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { HashRouter, Link, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n, { supportedLanguages } from './i18n';
import { chapters } from './data/curriculum';
import { Formula } from './components/Formula';
import { PhysicsChart } from './components/PhysicsChart';
import type { ChapterId, Language } from './data/types';

const { Header, Content, Footer } = Layout;

function AppShell() {
  const { t, i18n: i18nInstance } = useTranslation();
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const contentLanguage = getContentLanguage(i18nInstance.language);

  useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  }, [isDark, language]);

  const algorithm = isDark ? theme.darkAlgorithm : theme.defaultAlgorithm;

  const menuItems = useMemo(
    () => [
      { key: '/', icon: <HomeOutlined />, label: <Link to="/">{t('nav.home')}</Link> },
      { key: '/chapters', icon: <BookOutlined />, label: <Link to="/chapters">{t('nav.chapters')}</Link> },
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
            <Select value={language} options={supportedLanguages} onChange={(value) => setLanguage(value)} style={{ width: 96 }} />
            <Switch checkedChildren={<BulbOutlined />} unCheckedChildren={<BulbOutlined />} checked={isDark} onChange={setIsDark} />
          </Space>
        </Header>
        <Content className="app-content">
          <Routes>
            <Route path="/" element={<HomePage language={contentLanguage} />} />
            <Route path="/chapters" element={<ChaptersPage language={contentLanguage} />} />
            <Route path="/chapters/:chapterId" element={<ChapterPage language={contentLanguage} />} />
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
  return (
    <section className="hero">
      <div className="hero-split">
        <aside className="chapter-rail">
          <div className="rail-header">
            <Typography.Text className="eyebrow">{t('home.eyebrow')}</Typography.Text>
            <Typography.Title level={3}>{t('home.railTitle')}</Typography.Title>
            <Typography.Paragraph>{t('home.railBody')}</Typography.Paragraph>
          </div>
          <div className="rail-list">
            {chapters.map((chapter) => (
              <Link className={`rail-card ${chapter.id === featuredChapter.id ? 'active' : ''}`} to={`/chapters/${chapter.id}`} key={chapter.id}>
                <span className="rail-badge">{chapter.code}</span>
                <div>
                  <Typography.Title level={4}>{chapter.title[language]}</Typography.Title>
                  <Typography.Paragraph>{chapter.summary[language]}</Typography.Paragraph>
                </div>
                <Typography.Text>{chapter.lessons.length} lessons</Typography.Text>
              </Link>
            ))}
          </div>
        </aside>

        <div className="hero-stage card">
          <div className="stage-copy">
            <Typography.Text className="eyebrow">{t('home.stageEyebrow')}</Typography.Text>
            <Typography.Title>{t('home.title')}</Typography.Title>
            <Typography.Paragraph className="hero-lead">{t('home.lead')}</Typography.Paragraph>
            <Space wrap>
              <Button type="primary" icon={<RocketOutlined />} href={`#/chapters/${featuredChapter.id}`}>
                {t('home.primaryCta')}
              </Button>
              <Button href="#/chapters">{t('home.secondaryCta')}</Button>
            </Space>
          </div>
          <div className="illustration-frame">
            <CourseIllustration />
          </div>
        </div>
      </div>

      <div className="feature-grid">
        <div className="feature-card card">
          <Typography.Title level={4}>{t('home.cardTitle')}</Typography.Title>
          <Typography.Paragraph>{t('home.cardBody')}</Typography.Paragraph>
          <Typography.Text>{t('home.cardMeta')}</Typography.Text>
        </div>
      </div>

      <div className="chapter-grid">
        {chapters.map((chapter) => (
          <Link className="chapter-card" to={`/chapters/${chapter.id}`} key={chapter.id}>
            <Typography.Text className="chapter-kicker">{chapter.code}</Typography.Text>
            <Typography.Title level={3}>{chapter.title[language]}</Typography.Title>
            <Typography.Paragraph>{chapter.summary[language]}</Typography.Paragraph>
            <Typography.Text>{chapter.lessons.length} lessons</Typography.Text>
          </Link>
        ))}
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
          <Typography.Text>{chapter.lessons.length} lessons</Typography.Text>
        </Link>
      ))}
    </div>
  );
}

function ChapterPage({ language }: Readonly<{ language: Language }>) {
  const { chapterId } = useParams();
  const chapter = chapters.find((item) => item.id === (chapterId as ChapterId));
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  if (!chapter) {
    return <Navigate to="/chapters" replace />;
  }

  // Flatten all sections with their lesson context
  const allSections = chapter.lessons.flatMap((lesson) =>
    lesson.sections.map((section) => ({
      lesson,
      section,
    })),
  );

  const totalSections = allSections.length;
  const currentData = allSections[currentSectionIndex];
  const { section } = currentData;

  const handleNext = () => {
    if (currentSectionIndex < totalSections - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  return (
    <div className="chapter-stepper">
      <div className="chapter-hero card">
        <Typography.Text className="chapter-kicker">{chapter.code}</Typography.Text>
        <Typography.Title>{chapter.title[language]}</Typography.Title>
        <Typography.Paragraph>{chapter.summary[language]}</Typography.Paragraph>
      </div>

      <div className="stepper-progress">
        <Typography.Text className="progress-label">
          Section {currentSectionIndex + 1} of {totalSections}
        </Typography.Text>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((currentSectionIndex + 1) / totalSections) * 100}%` }} />
        </div>
      </div>

      <article className="lesson-section-card card">
        <Typography.Title level={5}>{section.title[language]}</Typography.Title>
        {section.paragraphs[language].map((paragraph) => (
          <Typography.Paragraph key={paragraph}>{paragraph}</Typography.Paragraph>
        ))}
        {section.bullets?.[language] ? (
          <ul>
            {section.bullets[language].map((bullet) => <li key={bullet}>{bullet}</li>)}
          </ul>
        ) : null}
        {section.formulas?.length ? (
          <div className="formula-row">
            {section.formulas.map((formula) => <Formula key={formula} math={formula} block />)}
          </div>
        ) : null}
        {section.charts?.length ? (
          <div className="charts-container">
            {section.charts.map((chart, idx) => (
              <PhysicsChart
                key={`chart-${currentSectionIndex}-${idx}`}
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

      <div className="stepper-controls">
        <Button onClick={handlePrev} disabled={currentSectionIndex === 0}>
          Back
        </Button>
        <Typography.Text className="step-counter">
          {currentSectionIndex + 1} / {totalSections}
        </Typography.Text>
        <Button type="primary" onClick={handleNext} disabled={currentSectionIndex === totalSections - 1}>
          Next
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