import styled from 'styled-components';
import usePageTitle from '../../hooks/usePageTitle';
import PageIntro from '../../components/UI/PageIntro';
import { useState } from 'react';
import { Section, Title, Lead } from '../../components/UI/Section';
import { INTEGRANTES, TECNOLOGIAS, REPOSITORIO_URL } from '../../data/equipe';
import ParticipacaoForm from '../../components/Participacao/ParticipacaoForm';
import GerenciarRegistros from '../../components/Registros/GerenciarRegistros';
import { BotaoContorno } from '../../components/Participacao/Botoes';
import { participacoes } from '../../services/participacaoService';

const SubTitle = styled.h3`
  margin-top: 2rem;
  font-size: 1.1rem;
`;

// Segunda seção, sem o espaço de cima, para ficar colada à primeira.
const SectionSemTopo = styled(Section)`
  padding-top: 0;
`;

// Aviso de sucesso do formulário.
const Sucesso = styled.div`
  max-width: 40rem;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.5rem;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border-left: 4px solid ${({ theme }) => theme.colors.water};
  border-radius: ${({ theme }) => theme.radius.sm};

  p {
    margin: 0 0 0.75rem;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

const Grid = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
`;

const Card = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.soft};
`;

// Foto em círculo com anel da marca (Azul Maré). Sem foto, mostra as iniciais.
const Avatar = styled.span`
  display: grid;
  place-items: center;
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.water};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  font-size: 1.4rem;
  box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.surface}, 0 0 0 6px ${({ theme }) => theme.colors.water};
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const Name = styled.h3`
  font-size: 1.15rem;
  margin: 0;
`;

const Rm = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.inkSoft};
`;

const Role = styled.p`
  margin: 0;
  font-size: 1rem;
`;

const Deliveries = styled.ul`
  margin: 0;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.45rem;
  font-size: 0.95rem;
  line-height: 1.45;
`;

const Pages = styled.ul`
  list-style: none;
  margin: auto 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const Tag = styled.li`
  padding: 0.25rem 0.6rem;
  border: 1px solid ${({ theme }) => theme.colors.water};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.colors.water};
  font-size: 0.85rem;
  font-weight: 600;
`;

const TechList = styled.ul`
  list-style: none;
  margin: 1.25rem 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechTag = styled.li`
  padding: 0.4rem 0.8rem;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 0.95rem;
`;

const Notice = styled.p`
  margin-top: 2rem;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.inkSoft};
`;

function iniciais(nome) {
  const partes = nome.split(' ').filter(Boolean);
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

export default function Team() {
  usePageTitle('Equipe');
  const [enviado, setEnviado] = useState(false);

  return (
    <>
      <PageIntro
        eyebrow="Equipe"
        title="Quem faz o Quem Fica?"
        lead="Conheça o projeto, as pessoas por trás dele e fale com a gente."
      />

      <Section aria-labelledby="sobre-titulo">
        <div className="container">
          <Title id="sobre-titulo">O projeto</Title>
          <Lead>
            O Quem Fica? simula enchentes em um bairro fictício e mostra quais famílias conseguem chegar sozinhas
            a um abrigo seguro e quais precisam de apoio. O objetivo é que ninguém fique para trás no plano de
            evacuação.
          </Lead>
          <p>
            Código aberto no{' '}
            <a href={REPOSITORIO_URL} target="_blank" rel="noreferrer">
              repositório do GitHub
            </a>
            .
          </p>
          <SubTitle>Tecnologias</SubTitle>
          <TechList aria-label="Tecnologias usadas no projeto">
            {TECNOLOGIAS.map((tecnologia) => (
              <TechTag key={tecnologia}>{tecnologia}</TechTag>
            ))}
          </TechList>
        </div>
      </Section>

      <SectionSemTopo aria-labelledby="integrantes-titulo">
        <div className="container">
          <Title id="integrantes-titulo">Integrantes</Title>
          <Grid>
            {INTEGRANTES.map((pessoa) => (
              <Card key={pessoa.id}>
                <Avatar>
                  {pessoa.foto ? (
                    <Photo src={pessoa.foto} alt={`Foto de ${pessoa.nome}`} loading="lazy" decoding="async" />
                  ) : (
                    <span aria-hidden="true">{iniciais(pessoa.nome)}</span>
                  )}
                </Avatar>
                <div>
                  <Name>{pessoa.nome}</Name>
                  <Rm>RM {pessoa.rm}</Rm>
                </div>
                <Role>{pessoa.responsabilidade}</Role>
                <Deliveries aria-label={`Entregas de ${pessoa.nome}`}>
                  {pessoa.entregas.map((entrega) => (
                    <li key={entrega}>{entrega}</li>
                  ))}
                </Deliveries>
                <Pages aria-label={`Partes do projeto de ${pessoa.nome}`}>
                  {pessoa.paginas.map((pagina) => (
                    <Tag key={pagina}>{pagina}</Tag>
                  ))}
                </Pages>
              </Card>
            ))}
          </Grid>
          <Notice>Global Solution FIAP 2026/2 · CitizenTech · ODS 10, 11 e 13.</Notice>
        </div>
      </SectionSemTopo>

      <SectionSemTopo aria-labelledby="participar-titulo">
        <div className="container">
          <Title id="participar-titulo">Participe do projeto</Title>
          <Lead>
            Conte como você pode contribuir: morador, órgão público, organização ou voluntário. Os campos marcados
            como opcionais não são obrigatórios.
          </Lead>

          {enviado ? (
            <Sucesso role="status" aria-live="polite">
              <p><strong>Participação registrada neste navegador.</strong></p>
              <p>
                Este é um protótipo acadêmico, sem servidor. A equipe não recebe nem consegue ver estes dados.
                Você pode apagar seus registros abaixo.
              </p>
              <BotaoContorno type="button" onClick={() => setEnviado(false)}>
                Enviar outra participação
              </BotaoContorno>
            </Sucesso>
          ) : (
            <ParticipacaoForm onSaved={() => setEnviado(true)} />
          )}

          <GerenciarRegistros titulo="Seus registros de participação" loja={participacoes} />
        </div>
      </SectionSemTopo>
    </>
  );
}
