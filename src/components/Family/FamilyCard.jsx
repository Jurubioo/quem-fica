import styled from 'styled-components';
import { getFamilyNeeds } from '../../utils/scenario';
import FamilyStatus from './FamilyStatus';

const Card = styled.li`
  min-width: 0;
  padding: 1.1rem;
  border: 2px solid ${({ theme, $selected }) => $selected ? theme.colors.water : theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  overflow-wrap: anywhere;

  p {
    margin: 0.4rem 0 0.8rem;
    font-size: 1rem;
  }

  button {
    display: block;
    min-height: 2.75rem;
    padding: 0;
    border: 0;
    background: transparent;
    color: ${({ theme }) => theme.colors.water};
    text-align: left;
    font-weight: 700;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default function FamilyCard({ family, region, situation, selected, onSelect }) {
  const number = String(family.id).padStart(2, '0');
  const residentsLabel = family.moradores === 1 ? 'morador' : 'moradores';
  const needs = getFamilyNeeds(family);
  const needsDescription = needs.length > 0
    ? needs.join(' · ')
    : 'Sem necessidade específica de apoio.';

  return (
    <Card $selected={selected}>
      <button
        type="button"
        onClick={() => onSelect(family.id)}
        aria-pressed={selected}
        aria-controls="detalhes-familia"
      >
        Família {number} · {family.nome}
      </button>
      <p>{region.nome} · {family.moradores} {residentsLabel}</p>
      <FamilyStatus situation={situation} />
      <p>{needsDescription}</p>
    </Card>
  );
}
