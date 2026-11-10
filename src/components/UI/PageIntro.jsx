import styled from 'styled-components';
import { Eyebrow } from './Section';

// Cabeçalho padrão das páginas internas (Simulação, Impacto, Equipe).
// Uso: <PageIntro eyebrow="Simulação" title="..." lead="..." />

const Wrap = styled.header`
  background: ${({ theme }) => theme.gradients.soft};
  padding-block: clamp(3rem, 7vw, 5rem) clamp(2rem, 5vw, 3rem);
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};

  h1 {
    font-size: clamp(2.2rem, 5vw, 3.4rem);
    margin: 0 0 1rem;
    max-width: 20ch;
  }

  p.lead-text {
    font-size: clamp(1.15rem, 2vw, 1.3rem);
    color: ${({ theme }) => theme.colors.inkSoft};
    margin: 0;
  }
`;

export default function PageIntro({ eyebrow, title, lead }) {
  return (
    <Wrap>
      <div className="container">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1>{title}</h1>
        {lead && <p className="lead-text">{lead}</p>}
      </div>
    </Wrap>
  );
}
