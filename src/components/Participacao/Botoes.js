import styled from 'styled-components';
import { Button } from '../UI/Button';

// Botões extras do formulário. Estendem o Button do projeto (sem alterá-lo).

// Ação secundária: contorno, sem fundo.
export const BotaoContorno = styled(Button)`
  background: transparent;
  color: ${({ theme }) => theme.colors.water};
  border-color: ${({ theme }) => theme.colors.water};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
    color: ${({ theme }) => theme.colors.water};
    border-color: ${({ theme }) => theme.colors.water};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.inkSoft};
    border-color: ${({ theme }) => theme.colors.inkSoft};
    background: transparent;
    cursor: not-allowed;
  }
`;

// Ação que apaga dados: cor de risco do tema.
export const BotaoPerigo = styled(Button)`
  background: ${({ theme }) => theme.colors.risk};
  color: ${({ theme }) => theme.colors.onPrimary};
  border-color: ${({ theme }) => theme.colors.risk};

  &:hover {
    background: ${({ theme }) => theme.colors.risk};
    color: ${({ theme }) => theme.colors.onPrimary};
    border-color: ${({ theme }) => theme.colors.risk};
    opacity: 0.9;
  }
`;
