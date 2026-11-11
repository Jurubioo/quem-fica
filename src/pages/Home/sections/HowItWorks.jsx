import styled from 'styled-components';
import { Eyebrow, Section, Title } from '../../../components/UI/Section';
import {
  IconBuilding,
  IconElderly,
  IconHeartHand,
  IconNoCar,
  IconSearchPerson,
  IconShelter,
  IconShield,
  IconWalker,
  IconWave,
  IconWheelchair,
} from '../../../components/Icons/Icons';

const STEPS = [
  {
    icon: IconWave,
    title: 'Simule a enchente',
    text: 'Escolha a região e o nível da água.',
  },
  {
    icon: IconSearchPerson,
    title: 'Veja quem fica',
    text: 'O sistema mostra quais famílias não têm como chegar a um abrigo seguro.',
  },
  {
    icon: IconShelter,
    title: 'Teste soluções',
    text: 'Adicione um veículo adaptado ou um novo abrigo e compare o antes e o depois.',
  },
];

const USERS = [
  { icon: IconShield, label: 'Defesas Civis municipais' },
  { icon: IconBuilding, label: 'Gestores públicos e coordenadores de abrigos' },
  { icon: IconHeartHand, label: 'Organizações comunitárias' },
];

const BENEFICIARIES = [
  { icon: IconElderly, label: 'Pessoas idosas' },
  { icon: IconWheelchair, label: 'Pessoas com deficiência' },
  { icon: IconWalker, label: 'Pessoas com mobilidade reduzida' },
  { icon: IconNoCar, label: 'Famílias sem transporte' },
];

const Steps = styled.ol`
  list-style: none;
  padding: 0;
  margin: 2.5rem 0 0;
  display: grid;
  gap: 1.25rem;
  counter-reset: passo;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Step = styled.li`
  counter-increment: passo;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};

  .icon {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.water};
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 600;
  }

  /* "Passo 1", "Passo 2"... */
  .icon::after {
    content: 'Passo ' counter(passo);
  }

  h3 {
    font-size: 1.4rem;
    margin: 0 0 0.5rem;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.inkSoft};
  }
`;

const Audience = styled.div`
  margin-top: 3rem;
  display: grid;
  gap: 1.25rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const AudienceCard = styled.div`
  min-width: 0;
  overflow-wrap: anywhere;
  padding: 1.75rem;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ $dark, theme }) => ($dark ? theme.colors.night : theme.colors.surfaceAlt)};
  color: ${({ $dark, theme }) => ($dark ? theme.colors.onDark : theme.colors.ink)};
  border: 1px solid ${({ theme }) => theme.colors.border};

  h3 {
    font-size: 1.25rem;
    margin: 0 0 1.25rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 0.85rem;
  }

  li {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    font-size: 1.1rem;
  }

  li svg {
    flex-shrink: 0;
    padding: 0.45rem;
    width: 2.6rem;
    height: 2.6rem;
    border-radius: ${({ theme }) => theme.radius.md};
    background: ${({ $dark, theme }) => ($dark ? 'rgba(255,255,255,0.1)' : theme.colors.surface)};
    color: ${({ $dark, theme }) => ($dark ? theme.colors.waterLight : theme.colors.water)};
  }
`;

export default function HowItWorks() {
  return (
    <Section id="como-funciona" aria-labelledby="como-titulo">
      <div className="container">
        <Eyebrow>Como funciona</Eyebrow>
        <Title id="como-titulo">Do alerta ao plano, em três passos.</Title>

        <Steps>
          {STEPS.map(({ icon: Icon, title, text }) => (
            <Step key={title}>
              <span className="icon" aria-hidden="true">
                <Icon size={28} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Step>
          ))}
        </Steps>

        <Audience>
          <AudienceCard>
            <h3>Feito para quem planeja</h3>
            <ul>
              {USERS.map(({ icon: Icon, label }) => (
                <li key={label}>
                  <Icon />
                  {label}
                </li>
              ))}
            </ul>
          </AudienceCard>

          <AudienceCard $dark>
            <h3>Para proteger quem mais precisa</h3>
            <ul>
              {BENEFICIARIES.map(({ icon: Icon, label }) => (
                <li key={label}>
                  <Icon />
                  {label}
                </li>
              ))}
            </ul>
          </AudienceCard>
        </Audience>
      </div>
    </Section>
  );
}
