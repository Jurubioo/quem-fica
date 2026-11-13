// Responsável: integrante 04.
// Indicadores: cobertura (%) e impacto da intervenção (Δ).
export function coverage(familiasSeguras, familiasAfetadas) {
  if (!familiasAfetadas || familiasAfetadas === 0) return 0;
  return Math.round((familiasSeguras / familiasAfetadas) * 100);
}

export function interventionImpact(atendidasDepois, atendidasAntes) {
  return atendidasDepois - atendidasAntes;
}

export function calculateResourceSummary({ familias = [], abrigos = [], veiculos = [] } = {}) {
  const totalFamilias = familias.length;
  const familiasSemTransporte = familias.filter((familia) => !familia.possuiTransporte).length;
  const familiasJaSeguras = familias.filter((familia) => familia.possuiTransporte || familia.abrigoId).length;
  const totalVagas = abrigos.reduce((soma, abrigo) => soma + Number(abrigo.capacidade || 0), 0);
  const veiculosDisponiveis = veiculos.filter((veiculo) => veiculo.disponivel !== false).length;

  const coberturaAntes = coverage(familiasJaSeguras, totalFamilias);
  const recursosAdicionais = Math.min(Math.max(0, totalFamilias - familiasJaSeguras), veiculosDisponiveis);
  const familiasSegurasDepois = Math.min(totalFamilias, familiasJaSeguras + recursosAdicionais);

  return {
    totalFamilias,
    familiasSemTransporte,
    totalVagas,
    veiculosDisponiveis,
    coberturaAntes,
    coberturaDepois: coverage(familiasSegurasDepois, totalFamilias),
    impacto: interventionImpact(familiasSegurasDepois, familiasJaSeguras),
  };
}
