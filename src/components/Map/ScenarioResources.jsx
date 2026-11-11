import { ResourceDetails } from '../../pages/Simulation/Simulation.styles';

export default function ScenarioResources({ scenario, level }) {
  return (
    <ResourceDetails>
      <summary>Abrigos e veículos do cenário</summary>
      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <h3>Abrigos</h3>
          <ul>{scenario.abrigos.map((shelter) => <li key={shelter.id}>
            <strong>{shelter.sigla} · {shelter.nome}</strong><br />
            {shelter.ativo && level < shelter.alagaNoNivel ? 'Ativo' : 'Indisponível neste nível'} · {shelter.acessivel ? 'Acessível' : 'Sem acessibilidade'}<br />
            {shelter.vagasDisponiveis} vagas iniciais de {shelter.capacidade} lugares.
          </li>)}</ul>
        </div>
        <div className="col-12 col-lg-6">
          <h3>Veículos</h3>
          <ul>{scenario.veiculos.map((vehicle) => <li key={vehicle.id}>
            <strong>V{vehicle.id} · {vehicle.nome}</strong><br />
            {scenario.regioes.find((region) => region.id === vehicle.regiao).nome} · {vehicle.capacidade} lugares · {vehicle.tipo}<br />
            {vehicle.disponivel ? 'Disponível no início do cenário' : 'Indisponível no cenário'}
          </li>)}</ul>
        </div>
      </div>
    </ResourceDetails>
  );
}
