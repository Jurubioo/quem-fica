// Integrantes da equipe Quem Fica? e suas responsabilidades principais.
// Para alterar, edite apenas este arquivo: a página da equipe lê daqui.

// Caminho das fotos a partir da raiz do site (funciona em qualquer rota).
const FOTOS = `${import.meta.env.BASE_URL}img/equipe/`;

export const INTEGRANTES = [
  {
    id: 'julia',
    foto: `${FOTOS}julia.jpg`,
    nome: 'Julia Rubio Fernandes',
    rm: '569418',
    responsabilidade: 'Estrutura do projeto, rotas, layout e página inicial.',
    paginas: ['Início', 'Estrutura e layout'],
    entregas: [
      'Estrutura do projeto: Vite, React Router, rotas e layout.',
      'Cabeçalho, rodapé e menu de navegação.',
      'Página inicial: problema, como funciona, ODS e demonstração de rua.',
      'Barra de acessibilidade: tamanho do texto e alto contraste.',
    ],
  },
  {
    id: 'arthur',
    foto: `${FOTOS}arthur.jpg`,
    nome: 'Arthur Mairink',
    rm: '569745',
    responsabilidade: 'Mapa interativo, visualização das famílias, motor de simulação e regras de evacuação.',
    paginas: ['Simulação', 'Motor de evacuação'],
    entregas: [
      'Mapa interativo do bairro, com regiões, abrigos e veículos.',
      'Cartões das famílias com situação e motivo, e filtros da simulação.',
      'Motor de simulação e regras de evacuação por nível de alagamento.',
      'Validação do cenário: capacidade, posições e regiões.',
    ],
  },
  {
    id: 'rodrigo',
    foto: `${FOTOS}rodrigo.jpg`,
    nome: 'Rodrigo Sobral Moreira',
    rm: '561620',
    responsabilidade: 'Cadastro de recursos, formulários e dashboard de impacto.',
    paginas: ['Impacto'],
    entregas: [
      'Página de impacto com dashboard de indicadores.',
      'Cadastro de recursos para comparar cenários.',
      'Cálculos de cobertura e de impacto de intervenções.',
    ],
  },
  {
    id: 'gabriela',
    foto: `${FOTOS}gabriela.jpg`,
    nome: 'Gabriela Donato',
    rm: '571773',
    responsabilidade: 'Página da equipe, acessibilidade, testes, README e pitch.',
    paginas: ['Equipe', 'Acessibilidade'],
    entregas: [
      'Página da equipe, com integrantes e tecnologias.',
      'Formulário de participação com validação.',
      'Revisão de acessibilidade: contraste, teclado e rótulos dos campos.',
    ],
  },
];

export const TECNOLOGIAS = [
  'HTML, CSS e JavaScript',
  'React',
  'React Router',
  'Styled Components',
  'React Hook Form',
  'Bootstrap',
];

export const REPOSITORIO_URL = 'https://github.com/Jurubioo/quem-fica';
