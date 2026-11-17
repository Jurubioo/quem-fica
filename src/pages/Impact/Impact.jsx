import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import usePageTitle from '../../hooks/usePageTitle';
import PageIntro from '../../components/UI/PageIntro';
import { Button } from '../../components/UI/Button';
import { getScenario } from '../../services/scenarioService';
import { calculateResourceSummary, coverage, interventionImpact } from '../../utils/calculations';

const SectionWrap = styled.section`
  padding-block: clamp(2.5rem, 7vw, 4rem);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 1.5rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: clamp(1.25rem, 3vw, 2rem);
  box-shadow: ${({ theme }) => theme.shadow.soft};
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 1rem;

  .label {
    display: block;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.colors.inkSoft};
    margin-bottom: 0.5rem;
  }

  .value {
    font-size: clamp(1.6rem, 3vw, 2.1rem);
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 700;
    line-height: 1.1;
    margin: 0;
  }
`;

const Form = styled.form`
  display: grid;
  gap: 1rem;
`;

const Field = styled.label`
  display: grid;
  gap: 0.45rem;
  color: ${({ theme }) => theme.colors.inkSoft};
  font-weight: 600;

  input {
    border: 1px solid ${({ theme }) => theme.colors.line};
    border-radius: ${({ theme }) => theme.radius.md};
    background: ${({ theme }) => theme.colors.paper};
    color: ${({ theme }) => theme.colors.ink};
    padding: 0.85rem 0.9rem;
    font: inherit;
  }
`;

const SummaryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
  display: grid;
  gap: 0.8rem;
`;

const SummaryItem = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  span {
    color: ${({ theme }) => theme.colors.inkSoft};
  }

  strong {
    font-family: ${({ theme }) => theme.fonts.heading};
  }
`;

export default function Impact() {
  usePageTitle('Impacto');

  const [resourceInputs, setResourceInputs] = useState({
    familiasAfetadas: 0,
    familiasSemTransporte: 0,
    vagasAbrigo: 0,
    veiculosDisponiveis: 0,
  });

  useEffect(() => {
    let active = true;

    getScenario()
      .then((scenario) => {
        if (!active) return;

        const familias = scenario?.familias || [];
        const abrigos = scenario?.abrigos || [];
        const veiculos = scenario?.veiculos || [];

        setResourceInputs({
          familiasAfetadas: familias.length,
          familiasSemTransporte: familias.filter((familia) => !familia.possuiTransporte).length,
          vagasAbrigo: abrigos.reduce((total, abrigo) => total + Number(abrigo.capacidade || 0), 0),
          veiculosDisponiveis: veiculos.filter((veiculo) => veiculo.disponivel !== false).length,
        });
      })
      .catch(() => {
        if (!active) return;

        setResourceInputs({
          familiasAfetadas: 0,
          familiasSemTransporte: 0,
          vagasAbrigo: 0,
          veiculosDisponiveis: 0,
        });
      });

    return () => {
      active = false;
    };
  }, []);

  const summary = useMemo(() => {
    const totalFamilias = Number(resourceInputs.familiasAfetadas) || 0;
    const familiasSemTransporte = Number(resourceInputs.familiasSemTransporte) || 0;
    const familiasJaSeguras = Math.max(0, totalFamilias - familiasSemTransporte);
    const coberturaAntes = coverage(familiasJaSeguras, totalFamilias);
    const familiasSegurasDepois = Math.min(
      totalFamilias,
      familiasJaSeguras + Math.min(Math.max(0, totalFamilias - familiasJaSeguras), Number(resourceInputs.veiculosDisponiveis) || 0),
    );

    return {
      totalFamilias,
      familiasSemTransporte,
      totalVagas: Number(resourceInputs.vagasAbrigo) || 0,
      veiculosDisponiveis: Number(resourceInputs.veiculosDisponiveis) || 0,
      coberturaAntes,
      coberturaDepois: coverage(familiasSegurasDepois, totalFamilias),
      impacto: interventionImpact(familiasSegurasDepois, familiasJaSeguras),
    };
  }, [resourceInputs]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setResourceInputs((current) => ({
      ...current,
      [name]: Number(value) || 0,
    }));
  };

  return (
    <>
      <PageIntro
        eyebrow="Impacto"
        title="O que muda quando adicionamos recursos?"
        lead="Compare o antes e o depois: quantas famílias passam a ter uma alternativa segura."
      />

      <SectionWrap>
        <div className="container">
          <Grid>
            <Panel>
              <h2>Dashboard de impacto</h2>
              <p>Indicadores da evacuação com os recursos disponíveis em cada cenário.</p>

              <StatGrid>
                <StatCard>
                  <span className="label">Cobertura antes</span>
                  <p className="value">{summary.coberturaAntes}%</p>
                </StatCard>
                <StatCard>
                  <span className="label">Cobertura depois</span>
                  <p className="value">{summary.coberturaDepois}%</p>
                </StatCard>
                <StatCard>
                  <span className="label">Impacto</span>
                  <p className="value">+{summary.impacto}</p>
                </StatCard>
                <StatCard>
                  <span className="label">Famílias atendidas</span>
                  <p className="value">{summary.totalFamilias}</p>
                </StatCard>
              </StatGrid>

              <SummaryList>
                <SummaryItem>
                  <span>Famílias impactadas</span>
                  <strong>{summary.totalFamilias}</strong>
                </SummaryItem>
                <SummaryItem>
                  <span>Sem transporte</span>
                  <strong>{summary.familiasSemTransporte}</strong>
                </SummaryItem>
                <SummaryItem>
                  <span>Vagas em abrigos</span>
                  <strong>{summary.totalVagas}</strong>
                </SummaryItem>
                <SummaryItem>
                  <span>Veículos disponíveis</span>
                  <strong>{summary.veiculosDisponiveis}</strong>
                </SummaryItem>
              </SummaryList>
            </Panel>

            <Panel>
              <h2>Cadastro de recursos</h2>
              <p>Atualize os dados do cenário para simular diferentes combinações de apoio.</p>

              <Form>
                <Field>
                  Famílias afetadas
                  <input
                    type="number"
                    min="0"
                    name="familiasAfetadas"
                    value={resourceInputs.familiasAfetadas}
                    onChange={handleChange}
                  />
                </Field>

                <Field>
                  Famílias sem transporte
                  <input
                    type="number"
                    min="0"
                    name="familiasSemTransporte"
                    value={resourceInputs.familiasSemTransporte}
                    onChange={handleChange}
                  />
                </Field>

                <Field>
                  Vagas em abrigos
                  <input
                    type="number"
                    min="0"
                    name="vagasAbrigo"
                    value={resourceInputs.vagasAbrigo}
                    onChange={handleChange}
                  />
                </Field>

                <Field>
                  Veículos disponíveis
                  <input
                    type="number"
                    min="0"
                    name="veiculosDisponiveis"
                    value={resourceInputs.veiculosDisponiveis}
                    onChange={handleChange}
                  />
                </Field>

                <Button type="button" $variant="primary">
                  Atualizar cenário
                </Button>
              </Form>
            </Panel>
          </Grid>
        </div>
      </SectionWrap>
    </>
  );
}
