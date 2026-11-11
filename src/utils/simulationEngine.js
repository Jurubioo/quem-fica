import { validateScenario } from './scenarioValidation.js';
import { FLOOD_LEVELS, getRegionState } from './scenario.js';
import {
  canUseOwnTransport,
  canUseVehicle,
  canWalk,
  evacuationPriority,
  isShelterAvailable,
  needsAccessibleShelter,
} from './evacuationRules.js';

function compareIds(firstId, secondId) {
  return String(firstId).localeCompare(String(secondId), 'pt-BR', { numeric: true });
}

function compareFamilies(first, second) {
  const priorityDifference = evacuationPriority(second) - evacuationPriority(first);

  if (priorityDifference !== 0) {
    return priorityDifference;
  }

  return compareIds(first.id, second.id);
}

function compareVehicles(first, second) {
  // Mantém os veículos adaptados livres quando um convencional atende à família.
  if (first.tipo !== second.tipo) {
    return first.tipo === 'convencional' ? -1 : 1;
  }

  const firstHasTrip = first.abrigoId !== null;
  const secondHasTrip = second.abrigoId !== null;

  if (firstHasTrip !== secondHasTrip) {
    return firstHasTrip ? -1 : 1;
  }

  const capacityDifference = first.lugaresRestantes - second.lugaresRestantes;

  if (capacityDifference !== 0) {
    return capacityDifference;
  }

  return compareIds(first.id, second.id);
}

function withoutAlternative(family, code, reason) {
  return {
    familiaId: family.id,
    status: 'risk',
    label: 'Sem alternativa segura',
    code,
    motivo: reason,
    abrigoId: null,
    veiculoId: null,
    transporte: null,
  };
}

function reserve(family, destination, transport, vehicle = null) {
  const shelter = destination.shelter;
  shelter.vagasRestantes -= family.moradores;

  if (vehicle) {
    vehicle.lugaresRestantes -= family.moradores;
    vehicle.abrigoId = shelter.id;
    vehicle.familiasIds.push(family.id);
  }

  let transportDescription = 'deslocamento a pé por rota liberada';

  if (transport === 'proprio') {
    transportDescription = 'transporte próprio compatível';
  } else if (vehicle) {
    transportDescription = vehicle.nome;
  }

  const distance = destination.distancia.toLocaleString('pt-BR');

  return {
    familiaId: family.id,
    status: 'safe',
    label: 'Com alternativa segura',
    code: 'atendida',
    motivo: `Destino previsto: ${shelter.nome}, a ${distance} km, com ${transportDescription}. Há vagas para todos os moradores.`,
    abrigoId: shelter.id,
    veiculoId: vehicle?.id ?? null,
    transporte: transport,
    distancia: destination.distancia,
  };
}

