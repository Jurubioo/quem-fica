import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import usePageTitle from '../../hooks/usePageTitle';
import PageIntro from '../../components/UI/PageIntro';
import { Button } from '../../components/UI/Button';
import { getScenario } from '../../services/scenarioService';
import { coverage, interventionImpact } from '../../utils/calculations';

const SectionWrap = styled.section`
  padding-block: clamp(2.5rem, 7vw, 4rem);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
  gap: 1.5rem;

  @media (max-width: 992px) {
    grid-template-columns: minmax(0, 1fr);
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

const Field = styled.div`
  display: grid;
  gap: 0.45rem;

  label {
    color: ${({ theme }) => theme.colors.inkSoft};
    font-weight: 600;
  }

  input {
    width: 100%;
    min-width: 0;
    border: 1px solid ${({ theme }) => theme.colors.line};
    border-radius: ${({ theme }) => theme.radius.md};
    background: ${({ theme }) => theme.colors.paper};
    color: ${({ theme }) => theme.colors.ink};
    padding: 0.85rem 0.9rem;
    font: inherit;
  }

  input[aria-invalid='true'] {
    border: 2px solid ${({ theme }) => theme.colors.risk};
  }
`;

const FieldError = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.risk};
  font-size: 0.95rem;
  font-weight: 600;
`;

