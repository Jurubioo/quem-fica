import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes, useTheme } from 'styled-components';
import { Eyebrow, Lead, Section, Title } from '../../../components/UI/Section';
import {
  IconAlert,
  IconArrowRight,
  IconCheck,
  IconMinus,
  IconPlus,
} from '../../../components/Icons/Icons';

// Mini demonstração da página inicial: uma rua com 5 famílias fictícias.
// O usuário sobe o nível da água e vê quem consegue sair e quem depende de ajuda.

const LEVELS = [
  { label: 'Sem alagamento', waterY: 350 },
  { label: 'Rua alagada', waterY: 272 },
  { label: 'Água nas casas', waterY: 228 },
  { label: 'Enchente grave', waterY: 182 },
];

// altura = a partir de qual nível de água a casa é atingida
const FAMILIES = [
  {
    id: 1,
    x: 80,
    ground: 290,
    altura: 1,
    titulo: 'Idosa que mora sozinha',
    detalhe: '78 anos, usa andador e não tem carro.',
    precisaAjuda: true,
  },
  {
    id: 2,
    x: 220,
    ground: 290,
    altura: 1,
    titulo: 'Casal com carro',
    detalhe: 'Sai de carro assim que recebe o alerta.',
    precisaAjuda: false,
  },
  {
    id: 3,
    x: 410,
    ground: 250,
    altura: 2,
    titulo: 'Estudantes',
    detalhe: 'Dividem a casa e vão a pé até o abrigo.',
    precisaAjuda: false,
  },
  {
    id: 4,
    x: 540,
    ground: 250,
    altura: 2,
    titulo: 'Mãe e filho cadeirante',
    detalhe: 'Sem carro, precisam de transporte adaptado.',
    precisaAjuda: true,
  },
  {
    id: 5,
    x: 700,
    ground: 200,
    altura: 3,
    titulo: 'Família com três filhos',
    detalhe: 'Têm carro e saem juntos.',
    precisaAjuda: false,
  },
];

function getStatus(family, level) {
  if (level < family.altura) {
    return 'seco';
  }

  return family.precisaAjuda ? 'ajuda' : 'sai';
}

const STATUS_INFO = {
  seco: { label: 'Fora da água', tone: 'neutral' },
  sai: { label: 'Consegue sair', tone: 'safe' },
  ajuda: { label: 'Pode ficar para trás', tone: 'risk' },
};

// Onda do topo da água: sobe e desce a cada 75 unidades (período de 150)
const WAVE = `M-150 0 ${'q37.5 -9 75 0 t75 0 '.repeat(8)}V400 H-150 Z`;

const flow = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(150px);
  }
`;

const ping = keyframes`
  0%   { transform: scale(1); opacity: 0.7; }
  100% { transform: scale(1.7); opacity: 0; }
`;

const Stage = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.soft};
  overflow: hidden;
`;

const Scene = styled.svg`
  display: block;
  width: 100%;
  height: auto;

  .water {
    transition: transform 0.9s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .wave {
    animation: ${flow} 5s linear infinite;
  }
  .ping {
    transform-box: fill-box;
    transform-origin: center;
    animation: ${ping} 1.6s ease-out infinite;
  }
  .badge {
    transition: opacity 0.4s ease;
  }
`;

const Panel = styled.div`
  padding: clamp(1.25rem, 3vw, 2rem);
  border-top: 2px solid ${({ theme }) => theme.colors.line};
`;

const LevelLabel = styled.label`
  display: block;
  font-size: 1.15rem;
  margin-bottom: 0.75rem;

  strong {
    font-family: ${({ theme }) => theme.fonts.heading};
    color: ${({ theme }) => theme.colors.water};
  }
`;

const SliderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
`;

const RoundButton = styled.button`
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.ink};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.ink};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }
  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`;

const Range = styled.input`
  flex: 1;
  min-width: 0;
  appearance: none;
  height: 0.9rem;
  border-radius: 999px;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.water} 0 var(--fill),
    ${({ theme }) => theme.colors.line} var(--fill) 100%
  );
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 2.1rem;
    height: 2.1rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.surface};
    border: 5px solid ${({ theme }) => theme.colors.water};
  }
  &::-moz-range-thumb {
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.surface};
    border: 5px solid ${({ theme }) => theme.colors.water};
  }
`;

const Ticks = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.6rem 4.1rem 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.inkSoft};

  @media (max-width: 575px) {
    display: none;
  }
`;

