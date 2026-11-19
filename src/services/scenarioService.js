import { validateScenario } from '../utils/scenarioValidation.js';

export { validateScenario };

import cenarioPadrao from '../data/cenario.json';

// O cenário é importado junto com o código (sem fetch): assim o site abre direto
// pelo index.html, sem servidor. A função continua com o mesmo nome e retorno.
export async function getScenario() {
  // Cópia: quem usa o cenário nunca altera o arquivo original.
  const scenario = JSON.parse(JSON.stringify(cenarioPadrao));
  validateScenario(scenario);
  return scenario;
}
