import { validateScenario } from '../utils/scenarioValidation.js';

export { validateScenario };

export async function getScenario({ signal } = {}) {
  const url = `${import.meta.env.BASE_URL}data/cenario.json`;
  let response;

  try {
    response = await fetch(url, { signal });
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error;
    }

    throw new Error('Não foi possível carregar o cenário. Verifique a conexão e tente novamente.');
  }

  if (!response.ok) {
    throw new Error('Não foi possível carregar o cenário.');
  }

  let scenario;

  try {
    scenario = await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error;
    }

    throw new Error('O arquivo do cenário não contém um JSON válido.');
  }

  validateScenario(scenario);
  return scenario;
}
