# Quem Fica?

> Planejar para ninguém ficar para trás.

Plataforma de planejamento de evacuação inclusiva. Simula enchentes e identifica quais famílias
(idosos, pessoas com deficiência, pessoas com mobilidade reduzida e famílias sem transporte) não
conseguem chegar sozinhas a um lugar seguro.

Global Solution FIAP 2026/2 · CitizenTech · ODS 10, 11 e 13.

## Vídeo pitch

[PREENCHER: link público do vídeo no YouTube, Google Drive ou Vimeo. Testar numa aba anônima.]

## Como abrir

**Não é preciso instalar nada.** Na pasta entregue, abra o arquivo `index.html` com dois cliques. O site abre
direto no navegador (Chrome, Edge ou Firefox). As fontes vêm da internet; sem conexão, o site usa uma fonte
padrão do sistema.

O código-fonte em React está na pasta `codigo-fonte`.

## Como rodar o código-fonte

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`. Para gerar a versão de produção: `npm run build`.

## Tecnologias

React · Vite · React Router DOM · Bootstrap (grid) · Styled Components · React Hook Form · Fetch API · SVG.

## Páginas

| Rota         | Página    | Responsável      |
| ------------ | --------- | ---------------- |
| `/`          | Início    | Julia Rubio Fernandes |
| `/simulacao` | Simulação | Arthur Mairink   |
| `/impacto`   | Impacto   | Rodrigo Sobral Moreira |
| `/equipe`    | Equipe (com o formulário de participação) | Gabriela Donato |

Qualquer outro endereço mostra a página 404.

## Estrutura

```
public/
  img/                     fotos da equipe
src/
  components/
    Header/  Footer/  Layout/   layout comum a todas as páginas
    UI/                         Button, Section, PageIntro, Logo, ComingSoon
    Icons/                      ícones SVG (sem biblioteca)
    Map/ Dashboard/ Family/ Shelter/ Vehicle/   (para os colegas)
  context/AccessibilityContext.jsx   tamanho do texto + alto contraste
  data/cenario.json        dados fictícios (15 famílias, abrigos e veículos)
  data/equipe.js           integrantes, RM, responsabilidades e tecnologias
  hooks/      usePageTitle, useSimulation
  pages/      Home/ Simulation/ Impact/ Team/ NotFound/
  routes/     AppRoutes.jsx (rotas) e navigation.js (itens do menu)
  services/   scenarioService.js (carrega o cenário de src/data/cenario.json)
  styles/     theme.js (cores e fontes) e GlobalStyles.js
  utils/      simulationEngine, evacuationRules, calculations
```

## Guia rápido para a equipe

- **Nova página**: crie em `src/pages/`, registre em `routes/AppRoutes.jsx` e, se for para o menu,
  em `routes/navigation.js`. Use `<PageIntro>` no topo e chame `usePageTitle('Nome')`.
- **Cores e fontes**: nunca escreva hexadecimal no componente. Use o tema:
  `` color: ${({ theme }) => theme.colors.ink}; ``. Assim o modo de alto contraste funciona sozinho.
- **Tamanhos**: use `rem`, não `px`, para que o botão "A+" aumente tudo junto.
- **Botões**: `<ButtonLink to="/rota">` ou `<Button type="submit">` (variantes: `primary`, `light`, `dark`).
- **Estados da simulação**: `safe` (verde), `risk` (vermelho), `neutral`. Sempre com ícone + texto,
  nunca só a cor.
- **Grid**: use as classes do Bootstrap (`container`, `row`, `col-12 col-lg-6`, `g-4`).

## Acessibilidade

- Link "Pular para o conteúdo" (aparece ao apertar Tab).
- Barra com **A− / A / A+** (até 137,5%) e **alto contraste**, salvos no navegador.
- Fontes Poppins (títulos) e Inter (textos), da identidade visual do projeto. Texto base de 18px.
- Menu com `aria-current`, botão "Menu" com texto, `aria-expanded` e fechamento com Esc.
- Foco visível em qualquer fundo; ao trocar de página o foco vai para o conteúdo.
- Animações desligadas para quem ativa "reduzir movimento" no sistema.
- Áreas de toque com no mínimo 44px; controles do slider também têm botões − e +.

## Dados reais da página inicial

- **2,4 milhões** de pessoas afetadas pelas enchentes de 2024 no RS, em 478 municípios.
  Fonte: [Defesa Civil do RS, balanço de 10/06/2024](https://estado.rs.gov.br/defesa-civil-atualiza-balanco-das-enchentes-no-rs-10-6-9h).
- **47,2%** das pessoas com deficiência no Brasil têm 60 anos ou mais; 18,6 milhões de pessoas com deficiência.
  Fonte: [IBGE, PNAD Contínua 2022](https://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/37317-pessoas-com-deficiencia-tem-menor-acesso-a-educacao-ao-trabalho-e-a-renda).

As famílias, abrigos e veículos do protótipo são **fictícios**. Os resultados são estimativas e não
substituem as orientações da Defesa Civil.

## Publicação (Vercel)

O arquivo `vercel.json` já redireciona todas as rotas para o `index.html`, então recarregar
`/simulacao` ou `/equipe` funciona depois de publicado.

## Formulário de participação

Fica na página da equipe. Usa React Hook Form, com validação dos campos obrigatórios (nome, e-mail, forma
de participação e consentimento). Os erros e a mensagem de sucesso aparecem na própria página, sem
`alert()`. O projeto não tem servidor: as respostas ficam guardadas só no navegador de quem preenche
(`localStorage`), e a pessoa pode apagá-las na mesma página.

## Integrantes

| Nome                   | RM     | Responsabilidade principal                                                         |
| ---------------------- | ------ | ---------------------------------------------------------------------------------- |
| Julia Rubio Fernandes  | 569418 | Estrutura do projeto, rotas, layout e página inicial.                             |
| Arthur Mairink         | 569745 | Mapa interativo, visualização das famílias, motor de simulação e regras de evacuação. |
| Rodrigo Sobral Moreira | 561620 | Cadastro de recursos, formulários e dashboard de impacto.                         |
| Gabriela Donato        | 571773 | Página da equipe, acessibilidade, testes, README e pitch.                         |

## Uso de IA generativa

Ferramentas usadas e para quê:

- **Claude (Anthropic):** apoio na página da equipe e no formulário de participação, na identidade visual
  (manual de marca, cores, fontes e logotipo), na revisão de acessibilidade, na troca de estilos inline por
  componentes e na redação deste README.

Revisão pela equipe: [PREENCHER: como a equipe revisou e entendeu o código e os textos gerados com IA.]
