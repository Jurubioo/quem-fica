import usePageTitle from '../../hooks/usePageTitle';
import PageIntro from '../../components/UI/PageIntro';
import { ButtonLink } from '../../components/UI/Button';
import { IconHome } from '../../components/Icons/Icons';

export default function NotFound() {
  usePageTitle('Página não encontrada');

  return (
    <>
      <PageIntro
        eyebrow="Erro 404"
        title="Esta página não existe."
        lead="O endereço pode estar errado ou a página mudou de lugar."
      />
      <div className="container py-5">
        <ButtonLink to="/" $variant="dark">
          <IconHome />
          Voltar para o início
        </ButtonLink>
      </div>
    </>
  );
}
