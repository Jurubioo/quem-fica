import styled from 'styled-components';
import { Eyebrow, Lead, Section, Title } from '../../../components/UI/Section';

// Dados reais exigidos pela FIAP: sempre com a fonte e o link.
const STATS = [
  {
    id: 'rs-2024',
    number: '2,4 milhões',
    text: 'de pessoas foram afetadas pelas enchentes de 2024 no Rio Grande do Sul, em 478 municípios.',
    source: 'Defesa Civil do RS, balanço de 10/06/2024',
    url: 'https://estado.rs.gov.br/defesa-civil-atualiza-balanco-das-enchentes-no-rs-10-6-9h',
  },
  {
    id: 'ibge-pcd',
    number: '47%',
    text: 'das pessoas com deficiência no Brasil têm 60 anos ou mais. Ao todo, são 18,6 milhões de pessoas com deficiência no país.',
    source: 'IBGE, PNAD Contínua 2022',
    url: 'https://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/37317-pessoas-com-deficiencia-tem-menor-acesso-a-educacao-ao-trabalho-e-a-renda',
  },
];

const Quote = styled.p`
  margin: 2rem 0 0;
  padding-left: 1.25rem;
  border-left: 5px solid ${({ theme }) => theme.colors.water};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: clamp(1.25rem, 2.4vw, 1.5rem);
  line-height: 1.35;
  max-width: 26ch;
`;

const StatList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1.25rem;
`;

const StatCard = styled.li`
  position: relative;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 1.5rem 1.5rem 1.25rem 2rem;
  overflow: hidden;

  /* faixa colorida à esquerda */
  &::before {
    content: '';
    position: absolute;
    inset: 0 auto 0 0;
    width: 5px;
    background: ${({ theme }) => theme.colors.water};
  }

  .number {
    display: block;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 700;
    font-size: clamp(2.3rem, 5vw, 3rem);
    line-height: 1;
    letter-spacing: -0.03em;
    color: ${({ theme }) => theme.colors.water};
    margin-bottom: 0.6rem;
  }

  p {
    margin: 0 0 1rem;
    font-size: 1.15rem;
  }

  .source {
    font-size: 0.98rem;
    color: ${({ theme }) => theme.colors.inkSoft};
    margin: 0;
  }
`;

export default function ProblemSection() {
  return (
    <Section aria-labelledby="problema-titulo">
      <div className="container">
        <div className="row gy-5 gx-4 align-items-center">
          <div className="col-12 col-lg-6">
            <Eyebrow>O problema</Eyebrow>
            <Title id="problema-titulo">O alerta chega para todos. A ajuda, não.</Title>
            <Lead>
              Em uma enchente, pessoas idosas, com deficiência, com mobilidade reduzida ou sem carro
              dependem de alguém para sair de casa. Se ninguém sabe onde elas estão, elas ficam para
              trás.
            </Lead>
            <Quote>Um alerta avisa. Mas não leva ninguém até o abrigo.</Quote>
          </div>

          <div className="col-12 col-lg-6">
            <StatList>
              {STATS.map((stat) => (
                <StatCard key={stat.id}>
                  <span className="number">{stat.number}</span>
                  <p>{stat.text}</p>
                  <p className="source">
                    Fonte:{' '}
                    <a href={stat.url} target="_blank" rel="noreferrer">
                      {stat.source}
                      <span className="visually-hidden"> (abre em nova aba)</span>
                    </a>
                  </p>
                </StatCard>
              ))}
            </StatList>
          </div>
        </div>
      </div>
    </Section>
  );
}
