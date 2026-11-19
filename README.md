# Quem Fica?

> Planejar para ninguém ficar para trás.

Plataforma de planejamento de evacuação inclusiva. Simula enchentes em um bairro e mostra, família por
família, quem consegue chegar sozinho a um abrigo seguro e quem precisa de apoio.

Global Solution FIAP 2026/2 · CitizenTech · 1º ano de Engenharia de Software.

## Vídeo pitch

[PREENCHER: link público do vídeo no YouTube, Google Drive ou Vimeo. Testar numa aba anônima.]

## O problema e a solução

- **Cidadão beneficiado:** famílias com pessoas idosas, pessoas com deficiência, pessoas com mobilidade
  reduzida ou sem transporte próprio, que moram em áreas sujeitas a enchentes.
- **Problema:** em uma enchente, essas famílias muitas vezes não conseguem sair sozinhas, e os planos de
  evacuação nem sempre consideram isso. Nas enchentes de 2024 no Rio Grande do Sul, 2,4 milhões de pessoas
  foram afetadas (Defesa Civil do RS).
- **Solução:** uma simulação que cruza as necessidades de cada família com abrigos, rotas e veículos e
  mostra quem precisa de apoio antes de a água chegar.
- **ODS:** 10 (redução das desigualdades), 11 (cidades e comunidades sustentáveis) e 13 (ação contra a
  mudança global do clima).

## Integrantes

| Nome                   | RM     | Responsabilidade principal                                                         |
| ---------------------- | ------ | ---------------------------------------------------------------------------------- |
| Julia Rubio Fernandes  | 569418 | Estrutura do projeto, rotas, layout e página inicial.                             |
| Arthur Mairink         | 569745 | Mapa interativo, visualização das famílias, motor de simulação e regras de evacuação. |
| Rodrigo Sobral Moreira | 561620 | Cadastro de recursos, formulários e dashboard de impacto.                         |
| Gabriela Donato        | 571773 | Página da equipe, acessibilidade, testes, README e pitch.                         |

## Como abrir

**Não é preciso instalar nada.** Na pasta entregue, abra o arquivo `index.html` com dois cliques. O site
abre direto no navegador (Chrome, Edge ou Firefox).

As fontes (Poppins e Inter) vêm da internet. Sem conexão, o site funciona normalmente com uma fonte padrão
do sistema.

## Como executar o código-fonte

O código-fonte em React fica na pasta `codigo-fonte` da entrega (ou na raiz do repositório no GitHub).
É preciso ter o Node.js 20.19 ou mais recente.

```bash
cd codigo-fonte
npm install
npm run dev      # servidor de desenvolvimento em http://localhost:5173
npm run build    # gera a versão final na pasta dist (index.html, css, js e img)
```

## Páginas

| Endereço                 | Página    | O que tem                                                           | Responsável            |
| ------------------------ | --------- | ------------------------------------------------------------------- | ---------------------- |
| `index.html#/`           | Início    | O problema, dados reais com fonte, como funciona e os ODS.          | Julia Rubio Fernandes  |
| `index.html#/simulacao`  | Simulação | Mapa do bairro, níveis de alagamento e resultado de cada família.  | Arthur Mairink         |
| `index.html#/impacto`    | Impacto   | Indicadores de cobertura e impacto, com cadastro de recursos.      | Rodrigo Sobral Moreira |
| `index.html#/equipe`     | Equipe    | Integrantes, tecnologias e formulário de participação.            | Gabriela Donato        |

O menu é o mesmo em todas as páginas. Um endereço que não existe mostra uma página de aviso, com link para
o início.

## Como a simulação funciona

O bairro tem quatro regiões, abrigos e veículos fictícios. Os dados ficam em `src/data/cenario.json`: um
array de objetos com 15 famílias, cada uma com número de moradores, pessoas idosas, pessoas com
deficiência, mobilidade reduzida e condição de transporte.

