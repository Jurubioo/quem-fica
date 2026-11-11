import { validateScenario } from '../services/scenarioService.js';
import { FLOOD_LEVELS, getRegionState } from './scenario.js';
import { canUseOwnTransport, canUseVehicle, canWalk, evacuationPriority, isShelterAvailable, needsAccessibleShelter } from './evacuationRules.js';

const byId = (a, b) => String(a.id).localeCompare(String(b.id), 'pt-BR', { numeric: true });

function withoutAlternative(family, code, motivo) {
  return { familiaId: family.id, status: 'risk', label: 'Sem alternativa segura', code, motivo, abrigoId: null, veiculoId: null, transporte: null };
}

function allocateFamily(family, region, regions, level, shelters, vehicles) {
  if (getRegionState(region, level) === 'seca') {
    return { familiaId: family.id, status: 'neutral', label: 'Fora da área alagada', code: 'fora_da_area', motivo: 'A região não é atingida neste nível. Nenhum recurso foi reservado.', abrigoId: null, veiculoId: null, transporte: null };
  }
  if (getRegionState(region, level) === 'isolada') {
    return withoutAlternative(family, 'regiao_isolada', 'A região está isolada neste nível. Os veículos terrestres do cenário não conseguem realizar a evacuação.');
  }

  const activeRoutes = region.rotasAbrigos
    .filter((route) => isShelterAvailable(shelters.find((shelter) => shelter.id === route.abrigoId), level, regions));
  if (!activeRoutes.length) return withoutAlternative(family, 'sem_abrigo_ativo', 'Não há abrigo ativo, fora da água e de regiões isoladas entre os destinos ligados à região.');
  const openRoutes = activeRoutes.filter((route) => level < route.bloqueiaNoNivel);
  if (!openRoutes.length) return withoutAlternative(family, 'rota_bloqueada', 'As rotas para os abrigos ativos estão bloqueadas neste nível.');
  const accessibleRoutes = openRoutes.filter((route) => !needsAccessibleShelter(family) || shelters.find((shelter) => shelter.id === route.abrigoId).acessivel);
  if (!accessibleRoutes.length) return withoutAlternative(family, 'sem_abrigo_acessivel', 'A família precisa de um abrigo acessível, mas nenhum possui uma rota liberada a partir da região.');
  const routes = accessibleRoutes
    .filter((route) => shelters.find((shelter) => shelter.id === route.abrigoId).vagasRestantes >= family.moradores)
    .sort((a, b) => a.distancia - b.distancia || String(a.abrigoId).localeCompare(String(b.abrigoId), 'pt-BR', { numeric: true }));
  if (!routes.length) return withoutAlternative(family, 'sem_vagas', 'Não há vagas suficientes em um mesmo abrigo compatível para acolher todos os moradores da família.');

  // Antes de reservar a frota, verifica alternativas próprias e trajetos a pé.
  // Assim, não ocupa um veículo quando existe uma saída independente.
  for (const route of routes) {
    const transport = canUseOwnTransport(family) ? 'proprio' : canWalk(family, route.distancia) ? 'a_pe' : null;
    if (transport) return reserve(family, route, shelters, transport);
  }
  for (const route of routes) {
    const compatible = vehicles.filter((vehicle) => canUseVehicle(family, vehicle, route.abrigoId))
      .sort((a, b) => Number(a.tipo === 'adaptado') - Number(b.tipo === 'adaptado')
        || Number(b.abrigoId !== null) - Number(a.abrigoId !== null)
        || a.lugaresRestantes - b.lugaresRestantes || byId(a, b));
    if (compatible.length) return reserve(family, route, shelters, 'coletivo', compatible[0]);
  }
  return withoutAlternative(family, family.necessitaTransporteAdaptado ? 'sem_transporte_adaptado' : 'sem_transporte',
    family.necessitaTransporteAdaptado
      ? 'Não há transporte adaptado disponível na região com lugares para toda a família e destino compatível.'
      : 'Não há transporte disponível na região com lugares para toda a família e destino compatível. O deslocamento a pé não atende às regras do cenário.');
}

function reserve(family, route, shelters, transport, vehicle = null) {
  const shelter = shelters.find((item) => item.id === route.abrigoId);
  shelter.vagasRestantes -= family.moradores;
  if (vehicle) {
    vehicle.lugaresRestantes -= family.moradores;
    vehicle.abrigoId = shelter.id;
    vehicle.familiasIds.push(family.id);
  }
  const means = transport === 'proprio' ? 'transporte próprio compatível' : transport === 'a_pe' ? 'deslocamento a pé por rota liberada' : vehicle.nome;
  return {
    familiaId: family.id, status: 'safe', label: 'Com alternativa segura', code: 'atendida',
    motivo: `Destino previsto: ${shelter.nome}, a ${route.distancia.toLocaleString('pt-BR')} km, com ${means}. Há vagas para todos os moradores.`,
    abrigoId: shelter.id, veiculoId: vehicle?.id ?? null, transporte: transport, distancia: route.distancia,
  };
}

// Função pura: cada execução parte das vagas e dos veículos originais.
// Alocação por prioridade e menor distância; não é uma otimização global.
export function runSimulation(scenario, level = 1) {
  validateScenario(scenario);
  if (!Number.isInteger(level) || level < 0 || level >= FLOOD_LEVELS.length) {
    throw new Error('Escolha um nível de alagamento entre 0 e 3.');
  }
  const shelters = scenario.abrigos.map((shelter) => ({ ...shelter, vagasRestantes: shelter.vagasDisponiveis }));
  const vehicles = scenario.veiculos.map((vehicle) => ({ ...vehicle, lugaresRestantes: vehicle.capacidade, abrigoId: null, familiasIds: [] }));
  const orderedFamilies = [...scenario.familias].sort((a, b) => evacuationPriority(b) - evacuationPriority(a) || byId(a, b));
  const allocated = orderedFamilies.map((family) => allocateFamily(family, scenario.regioes.find((region) => region.id === family.regiao), scenario.regioes, level, shelters, vehicles));
  const results = scenario.familias.map((family) => allocated.find((result) => result.familiaId === family.id));
  const affected = results.filter((result) => result.status !== 'neutral');
  return {
    nivel: level, resultados: results, abrigos: shelters, veiculos: vehicles,
    resumo: {
      familiasAfetadas: affected.length,
      familiasAtendidas: results.filter((result) => result.status === 'safe').length,
      familiasSemAlternativa: results.filter((result) => result.status === 'risk').length,
      familiasForaDaArea: results.filter((result) => result.status === 'neutral').length,
      pessoasAfetadas: scenario.familias.filter((family) => affected.some((result) => result.familiaId === family.id)).reduce((total, family) => total + family.moradores, 0),
    },
  };
}
