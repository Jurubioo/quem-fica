import usePageTitle from '../../hooks/usePageTitle';
import PageIntro from '../../components/UI/PageIntro';
import ComingSoon from '../../components/UI/ComingSoon';

export default function Simulation() {
  usePageTitle('Simulação');

  return (
    <>
      <PageIntro
        eyebrow="Simulação"
        title="Quem consegue chegar a um lugar seguro?"
        lead="Escolha o nível da água, veja as famílias da região e descubra quem fica sem alternativa segura."
      />
      <ComingSoon
        owner="Responsáveis: integrante 02 (mapa e famílias) e integrante 03 (motor de simulação)."
        items={[
          'Mapa esquemático em SVG com regiões alagadas, famílias, abrigos e veículos',
          'Filtros por necessidade (idosos, PCD, mobilidade reduzida, sem transporte)',
          'Botão para executar a simulação e painel de resultados',
          'Cadastro de veículos e abrigos em painéis/modais (integrante 04)',
        ]}
      />
    </>
  );
}
