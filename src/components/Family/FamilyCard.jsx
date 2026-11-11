import styled from 'styled-components';
import { getFamilyNeeds, STATUS_SYMBOLS } from '../../utils/scenario';

export const Situation = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  width: fit-content;
  padding: 0.3rem 0.6rem;
  border: 1px solid currentColor;
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 0.95rem;
  font-weight: 700;
  color: ${({ theme, $status }) => theme.colors[$status === 'pending' ? 'water' : $status]};
  background: ${({ theme, $status }) => theme.colors[$status === 'pending' ? 'surfaceAlt' : `${$status}Bg`]};
`;

const Card = styled.li`
  min-width: 0;
  padding: 1.1rem;
  border: 2px solid ${({ theme, $selected }) => $selected ? theme.colors.water : theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  overflow-wrap: anywhere;
  p { margin: 0.4rem 0 0.8rem; font-size: 1rem; }
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
  const needs = getFamilyNeeds(family);
  return (
    <Card $selected={selected}>
      <button type="button" onClick={() => onSelect(family.id)} aria-pressed={selected} aria-controls="detalhes-familia">
        Família {String(family.id).padStart(2, '0')} · {family.nome}
      </button>
      <p>{region.nome} · {family.moradores} {family.moradores === 1 ? 'morador' : 'moradores'}</p>
      <Situation $status={situation.status}><span aria-hidden="true">{STATUS_SYMBOLS[situation.status]}</span>{situation.label}</Situation>
      <p>{needs.length ? needs.join(' · ') : 'Sem necessidade específica de apoio.'}</p>
    </Card>
  );
}
