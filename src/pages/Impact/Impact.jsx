import usePageTitle from '../../hooks/usePageTitle';
import PageIntro from '../../components/UI/PageIntro';
import ComingSoon from '../../components/UI/ComingSoon';

export default function Impact() {
  usePageTitle('Impacto');

  return (
    <>
      <PageIntro
        eyebrow="Impacto"
        title="O que muda quando adicionamos recursos?"
        lead="Compare o antes e o depois: quantas famílias passaram a ter uma alternativa segura."
      />
      <ComingSoon
        owner="Responsável: integrante 04 (dashboard de impacto)."
        items={[
          'Cobertura de evacuação (%) antes e depois',
          'Famílias com e sem alternativa segura',
          'Abrigos disponíveis e capacidade restante',
          'Recursos adicionais utilizados',
        ]}
      />
    </>
  );
}
