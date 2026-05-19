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

  return (
    <span className={`formula-inline ${interactive ? 'interactive' : ''}`}>
      <InlineMath math={math} />
    </span>
  );
}
