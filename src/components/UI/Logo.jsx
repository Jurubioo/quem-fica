import { useId } from 'react';
import styled, { useTheme } from 'styled-components';

const Wrap = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
`;

const Word = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  font-size: 1.5rem;
  letter-spacing: -0.02em;
  line-height: 1;
  white-space: nowrap;
  color: ${({ $light, theme }) => ($light ? theme.colors.onDark : theme.colors.ink)};

  b {
    font-weight: 700;
    color: ${({ $light, theme }) => ($light ? theme.brand.aqua : theme.brand.azulMare)};
  }
`;

// Símbolo: um "Q" de quem, com a casa, a janela âmbar (quem ainda fica)
// e a onda aqua. `light` = versão para fundo escuro.
export function Symbol({ size = 44, light = false }) {
  const theme = useTheme();
  const uid = useId().replace(/:/g, '');
  const clipId = `marca-clip-${uid}`;
  const estrutura = light ? theme.brand.nevoa : theme.brand.navy;

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={clipId}>
          <circle cx="29" cy="29" r="18.5" />
        </clipPath>
      </defs>
      {/* anel e cauda: o "Q" de quem */}
      <circle cx="29" cy="29" r="21" fill="none" stroke={estrutura} strokeWidth="5.5" />
      <line x1="44.5" y1="44.5" x2="55" y2="55" stroke={estrutura} strokeWidth="6" strokeLinecap="round" />
      {/* água, recortada pelo anel */}
      <path
        d="M4 40 C12 36 20 44 29 40 S46 36 56 40 V60 H4 Z"
        fill={theme.brand.aqua}
        clipPath={`url(#${clipId})`}
      />
      {/* casa */}
      <path d="M18 32 L29 22 L40 32 V42 H18 Z" fill={estrutura} />
      {/* janela acesa */}
      <rect x="26" y="31" width="6" height="6" rx="1" fill={theme.brand.ambar} />
    </svg>
  );
}

// Logotipo: símbolo + "quem fica?" em minúsculas (Poppins Bold).
export default function Logo({ light = false, size = 44 }) {
  return (
    <Wrap>
      <Symbol size={size} light={light} />
      <Word $light={light}>
        quem fica<b>?</b>
      </Word>
    </Wrap>
  );
}
