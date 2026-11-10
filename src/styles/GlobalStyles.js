import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    color-scheme: ${({ theme }) => (theme.name === 'alto-contraste' ? 'dark' : 'light')};
  }

  html {
    scroll-behavior: smooth;
    /* compensa o cabeçalho fixo ao pular para uma âncora (#como-funciona) */
    scroll-padding-top: 6rem;
  }

  body {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 1.125rem; /* 18px: base maior para facilitar a leitura */
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.ink};
    background: ${({ theme }) => theme.colors.paper};
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.015em;
    color: inherit;
  }

  p { max-width: 65ch; }

  a {
    color: ${({ theme }) => theme.colors.water};
    text-underline-offset: 0.2em;
    text-decoration-thickness: 2px;
  }

  /* Foco bem visível em qualquer fundo: anel escuro + halo azul-claro */
  :focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.ink};
    outline-offset: 2px;
    box-shadow: 0 0 0 5px ${({ theme }) => theme.colors.waterLight};
    border-radius: 6px;
  }

  /* O <main> recebe foco quando a página muda; não precisa de anel */
  #conteudo:focus,
  #conteudo:focus-visible {
    outline: none;
    box-shadow: none;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.waterLight};
    color: #14202B;
  }

  img, svg { max-width: 100%; }

  /* Quem pede menos movimento no sistema não vê animações */
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

export default GlobalStyles;
