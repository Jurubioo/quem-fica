import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateResourceSummary, coverage, interventionImpact } from './calculations.js';

test('coverage calcula porcentagem de famílias seguras', () => {
  assert.equal(coverage(3, 10), 30);
  assert.equal(coverage(0, 0), 0);
});

test('interventionImpact calcula diferença entre antes e depois', () => {
  assert.equal(interventionImpact(8, 5), 3);
});

test('calculateResourceSummary agrega indicadores de capacidade e impacto', () => {
  const summary = calculateResourceSummary({
    familias: [
      { possuiTransporte: false },
      { possuiTransporte: false },
      { possuiTransporte: true },
      { possuiTransporte: false },
    ],
    abrigos: [
      { capacidade: 12 },
      { capacidade: 8 },
    ],
    veiculos: [
      { disponivel: true, capacidade: 4 },
      { disponivel: true, capacidade: 3 },
    ],
  });

  assert.equal(summary.totalFamilias, 4);
  assert.equal(summary.familiasSemTransporte, 3);
  assert.equal(summary.coberturaAntes, 25);
  assert.equal(summary.coberturaDepois, 75);
  assert.equal(summary.impacto, 2);
});
