import styled from 'styled-components';
import { Eyebrow, Section, Title } from '../../../components/UI/Section';

// Cada ODS usa sua cor de identificação e uma cor de texto para o número.
const ODS = [
  {
    num: 10,
    name: 'Redução das desigualdades',
    text: 'Inclui idosos, pessoas com deficiência e famílias vulneráveis no plano.',
    color: '#DD1367',
    ink: '#fff',
  },
  {
    num: 11,
    name: 'Cidades e comunidades sustentáveis',
    text: 'Apoia cidades mais seguras e preparadas para desastres.',
    color: '#FD9D24',
    ink: '#14202B',
  },
  {
    num: 13,
    name: 'Ação contra a mudança global do clima',
    text: 'Ajuda na preparação para eventos climáticos extremos.',
    color: '#3F7E44',
    ink: '#fff',
  },
];

const Wrap = styled(Section)`
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border-block: 1px solid ${({ theme }) => theme.colors.line};
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0 0;
  display: grid;
  gap: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.li`
  min-width: 0;
  overflow-wrap: anywhere;
  display: flex;
  gap: 1.1rem;
  align-items: flex-start;
  padding: 1.4rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};

  .tile {
    flex-shrink: 0;
    display: grid;
    place-items: center;
    width: 4.25rem;
    height: 4.25rem;
    border-radius: 1.1rem;
    background: ${({ $color }) => $color};
    color: ${({ $ink }) => $ink};
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 700;
    font-size: 1.85rem;
  }

  h3 {
    font-size: 1.15rem;
    margin: 0.15rem 0 0.4rem;
  }

  p {
    margin: 0;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.inkSoft};
  }

  @media (max-width: 575px) {
    flex-direction: column;
  }
`;

export default function OdsSection() {
  return (
    <Wrap aria-labelledby="ods-titulo">
      <div className="container">
        <Eyebrow>Agenda 2030 da ONU</Eyebrow>
        <Title id="ods-titulo">Conectado aos Objetivos de Desenvolvimento Sustentável.</Title>
        <List>
          {ODS.map((ods) => (
            <Card key={ods.num} $color={ods.color} $ink={ods.ink}>
              <span className="tile" aria-hidden="true">
                {ods.num}
              </span>
              <div>
                <h3>
                  <span className="visually-hidden">ODS {ods.num}: </span>
                  {ods.name}
                </h3>
                <p>{ods.text}</p>
              </div>
            </Card>
          ))}
        </List>
      </div>
    </Wrap>
  );
}
