import { BulbOutlined, BookOutlined, HomeOutlined, RocketOutlined, TrophyOutlined } from '@ant-design/icons';
import { ConfigProvider, Layout, Menu, Select, Space, Switch, Typography, theme } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { HashRouter, Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n, { supportedLanguages } from './i18n';
import { HomePage } from './components/HomePage';
import { ChaptersPage } from './components/ChaptersPage';
import { ChapterPage } from './components/ChapterPage';
import { PracticePage } from './components/PracticePage';
import type { Language } from './data/types';

const { Header, Content, Footer } = Layout;

function getContentLanguage(value: string): Language {
  return value.toLowerCase().startsWith('ro') ? 'ro' : 'en';
}

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

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <HashRouter>
        <AppShell />
      </HashRouter>
    </I18nextProvider>
  );
}