// Identidade visual do Quem Fica? (manual de marca 2026)
// Todas as cores do projeto saem daqui. Nos componentes, use sempre
// `${({ theme }) => theme.colors.nomeDaCor}` em vez de escrever o hexadecimal.
//
// Paleta: Navy Profundo, Azul Maré, Aqua, Âmbar e Névoa.
// Títulos e logotipo: Poppins. Textos e interface: Inter.

const base = {
  fonts: {
    heading: "'Poppins', system-ui, -apple-system, 'Segoe UI', sans-serif",
    body: "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    pill: '10px', // botões e etiquetas: retângulos suaves
  },
  breakpoints: {
    md: '768px',
    lg: '992px',
  },
  // Cores do símbolo e do logotipo. Não mudam entre os temas: a marca é fixa.
  brand: {
    navy: '#0B1F3A',
    azulMare: '#0E7490',
    aqua: '#22D3EE',
    ambar: '#FBBF24',
    nevoa: '#F4F8FB',
  },
};

export const lightTheme = {
  ...base,
  name: 'padrao',
  colors: {
    paper: '#F4F8FB', // Névoa: respiro e fundo da página
    surface: '#FFFFFF', // cartões
    surfaceAlt: '#EDF2F6',
    ink: '#0B1F3A', // Navy Profundo: texto principal
    inkSoft: '#46535F', // texto secundário (contraste 7,9:1)
    line: '#D9E1E8',
    border: '#D9E1E8',
    headerBg: 'rgba(244, 248, 251, 0.94)',

    night: '#0B1F3A', // Navy Profundo: faixa do topo e rodapé
    deep: '#15456B', // tom intermediário entre o navy e o azul maré
    water: '#0E7490', // Azul Maré: links, ícones e destaques
    waterLight: '#22D3EE', // Aqua: água, brilho (use sobre fundo escuro)
    sun: '#FBBF24', // Âmbar: janela acesa, luz de quem ainda fica
    amber: '#FBBF24',

    primary: '#0E7490', // botão principal (Azul Maré)
    primaryHover: '#0B5C72',
    onPrimary: '#FFFFFF',

    onDark: '#FFFFFF',
    onDarkSoft: 'rgba(255, 255, 255, 0.86)',

    // Estados da simulação. Não fazem parte da paleta de marca:
    // são semânticos. Nunca usar só a cor: sempre ícone + texto junto.
    safe: '#1E7A4C',
    safeBg: '#E4F3EA',
    risk: '#B42318',
    riskBg: '#FCE9E6',
    neutral: '#4F5B66',
    neutralBg: '#EDF2F6',
  },
  scene: {
    skyTop: '#D9F1F7',
    skyBottom: '#F4F8FB',
    ground: '#DCE3E8',
    groundStroke: '#B5C2CC',
    water: '#0E7490',
    waterOpacity: 0.4,
    waterStroke: '#22D3EE',
  },
  gradients: {
    hero: 'linear-gradient(165deg, #0B1F3A 0%, #15456B 55%, #0E7490 100%)',
    soft: 'linear-gradient(180deg, #E3F4F9 0%, #F4F8FB 100%)',
    sky: 'linear-gradient(180deg, #E3F4F9 0%, #F4F8FB 100%)',
  },
  shadow: {
    soft: '0 1px 3px rgba(11, 31, 58, 0.08)',
    lift: '0 8px 24px -10px rgba(11, 31, 58, 0.25)',
  },
};

// Tema de alto contraste: fundo escuro derivado do Navy, com Aqua e Âmbar.
export const contrastTheme = {
  ...base,
  name: 'alto-contraste',
  colors: {
    paper: '#0A1A2E',
    surface: '#112540',
    surfaceAlt: '#183252',
    ink: '#EEF6FA',
    inkSoft: '#C5D6E2',
    line: '#2C4A6B',
    border: '#2C4A6B',
    headerBg: 'rgba(10, 26, 46, 0.96)',

    night: '#06121F',
    deep: '#15456B',
    water: '#22D3EE',
    waterLight: '#22D3EE',
    sun: '#FBBF24',
    amber: '#FBBF24',

    primary: '#22D3EE',
    primaryHover: '#7BE4F5',
    onPrimary: '#0B1F3A',

    onDark: '#FFFFFF',
    onDarkSoft: '#E1E8EF',

    safe: '#86D9A8',
    safeBg: '#183A2A',
    risk: '#F5A79D',
    riskBg: '#3B2726',
    neutral: '#C5D6E2',
    neutralBg: '#183252',
  },
  scene: {
    skyTop: '#16324D',
    skyBottom: '#0A1A2E',
    ground: '#1E3850',
    groundStroke: '#3D5A76',
    water: '#22D3EE',
    waterOpacity: 0.35,
    waterStroke: '#7BE4F5',
  },
  gradients: {
    hero: 'linear-gradient(165deg, #06121F 0%, #0F2F4D 55%, #0E4F62 100%)',
    soft: 'linear-gradient(180deg, #112540 0%, #0A1A2E 100%)',
    sky: 'linear-gradient(180deg, #112540 0%, #0A1A2E 100%)',
  },
  shadow: {
    soft: 'none',
    lift: '0 8px 24px -10px rgba(0, 0, 0, 0.6)',
  },
};
