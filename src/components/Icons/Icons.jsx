// Ícones em SVG feitos à mão (sem biblioteca extra).
// Por padrão são decorativos (aria-hidden). Se o ícone for a única
// informação, passe `title="..."` para que leitores de tela o anunciem.

function Svg({ children, size = 24, title, strokeWidth = 2, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      {...rest}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
}

export const IconHome = (props) => (
  <Svg {...props}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
    <path d="M10 21v-6h4v6" />
  </Svg>
);

export const IconMap = (props) => (
  <Svg {...props}>
    <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" />
    <path d="M9 4v14M15 6v14" />
  </Svg>
);

export const IconChart = (props) => (
  <Svg {...props}>
    <path d="M3 21h18" />
    <path d="M6 17v-5M11 17V7M16 17v-8M21 17V4" />
  </Svg>
);

export const IconUsers = (props) => (
  <Svg {...props}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5" />
    <circle cx="17" cy="9" r="2.5" />
    <path d="M17 14.5c2.3 0 4 1.5 4.5 4" />
  </Svg>
);

export const IconArrowRight = (props) => (
  <Svg {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);

export const IconMenu = (props) => (
  <Svg {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);

export const IconClose = (props) => (
  <Svg {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);

export const IconContrast = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
  </Svg>
);

export const IconCheck = (props) => (
  <Svg {...props}>
    <path d="M5 12.5 10 17l9-10" />
  </Svg>
);

export const IconAlert = (props) => (
  <Svg {...props}>
    <path d="M12 3 2 20h20L12 3z" />
    <path d="M12 10v4M12 17h.01" />
  </Svg>
);

export const IconMinus = (props) => (
  <Svg {...props}>
    <path d="M5 12h14" />
  </Svg>
);

export const IconPlus = (props) => (
  <Svg {...props}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

export const IconWave = (props) => (
  <Svg {...props}>
    <path d="M2 9c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2" />
    <path d="M2 15c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2" />
  </Svg>
);

export const IconShelter = (props) => (
  <Svg {...props}>
    <path d="M3 11 12 4l9 7" />
    <path d="M5 9.5V20h14V9.5" />
    <path d="M12 11v6M9 14h6" />
  </Svg>
);

export const IconSearchPerson = (props) => (
  <Svg {...props}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m20 20-4.8-4.8" />
    <circle cx="10.5" cy="8.8" r="1.8" />
    <path d="M7.5 13.5c.6-1.4 1.7-2.1 3-2.1s2.4.7 3 2.1" />
  </Svg>
);

export const IconElderly = (props) => (
  <Svg {...props}>
    <circle cx="10" cy="4.5" r="2" />
    <path d="M10 8v6l-2.5 7M10 14l2.5 7" />
    <path d="M10 9.5 7 13M10 9.5l4 2.5" />
    <path d="M16 12v9" />
  </Svg>
);

export const IconWheelchair = (props) => (
  <Svg {...props}>
    <circle cx="10" cy="4" r="1.8" />
    <path d="M10 7v6h5.5l2 5.5" />
    <path d="M10 9.5h4.5" />
    <path d="M7 11.2a5 5 0 1 0 7 6.3" />
  </Svg>
);

export const IconWalker = (props) => (
  <Svg {...props}>
    <circle cx="8" cy="4.5" r="2" />
    <path d="M8 8v6l-2 7M8 14l2.5 7" />
    <path d="M8 10l5 1" />
    <path d="M13 9h5v12M13 9v12" />
  </Svg>
);

export const IconNoCar = (props) => (
  <Svg {...props}>
    <path d="M5 16v-5l2-5h10l2 5v5H5z" />
    <path d="M5 11h14" />
    <circle cx="8" cy="18" r="1.5" />
    <circle cx="16" cy="18" r="1.5" />
    <path d="M3 3l18 18" />
  </Svg>
);

export const IconShield = (props) => (
  <Svg {...props}>
    <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3z" />
    <path d="M9 12l2 2 4-4" />
  </Svg>
);

export const IconBuilding = (props) => (
  <Svg {...props}>
    <path d="M4 21V8l8-5 8 5v13" />
    <path d="M2 21h20M9 21v-5h6v5" />
    <path d="M8 11h.01M12 11h.01M16 11h.01" />
  </Svg>
);

export const IconHeartHand = (props) => (
  <Svg {...props}>
    <path d="M12 11.5S7 8.6 7 5.8A2.6 2.6 0 0 1 12 4.7a2.6 2.6 0 0 1 5 1.1c0 2.8-5 5.7-5 5.7z" />
    <path d="M3 15h3.5l3 2H14a1.5 1.5 0 0 1 0 3H8" />
    <path d="M14 18.5 19 16a1.5 1.5 0 0 1 2 2.2L15 21H3" />
  </Svg>
);

export const IconPhone = (props) => (
  <Svg {...props}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </Svg>
);

export const IconTools = (props) => (
  <Svg {...props}>
    <path d="M14.5 6.5a4 4 0 0 0 5 5L21 13l-8 8-3-3 8-8" />
    <path d="M3 21l6-6" />
    <path d="M14.5 6.5 17 4l3 3-2.5 2.5" />
  </Svg>
);
