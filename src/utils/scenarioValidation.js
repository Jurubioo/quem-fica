const INVALID_SCENARIO = 'O cenário possui dados inválidos. Verifique o arquivo cenario.json.';

function check(condition) {
  if (!condition) {
    throw new Error(INVALID_SCENARIO);
  }
}

function isText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isIntegerBetween(value, minimum, maximum = Infinity) {
  return Number.isInteger(value) && value >= minimum && value <= maximum;
}

function isMapPosition(item) {
  const validX = Number.isFinite(item.x) && item.x >= 0 && item.x <= 900;
  const validY = Number.isFinite(item.y) && item.y >= 0 && item.y <= 560;

  return validX && validY;
}

function validateIds(items) {
  const usedIds = [];

  for (const item of items) {
    const id = item?.id;
    const validId = isText(id) || isIntegerBetween(id, 1);

    check(validId);
    check(!usedIds.includes(String(id)));
    usedIds.push(String(id));
  }
}

function validateRegion(region, shelterIds) {
  check(isText(region.nome));
  check(isMapPosition(region));
  check(isIntegerBetween(region.alagaNoNivel, 1, 4));
  check(isIntegerBetween(region.isolaNoNivel, region.alagaNoNivel, 4));

  const validWidth = Number.isFinite(region.largura) && region.largura > 0;
  const validHeight = Number.isFinite(region.altura) && region.altura > 0;

  check(validWidth && validHeight);
  check(region.x + region.largura <= 900);
  check(region.y + region.altura <= 560);
  check(Array.isArray(region.rotasAbrigos));

  const destinations = [];

  for (const route of region.rotasAbrigos) {
    check(route != null);
    check(shelterIds.includes(route.abrigoId));
    check(!destinations.includes(route.abrigoId));
    check(Number.isFinite(route.distancia) && route.distancia >= 0);
    check(isIntegerBetween(route.bloqueiaNoNivel, 1, 4));
    destinations.push(route.abrigoId);
  }
}

function validateFamily(family, regionIds) {
  check(isText(family.nome));
  check(isMapPosition(family));
  check(regionIds.includes(family.regiao));
  check(isIntegerBetween(family.moradores, 1));
  check(isIntegerBetween(family.idosos, 0, family.moradores));
  check(isIntegerBetween(family.pcd, 0, family.moradores));

  const booleanFields = [
    'mobilidadeReduzida',
    'possuiTransporte',
    'necessitaTransporteAdaptado',
    'transporteProprioAdaptado',
  ];

  for (const field of booleanFields) {
    check(typeof family[field] === 'boolean');
  }

  if (family.transporteProprioAdaptado) {
    check(family.possuiTransporte);
  }
}

function validateShelter(shelter, regionIds) {
  check(isText(shelter.nome));
  check(isText(shelter.sigla));
  check(isMapPosition(shelter));
  check(regionIds.includes(shelter.regiao));
  check(isIntegerBetween(shelter.capacidade, 0));
  check(isIntegerBetween(shelter.vagasDisponiveis, 0, shelter.capacidade));
  check(typeof shelter.acessivel === 'boolean');
  check(typeof shelter.ativo === 'boolean');
  check(isIntegerBetween(shelter.alagaNoNivel, 1, 4));
}

function validateVehicle(vehicle, regionIds) {
  check(isText(vehicle.nome));
  check(isMapPosition(vehicle));
  check(regionIds.includes(vehicle.regiao));
  check(isIntegerBetween(vehicle.capacidade, 1));
  check(vehicle.tipo === 'adaptado' || vehicle.tipo === 'convencional');
  check(typeof vehicle.disponivel === 'boolean');
}

export function validateScenario(scenario) {
  check(scenario != null);

  const collections = ['regioes', 'familias', 'abrigos', 'veiculos'];

  for (const collection of collections) {
    check(Array.isArray(scenario[collection]));
    validateIds(scenario[collection]);
  }

  check(scenario.regioes.length > 0);
  check(isText(scenario.nome));

  const regionIds = scenario.regioes.map((region) => region.id);
  const shelterIds = scenario.abrigos.map((shelter) => shelter.id);

  for (const region of scenario.regioes) {
    validateRegion(region, shelterIds);
  }

  for (const family of scenario.familias) {
    validateFamily(family, regionIds);
  }

  for (const shelter of scenario.abrigos) {
    validateShelter(shelter, regionIds);
  }

  for (const vehicle of scenario.veiculos) {
    validateVehicle(vehicle, regionIds);
  }
}
