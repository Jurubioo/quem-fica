import styled from 'styled-components';
import { getFamilyNeeds } from '../../utils/scenario';
import FamilyStatus from './FamilyStatus';

const Panel = styled.aside`
  padding: 1.5rem;
  height: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow-wrap: anywhere;

  h3 {
    font-size: 1.3rem;
    margin-bottom: 0.75rem;
  }

  p, li, dd, dt {
    font-size: 1rem;
  }

  dl {
    margin-bottom: 1rem;
  }

  dt {
    margin-top: 0.75rem;
  }

  dd {
    margin: 0;
  }

  ul {
    padding-left: 1.2rem;
  }
`;

export default function FamilyDetails({ family, region, situation, shelters, vehicles }) {
  const number = String(family.id).padStart(2, '0');
  const residentsLabel = family.moradores === 1 ? 'morador' : 'moradores';
  const needs = getFamilyNeeds(family);
  const shelter = shelters.find((item) => item.id === situation.abrigoId);
  const vehicle = vehicles.find((item) => item.id === situation.veiculoId);

  let ownTransport = 'Não possui';

  if (family.possuiTransporte) {
    ownTransport = family.transporteProprioAdaptado ? 'Sim, adaptado' : 'Sim, convencional';
  }

  let plannedTransport = 'A pé, por rota liberada';

  if (vehicle) {
    plannedTransport = vehicle.nome;
  } else if (situation.transporte === 'proprio') {
    plannedTransport = 'Transporte próprio';
  }

  return (
    <Panel id="detalhes-familia" aria-labelledby="familia-titulo" aria-live="polite">
      <h3 id="familia-titulo">Família {number} · {family.nome}</h3>
      <p>{region.nome} · {family.moradores} {residentsLabel}</p>
      <FamilyStatus situation={situation} />
      <p className="mt-3">{situation.motivo}</p>

      <dl>
        <dt>Transporte próprio</dt>
        <dd>{ownTransport}</dd>

        {shelter && (
          <>
            <dt>Abrigo de destino</dt>
            <dd>{shelter.nome} · {situation.distancia.toLocaleString('pt-BR')} km</dd>
          </>
        )}

        {situation.transporte && (
          <>
            <dt>Deslocamento previsto</dt>
            <dd>{plannedTransport}</dd>
          </>
        )}
      </dl>

      <strong>Necessidades de apoio</strong>
      {needs.length > 0 ? (
        <ul>
          {needs.map((need) => <li key={need}>{need}</li>)}
        </ul>
      ) : (
        <p>Sem necessidade específica de apoio.</p>
      )}
    </Panel>
  );
}