A pessoa escolhe o nível de alagamento e executa a simulação. Para cada família atingida, o sistema procura
um abrigo ativo, fora da água, com rota liberada, vagas e, quando necessário, acessível. Depois, verifica
como ela chega até lá: transporte próprio, a pé (em distâncias curtas e sem necessidades de apoio) ou em um
veículo da região, adaptado quando preciso. Se nenhuma opção funciona, a família aparece como **sem
alternativa segura**, com o motivo.

Na página de impacto, os indicadores (cobertura antes e depois e impacto) são recalculados quando a pessoa
altera os recursos: famílias afetadas, famílias sem transporte, vagas em abrigos e veículos disponíveis.

## Tecnologias

- HTML semântico, CSS (media queries, flexbox e grid) e JavaScript.
- React (componentes, props, `useState` e `useEffect`) e React Router.
- Styled Components, para os estilos.
- React Hook Form, no formulário de participação.
- Bootstrap (grid e containers).
- SVG para o mapa, as ilustrações e os ícones.
- Vite, para gerar a versão final.

## Requisitos do projeto

| Requisito                          | Onde está                                                                        |
| ---------------------------------- | -------------------------------------------------------------------------------- |
| 01 · Página inicial com o problema | Início: cidadão, problema, dados reais com fonte, proposta e ODS 10, 11 e 13.   |
| 02 · Navegação                     | Quatro páginas com o mesmo menu, escritas com HTML semântico.                   |
| 03 · Simulação interativa          | Simulação: array de 15 famílias, exibidas no mapa e em cartões após a ação.     |
| 04 · Formulário com validação      | Equipe: erros e mensagem de sucesso na própria página, sem `alert()`.           |
| 05 · Responsividade                | Media queries, flexbox e grid; funciona no celular e no desktop.                |
| 06 · Acessibilidade                | Tags semânticas, `alt` nas imagens, `label` nos campos, contraste e teclado.     |
| 07 · Código e README               | Pastas `css`, `js` e `img`, sem CSS inline, e este README.                      |

## Formulário de participação

Fica na página da equipe. Usa React Hook Form e valida os campos obrigatórios: nome, e-mail, forma de
participação e consentimento. Os erros aparecem ao lado de cada campo e em um resumo no topo, e o foco vai
para o primeiro campo com erro. Ao enviar, uma mensagem de sucesso aparece na própria página.

O projeto não tem servidor. As respostas ficam guardadas só no navegador de quem preenche
(`localStorage`), e a pessoa pode apagá-las na mesma página.

## Acessibilidade

- Link "Pular para o conteúdo", que aparece ao apertar Tab.
- Barra com **A− / A / A+** (até 137,5%) e **alto contraste**, salvos no navegador.
- Fontes Poppins (títulos) e Inter (textos), da identidade visual do projeto. Texto base de 18px.
- Menu com `aria-current`, botão "Menu" com texto, `aria-expanded` e fechamento com Esc.
- Foco visível em qualquer fundo. Ao trocar de página, o foco vai para o conteúdo.
- Animações desligadas para quem ativa "reduzir movimento" no sistema.
- Áreas de toque com no mínimo 44px. O controle do nível da água também tem botões − e +.
- Cores sempre acompanhadas de ícone e texto: nenhum estado depende só da cor.

## Roteiro de testes

Abrindo o `index.html` direto no navegador:

1. **Navegação:** abrir cada item do menu e conferir que todas as páginas carregam. Abrir um endereço que
   não existe (por exemplo, `index.html#/teste`) e conferir a página de aviso.
2. **Simulação:** escolher cada nível de alagamento, clicar em Executar simulação e conferir o resultado
   de cada família no mapa e nos cartões.
3. **Impacto:** alterar os recursos e conferir que os indicadores mudam.
4. **Formulário:** enviar vazio (os erros devem aparecer na página), corrigir e enviar (deve aparecer a
   mensagem de sucesso). Apagar os registros.
