import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Button } from '../UI/Button';
import { TIPOS_PARTICIPACAO, INTERESSES, validarParticipacao, montarRegistro } from '../../utils/participacao';
import { participacoes } from '../../services/participacaoService';

const CAMPOS_ORDEM = ['nome', 'email', 'tipo', 'municipio', 'familiasApoio', 'mensagem', 'consentimento'];

const VALORES_INICIAIS = {
  nome: '',
  email: '',
  tipo: '',
  municipio: '',
  familiasApoio: '',
  interesses: [],
  mensagem: '',
  consentimento: false,
};

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
  max-width: 40rem;
`;

const Fieldset = styled.fieldset`
  margin: 0;
  padding: 0;
  border: 0;
  min-width: 0;
  display: grid;
  gap: 1rem;
`;

const Legend = styled.legend`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: 1.1rem;
  padding: 0;
  margin-bottom: 0.75rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.35rem;
`;

const Field = styled.div`
  display: grid;
  gap: 0.35rem;
`;

const Input = styled.input`
  width: 100%;
  max-width: ${({ $narrow }) => ($narrow ? '10rem' : 'none')};
  min-height: 2.8rem;
  padding: 0.5rem 0.75rem;
  font: inherit;
  color: ${({ theme }) => theme.colors.ink};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme, $invalid }) => ($invalid ? theme.colors.risk : theme.colors.inkSoft)};
  border-radius: ${({ theme }) => theme.radius.sm};

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.water};
    outline-offset: 2px;
  }
`;

const Select = styled(Input).attrs({ as: 'select' })``;

// Texto "(opcional)" ao lado do rótulo.
const Opcional = styled.span`
  font-weight: 400;
`;

const CheckList = styled.div`
  display: grid;
  gap: 0.6rem;
  margin-top: 0.5rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 7rem;
  padding: 0.5rem 0.75rem;
  font: inherit;
  color: ${({ theme }) => theme.colors.ink};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme, $invalid }) => ($invalid ? theme.colors.risk : theme.colors.inkSoft)};
  border-radius: ${({ theme }) => theme.radius.sm};
  resize: vertical;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.water};
    outline-offset: 2px;
  }
`;

const Check = styled.label`
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
  font-weight: 400;
  cursor: pointer;

  input {
    width: 1.25rem;
    height: 1.25rem;
    margin-top: 0.15rem;
    accent-color: ${({ theme }) => theme.colors.water};
    flex-shrink: 0;
  }
`;

const Hint = styled.p`
  margin: 0;
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.inkSoft};
`;

const FieldError = styled.p`
  margin: 0;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.risk};
`;

const Summary = styled.div`
  padding: 1rem 1.25rem;
  background: ${({ theme }) => theme.colors.riskBg};
  border-left: 4px solid ${({ theme }) => theme.colors.risk};
  border-radius: ${({ theme }) => theme.radius.sm};

  p { margin: 0 0 0.5rem; }
  ul { margin: 0; padding-left: 1.25rem; }
  a { color: ${({ theme }) => theme.colors.ink}; font-weight: 600; }
