import { getRegionState } from './scenario.js';

// No cenário, uma rota liberada ainda permite sair antes de a água bloquear o acesso.
export const MAX_WALK_DISTANCE = 1.5;

export function needsAccessibleShelter(family) {
  return family.pcd > 0 || family.mobilidadeReduzida || family.necessitaTransporteAdaptado;
}

export function canUseOwnTransport(family) {
  if (!family.possuiTransporte) {
    return false;
  }

  if (family.necessitaTransporteAdaptado && !family.transporteProprioAdaptado) {
    return false;
  }

  return true;
}

export function canWalk(family, distance) {
  if (family.idosos > 0 || needsAccessibleShelter(family)) {
    return false;
  }

  return distance <= MAX_WALK_DISTANCE;
}

export function evacuationPriority(family) {
  if (family.necessitaTransporteAdaptado) {
    return 3;
  }

  if (needsAccessibleShelter(family)) {
    return 2;
  }

  if (family.idosos > 0) {
    return 1;
  }

  return 0;
}

export function isShelterAvailable(shelter, level, regions) {
  if (!shelter.ativo || level >= shelter.alagaNoNivel) {
    return false;
  }

  const region = regions.find((item) => item.id === shelter.regiao);
  return getRegionState(region, level) !== 'isolada';
}

export function canUseVehicle(family, vehicle, shelterId) {
  if (!vehicle.disponivel || vehicle.regiao !== family.regiao) {
    return false;
  }

  if (family.necessitaTransporteAdaptado && vehicle.tipo !== 'adaptado') {
    return false;
  }

  if (vehicle.lugaresRestantes < family.moradores) {
    return false;
  }

  // Uma viagem pode ser compartilhada, desde que todos sigam para o mesmo abrigo.
  return vehicle.abrigoId === null || vehicle.abrigoId === shelterId;
}
