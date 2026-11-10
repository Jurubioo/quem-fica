import { IconChart, IconHome, IconMap, IconUsers } from '../components/Icons/Icons';

// Lista única das páginas do site. O cabeçalho e o rodapé leem daqui,
// então o menu fica igual em todas as páginas (requisito de navegação).
export const navLinks = [
  { to: '/', label: 'Início', icon: IconHome, end: true },
  { to: '/simulacao', label: 'Simulação', icon: IconMap },
  { to: '/impacto', label: 'Impacto', icon: IconChart },
  { to: '/equipe', label: 'Equipe', icon: IconUsers },
];
