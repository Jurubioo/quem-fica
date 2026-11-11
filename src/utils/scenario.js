// Níveis didáticos, sem correspondência com uma altura real de enchente.
export const FLOOD_LEVELS = ['Sem alagamento', 'Alagamento baixo', 'Alagamento moderado', 'Alagamento grave'];

export function getRegionState(region, level) {
  if (level >= region.isolaNoNivel) return 'isolada';
  if (level >= region.alagaNoNivel) return 'alagada';
  return 'seca';
}

export function getFamilyNeeds(family) {
  const needs = [];
  if (family.idosos > 0) needs.push(`${family.idosos} ${family.idosos === 1 ? 'pessoa idosa' : 'pessoas idosas'}`);
  if (family.pcd > 0) needs.push(`${family.pcd} ${family.pcd === 1 ? 'pessoa' : 'pessoas'} com deficiência`);
  if (family.mobilidadeReduzida) needs.push('Mobilidade reduzida');
  if (family.necessitaTransporteAdaptado) needs.push('Precisa de transporte adaptado');
  if (!family.possuiTransporte) needs.push('Sem transporte próprio');
  return needs;
}

export function getFamilySituation(family, region, level, result) {
  if (result) return result;
  if (getRegionState(region, level) === 'seca') {
    return { status: 'neutral', label: 'Fora da área alagada', motivo: 'A região não é atingida neste nível.' };
  }
  return { status: 'pending', label: 'Aguardando simulação', motivo: 'A região está alagada. Execute a simulação para verificar uma alternativa segura.' };
}

export const STATUS_SYMBOLS = { neutral: '○', pending: '…', safe: '✓', risk: '!' };
