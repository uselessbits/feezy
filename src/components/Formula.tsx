import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface FormulaProps {
  math: string;
  block?: boolean;
  interactive?: boolean;
}

export function Formula({ math, block = false, interactive = false }: Readonly<FormulaProps>) {
  if (block) {
    return (
      <div className={`formula-block ${interactive ? 'interactive' : ''}`}>
        <BlockMath math={math} />
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

  return (
    <span className={`formula-inline ${interactive ? 'interactive' : ''}`}>
      <InlineMath math={math} />
    </span>
  );
}