const Summary = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const Chip = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  padding: 0.6rem 1rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ $tone, theme }) => theme.colors[`${$tone}Bg`]};
  color: ${({ $tone, theme }) => theme.colors[$tone]};
  border: 1.5px solid currentColor;
  font-weight: 700;

  b {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.35rem;
    line-height: 1;
  }
`;

const FamilyList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 0;
  display: grid;
  gap: 0.85rem;
  grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
`;

const FamilyCard = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1.1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 2px solid ${({ $tone, theme }) => ($tone === 'neutral' ? theme.colors.line : theme.colors[$tone])};
  background: ${({ theme }) => theme.colors.surface};
  transition: border-color 0.4s ease;

  h3 {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 1.1rem;
    margin: 0;
  }

  .num {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.deep};
    color: #fff;
    font-size: 1rem;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.inkSoft};
    font-size: 1rem;
    line-height: 1.45;
  }
`;

const Status = styled.span`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: auto;
  padding: 0.3rem 0.75rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ $tone, theme }) => theme.colors[`${$tone}Bg`]};
  color: ${({ $tone, theme }) => theme.colors[$tone]};
  font-weight: 700;
  font-size: 0.95rem;
`;

const Closing = styled.p`
  margin: 2rem 0 0;
  font-size: 1.15rem;

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-weight: 700;
  }
