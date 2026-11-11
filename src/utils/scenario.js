// Os níveis são didáticos e não representam uma altura real de água.
export const FLOOD_LEVELS = [
  'Sem alagamento',
  'Alagamento baixo',
  'Alagamento moderado',
  'Alagamento grave',
];

export const STATUS_SYMBOLS = {
  neutral: '○',
  pending: '…',
  safe: '✓',
  risk: '!',
};

export function getRegionState(region, level) {
  if (level >= region.isolaNoNivel) {
    return 'isolada';
  }

  if (level >= region.alagaNoNivel) {
    return 'alagada';
  }

  return 'seca';
}

export function getFamilyNeeds(family) {
  const needs = [];

  if (family.idosos > 0) {
    const description = family.idosos === 1 ? 'pessoa idosa' : 'pessoas idosas';
    needs.push(`${family.idosos} ${description}`);
  }

  if (family.pcd > 0) {
    const description = family.pcd === 1 ? 'pessoa' : 'pessoas';
    needs.push(`${family.pcd} ${description} com deficiência`);
  }

  if (family.mobilidadeReduzida) {
    needs.push('Mobilidade reduzida');
  }

  if (family.necessitaTransporteAdaptado) {
    needs.push('Precisa de transporte adaptado');
  }

  if (!family.possuiTransporte) {
    needs.push('Sem transporte próprio');
  }

  return needs;
}

export function getFamilySituation(region, level, result) {
  if (result) {
    return result;
  }

  if (getRegionState(region, level) === 'seca') {
    return {
      status: 'neutral',
      label: 'Fora da área alagada',
      motivo: 'A região não é atingida neste nível.',
    };
  }

  return {
    status: 'pending',
    label: 'Aguardando simulação',
    motivo: 'A região está alagada. Execute a simulação para verificar uma alternativa segura.',
  };
}
