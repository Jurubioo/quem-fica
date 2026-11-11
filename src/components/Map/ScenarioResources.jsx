import { ResourceDetails } from '../../pages/Simulation/Simulation.styles';
import { isShelterAvailable } from '../../utils/evacuationRules';

export default function ScenarioResources({ scenario, level, simulation }) {
  return (
    <ResourceDetails>
      <summary>Abrigos e veículos do cenário</summary>
      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <h3>Abrigos</h3>
          <ul>{scenario.abrigos.map((shelter) => <li key={shelter.id}>
            <strong>{shelter.sigla} · {shelter.nome}</strong><br />
            {isShelterAvailable(shelter, level, scenario.regioes) ? 'Ativo' : 'Indisponível neste nível'} · {shelter.acessivel ? 'Acessível' : 'Sem acessibilidade'}<br />
            {shelter.vagasDisponiveis} vagas iniciais de {shelter.capacidade} lugares.
            {simulation && <><br />Após a simulação: {simulation.abrigos.find((item) => item.id === shelter.id).vagasRestantes} vagas restantes.</>}
          </li>)}</ul>
        </div>
        <div className="col-12 col-lg-6">
          <h3>Veículos</h3>
          <ul>{scenario.veiculos.map((vehicle) => <li key={vehicle.id}>
            <strong>V{vehicle.id} · {vehicle.nome}</strong><br />
            {scenario.regioes.find((region) => region.id === vehicle.regiao).nome} · {vehicle.capacidade} lugares · {vehicle.tipo}<br />
            {vehicle.disponivel ? 'Disponível no início do cenário' : 'Indisponível no cenário'}
            {simulation && <><br />{simulation.veiculos.find((item) => item.id === vehicle.id).familiasIds.length
              ? `Viagem reservada para ${simulation.veiculos.find((item) => item.id === vehicle.id).familiasIds.length} família(s).`
              : 'Nenhuma viagem reservada.'}</>}
          </li>)}</ul>
        </div>
      </div>
    </ResourceDetails>
  );
}