`;

export default function ParticipacaoForm({ onSaved }) {
  const { register, handleSubmit, watch, reset, setFocus, formState: { submitCount } } = useForm({
    defaultValues: VALORES_INICIAIS,
  });

  // Depois da primeira tentativa, os erros acompanham o que a pessoa digita.
  const valores = watch();
  const erros = submitCount > 0 ? validarParticipacao(valores) : {};
  const listaErros = CAMPOS_ORDEM.filter((campo) => erros[campo]).map((campo) => [campo, erros[campo]]);

  function focar(campo) {
    setFocus(campo);
  }

  // O react-hook-form só roda regras registradas nos campos. Aqui as regras são
  // as de validarParticipacao, então o envio confere essas regras antes de salvar.
  function onSubmit(dados) {
    const errosEnvio = validarParticipacao(dados);
    const primeiro = CAMPOS_ORDEM.find((campo) => errosEnvio[campo]);

    if (primeiro) {
      focar(primeiro);
      return;
    }

    participacoes.salvar(montarRegistro(dados));
    reset(VALORES_INICIAIS);
    onSaved();
  }

  const descreve = (campo, dica) =>
    [dica ? `dica-${campo}` : null, erros[campo] ? `erro-${campo}` : null].filter(Boolean).join(' ') || undefined;

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)} aria-label="Formulário de participação">
      {listaErros.length > 0 && (
        <Summary role="alert" id="resumo-erros">
          <p><strong>Corrija {listaErros.length === 1 ? 'o campo destacado' : `os ${listaErros.length} campos destacados`} antes de enviar:</strong></p>
          <ul>
            {listaErros.map(([campo, mensagem]) => (
              <li key={campo}>
                <a href={`#campo-${campo}`} onClick={(e) => { e.preventDefault(); focar(campo); }}>{mensagem}</a>
              </li>
            ))}
          </ul>
        </Summary>
      )}

      <Fieldset>
        <Legend>Sobre você</Legend>

        <Field>
          <Label htmlFor="campo-nome">Nome completo</Label>
          <Input
            id="campo-nome"
            type="text"
            autoComplete="name"
            $invalid={Boolean(erros.nome)}
            aria-invalid={Boolean(erros.nome)}
            aria-describedby={descreve('nome')}
            {...register('nome')}
          />
          {erros.nome && <FieldError id="erro-nome">{erros.nome}</FieldError>}
        </Field>

        <Field>
          <Label htmlFor="campo-email">E-mail</Label>
          <Input
            id="campo-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            $invalid={Boolean(erros.email)}
            aria-invalid={Boolean(erros.email)}
            aria-describedby={descreve('email')}
            {...register('email')}
          />
          {erros.email && <FieldError id="erro-email">{erros.email}</FieldError>}
        </Field>

        <Field>
          <Label htmlFor="campo-municipio">Bairro ou município <Opcional>(opcional)</Opcional></Label>
          <Input
            id="campo-municipio"
            type="text"
            aria-invalid={Boolean(erros.municipio)}
            aria-describedby={descreve('municipio')}
            {...register('municipio')}
          />
          {erros.municipio && <FieldError id="erro-municipio">{erros.municipio}</FieldError>}
        </Field>
      </Fieldset>

      <Fieldset>
        <Legend>Como você quer participar</Legend>

        <Field>
          <Label htmlFor="campo-tipo">Papel</Label>
          <Select
            id="campo-tipo"
            $invalid={Boolean(erros.tipo)}
            aria-invalid={Boolean(erros.tipo)}
            aria-describedby={descreve('tipo')}
            {...register('tipo')}
          >
            <option value="">Escolha uma opção</option>
            {TIPOS_PARTICIPACAO.map((tipo) => (
              <option key={tipo.valor} value={tipo.valor}>{tipo.rotulo}</option>
            ))}
          </Select>
          {erros.tipo && <FieldError id="erro-tipo">{erros.tipo}</FieldError>}
        </Field>

        <div role="group" aria-labelledby="titulo-interesses">
          <Label as="span" id="titulo-interesses">Interesses <Opcional>(opcional)</Opcional></Label>
          <CheckList>
            {INTERESSES.map((item) => (
              <Check key={item.valor}>
                <input type="checkbox" value={item.valor} {...register('interesses')} />
                <span>{item.rotulo}</span>
              </Check>
            ))}
          </CheckList>
        </div>

        <Field>
          <Label htmlFor="campo-familiasApoio">
            Quantas famílias da sua região você acha que precisam de apoio na evacuação? <Opcional>(opcional)</Opcional>
          </Label>
          <Input
            id="campo-familiasApoio"
            type="number"
            inputMode="numeric"
            min="0"
            max="9999"
            step="1"
            $invalid={Boolean(erros.familiasApoio)}
            aria-invalid={Boolean(erros.familiasApoio)}
            aria-describedby={descreve('familiasApoio', true)}
            {...register('familiasApoio')}
            $narrow
          />
          <Hint id="dica-familiasApoio">Use uma estimativa. Não é necessário informar dados pessoais de ninguém.</Hint>
          {erros.familiasApoio && <FieldError id="erro-familiasApoio">{erros.familiasApoio}</FieldError>}
        </Field>

        <Field>
          <Label htmlFor="campo-mensagem">Mensagem <Opcional>(opcional)</Opcional></Label>
          <Textarea
            id="campo-mensagem"
            maxLength={600}
            $invalid={Boolean(erros.mensagem)}
            aria-invalid={Boolean(erros.mensagem)}
            aria-describedby={descreve('mensagem', true)}
            {...register('mensagem')}
          />
          <Hint id="dica-mensagem">{(valores.mensagem || '').length} de 500 caracteres.</Hint>
          {erros.mensagem && <FieldError id="erro-mensagem">{erros.mensagem}</FieldError>}
        </Field>
      </Fieldset>

      <Fieldset>
        <Legend>Consentimento</Legend>
        <Check>
          <input
            id="campo-consentimento"
            type="checkbox"
            aria-invalid={Boolean(erros.consentimento)}
            aria-describedby={descreve('consentimento')}
            {...register('consentimento')}
          />
          <span>Entendo que, nesta versão, meus dados ficam guardados somente neste navegador e não são enviados à equipe.</span>
        </Check>
        {erros.consentimento && <FieldError id="erro-consentimento">{erros.consentimento}</FieldError>}
      </Fieldset>

      <div>
        <Button type="submit">Enviar participação</Button>
      </div>
    </Form>
  );
}