`;

function House({ family, colors }) {
  const { x, ground, id } = family;

  return (
    <g transform={`translate(${x} ${ground})`}>
      <rect x="-34" y="-50" width="68" height="50" rx="3" fill={colors.surface} stroke={colors.ink} strokeWidth="2.5" />
      <path d="M-42 -50 L0 -84 L42 -50 Z" fill={colors.deep} stroke={colors.ink} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="-9" y="-28" width="18" height="28" fill={colors.sun} stroke={colors.ink} strokeWidth="2" />
      <text x="0" y="-60" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff" fontFamily="Lexend, sans-serif">
        {id}
      </text>
    </g>
  );
}

// Selo acima do telhado (desenhado por cima da água): ✓ sai / ! precisa de ajuda
function Badge({ family, colors }) {
  const { x, ground, status } = family;
  const visible = status !== 'seco';
  const color = status === 'ajuda' ? colors.risk : colors.safe;

  return (
    <g className="badge" transform={`translate(${x} ${ground - 112})`} opacity={visible ? 1 : 0}>
      {status === 'ajuda' && <circle className="ping" r="20" fill="none" stroke={colors.risk} strokeWidth="3" />}
      <circle r="18" fill={color} stroke={colors.paper} strokeWidth="3" />
      {status === 'ajuda' ? (
        <path d="M0 -8 V2 M0 8 V8.5" stroke={colors.paper} strokeWidth="4" strokeLinecap="round" />
      ) : (
        <path d="M-7 0 L-2 5 L7 -5" stroke={colors.paper} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </g>
  );
}

export default function StreetDemo() {
  const theme = useTheme();
  const { colors, scene } = theme;
  const [level, setLevel] = useState(1);

  const families = FAMILIES.map((family) => ({
    ...family,
    status: getStatus(family, level),
  }));
  const affectedCount = families.filter((family) => family.status !== 'seco').length;
  const independentCount = families.filter((family) => family.status === 'sai').length;
  const needsHelpCount = families.filter((family) => family.status === 'ajuda').length;

  const fill = `${(level / (LEVELS.length - 1)) * 100}%`;

  function decreaseLevel() {
    setLevel((currentLevel) => Math.max(currentLevel - 1, 0));
  }

  function increaseLevel() {
    setLevel((currentLevel) => Math.min(currentLevel + 1, LEVELS.length - 1));
  }

  function handleLevelChange(event) {
    setLevel(Number(event.target.value));
  }

  return (
    <Section aria-labelledby="demo-titulo" style={{ background: theme.gradients.sky }}>
      <div className="container">
        <Eyebrow>Experimente</Eyebrow>
        <Title id="demo-titulo">Uma rua, cinco famílias.</Title>
        <Lead>Suba o nível da água e veja quem consegue sair sozinho e quem depende de ajuda.</Lead>

        <Stage>
          <Scene
            viewBox="0 0 900 340"
            role="img"
            aria-label={`Ilustração de uma rua com 5 casas e um abrigo no alto. Nível da água: ${LEVELS[level].label}. ${affectedCount} de 5 casas atingidas.`}
          >
            <defs>
              <linearGradient id="demo-ceu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={scene.skyTop} />
                <stop offset="1" stopColor={scene.skyBottom} />
              </linearGradient>
            </defs>

            <rect width="900" height="340" fill="url(#demo-ceu)" />

            {/* abrigo no ponto mais alto */}
            <g transform="translate(856 160)">
              <rect x="-36" y="-56" width="72" height="56" rx="4" fill={colors.safeBg} stroke={colors.safe} strokeWidth="3" />
              <path d="M-44 -56 L0 -88 L44 -56 Z" fill={colors.safe} />
              <path d="M0 -44 V-16 M-14 -30 H14" stroke={colors.safe} strokeWidth="6" strokeLinecap="round" />
              <text x="0" y="22" textAnchor="middle" fontSize="17" fontWeight="700" fill={colors.ink} fontFamily="Lexend, sans-serif">
                Abrigo
              </text>
            </g>

            {families.map((family) => (
              <House key={family.id} family={family} colors={colors} />
            ))}

            {/* água: o grupo inteiro desce/sobe conforme o nível */}
            <g className="water" style={{ transform: `translateY(${LEVELS[level].waterY}px)` }}>
              <path
                className="wave"
                d={WAVE}
                fill={scene.water}
                fillOpacity={scene.waterOpacity}
                stroke={scene.waterStroke}
                strokeWidth="3"
              />
            </g>

            {/* terreno: mais baixo à esquerda, mais alto à direita.
                Desenhado depois da água para "esconder" a água abaixo do chão. */}
            <path
              d="M0 290 H330 C350 290 352 250 372 250 H610 C630 250 632 200 652 200 H770 C790 200 792 160 812 160 H900 V340 H0 Z"
              fill={scene.ground}
              stroke={scene.groundStroke}
              strokeWidth="3"
            />

            {families.map((family) => (
              <Badge key={family.id} family={family} colors={colors} />
            ))}
          </Scene>

          <Panel>
            <div className="row g-4 align-items-center">
              <div className="col-12 col-lg-7">
                <LevelLabel htmlFor="nivel-agua">
                  Nível da água: <strong>{LEVELS[level].label}</strong>
                </LevelLabel>
                <SliderRow>
                  <RoundButton
                    type="button"
                    onClick={decreaseLevel}
                    disabled={level === 0}
                    aria-label="Baixar o nível da água"
                  >
                    <IconMinus size={26} />
                  </RoundButton>
                  <Range
                    id="nivel-agua"
                    type="range"
                    min="0"
                    max={LEVELS.length - 1}
                    step="1"
                    value={level}
                    onChange={handleLevelChange}
                    aria-valuetext={LEVELS[level].label}
                    style={{ '--fill': fill }}
                  />
                  <RoundButton
                    type="button"
                    onClick={increaseLevel}
                    disabled={level === LEVELS.length - 1}
                    aria-label="Subir o nível da água"
                  >
                    <IconPlus size={26} />
                  </RoundButton>
                </SliderRow>
                <Ticks aria-hidden="true">
                  <span>Seco</span>
                  <span>Rua</span>
                  <span>Casas</span>
                  <span>Grave</span>
                </Ticks>
              </div>

              <div className="col-12 col-lg-5">
                <Summary aria-live="polite" aria-atomic="true">
                  <Chip $tone="neutral">
                    <b>{affectedCount}</b> de 5 atingidas
                  </Chip>
                  <Chip $tone="safe">
                    <IconCheck size={20} />
                    <b>{independentCount}</b> saem sozinhas
                  </Chip>
                  <Chip $tone="risk">
                    <IconAlert size={20} />
                    <b>{needsHelpCount}</b> precisam de ajuda
                  </Chip>
                </Summary>
              </div>
            </div>
          </Panel>
        </Stage>

        <FamilyList aria-label="Situação de cada família">
          {families.map((family) => {
            const info = STATUS_INFO[family.status];
            return (
              <FamilyCard key={family.id} $tone={info.tone}>
                <h3>
                  <span className="num" aria-hidden="true">
                    {family.id}
                  </span>
                  <span>
                    <span className="visually-hidden">Casa {family.id}: </span>
                    {family.titulo}
                  </span>
                </h3>
                <p>{family.detalhe}</p>
                <Status $tone={info.tone}>
                  {family.status === 'sai' && <IconCheck size={16} />}
                  {family.status === 'ajuda' && <IconAlert size={16} />}
                  {info.label}
                </Status>
              </FamilyCard>
            );
          })}
        </FamilyList>

        <Closing>
          Na simulação completa, o Quem Fica? faz essa conta para um bairro inteiro.{' '}
          <Link to="/simulacao">
            Abrir a simulação
            <IconArrowRight size={20} />
          </Link>
        </Closing>
      </div>
    </Section>
  );
}