5. **Teclado:** navegar só com Tab, Shift+Tab e Enter, inclusive pelo "Pular para o conteúdo".
6. **Acessibilidade:** testar o alto contraste e os botões A− e A+.
7. **Celular:** repetir a navegação em uma tela pequena (ou no modo celular do navegador).

## Estrutura

```
index.html
public/
  favicon.svg              ícone do site
  img/equipe/              fotos dos integrantes
src/
  components/
    Header/ Footer/ Layout/   estrutura comum a todas as páginas
    UI/                       Button, Section, PageIntro, Logo e ComingSoon
    Icons/                    ícones em SVG
    Map/ Family/              mapa do bairro e cartões das famílias
    Participacao/ Registros/  formulário de participação e registros salvos
  context/AccessibilityContext.jsx   tamanho do texto e alto contraste
  data/cenario.json        dados fictícios (15 famílias, abrigos e veículos)
  data/equipe.js           integrantes, RM, responsabilidades e tecnologias
  hooks/                   usePageTitle, useScenario e useSimulation
  pages/                   Home, Simulation, Impact, Team e NotFound
  routes/                  rotas (AppRoutes.jsx) e itens do menu (navigation.js)
  services/                carregamento do cenário e do formulário
  styles/                  tema (cores e fontes) e estilos globais
  utils/                   motor de simulação, regras, cálculos e validações
```

## Guia rápido para a equipe

- **Nova página:** crie em `src/pages/`, registre em `routes/AppRoutes.jsx` e, se for para o menu, em
  `routes/navigation.js`. Use `<PageIntro>` no topo e chame `usePageTitle('Nome')`.
- **Cores e fontes:** nunca escreva hexadecimal no componente. Use o tema:
  `` color: ${({ theme }) => theme.colors.ink}; ``. Assim o modo de alto contraste funciona sozinho.
- **Tamanhos:** use `rem`, não `px`, para que o botão "A+" aumente tudo junto.
- **Botões:** `<ButtonLink to="/rota">` ou `<Button type="submit">` (variantes: `primary`, `light`, `dark`).
- **Estados da simulação:** `safe` (verde), `risk` (vermelho) e `neutral`, sempre com ícone e texto.
- **Grid:** use as classes do Bootstrap (`container`, `row`, `col-12 col-lg-6`, `g-4`).
- **Estilos:** sem CSS inline (`style={{...}}`). Use componentes do Styled Components.

## Publicação

Como as rotas ficam depois do `#`, o site funciona em qualquer hospedagem de arquivos estáticos, como o
GitHub Pages ou a Vercel: basta publicar o conteúdo da pasta `dist`.

## Dados reais e fontes

- **2,4 milhões** de pessoas afetadas pelas enchentes de 2024 no RS, em 478 municípios.
  Fonte: [Defesa Civil do RS, balanço de 10/06/2024](https://estado.rs.gov.br/defesa-civil-atualiza-balanco-das-enchentes-no-rs-10-6-9h).
- **47,2%** das pessoas com deficiência no Brasil têm 60 anos ou mais; 18,6 milhões de pessoas com deficiência.
  Fonte: [IBGE, PNAD Contínua 2022](https://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/37317-pessoas-com-deficiencia-tem-menor-acesso-a-educacao-ao-trabalho-e-a-renda).

As famílias, os abrigos e os veículos do protótipo são **fictícios**. Os resultados são estimativas e não
substituem as orientações da Defesa Civil.

## Uso de IA generativa

| Ferramenta        | Para quê                                                                      |
| ----------------- | ----------------------------------------------------------------------------- |
| ChatGPT (OpenAI)  | Roteiro do vídeo pitch, criação de prompts e de imagens, e pesquisas.        |
| Google Flow       | Geração das imagens usadas no vídeo pitch.                                   |
| Claude (Anthropic)| Desenvolvimento, conferência e correção de código, e pesquisas.              |
