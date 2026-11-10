// Responsável: integrante 04.
// Indicadores: cobertura (%) e impacto da intervenção (Δ).
export function coverage(familiasSeguras, familiasAfetadas) {
  if (!familiasAfetadas) return 0;
  return Math.round((familiasSeguras / familiasAfetadas) * 100);
}

export function interventionImpact(atendidasDepois, atendidasAntes) {
  return atendidasDepois - atendidasAntes;
}