function allocateFamily(family, region, regions, level, shelters, vehicles) {
  const regionState = getRegionState(region, level);

  if (regionState === 'seca') {
    return {
      familiaId: family.id,
      status: 'neutral',
      label: 'Fora da área alagada',
      code: 'fora_da_area',
      motivo: 'A região não é atingida neste nível. Nenhum recurso foi reservado.',
      abrigoId: null,
      veiculoId: null,
      transporte: null,
    };
  }

  if (regionState === 'isolada') {
    return withoutAlternative(
      family,
      'regiao_isolada',
      'A região está isolada neste nível. Os veículos terrestres do cenário não conseguem realizar a evacuação.',
    );
  }

  // Junta a rota ao abrigo uma vez, para as próximas verificações usarem os mesmos dados.
  const destinations = region.rotasAbrigos.map((route) => ({
    ...route,
    shelter: shelters.find((shelter) => shelter.id === route.abrigoId),
  }));

  const activeDestinations = destinations.filter((destination) =>
    isShelterAvailable(destination.shelter, level, regions),
  );

  if (activeDestinations.length === 0) {
    return withoutAlternative(
      family,
      'sem_abrigo_ativo',
      'Não há abrigo ativo, fora da água e de regiões isoladas entre os destinos ligados à região.',
    );
  }

  const openDestinations = activeDestinations.filter((destination) =>
    level < destination.bloqueiaNoNivel,
  );

  if (openDestinations.length === 0) {
    return withoutAlternative(
      family,
      'rota_bloqueada',
      'As rotas para os abrigos ativos estão bloqueadas neste nível.',
    );
  }

  const requiresAccessibility = needsAccessibleShelter(family);
  const accessibleDestinations = openDestinations.filter((destination) =>
    !requiresAccessibility || destination.shelter.acessivel,
  );

  if (accessibleDestinations.length === 0) {
    return withoutAlternative(
      family,
      'sem_abrigo_acessivel',
      'A família precisa de um abrigo acessível, mas nenhum possui uma rota liberada a partir da região.',
    );
  }

  const availableDestinations = accessibleDestinations.filter((destination) =>
    destination.shelter.vagasRestantes >= family.moradores,
  );

  if (availableDestinations.length === 0) {
    return withoutAlternative(
      family,
      'sem_vagas',
      'Não há vagas suficientes em um mesmo abrigo compatível para acolher todos os moradores da família.',
    );
  }

  availableDestinations.sort((first, second) => {
    const distanceDifference = first.distancia - second.distancia;

    if (distanceDifference !== 0) {
      return distanceDifference;
    }

    return compareIds(first.abrigoId, second.abrigoId);
  });

  // Usa uma saída independente antes de reservar lugares na frota.
  for (const destination of availableDestinations) {
    if (canUseOwnTransport(family)) {
      return reserve(family, destination, 'proprio');
    }

    if (canWalk(family, destination.distancia)) {
      return reserve(family, destination, 'a_pe');
    }
  }

  for (const destination of availableDestinations) {
    const compatibleVehicles = vehicles.filter((vehicle) =>
      canUseVehicle(family, vehicle, destination.abrigoId),
    );
    compatibleVehicles.sort(compareVehicles);

    if (compatibleVehicles.length > 0) {
      return reserve(family, destination, 'coletivo', compatibleVehicles[0]);
    }
  }

  if (family.necessitaTransporteAdaptado) {
    return withoutAlternative(
      family,
      'sem_transporte_adaptado',
      'Não há transporte adaptado disponível na região com lugares para toda a família e destino compatível.',
    );
  }

  return withoutAlternative(
    family,
    'sem_transporte',
    'Não há transporte disponível na região com lugares para toda a família e destino compatível. O deslocamento a pé não atende às regras do cenário.',
  );
}

function summarizeResults(families, results) {
  const summary = {
    familiasAfetadas: 0,
    familiasAtendidas: 0,
    familiasSemAlternativa: 0,
    familiasForaDaArea: 0,
    pessoasAfetadas: 0,
  };

  for (const family of families) {
    const result = results.find((item) => item.familiaId === family.id);

    if (result.status === 'neutral') {
      summary.familiasForaDaArea += 1;
      continue;
    }

    summary.familiasAfetadas += 1;
    summary.pessoasAfetadas += family.moradores;

    if (result.status === 'safe') {
      summary.familiasAtendidas += 1;
    } else {
      summary.familiasSemAlternativa += 1;
    }
  }

  return summary;
}

export function runSimulation(scenario, level = 1) {
  validateScenario(scenario);

  if (!Number.isInteger(level) || level < 0 || level >= FLOOD_LEVELS.length) {
    throw new Error('Escolha um nível de alagamento entre 0 e 3.');
  }

  // Cada execução começa com cópias, sem consumir os recursos do cenário original.
  const shelters = scenario.abrigos.map((shelter) => ({
    ...shelter,
    vagasRestantes: shelter.vagasDisponiveis,
  }));
  const vehicles = scenario.veiculos.map((vehicle) => ({
    ...vehicle,
    lugaresRestantes: vehicle.capacidade,
    abrigoId: null,
    familiasIds: [],
  }));

  const orderedFamilies = [...scenario.familias].sort(compareFamilies);
  const allocatedResults = [];

  for (const family of orderedFamilies) {
    const region = scenario.regioes.find((item) => item.id === family.regiao);
    const result = allocateFamily(family, region, scenario.regioes, level, shelters, vehicles);
    allocatedResults.push(result);
  }

  // Devolve na ordem da lista de famílias, mesmo que o atendimento use outra ordem.
  const results = scenario.familias.map((family) =>
    allocatedResults.find((result) => result.familiaId === family.id),
  );

  return {
    nivel: level,
    resultados: results,
    abrigos: shelters,
    veiculos: vehicles,
    resumo: summarizeResults(scenario.familias, results),
  };
}
