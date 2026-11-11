import { useEffect, useState } from 'react';
import { getScenario } from '../services/scenarioService';

export default function useScenario() {
  const [scenario, setScenario] = useState(null);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setError('');
    getScenario({ signal: controller.signal })
      .then((data) => { if (!controller.signal.aborted) setScenario(data); })
      .catch((cause) => {
        if (!controller.signal.aborted) setError(cause.message || 'Não foi possível carregar o cenário.');
      });
    return () => controller.abort();
  }, [attempt]);

  return { scenario, error, reload: () => setAttempt((value) => value + 1) };
}
