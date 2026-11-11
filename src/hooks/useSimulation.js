import { useState } from 'react';
import useScenario from './useScenario';
import { runSimulation } from '../utils/simulationEngine';

export default function useSimulation() {
  const { scenario, error, reload } = useScenario();
  const [level, setLevel] = useState(1);
  const [simulation, setSimulation] = useState(null);
  const [simulationError, setSimulationError] = useState('');

  function changeLevel(value) {
    setLevel(value);
    setSimulation(null);
    setSimulationError('');
  }

  function execute() {
    if (!scenario) return;
    try {
      setSimulation(runSimulation(scenario, level));
      setSimulationError('');
    } catch (cause) {
      setSimulation(null);
      setSimulationError(cause.message || 'Não foi possível executar a simulação.');
    }
  }

  return { scenario, error, reload, level, changeLevel, simulation, simulationError, execute };
}
