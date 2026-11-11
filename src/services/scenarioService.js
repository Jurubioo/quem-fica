// Carrega o cenário inicial (famílias, abrigos e veículos) com a Fetch API.
// O arquivo fica em public/data/cenario.json.
export async function getScenario({ signal } = {}) {
  const response = await fetch(`${import.meta.env.BASE_URL}data/cenario.json`, { signal });

  if (!response.ok) {
    throw new Error('Não foi possível carregar o cenário.');
  }

  const scenario = await response.json();
  validateScenario(scenario);
  return scenario;
}

// Evita exibir um mapa incompleto quando o JSON está inválido.
export function validateScenario(scenario) {
  const invalid = () => { throw new Error('O cenário possui dados inválidos. Verifique o arquivo cenario.json.'); };
  if (!scenario || !['regioes', 'familias', 'abrigos', 'veiculos'].every((key) => Array.isArray(scenario[key]))) invalid();
  if (!scenario.regioes.length) invalid();
  for (const key of ['regioes', 'familias', 'abrigos', 'veiculos']) {
    const ids = scenario[key].map((item) => item?.id);
    if (ids.some((id) => id == null) || new Set(ids).size !== ids.length) invalid();
  }
  const regionIds = new Set(scenario.regioes.map((region) => region.id));
  const shelterIds = new Set(scenario.abrigos.map((shelter) => shelter.id));
  const integer = (value, min, max = Infinity) => Number.isInteger(value) && value >= min && value <= max;
  const position = (item) => Number.isFinite(item.x) && item.x >= 0 && item.x <= 900 && Number.isFinite(item.y) && item.y >= 0 && item.y <= 560;
  const boolean = (value) => typeof value === 'boolean';
  for (const region of scenario.regioes) {
    if (!region.nome || !position(region) || !integer(region.alagaNoNivel, 1, 4) || !integer(region.isolaNoNivel, region.alagaNoNivel, 4)
      || !Number.isFinite(region.largura) || region.largura <= 0 || !Number.isFinite(region.altura) || region.altura <= 0
      || !Array.isArray(region.rotasAbrigos)) invalid();
    if (new Set(region.rotasAbrigos.map((route) => route.abrigoId)).size !== region.rotasAbrigos.length) invalid();
    for (const route of region.rotasAbrigos) {
      if (!shelterIds.has(route.abrigoId) || !Number.isFinite(route.distancia) || route.distancia < 0 || !integer(route.bloqueiaNoNivel, 1, 4)) invalid();
    }
  }
  for (const family of scenario.familias) {
    if (!family.nome || !position(family) || !regionIds.has(family.regiao) || !integer(family.moradores, 1)
      || !integer(family.idosos, 0, family.moradores) || !integer(family.pcd, 0, family.moradores)
      || !['mobilidadeReduzida', 'possuiTransporte', 'necessitaTransporteAdaptado', 'transporteProprioAdaptado'].every((key) => boolean(family[key]))) invalid();
  }
  for (const shelter of scenario.abrigos) {
    if (!shelter.nome || !shelter.sigla || !position(shelter) || !regionIds.has(shelter.regiao) || !integer(shelter.capacidade, 0)
      || !integer(shelter.vagasDisponiveis, 0, shelter.capacidade) || !boolean(shelter.acessivel) || !boolean(shelter.ativo)
      || !integer(shelter.alagaNoNivel, 1, 4)) invalid();
  }
  for (const vehicle of scenario.veiculos) {
    if (!vehicle.nome || !position(vehicle) || !regionIds.has(vehicle.regiao) || !integer(vehicle.capacidade, 1)
      || !['adaptado', 'convencional'].includes(vehicle.tipo) || !boolean(vehicle.disponivel)) invalid();
  }
}
