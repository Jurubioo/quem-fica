import { useState } from 'react';
import usePageTitle from '../../hooks/usePageTitle';
import useScenario from '../../hooks/useScenario';
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
  const { scenario, error, reload } = useScenario();
  const [level, setLevel] = useState(1);
  const [regionFilter, setRegionFilter] = useState('todas');
  const [needFilter, setNeedFilter] = useState('todas');
  const [selectedId, setSelectedId] = useState(null);

  const regionOf = (family) => scenario.regioes.find((region) => region.id === family.regiao);
  const situationOf = (family) => getFamilySituation(family, regionOf(family), level);
  const visibleFamilies = scenario?.familias.filter((family) =>
    (regionFilter === 'todas' || family.regiao === regionFilter) && NEED_FILTERS[needFilter](family)) ?? [];
  const selected = visibleFamilies.find((family) => family.id === selectedId) ?? visibleFamilies[0];
  const affected = scenario?.familias.filter((family) => getRegionState(regionOf(family), level) !== 'seca').length ?? 0;

  return (
    <>
      <PageIntro eyebrow="Simulação" title="Quem consegue chegar a um lugar seguro?"
        lead="Explore o bairro, escolha o nível de alagamento e conheça as necessidades de cada família." />
      <Workspace aria-labelledby="cenario-titulo">
        <div className="container">
          {error ? <Notice role="alert"><p>{error}</p><Button type="button" onClick={reload}>Tentar novamente</Button></Notice>
            : !scenario ? <p role="status">Carregando o cenário…</p> : <>
              <h2 id="cenario-titulo">{scenario.nome}</h2>
              <p>Cenário fictício com {scenario.familias.length} famílias. Os níveis são didáticos e não representam metros de água.</p>
              <Controls>
                <label>Nível de alagamento
                  <select value={level} onChange={(event) => setLevel(Number(event.target.value))}>
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
              </Controls>
              <Toolbar>
                <p role="status">{visibleFamilies.length} de {scenario.familias.length} famílias exibidas · {affected} atingidas no bairro.</p>
                <TextButton type="button" onClick={() => { setRegionFilter('todas'); setNeedFilter('todas'); }}>Limpar filtros</TextButton>
              </Toolbar>
              <div className="row g-4">
                <div className="col-12 col-xl-8">
                  <ScenarioMap scenario={scenario} level={level} families={visibleFamilies} selectedId={selected?.id} onSelect={setSelectedId} />
                  <Legend aria-label="Legenda das famílias"><li>○ Fora da área alagada</li><li>… Aguardando simulação</li></Legend>
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
              <ScenarioResources scenario={scenario} level={level} />
            </>}
        </div>
      </Workspace>
    </>
  );
}
