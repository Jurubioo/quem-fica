import usePageTitle from '../../hooks/usePageTitle';
import PageIntro from '../../components/UI/PageIntro';
import ComingSoon from '../../components/UI/ComingSoon';

export default function Team() {
  usePageTitle('Equipe');

  return (
    <>
      <PageIntro
        eyebrow="Equipe"
        title="Quem faz o Quem Fica?"
        lead="Conheça o projeto, as pessoas por trás dele e fale com a gente."
      />
      <ComingSoon
        owner="Responsável: integrante 05 (página da equipe e formulário)."
        items={[
          'Descrição do projeto e tecnologias usadas',
          'Integrantes com nome e RM',
          'Formulário de contato/participação com React Hook Form e validação',
        ]}
      />
    </>
  );
}
