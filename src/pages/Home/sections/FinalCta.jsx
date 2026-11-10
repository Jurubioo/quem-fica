import styled from 'styled-components';
import { Section } from '../../../components/UI/Section';
import { ButtonLink } from '../../../components/UI/Button';
import { IconArrowRight } from '../../../components/Icons/Icons';

const Panel = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem 2rem;
  padding: clamp(1.75rem, 4vw, 2.5rem);
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 5px solid ${({ theme }) => theme.colors.water};

  h2 {
    font-size: clamp(1.5rem, 3vw, 1.9rem);
    margin: 0 0 0.5rem;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.inkSoft};
    max-width: 48ch;
  }
`;

export default function FinalCta() {
  return (
    <Section aria-labelledby="cta-titulo">
      <div className="container">
        <Panel>
          <div>
            <h2 id="cta-titulo">Planejar para ninguém ficar para trás.</h2>
            <p>
              Na simulação, você pode adicionar um veículo adaptado ou um novo abrigo e ver quantas
              famílias passam a ter uma saída segura.
            </p>
          </div>
          <ButtonLink to="/simulacao">
            Ir para a simulação
            <IconArrowRight />
          </ButtonLink>
        </Panel>
      </div>
    </Section>
  );
}
