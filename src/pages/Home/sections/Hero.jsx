import styled, { keyframes } from 'styled-components';
import { ButtonLink } from '../../../components/UI/Button';
import { Eyebrow } from '../../../components/UI/Section';
import { IconAlert, IconArrowRight, IconCheck, IconWave } from '../../../components/Icons/Icons';

const drift = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`;

const Wrap = styled.section`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.gradients.hero};
  color: ${({ theme }) => theme.colors.onDark};
  padding-block: clamp(3rem, 7vw, 5rem) clamp(6.5rem, 12vw, 8.5rem);

  .container {
    position: relative;
  }
`;

const Heading = styled.h1`
  font-size: clamp(2.3rem, 5.5vw, 3.75rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0 0 1.5rem;
  max-width: 16ch;

  em {
    font-style: normal;
    color: ${({ theme }) => theme.colors.waterLight};
    /* sublinhado ondulado = água */
    text-decoration: underline wavy;
    text-decoration-thickness: 3px;
    text-underline-offset: 0.18em;
    text-decoration-skip-ink: none;
  }
`;

const Intro = styled.p`
  font-size: clamp(1.2rem, 2.2vw, 1.4rem);
  color: ${({ theme }) => theme.colors.onDarkSoft};
  max-width: 36ch;
  margin: 0 0 2.25rem;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

/* ---------- Cartão de exemplo à direita ---------- */

const ResultCard = styled.aside`
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.ink};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: clamp(1.5rem, 3vw, 2rem);
  max-width: 26rem;
  margin-inline: auto;

  h2 {
    font-size: 1.45rem;
    margin: 0.75rem 0 1.25rem;
  }
`;

const CardLabel = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.inkSoft};
`;

const Row = styled.p`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0 0 0.75rem;
  padding: 0.85rem 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ $tone, theme }) => theme.colors[`${$tone}Bg`]};
  color: ${({ $tone, theme }) => theme.colors[$tone]};
  border-left: 4px solid currentColor;
  font-weight: 700;
  font-size: 1.1rem;

  strong {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.6rem;
    line-height: 1;
  }

  span {
    color: ${({ theme }) => theme.colors.ink};
  }
`;

const Meter = styled.div`
  display: flex;
  height: 0.6rem;
  border-radius: 3px;
  overflow: hidden;
  margin: 1.25rem 0 1rem;
  gap: 3px;

  span:first-child {
    flex: 3;
    background: ${({ theme }) => theme.colors.safe};
  }
  span:last-child {
    flex: 2;
    background: ${({ theme }) => theme.colors.risk};
  }
`;

const CardNote = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.inkSoft};
`;

/* ---------- Ondas no rodapé do hero ---------- */

const Waves = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: clamp(4.5rem, 9vw, 6.5rem);
  overflow: hidden;
  pointer-events: none;
  color: ${({ theme }) => theme.colors.paper}; /* onda da frente = cor da página */

  svg {
    position: absolute;
    bottom: 0;
    width: 200%;
    height: 100%;
    animation: ${drift} linear infinite;
  }

  svg:first-child {
    color: ${({ theme }) => theme.colors.waterLight};
    animation-duration: 26s;
    opacity: 0.3;
  }
  svg:last-child {
    animation-duration: 18s;
    height: 70%;
  }
`;

// Uma onda que se repete 2 vezes; ao deslizar 50% ela "emenda" sem salto.
const WAVE_PATH =
  'M0 50 C240 10 480 10 720 50 C960 90 1200 90 1440 50 C1680 10 1920 10 2160 50 C2400 90 2640 90 2880 50 V100 H0 Z';

export default function Hero() {
  return (
    <Wrap aria-labelledby="hero-titulo">
      <div className="container">
        <div className="row align-items-center gy-5 gx-4">
          <div className="col-12 col-lg-7">
            <Eyebrow $light>
              <IconWave size={20} />
              Planejamento de evacuação inclusiva
            </Eyebrow>
            <Heading id="hero-titulo">
              Quando a água sobe, <em>quem fica</em> para trás?
            </Heading>
            <Intro>
              O Quem Fica? simula enchentes e mostra quais famílias não conseguem chegar sozinhas a
              um lugar seguro. Assim, ninguém é esquecido no plano de evacuação.
            </Intro>
            <Actions>
              <ButtonLink to="/simulacao">
                Ver a simulação
                <IconArrowRight />
              </ButtonLink>
              <ButtonLink as="a" href="#como-funciona" $variant="light">
                Como funciona
              </ButtonLink>
            </Actions>
          </div>

          <div className="col-12 col-lg-5">
            <ResultCard aria-labelledby="exemplo-titulo">
              <CardLabel>Exemplo ilustrativo · alerta de enchente</CardLabel>
              <h2 id="exemplo-titulo">Rua das Flores · 5 famílias</h2>

              <Row $tone="safe">
                <IconCheck size={26} />
                <strong>3</strong>
                <span>conseguem sair sozinhas</span>
              </Row>
              <Row $tone="risk">
                <IconAlert size={26} />
                <strong>2</strong>
                <span>podem ficar para trás</span>
              </Row>

              <Meter aria-hidden="true">
                <span />
                <span />
              </Meter>

              <CardNote>
                O Quem Fica? encontra essas famílias <strong>antes</strong> de a água chegar.
              </CardNote>
            </ResultCard>
          </div>
        </div>
      </div>

      <Waves aria-hidden="true">
        <svg viewBox="0 0 2880 100" preserveAspectRatio="none">
          <path d={WAVE_PATH} fill="currentColor" />
        </svg>
        <svg viewBox="0 0 2880 100" preserveAspectRatio="none">
          <path d={WAVE_PATH} fill="currentColor" />
        </svg>
      </Waves>
    </Wrap>
  );
}
