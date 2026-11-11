import { useState } from 'react';
import useScenario from './useScenario';
import { runSimulation } from '../utils/simulationEngine';

export default function useSimulation() {
  const { scenario, error, reload } = useScenario();
  const [level, setLevel] = useState(1);
  const [simulation, setSimulation] = useState(null);
  const [simulationError, setSimulationError] = useState('');

  function changeLevel(newLevel) {
    setLevel(newLevel);
    setSimulation(null);
    setSimulationError('');
  }

  function execute() {
    if (!scenario) {
      return;
    }

    try {
      const result = runSimulation(scenario, level);
      setSimulation(result);
      setSimulationError('');
    } catch (error) {
      setSimulation(null);
      setSimulationError(error.message || 'Não foi possível executar a simulação.');
    }
  }

  return {
    scenario,
    error,
    reload,
    level,
    changeLevel,
    simulation,
    simulationError,
    execute,
  };
}
