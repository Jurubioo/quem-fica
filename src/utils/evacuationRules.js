import { getRegionState } from './scenario.js';

// Regras simplificadas do protótipo acadêmico. Distâncias em quilômetros.
// Uma rota liberada representa deslocamento antes de ser tomada pela água.
export const MAX_WALK_DISTANCE = 1.5;

export function needsAccessibleShelter(family) {
  return family.pcd > 0 || family.mobilidadeReduzida || family.necessitaTransporteAdaptado;
}

export function canUseOwnTransport(family) {
  return family.possuiTransporte && (!family.necessitaTransporteAdaptado || family.transporteProprioAdaptado);
}

export function canWalk(family, distance) {
  return family.idosos === 0 && !needsAccessibleShelter(family) && distance <= MAX_WALK_DISTANCE;
}

// Ordem explícita, sem pesos ocultos: adaptado, mobilidade/PCD, idosos, demais.
export function evacuationPriority(family) {
  if (family.necessitaTransporteAdaptado) return 3;
  if (needsAccessibleShelter(family)) return 2;
  if (family.idosos > 0) return 1;
  return 0;
}

export function isShelterAvailable(shelter, level, regions) {
  const region = regions.find((item) => item.id === shelter.regiao);
  return shelter.ativo && level < shelter.alagaNoNivel && getRegionState(region, level) !== 'isolada';
}

export function canUseVehicle(family, vehicle, shelterId) {
  return vehicle.disponivel && vehicle.regiao === family.regiao
    && (!family.necessitaTransporteAdaptado || vehicle.tipo === 'adaptado')
    && vehicle.lugaresRestantes >= family.moradores
    && (vehicle.abrigoId === null || vehicle.abrigoId === shelterId);
}
