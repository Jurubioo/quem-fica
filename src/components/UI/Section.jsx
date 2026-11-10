import styled from 'styled-components';

// Peças de texto reutilizáveis entre as páginas.

export const Section = styled.section`
  padding-block: clamp(3.5rem, 8vw, 6rem);
`;

export const Eyebrow = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 1rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: 1.05rem;
  color: ${({ $light, theme }) => ($light ? theme.colors.waterLight : theme.colors.water)};
`;

export const Title = styled.h2`
  font-size: clamp(1.9rem, 4vw, 2.5rem);
  margin: 0 0 1.25rem;
  max-width: 22ch;
`;

export const Lead = styled.p`
  font-size: clamp(1.15rem, 2vw, 1.3rem);
  color: ${({ theme }) => theme.colors.inkSoft};
  margin: 0 0 1.5rem;
`;
