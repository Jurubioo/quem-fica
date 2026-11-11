import { useState } from 'react';
import usePageTitle from '../../hooks/usePageTitle';
import useSimulation from '../../hooks/useSimulation';
import PageIntro from '../../components/UI/PageIntro';
import { Button } from '../../components/UI/Button';
import ScenarioMap from '../../components/Map/ScenarioMap';
import ScenarioResources from '../../components/Map/ScenarioResources';
import FamilyCard from '../../components/Family/FamilyCard';
import FamilyDetails from '../../components/Family/FamilyDetails';
import { FLOOD_LEVELS, getFamilySituation, getRegionState } from '../../utils/scenario';
import { Controls, FamilyList, Legend, Notice, TextButton, Toolbar, Workspace } from './Simulation.styles';

const NEED_FILTERS = {
  todas: () => true,
  idosos: (family) => family.idosos > 0,
  pcd: (family) => family.pcd > 0,
  mobilidade: (family) => family.mobilidadeReduzida,
  semTransporte: (family) => !family.possuiTransporte,
  adaptado: (family) => family.necessitaTransporteAdaptado,
};

export default function Simulation() {
  usePageTitle('Simulação');
  const { scenario, error, reload, level, changeLevel, simulation, simulationError, execute } = useSimulation();
  const [regionFilter, setRegionFilter] = useState('todas');
  const [needFilter, setNeedFilter] = useState('todas');
  const [selectedId, setSelectedId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('todas');

  const regionOf = (family) => scenario.regioes.find((region) => region.id === family.regiao);
  const results = simulation?.resultados ?? [];
  const situationOf = (family) => getFamilySituation(family, regionOf(family), level, results.find((result) => result.familiaId === family.id));
  const visibleFamilies = scenario?.familias.filter((family) =>
    (regionFilter === 'todas' || String(family.regiao) === regionFilter) && NEED_FILTERS[needFilter](family)
    && (statusFilter === 'todas' || situationOf(family).status === statusFilter)) ?? [];
  const selected = visibleFamilies.find((family) => family.id === selectedId) ?? visibleFamilies[0];
  const affected = scenario?.familias.filter((family) => getRegionState(regionOf(family), level) !== 'seca').length ?? 0;

  return (
    <>
      <PageIntro eyebrow="Simulação" title="Quem consegue chegar a um lugar seguro?"
        lead="Explore o bairro, escolha o nível de alagamento e conheça as necessidades de cada família." />
      <Workspace aria-labelledby="cenario-titulo">
        <div className="container">
          <h2 id="cenario-titulo">{scenario?.nome ?? 'Cenário de evacuação'}</h2>
          {error ? <Notice role="alert"><p>{error}</p><Button type="button" onClick={reload}>Tentar novamente</Button></Notice>
            : !scenario ? <p role="status">Carregando o cenário…</p> : <>
              <p>Cenário fictício com {scenario.familias.length} famílias. Os níveis são didáticos e não representam metros de água.</p>
              <Controls>
                <label>Nível de alagamento
                  <select value={level} onChange={(event) => { changeLevel(Number(event.target.value)); setStatusFilter('todas'); }}>
                    {FLOOD_LEVELS.map((label, index) => <option key={label} value={index}>{index} · {label}</option>)}
                  </select>
                </label>
                <label>Região
                  <select value={regionFilter} onChange={(event) => setRegionFilter(event.target.value)}>
                    <option value="todas">Todas as regiões</option>
                    {scenario.regioes.map((region) => <option key={region.id} value={region.id}>{region.nome}</option>)}
                  </select>
                </label>
                <label>Necessidade de apoio
                  <select value={needFilter} onChange={(event) => setNeedFilter(event.target.value)}>
                    <option value="todas">Todas as famílias</option><option value="idosos">Pessoas idosas</option>
                    <option value="pcd">Pessoas com deficiência</option><option value="mobilidade">Mobilidade reduzida</option>
                    <option value="semTransporte">Sem transporte próprio</option><option value="adaptado">Transporte adaptado</option>
                  </select>
                </label>
                <label>Situação das famílias
                  <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                    <option value="todas">Todas as situações</option><option value="neutral">Fora da área alagada</option>
                    {simulation ? <><option value="safe">Com alternativa segura</option><option value="risk">Sem alternativa segura</option></>
                      : <option value="pending">Aguardando simulação</option>}
                  </select>
                </label>
              </Controls>
              <Toolbar>
                <p>A simulação considera todas as famílias do bairro, mesmo com filtros ativos.</p>
                <Button type="button" onClick={() => { execute(); setStatusFilter('todas'); }}>
                  {simulation ? 'Executar novamente' : 'Executar simulação'}
                </Button>
              </Toolbar>
              {simulationError && <Notice role="alert"><p>{simulationError}</p></Notice>}
              <Notice role="status" aria-live="polite" aria-atomic="true">
                {simulation ? <>
                  <strong>Resultado · {FLOOD_LEVELS[level]}</strong>
                  <p>{simulation.resumo.familiasAfetadas} famílias atingidas ({simulation.resumo.pessoasAfetadas} pessoas):{' '}
                    {simulation.resumo.familiasAtendidas} com alternativa segura e {simulation.resumo.familiasSemAlternativa} sem alternativa segura.{' '}
                    {simulation.resumo.familiasForaDaArea} famílias fora da área alagada.</p>
                </> : <p>Escolha um nível e execute a simulação. Ao mudar o nível, os resultados anteriores são descartados.</p>}
              </Notice>
              <Toolbar>
                <p role="status">{visibleFamilies.length} de {scenario.familias.length} famílias exibidas · {affected} atingidas no bairro.</p>
                <TextButton type="button" onClick={() => { setRegionFilter('todas'); setNeedFilter('todas'); setStatusFilter('todas'); }}>Limpar filtros</TextButton>
              </Toolbar>
              <div className="row g-4 mb-4">
                <div className="col-12 col-xl-8">
                  <ScenarioMap scenario={scenario} level={level} families={visibleFamilies} selectedId={selected?.id} onSelect={setSelectedId} results={results} />
                  <Legend aria-label="Legenda das famílias"><li>○ Fora da área alagada</li><li>… Aguardando simulação</li><li>✓ Com alternativa segura</li><li>! Sem alternativa segura</li></Legend>
                </div>
                <div className="col-12 col-xl-4">
                  {selected ? <FamilyDetails family={selected} region={regionOf(selected)} situation={situationOf(selected)} shelters={scenario.abrigos} vehicles={scenario.veiculos} />
                    : <Notice><p>Nenhuma família encontrada. Limpe os filtros para ver todo o bairro.</p></Notice>}
                </div>
              </div>
              <h2>Famílias do cenário</h2>
              <p>Os filtros alteram a visualização do mapa e da lista.</p>
              {visibleFamilies.length ? <FamilyList>{visibleFamilies.map((family) => <FamilyCard key={family.id} family={family}
                region={regionOf(family)} situation={situationOf(family)} selected={selected?.id === family.id} onSelect={setSelectedId} />)}</FamilyList>
                : <p role="status">Nenhuma família corresponde aos filtros selecionados.</p>}
              <ScenarioResources scenario={scenario} level={level} simulation={simulation} />
              <details className="mt-4">
                <summary>Entenda as regras desta simulação</summary>
                <ul className="mt-3">
                  <li>Famílias com necessidade de transporte adaptado têm prioridade, seguidas por mobilidade reduzida/PCD, idosos e demais famílias. Empates seguem o número da família.</li>
                  <li>A família permanece junta. Abrigos precisam estar ativos, fora da água, ter acesso liberado, vagas para todos e acessibilidade quando necessária.</li>
                  <li>Transporte próprio precisa atender à necessidade de adaptação. A caminhada só é considerada até 1,5 km, por rota liberada e sem idosos ou necessidades de acessibilidade.</li>
                  <li>A frota atende somente sua região, em uma viagem por veículo. Famílias podem compartilhar lugares quando seguem para o mesmo abrigo. Não há novas viagens nem deslocamento entre regiões.</li>
                  <li>Regiões isoladas não são atendidas pelos veículos terrestres. A escolha prioriza apoio e menor distância, sem garantir a melhor alocação possível de todos os recursos.</li>
                </ul>
                <p>Modelo acadêmico com dados fictícios. Os resultados representam alternativas previstas, não resgates realizados nem orientações para atravessar áreas alagadas.</p>
              </details>
            </>}
        </div>
      </Workspace>
    </>
  );
}
