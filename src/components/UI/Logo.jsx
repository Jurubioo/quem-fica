import { useId } from 'react';
import styled from 'styled-components';

const Wrap = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
`;

const Word = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  font-size: 1.45rem;
  letter-spacing: -0.03em;
  color: ${({ $light, theme }) => ($light ? theme.colors.onDark : theme.colors.ink)};

  b {
    color: ${({ $light, theme }) => ($light ? theme.colors.waterLight : theme.colors.water)};
    font-weight: 700;
  }
`;

// Marca: casa sobre a água. `light` = versão para fundo escuro.
export default function Logo({ light = false }) {
  const gradientId = useId(); // id único: o logo aparece no topo e no rodapé

  return (
    <Wrap>
      <svg width="44" height="44" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1B1A45" />
            <stop offset=".55" stopColor="#2A3378" />
            <stop offset="1" stopColor="#0E6F86" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill={`url(#${gradientId})`} />
        <path d="M16 33 32 19l16 14v13H16z" fill="#FBF7F0" />
        <path d="M27 46v-8h10v8" fill="#FFB547" />
        <path
          d="M8 50c4 0 4-3 8-3s4 3 8 3 4-3 8-3 4 3 8 3 4-3 8-3 4 3 8 3v6H8z"
          fill="#7FD3E0"
        />
      </svg>
      <Word $light={light}>
        Quem Fica<b>?</b>
      </Word>
    </Wrap>
  );
}
