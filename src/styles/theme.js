// Identidade visual do Quem Fica?
// Todas as cores do projeto saem daqui. Nos componentes, use sempre
// `${({ theme }) => theme.colors.nomeDaCor}` em vez de escrever o hexadecimal.
//
// Paleta em tons de azul (tema: água). Visual calmo e institucional:
// cantos pouco arredondados, sombras leves e poucas cores de destaque.

const base = {
  fonts: {
    // Lexend e Atkinson Hyperlegible foram criadas para facilitar a leitura
    // (a Atkinson é do Braille Institute, pensada para baixa visão).
    heading: "'Lexend', system-ui, -apple-system, 'Segoe UI', sans-serif",
    body: "'Atkinson Hyperlegible', system-ui, -apple-system, 'Segoe UI', sans-serif",
  },
  radius: {
    sm: '6px',
    md: '8px',
    lg: '12px',
    pill: '8px', // botões e etiquetas: retângulos suaves, não "balões"
  },
  breakpoints: {
    md: '768px',
    lg: '992px',
  },
};

export const lightTheme = {
  ...base,
  name: 'padrao',
  colors: {
    paper: '#F7F9FB', // fundo da página
    surface: '#FFFFFF', // cartões
    surfaceAlt: '#EDF2F6',
    ink: '#14202B', // texto principal
    inkSoft: '#46535F', // texto secundário (contraste 7,9:1)
    line: '#D9E1E8',
    border: '#D9E1E8',
    headerBg: 'rgba(247, 249, 251, 0.94)',

    night: '#16243A', // faixa do topo e rodapé
    deep: '#2A4A7A',
    water: '#0E6F86', // links e destaques
    waterLight: '#7FD3E0',
    sun: '#FFB547', // só na ilustração (portas das casas e logo)

    primary: '#0E6F86', // botão principal
    primaryHover: '#0B5A6D',
    onPrimary: '#FFFFFF',

    onDark: '#FFFFFF',
    onDarkSoft: 'rgba(255, 255, 255, 0.86)',

    // Estados da simulação — nunca usar só a cor: sempre ícone + texto junto.
    safe: '#1E7A4C',
    safeBg: '#E4F3EA',
    risk: '#B42318',
    riskBg: '#FCE9E6',
    neutral: '#4F5B66',
    neutralBg: '#EDF2F6',
  },
  scene: {
    skyTop: '#D3EAF2',
    skyBottom: '#F7F9FB',
    ground: '#DCE3E8',
    groundStroke: '#B5C2CC',
    water: '#2B8FB0',
    waterOpacity: 0.55,
    waterStroke: '#7FD3E0',
  },
  gradients: {
    hero: 'linear-gradient(165deg, #16243A 0%, #1F3F63 55%, #0E6F86 100%)',
    soft: 'linear-gradient(180deg, #E5F0F5 0%, #F7F9FB 100%)',
    sky: 'linear-gradient(180deg, #E5F0F5 0%, #F7F9FB 100%)',
  },
  shadow: {
    soft: '0 1px 3px rgba(20, 32, 43, 0.08)',
    lift: '0 8px 24px -10px rgba(20, 32, 43, 0.25)',
  },
};

// Tema de alto contraste: cinza-azulado escuro com azul-claro.
// Mais confortável que preto/amarelo e ainda com contraste alto (texto 13:1).
export const contrastTheme = {
  ...base,
  name: 'alto-contraste',
  colors: {
    paper: '#1E2329',
    surface: '#272D35',
    surfaceAlt: '#2F363F',
    ink: '#EEF3F7',
    inkSoft: '#C5D0DA',
    line: '#46505C',
    border: '#46505C',
    headerBg: 'rgba(30, 35, 41, 0.96)',

    night: '#171B20',
    deep: '#3A6A94',
    water: '#8FD0F0',
    waterLight: '#8FD0F0',
    sun: '#F2C879',

    primary: '#8FD0F0',
    primaryHover: '#B4E1F6',
    onPrimary: '#10202B',

    onDark: '#FFFFFF',
    onDarkSoft: '#E1E8EF',

    safe: '#86D9A8',
    safeBg: '#20352A',
    risk: '#F5A79D',
    riskBg: '#3B2726',
    neutral: '#C5D0DA',
    neutralBg: '#2F363F',
  },
  scene: {
    skyTop: '#26313C',
    skyBottom: '#1E2329',
    ground: '#38414B',
    groundStroke: '#5B6773',
    water: '#5FB3DA',
    waterOpacity: 0.5,
    waterStroke: '#8FD0F0',
  },
  gradients: {
    hero: 'linear-gradient(165deg, #1A1F25 0%, #222C36 55%, #23394A 100%)',
    soft: 'linear-gradient(180deg, #252C34 0%, #1E2329 100%)',
    sky: 'linear-gradient(180deg, #252C34 0%, #1E2329 100%)',
  },
  shadow: {
    soft: 'none',
    lift: '0 8px 24px -10px rgba(0, 0, 0, 0.6)',
  },
};
