import usePageTitle from '../../hooks/usePageTitle';
import useSimulation from '../../hooks/useSimulation';
import PageIntro from '../../components/UI/PageIntro';
import { Button } from '../../components/UI/Button';
import SimulationContent from './SimulationContent';
import { Notice, Workspace } from './Simulation.styles';

export default function Simulation() {
  usePageTitle('Simulação');

  const {
    scenario,
    error,
    reload,
    level,
    changeLevel,
    simulation,
    simulationError,
    execute,
  } = useSimulation();

  return (
    <>
      <PageIntro
        eyebrow="Simulação"
        title="Quem consegue chegar a um lugar seguro?"
        lead="Explore o bairro, escolha o nível de alagamento e conheça as necessidades de cada família."
      />
      <Workspace aria-labelledby="cenario-titulo">
        <div className="container">
          <h2 id="cenario-titulo">{scenario?.nome ?? 'Cenário de evacuação'}</h2>

          {error && (
            <Notice role="alert">
              <p>{error}</p>
              <Button type="button" onClick={reload}>Tentar novamente</Button>
            </Notice>
          )}

          {!error && !scenario && <p role="status">Carregando o cenário…</p>}

          {!error && scenario && (
            <SimulationContent
              scenario={scenario}
              level={level}
              changeLevel={changeLevel}
              simulation={simulation}
              simulationError={simulationError}
              execute={execute}
            />
          )}
        </div>
      </Workspace>
    </>
  );
}
