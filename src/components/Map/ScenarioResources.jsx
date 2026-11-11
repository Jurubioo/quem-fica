import styled from 'styled-components';
import { isShelterAvailable } from '../../utils/evacuationRules';

const Details = styled.details`
  margin-top: 2rem;
  padding: 1.25rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};

  summary {
    cursor: pointer;
    font-weight: 700;
    min-height: 2.75rem;
  }

  h3 {
    font-size: 1.2rem;
    margin-top: 1rem;
  }

  li {
    margin-bottom: 0.75rem;
    font-size: 1rem;
  }
`;

export default function ScenarioResources({ scenario, level, simulation }) {
  return (
    <Details>
      <summary>Abrigos e veículos do cenário</summary>
      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <h3>Abrigos</h3>
          <ul>
            {scenario.abrigos.map((shelter) => {
              const available = isShelterAvailable(shelter, level, scenario.regioes);
              const status = available ? 'Ativo' : 'Indisponível neste nível';
              const accessibility = shelter.acessivel ? 'Acessível' : 'Sem acessibilidade';
              const reservation = simulation?.abrigos.find((item) => item.id === shelter.id);

              return (
                <li key={shelter.id}>
                  <strong>{shelter.sigla} · {shelter.nome}</strong><br />
                  {status} · {accessibility}<br />
                  {shelter.vagasDisponiveis} vagas iniciais de {shelter.capacidade} lugares.
                  {reservation && (
                    <><br />Após a simulação: {reservation.vagasRestantes} vagas restantes.</>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="col-12 col-lg-6">
          <h3>Veículos</h3>
          <ul>
            {scenario.veiculos.map((vehicle) => {
              const region = scenario.regioes.find((item) => item.id === vehicle.regiao);
              const reservation = simulation?.veiculos.find((item) => item.id === vehicle.id);
              const familyCount = reservation?.familiasIds.length ?? 0;
              const status = vehicle.disponivel
                ? 'Disponível no início do cenário'
                : 'Indisponível no cenário';
              const tripDescription = familyCount > 0
                ? `Viagem reservada para ${familyCount} família(s).`
                : 'Nenhuma viagem reservada.';

              return (
                <li key={vehicle.id}>
                  <strong>V{vehicle.id} · {vehicle.nome}</strong><br />
                  {region.nome} · {vehicle.capacidade} lugares · {vehicle.tipo}<br />
                  {status}
                  {reservation && <><br />{tripDescription}</>}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Details>
  );
}
