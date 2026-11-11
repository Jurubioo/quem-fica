import styled, { useTheme } from 'styled-components';
import { getRegionState, STATUS_SYMBOLS } from '../../utils/scenario';
import { isShelterAvailable } from '../../utils/evacuationRules';

const Figure = styled.figure`
  margin: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};

  figcaption {
    padding: 0.85rem 1rem;
    font-size: 0.95rem;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const Scroll = styled.div`
  overflow-x: auto;

  &:focus-visible {
    outline-offset: -4px;
  }
`;

const Stage = styled.div`
  position: relative;
  min-width: 43rem;
  aspect-ratio: 900 / 560;

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const Marker = styled.button`
  position: absolute;
  left: ${({ $x }) => ($x / 900) * 100}%;
  top: ${({ $y }) => ($y / 560) * 100}%;
  transform: translate(-50%, -50%);
  min-width: 2.75rem;
  min-height: 2.75rem;
  padding: 0.1rem 0.35rem;
  border: ${({ $selected }) => $selected ? '3px' : '2px'} solid currentColor;
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme, $status }) => theme.colors[$status === 'pending' ? 'water' : $status]};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ $selected, theme }) => $selected
    ? `0 0 0 3px ${theme.colors.surface}, 0 0 0 5px ${theme.colors.ink}`
    : 'none'};
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }
`;

function MapRegion({ region, level, colors }) {
  const state = getRegionState(region, level);
  const isDry = state === 'seca';
  const isIsolated = state === 'isolada';
  let description = 'Região alagada';

  if (isDry) {
    description = 'Sem alagamento';
  } else if (isIsolated) {
    description = 'Alagada · acesso isolado';
  }

  return (
    <g>
      <rect
        x={region.x}
        y={region.y}
        width={region.largura}
        height={region.altura}
        rx="10"
        fill={isDry ? colors.surfaceAlt : colors.waterLight}
        fillOpacity={isDry ? 1 : 0.25}
        stroke={isIsolated ? colors.risk : colors.border}
        strokeWidth="2"
        strokeDasharray={isIsolated ? '8 5' : undefined}
      />
      <text x={region.x + 20} y={region.y + 30} fill={colors.ink} fontSize="19" fontWeight="700">
        {region.nome}
      </text>
      <text
        x={region.x + 20}
        y={region.y + 54}
        fill={isIsolated ? colors.risk : colors.inkSoft}
        fontSize="15"
      >
        {description}
      </text>
    </g>
  );
}

function MapShelter({ shelter, available, colors }) {
  return (
    <g transform={`translate(${shelter.x} ${shelter.y})`}>
      <title>{shelter.nome}: {available ? 'ativo' : 'indisponível'}</title>
      <path
        d="M-25 -14 L0 -32 L25 -14 V20 H-25 Z"
        fill={colors.surface}
        stroke={available ? colors.safe : colors.risk}
        strokeWidth="3"
      />
      <text textAnchor="middle" y="10" fontSize="17" fontWeight="700" fill={colors.ink}>
        {shelter.sigla}
      </text>
    </g>
  );
}

function MapVehicle({ vehicle, colors }) {
  return (
    <g transform={`translate(${vehicle.x} ${vehicle.y})`}>
      <title>{vehicle.nome}</title>
      <rect
        x="-23"
        y="-14"
        width="46"
        height="27"
        rx="5"
        fill={colors.surface}
        stroke={colors.inkSoft}
        strokeWidth="2"
      />
      <circle cx="-13" cy="15" r="4" fill={colors.inkSoft} />
      <circle cx="13" cy="15" r="4" fill={colors.inkSoft} />
      <text textAnchor="middle" y="6" fontSize="15" fill={colors.ink}>V{vehicle.id}</text>
    </g>
  );
}

export default function ScenarioMap({ scenario, level, familyItems, selectedId, onSelect }) {
  const { colors } = useTheme();
  const selectedItem = familyItems.find((item) => item.family.id === selectedId);
  const selectedFamily = selectedItem?.family;
  const shelterId = selectedItem?.situation.abrigoId;
  const destination = scenario.abrigos.find((shelter) => shelter.id === shelterId);

  return (
    <Figure>
      <Scroll
        tabIndex={0}
        role="group"
        aria-label="Mapa do bairro. Em telas pequenas, use as setas ou role na horizontal."
      >
        <Stage>
          <svg viewBox="0 0 900 560" aria-hidden="true" focusable="false">
            <rect width="900" height="560" fill={colors.paper} />
            <path
              d="M450 0 C410 150 490 260 450 390 S460 560 450 560"
              fill="none"
              stroke={colors.water}
              strokeWidth="24"
            />

            {scenario.regioes.map((region) => (
              <MapRegion key={region.id} region={region} level={level} colors={colors} />
            ))}

            <path d="M20 280 H880" stroke={colors.border} strokeWidth="18" />
            <path d="M20 280 H880" stroke={colors.surface} strokeWidth="2" strokeDasharray="12 8" />
            <text x="35" y="285" fontSize="14" fill={colors.ink}>
              Via principal · desenho esquemático
            </text>

            {selectedFamily && destination && (
              <path
                d={`M${selectedFamily.x} ${selectedFamily.y} L${destination.x} ${destination.y}`}
                fill="none"
                stroke={colors.safe}
                strokeWidth="3"
                strokeDasharray="8 6"
              />
            )}

            {scenario.abrigos.map((shelter) => (
              <MapShelter
                key={shelter.id}
                shelter={shelter}
                available={isShelterAvailable(shelter, level, scenario.regioes)}
                colors={colors}
              />
            ))}

            {scenario.veiculos.map((vehicle) => (
              <MapVehicle key={vehicle.id} vehicle={vehicle} colors={colors} />
            ))}
          </svg>

          {familyItems.map(({ family, situation }) => (
            <Marker
              key={family.id}
              type="button"
              $x={family.x}
              $y={family.y}
              $status={situation.status}
              $selected={selectedId === family.id}
              aria-label={`Família ${family.id}, ${family.nome}. ${situation.label}`}
              aria-pressed={selectedId === family.id}
              aria-controls="detalhes-familia"
              onClick={() => onSelect(family.id)}
            >
              {String(family.id).padStart(2, '0')}{' '}
              <span aria-hidden="true">{STATUS_SYMBOLS[situation.status]}</span>
            </Marker>
          ))}
        </Stage>
      </Scroll>
      <figcaption>
        Selecione uma família pelo número. A1–A3: abrigos · V1–V5: veículos.
        A linha tracejada indica o destino previsto, sem representar o trajeto real.
        Mapa fictício, sem escala geográfica. Em telas pequenas, role o mapa na horizontal.
      </figcaption>
    </Figure>
  );
}
