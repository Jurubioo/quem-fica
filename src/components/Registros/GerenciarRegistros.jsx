import { useState } from 'react';
import styled from 'styled-components';
import { BotaoContorno, BotaoPerigo } from '../Participacao/Botoes';

const Box = styled.section`
  margin-top: 2.5rem;
  max-width: 42rem;
  padding: 1.25rem 1.5rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};

  h3 { font-size: 1.1rem; margin: 0 0 0.5rem; }
  p { margin: 0 0 0.75rem; }
`;

const Status = styled.p`
  margin-top: 0.75rem;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

// Mostra quantos registros existem neste navegador e permite apagá-los
// (com confirmação). Sem servidor, esse é o controle que a pessoa tem.
export default function GerenciarRegistros({ titulo, loja }) {
  const [confirmando, setConfirmando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  // Lido a cada renderização: o componente já aparece antes do primeiro registro
  // ser salvo, e um estado guardado na montagem ficaria desatualizado.
  const registros = loja.listar();
  const quantidade = registros.length;

  function apagar() {
    loja.limpar();
    setConfirmando(false);
    setMensagem('Registros apagados deste navegador.');
  }

  return (
    <Box aria-labelledby="gerenciar-titulo">
      <h3 id="gerenciar-titulo">{titulo}</h3>
      <p>
        {quantidade === 0
          ? 'Nenhum registro guardado neste navegador.'
          : `${quantidade} registro${quantidade === 1 ? '' : 's'} guardado${quantidade === 1 ? '' : 's'} neste navegador.`}
      </p>

      {confirmando ? (
        <>
          <p role="alert">
            <strong>Apagar {quantidade === 1 ? 'o registro' : `os ${quantidade} registros`} deste navegador?</strong>{' '}
            Esta ação não pode ser desfeita.
          </p>
          <Actions>
            <BotaoPerigo type="button" onClick={apagar}>Confirmar e apagar</BotaoPerigo>
            <BotaoContorno type="button" onClick={() => setConfirmando(false)}>Cancelar</BotaoContorno>
          </Actions>
        </>
      ) : (
        <Actions>
          <BotaoContorno type="button" onClick={() => setConfirmando(true)} disabled={quantidade === 0}>
            Apagar deste navegador
          </BotaoContorno>
        </Actions>
      )}

      {mensagem && <Status role="status">{mensagem}</Status>}
    </Box>
  );
}
