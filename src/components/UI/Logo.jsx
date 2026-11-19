import { useId } from 'react';
import styled, { useTheme } from 'styled-components';

// Logotipo do manual de identidade: símbolo + "quem fica?" (Poppins Bold).
// Proporções medidas na capa do manual, em relação ao tamanho do símbolo (--s):
// texto com 1,05 vez o símbolo e espaço de 0,33 entre os dois.
// Tamanho fixo em px, como uma marca: não cresce com o A+, para não empurrar o menu.
// Em telas pequenas, o logotipo diminui (70% e, abaixo de 380 px, 60%).

const Wrap = styled.span`
  --s: ${({ $size }) => $size}px;
  display: inline-flex;
  align-items: center;
  gap: calc(var(--s) * 0.33);

  @media (max-width: 575.98px) {
    --s: ${({ $size }) => $size * 0.7}px;
  }

  @media (max-width: 379.98px) {
    --s: ${({ $size }) => $size * 0.6}px;
  }
`;

const Word = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  font-size: calc(var(--s) * 1.05);
  letter-spacing: 0;
  line-height: 1;
  white-space: nowrap;
  position: relative;
  top: calc(var(--s) * 0.03);
  color: ${({ $light, theme }) => ($light ? theme.colors.onDark : theme.colors.ink)};

  b {
    font-weight: 700;
    color: ${({ $light, theme }) => ($light ? theme.brand.aqua : theme.brand.azulMare)};
  }
`;

const Svg = styled.svg`
  display: block;
  flex-shrink: 0;
  width: var(--s, ${({ $size }) => $size}px);
  height: var(--s, ${({ $size }) => $size}px);
`;

// Símbolo: o "Q" de quem (anel e cauda), a casa, a janela âmbar (quem ainda fica)
// e a água subindo. `light` = versão para fundo escuro.
export function Symbol({ size = 40, light = false }) {
  const theme = useTheme();
  const uid = useId().replace(/:/g, '');
  const clipId = `marca-clip-${uid}`;
  const estrutura = light ? theme.brand.nevoa : theme.brand.navy;

  return (
    <Svg $size={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={clipId}>
          <circle cx="32" cy="32" r="25.1" />
        </clipPath>
      </defs>
      <circle cx="32" cy="32" r="29" fill="none" stroke={estrutura} strokeWidth="6" />
      <line x1="51" y1="51" x2="57.6" y2="57.6" stroke={estrutura} strokeWidth="6.2" strokeLinecap="round" />
      <path d="M32 23 L45 36 V54 H19 V36 Z" fill={estrutura} clipPath={`url(#${clipId})`} />
      <rect x="28.4" y="30" width="7.2" height="7.4" rx="1.4" fill={theme.brand.ambar} />
      <path
        d="M5 37.4 C11 36.6 15 43.4 21.5 43.4 C28 43.4 32 37 38.8 36.6 C45 36.3 50 40 56 46 V64 H0 V37.4 Z"
        fill={theme.brand.aqua}
        clipPath={`url(#${clipId})`}
      />
    </Svg>
  );
}

export default function Logo({ light = false, size = 40 }) {
  // No alto contraste o fundo é escuro: usa a versão clara do manual.
  const theme = useTheme();
  const claro = light || theme.name === 'alto-contraste';

  return (
    <Wrap $size={size}>
      <Symbol size={size} light={claro} />
      <Word $light={claro}>
        quem fica<b>?</b>
      </Word>
    </Wrap>
  );
}
