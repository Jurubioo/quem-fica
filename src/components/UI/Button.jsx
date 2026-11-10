import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

// Botões do projeto. Use:
//   <ButtonLink to="/simulacao">Texto</ButtonLink>            -> navegação interna
//   <ButtonLink as="a" href="#secao" $variant="light">...      -> âncora na mesma página
//   <Button type="submit">Enviar</Button>                       -> formulários
// Variantes: primary (azul, padrão), light (contorno para fundo escuro), dark.

const variants = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.onPrimary};
    border-color: ${({ theme }) => theme.colors.primary};

    &:hover {
      background: ${({ theme }) => theme.colors.primaryHover};
      border-color: ${({ theme }) => theme.colors.primaryHover};
      color: ${({ theme }) => theme.colors.onPrimary};
    }
  `,
  light: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.onDark};
    border-color: rgba(255, 255, 255, 0.6);

    &:hover {
      background: rgba(255, 255, 255, 0.12);
      border-color: #fff;
      color: ${({ theme }) => theme.colors.onDark};
    }
  `,
  dark: css`
    background: ${({ theme }) => theme.colors.ink};
    color: ${({ theme }) => theme.colors.paper};
    border-color: ${({ theme }) => theme.colors.ink};

    &:hover {
      color: ${({ theme }) => theme.colors.paper};
      opacity: 0.9;
    }
  `,
};

const buttonStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  min-height: 3.25rem;
  padding: 0 1.5rem;
  border: 2px solid transparent;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: 1.1rem;
  line-height: 1.2;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s ease;

  svg {
    flex-shrink: 0;
  }

  &:hover {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }

  ${({ $variant = 'primary' }) => variants[$variant]}
`;

export const ButtonLink = styled(Link)`
  ${buttonStyle}
`;

export const Button = styled.button`
  ${buttonStyle}
`;
