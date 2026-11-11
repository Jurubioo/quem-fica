import styled from 'styled-components';
import { STATUS_SYMBOLS } from '../../utils/scenario';

const Badge = styled.span`
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

export default function FamilyStatus({ situation }) {
  return (
    <Badge $status={situation.status}>
      <span aria-hidden="true">{STATUS_SYMBOLS[situation.status]}</span>
      {situation.label}
    </Badge>
  );
}
