import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { chapters } from '../data/curriculum';
import type { Language } from '../data/types';

interface ChaptersPageProps {
  language: Language;
}

export function ChaptersPage({ language }: Readonly<ChaptersPageProps>) {
  return (
    <div className="stack">
      {chapters.map((chapter) => (
        <Link className="chapter-list-item" to={`/chapters/${chapter.id}`} key={chapter.id}>
          <div>
            <Typography.Text className="chapter-kicker">{chapter.code}</Typography.Text>
            <Typography.Title level={3}>{chapter.title[language]}</Typography.Title>
            <Typography.Paragraph>{chapter.summary[language]}</Typography.Paragraph>
          </div>
          <Typography.Text>
            {chapter.lessons.length} {language === 'en' ? 'lessons' : 'lecții'}
          </Typography.Text>
        </Link>
      ))}
    </div>
  );
}
