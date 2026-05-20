import { ArrowRightOutlined, BookOutlined, ExperimentOutlined, RocketOutlined, TrophyOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { chapters } from '../data/curriculum';
import type { Language } from '../data/types';

interface HomePageProps {
  language: Language;
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

export function HomePage({ language }: Readonly<HomePageProps>) {
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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
            <Button type="primary" size="large" icon={<RocketOutlined />} href={`#/chapters/${featuredChapter.id}`} className="hero-cta-btn">
              {t('home.primaryCta')}
            </Button>
            <Button size="large" href="#/practice" className="hero-cta-btn secondary">
              {t('home.secondaryCta')}
            </Button>
          </div>

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
