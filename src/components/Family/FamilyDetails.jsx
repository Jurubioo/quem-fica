import styled from 'styled-components';
import { getFamilyNeeds, STATUS_SYMBOLS } from '../../utils/scenario';
import { Situation } from './FamilyCard';

const Panel = styled.aside`
  padding: 1.5rem;
  height: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow-wrap: anywhere;
  h3 { font-size: 1.3rem; margin-bottom: 0.75rem; }
  p, li, dd, dt { font-size: 1rem; }
  dl { margin-bottom: 1rem; }
  dt { margin-top: 0.75rem; }
  dd { margin: 0; }
  ul { padding-left: 1.2rem; }
`;

export default function FamilyDetails({ family, region, situation, shelters, vehicles }) {
  const needs = getFamilyNeeds(family);
  const shelter = shelters.find((item) => item.id === situation.abrigoId);
  const vehicle = vehicles.find((item) => item.id === situation.veiculoId);
  return (
    <Panel id="detalhes-familia" aria-labelledby="familia-titulo" aria-live="polite">
      <h3 id="familia-titulo">Família {String(family.id).padStart(2, '0')} · {family.nome}</h3>
      <p>{region.nome} · {family.moradores} {family.moradores === 1 ? 'morador' : 'moradores'}</p>
      <Situation $status={situation.status}><span aria-hidden="true">{STATUS_SYMBOLS[situation.status]}</span>{situation.label}</Situation>
      <p className="mt-3">{situation.motivo}</p>
      <dl>
        <dt>Transporte próprio</dt>
        <dd>{family.possuiTransporte ? (family.transporteProprioAdaptado ? 'Sim, adaptado' : 'Sim, convencional') : 'Não possui'}</dd>
        {shelter && <><dt>Abrigo de destino</dt><dd>{shelter.nome} · {situation.distancia.toLocaleString('pt-BR')} km</dd></>}
        {situation.transporte && <><dt>Deslocamento previsto</dt><dd>{vehicle ? vehicle.nome : situation.transporte === 'proprio' ? 'Transporte próprio' : 'A pé, por rota liberada'}</dd></>}
      </dl>
      <strong>Necessidades de apoio</strong>
      {needs.length ? <ul>{needs.map((need) => <li key={need}>{need}</li>)}</ul> : <p>Sem necessidade específica de apoio.</p>}
    </Panel>
  );
}