const Feedback = styled.p`
  margin: 0;
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  border-left: 4px solid transparent;
  background: ${({ theme, $tone }) => theme.colors[`${$tone}Bg`]};
  border-left-color: ${({ theme, $tone }) => theme.colors[$tone]};
  color: ${({ theme }) => theme.colors.ink};
  font-weight: 600;
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

// Campos do cadastro de recursos: nome, rótulo e limite máximo aceito.
const CAMPOS = [
  { name: 'familiasAfetadas', label: 'Famílias afetadas', max: 1000 },
  { name: 'familiasSemTransporte', label: 'Famílias sem transporte', max: 1000 },
  { name: 'vagasAbrigo', label: 'Vagas disponíveis em abrigos', max: 10000 },
  { name: 'veiculosDisponiveis', label: 'Veículos disponíveis', max: 1000 },
];

const VAZIO = { familiasAfetadas: 0, familiasSemTransporte: 0, vagasAbrigo: 0, veiculosDisponiveis: 0 };

// Aceita só números inteiros de 0 até o máximo do campo.
function validar(valores) {
  const erros = {};
  for (const campo of CAMPOS) {
    const texto = String(valores[campo.name]).trim();
    const numero = Number(texto);
    if (texto === '') {
      erros[campo.name] = 'Preencha este campo.';
    } else if (!Number.isInteger(numero) || numero < 0) {
      erros[campo.name] = 'Use um número inteiro igual ou maior que zero.';
    } else if (numero > campo.max) {
      erros[campo.name] = `Use no máximo ${campo.max}.`;
    }
  }
  if (!erros.familiasAfetadas && !erros.familiasSemTransporte
    && Number(valores.familiasSemTransporte) > Number(valores.familiasAfetadas)) {
    erros.familiasSemTransporte = 'Não pode ser maior que o número de famílias afetadas.';
  }
  return erros;
}

export default function Impact() {
  usePageTitle('Impacto');

  // `rascunho` = o que está nos campos; `aplicado` = o que os indicadores usam.
  // Os indicadores só mudam ao clicar em "Atualizar cenário".
  const [rascunho, setRascunho] = useState(VAZIO);
  const [aplicado, setAplicado] = useState(VAZIO);
  const [original, setOriginal] = useState(VAZIO);
  const [erros, setErros] = useState({});
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    let active = true;

    getScenario()
      .then((scenario) => {
        if (!active) return;

        const familias = scenario?.familias || [];
        const abrigos = scenario?.abrigos || [];
        const veiculos = scenario?.veiculos || [];

        const dados = {
          familiasAfetadas: familias.length,
          familiasSemTransporte: familias.filter((familia) => !familia.possuiTransporte).length,
          // Vagas que os abrigos ainda podem receber (não a capacidade total).
          vagasAbrigo: abrigos.reduce((total, abrigo) => total + Number(abrigo.vagasDisponiveis ?? abrigo.capacidade ?? 0), 0),
          veiculosDisponiveis: veiculos.filter((veiculo) => veiculo.disponivel !== false).length,
        };
        setOriginal(dados);
        setRascunho(dados);
        setAplicado(dados);
      })
      .catch(() => {
        if (!active) return;
        setMensagem('Não foi possível carregar o cenário. Preencha os campos para simular.');
      });

    return () => {
      active = false;
    };
  }, []);

  const summary = useMemo(() => {
    const totalFamilias = aplicado.familiasAfetadas;
    const familiasSemTransporte = aplicado.familiasSemTransporte;
    const familiasJaSeguras = Math.max(0, totalFamilias - familiasSemTransporte);
    const coberturaAntes = coverage(familiasJaSeguras, totalFamilias);
    const familiasSegurasDepois = Math.min(
      totalFamilias,
      familiasJaSeguras + Math.min(Math.max(0, totalFamilias - familiasJaSeguras), aplicado.veiculosDisponiveis),
    );

    return {
      totalFamilias,
      familiasSemTransporte,
      familiasSegurasDepois,
      totalVagas: aplicado.vagasAbrigo,
      veiculosDisponiveis: aplicado.veiculosDisponiveis,
      coberturaAntes,
      coberturaDepois: coverage(familiasSegurasDepois, totalFamilias),
      impacto: interventionImpact(familiasSegurasDepois, familiasJaSeguras),
    };
  }, [aplicado]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRascunho((current) => ({ ...current, [name]: value }));
    setMensagem('');
    // Depois da primeira tentativa, o erro do campo some assim que ele fica certo.
    if (erros[name]) {
      setErros(validar({ ...rascunho, [name]: value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const novosErros = validar(rascunho);
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) {
      setMensagem('');
      const primeiro = CAMPOS.find((campo) => novosErros[campo.name]);
      document.getElementById(`impacto-${primeiro.name}`)?.focus();
      return;
    }
    const numeros = Object.fromEntries(CAMPOS.map((campo) => [campo.name, Number(String(rascunho[campo.name]).trim())]));
    setAplicado(numeros);
    setRascunho(numeros);
    setMensagem('Cenário atualizado. Os indicadores ao lado já usam os novos valores.');
  };

  const restaurar = () => {
    setRascunho(original);
    setAplicado(original);
    setErros({});
    setMensagem('Valores do cenário original restaurados.');
  };

  const sinal = (valor) => (valor > 0 ? `+${valor}` : String(valor));

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
                  <p className="value">{sinal(summary.impacto)}</p>
                </StatCard>
                <StatCard>
                  <span className="label">Famílias atendidas</span>
                  <p className="value">{summary.familiasSegurasDepois}</p>
                </StatCard>
              </StatGrid>

              <SummaryList>
                <SummaryItem>
                  <span>Famílias afetadas</span>
                  <strong>{summary.totalFamilias}</strong>
                </SummaryItem>
                <SummaryItem>
                  <span>Sem transporte</span>
                  <strong>{summary.familiasSemTransporte}</strong>
                </SummaryItem>
                <SummaryItem>
                  <span>Vagas disponíveis em abrigos</span>
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

              <Form noValidate onSubmit={handleSubmit}>
                {CAMPOS.map((campo) => {
                  const id = `impacto-${campo.name}`;
                  const erro = erros[campo.name];
                  return (
                    <Field key={campo.name}>
                      <label htmlFor={id}>{campo.label}</label>
                      <input
                        id={id}
                        type="number"
                        inputMode="numeric"
                        min="0"
                        max={campo.max}
                        step="1"
                        name={campo.name}
                        value={rascunho[campo.name]}
                        onChange={handleChange}
                        aria-invalid={erro ? 'true' : 'false'}
                        aria-describedby={erro ? `${id}-erro` : undefined}
                      />
                      {erro && <FieldError id={`${id}-erro`}>{erro}</FieldError>}
                    </Field>
                  );
                })}

                <Button type="submit" $variant="primary">
                  Atualizar cenário
                </Button>
                <Button type="button" $variant="dark" onClick={restaurar}>
                  Restaurar valores do cenário
                </Button>

                <div role="status" aria-live="polite">
                  {mensagem && <Feedback $tone="safe">{mensagem}</Feedback>}
                </div>
              </Form>
            </Panel>
          </Grid>
        </div>
      </SectionWrap>
    </>
  );
}
