import { useEffect, useState } from 'react';
import { getScenario } from '../services/scenarioService';

export default function useScenario() {
  const [scenario, setScenario] = useState(null);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadScenario() {
      setError('');

      try {
        const data = await getScenario({ signal: controller.signal });

        if (!controller.signal.aborted) {
          setScenario(data);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(error.message || 'Não foi possível carregar o cenário.');
        }
      }
    }

    loadScenario();

    // Cancela a requisição caso a pessoa saia da página antes de ela terminar.
    return () => {
      controller.abort();
    };
  }, [attempt]);

  function reload() {
    setAttempt((previousAttempt) => previousAttempt + 1);
  }

  return { scenario, error, reload };
}
