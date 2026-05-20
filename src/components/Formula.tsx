import { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import { Button, Card, Typography } from 'antd';
import { BookOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { lookupFormula } from '../data/formulasRegistry';
import type { Language } from '../data/types';
import 'katex/dist/katex.min.css';

interface FormulaProps {
  math: string;
  block?: boolean;
  interactive?: boolean;
  text?: boolean;
}

export function Formula({ math, block = false, interactive = false, text = false }: Readonly<FormulaProps>) {
  if (block) {
    return (
      <div className={`formula-block ${interactive ? 'interactive' : ''}`}>
        <BlockMath math={math} />
      </div>
    );
  }

  // If there are newlines, split the text into lines/paragraphs
  if (math.includes('\n')) {
    const lines = math.split('\n');
    return (
      <div className="formula-lines" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} style={{ height: '8px' }} />;
          return (
            <div key={idx} className="formula-line">
              <Formula math={line} interactive={interactive} text={text} />
            </div>
          );
        })}
      </div>
    );
  }

  // If it's inline, check if it contains any '$' delimiters.
  // If it does, split the string and render normal text and LaTeX in order.
  if (math.includes('$')) {
    const parts = math.split('$');
    return (
      <span className={`formula-mixed ${interactive ? 'interactive' : ''}`}>
        {parts.map((part, idx) => {
          if (idx % 2 === 1) {
            // LaTeX expression
            return <InlineMath key={`${part}-${idx}`} math={part} />;
          }
          // Plain text
          return <span key={`${part}-${idx}`}>{part}</span>;
        })}
      </span>
    );
  }

  if (text) {
    return <span className={interactive ? 'interactive' : ''}>{math}</span>;
  }

  return (
    <span className={`formula-inline ${interactive ? 'interactive' : ''}`}>
      <InlineMath math={math} />
    </span>
  );
}

interface FormulaDetailCardProps {
  formulaStr: string;
  language: Language;
}

export function FormulaDetailCard({ formulaStr, language }: Readonly<FormulaDetailCardProps>) {
  const details = lookupFormula(formulaStr);
  const [isOpen, setIsOpen] = useState(false);

  if (!details) {
    // Graceful fallback to simple block formula
    return <Formula math={formulaStr} block />;
  }

  const name = details.name[language];
  const variables = details.variables[language];
  const theory = details.theory[language];

  const t = {
    en: {
      theoryTitle: 'Theory & Origin',
      variablesTitle: 'Variables',
      showTheory: 'Show Theory & Derivation',
      hideTheory: 'Hide Theory & Derivation',
    },
    ro: {
      theoryTitle: 'Teorie și Proveniență',
      variablesTitle: 'Semnificație Variabile',
      showTheory: 'Vezi Teorie și Proveniență',
      hideTheory: 'Ascunde Teoria și Proveniența',
    },
  }[language];

  return (
    <Card 
      className="formula-detail-card glass-card"
      style={{ marginBottom: '20px', overflow: 'hidden' }}
    >
      <div className="formula-detail-header" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <BookOutlined style={{ color: '#7c5cff', fontSize: '18px' }} />
        <Typography.Text strong style={{ fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {name}
        </Typography.Text>
      </div>

      <div className="formula-detail-body" style={{ background: 'rgba(124, 92, 255, 0.04)', borderRadius: '8px', padding: '16px', border: '1px solid rgba(124, 92, 255, 0.12)', marginBottom: '16px', display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
        <BlockMath math={formulaStr} />
      </div>

      {variables && variables.length > 0 && (
        <div className="formula-variables-section" style={{ marginBottom: '16px' }}>
          <Typography.Text type="secondary" strong style={{ fontSize: '12px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
            {t.variablesTitle}
          </Typography.Text>
          <ul style={{ paddingLeft: '20px', margin: 0, listStyleType: 'disc' }}>
            {variables.map((v, idx) => (
              <li key={`${v}-${idx}`} style={{ marginBottom: '4px', fontSize: '13.5px', lineHeight: '1.4' }}>
                <Formula math={v} />
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="formula-theory-section" style={{ borderTop: '1px dashed rgba(16, 22, 47, 0.12)', paddingTop: '12px' }}>
        <Button 
          type="text" 
          onClick={() => setIsOpen(!isOpen)}
          icon={isOpen ? <UpOutlined /> : <DownOutlined />}
          style={{ 
            padding: 0, 
            height: 'auto', 
            color: '#7c5cff', 
            fontWeight: 600, 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px',
            fontSize: '13px'
          }}
        >
          {isOpen ? t.hideTheory : t.showTheory}
        </Button>
        
        <div 
          className={`formula-theory-content ${isOpen ? 'open' : ''}`}
          style={{
            maxHeight: isOpen ? '1000px' : '0px',
            overflow: 'hidden',
            transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s ease',
            paddingTop: isOpen ? '12px' : '0px',
            fontSize: '13.5px',
            lineHeight: '1.5',
            textAlign: 'justify'
          }}
        >
          <div style={{ background: 'var(--bg-color)', borderRadius: '6px', padding: '12px', border: '1px solid var(--border-color)' }}>
            <Typography.Text type="secondary" strong style={{ fontSize: '11px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              {t.theoryTitle}
            </Typography.Text>
            <Formula math={theory} />
          </div>
        </div>
      </div>
    </Card>
  );
}
