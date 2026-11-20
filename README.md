# Quem Fica?

> Planejar para ninguém ficar para trás.

**Quem Fica?** é uma plataforma de planejamento de evacuação inclusiva. Ela simula uma enchente em um bairro e mostra, família por família, quem consegue chegar sozinho a um abrigo seguro e quem vai precisar de ajuda. A ideia é descobrir isso **antes** de a água chegar, para que ninguém seja esquecido no plano de evacuação.

Projeto da Global Solution FIAP 2026/2 (tema CitizenTech), do 1º ano de Engenharia de Software.

## Vídeo pitch

https://youtu.be/xM6bx-xUjdI

## Sumário

1. [O problema](#o-problema)
2. [A solução](#a-solução)
3. [Integrantes](#integrantes)
4. [Como abrir o site](#como-abrir-o-site)
5. [Como usar](#como-usar)
6. [Como a simulação decide](#como-a-simulação-decide)
7. [Formulário de participação](#formulário-de-participação)
8. [Cadastro de famílias: quem pode fazer](#cadastro-de-famílias-quem-pode-fazer)
9. [Dados e privacidade](#dados-e-privacidade)
10. [Acessibilidade](#acessibilidade)
11. [Identidade visual](#identidade-visual)
12. [Tecnologias](#tecnologias)
13. [Requisitos da Global Solution](#requisitos-da-global-solution)
14. [Roteiro de testes](#roteiro-de-testes)
15. [Como executar o código-fonte](#como-executar-o-código-fonte)
16. [Estrutura de pastas](#estrutura-de-pastas)
17. [Limitações](#limitações)
18. [Dados reais e fontes](#dados-reais-e-fontes)
19. [Uso de inteligência artificial](#uso-de-inteligência-artificial)

## O problema

Quando um alerta de enchente chega, a maior parte das pessoas pega o carro ou sai a pé. Mas algumas famílias **não conseguem sair sozinhas**: quem tem pessoas idosas, pessoas com deficiência, alguém com mobilidade reduzida ou quem não tem transporte. Se ninguém sabe onde essas famílias estão e do que elas precisam, elas ficam para trás.

O tamanho do problema é real. Nas enchentes de 2024 no Rio Grande do Sul, **2,4 milhões de pessoas** foram afetadas, em 478 municípios. E no Brasil, **47,2% das pessoas com deficiência têm 60 anos ou mais**, o grupo que mais depende de ajuda para deixar a casa. As fontes estão em [Dados reais e fontes](#dados-reais-e-fontes).

**Quem é o cidadão beneficiado:** famílias que moram em áreas sujeitas a enchentes e que têm pessoas idosas, pessoas com deficiência, pessoas com mobilidade reduzida ou não têm transporte próprio.

## A solução

O Quem Fica? cruza três informações:

- **as necessidades de cada família** (quantas pessoas, idosos, pessoas com deficiência, mobilidade, carro);
- **os abrigos** (onde ficam, se estão fora da água, se têm vagas, se são acessíveis);
- **as rotas e os veículos** (se a estrada está liberada, se há van, se a van é adaptada).

Com isso, para cada nível de enchente, o sistema mostra quem tem uma saída segura e quem não tem, e explica o motivo. Quem organiza a evacuação (Defesa Civil, voluntários, agentes comunitários) sabe com antecedência onde mandar ajuda.

**Objetivos de Desenvolvimento Sustentável (ODS) da ONU:**

| ODS | Como o projeto contribui |
| --- | --- |
| 10 · Redução das desigualdades | Olha primeiro para quem tem mais dificuldade de sair: idosos e pessoas com deficiência. |
| 11 · Cidades e comunidades sustentáveis | Ajuda a planejar evacuações mais seguras nos bairros. |
| 13 · Ação contra a mudança global do clima | Prepara a comunidade para enchentes, que estão ficando mais frequentes. |

## Integrantes

| Nome                   | RM     | Responsabilidade principal                                                             |
| ---------------------- | ------ | -------------------------------------------------------------------------------------- |
| Julia Rubio Fernandes  | 569418 | Estrutura do projeto, rotas, layout e página inicial.                                 |
| Arthur Mairink         | 569745 | Mapa interativo, visualização das famílias, motor de simulação e regras de evacuação. |
| Rodrigo Sobral Moreira | 561620 | Cadastro de recursos, formulários e dashboard de impacto.                             |
| Gabriela Donato        | 571773 | Página da equipe, acessibilidade, testes, README e pitch.                             |

## Como abrir o site

**Não é preciso instalar nada.**

1. Extraia o arquivo `.zip` da entrega.
2. Entre na pasta `quem-fica`.
3. Dê dois cliques no arquivo `index.html`.

O site abre no navegador (Chrome, Edge ou Firefox), no computador ou no celular. As fontes vêm da internet; sem conexão, o site funciona igual, só com uma fonte padrão do sistema.

> **Atenção:** o `index.html` que abre direto é o da pasta da entrega. O `index.html` da raiz do repositório no GitHub é o ponto de partida do código e só funciona depois de gerar o site (veja [Como executar o código-fonte](#como-executar-o-código-fonte)).

## Como usar

O site tem quatro páginas, com o mesmo menu em todas:

| Página    | Para que serve | Responsável |
| --------- | -------------- | ----------- |
| Início    | Explica o problema com dados reais, mostra como o Quem Fica? funciona e traz uma demonstração de uma rua com 5 famílias, em que você sobe o nível da água e vê quem consegue sair. | Julia |
| Simulação | A parte principal. Mostra o mapa do bairro com as 15 famílias. Você escolhe o nível de alagamento, clica em **Executar simulação** e vê o resultado de cada família, com o motivo. Dá para filtrar por região, necessidade e situação, e clicar em uma família para ver os detalhes. | Arthur |
| Impacto   | Mostra o que muda quando o bairro ganha recursos. Você altera famílias afetadas, famílias sem transporte, vagas e veículos, clica em **Atualizar cenário** e vê a cobertura antes e depois. O botão **Restaurar valores do cenário** volta aos dados originais. | Rodrigo |
| Equipe    | Apresenta o projeto, as tecnologias e os integrantes, e traz o formulário para quem quer participar. | Gabriela |

Se alguém digitar um endereço que não existe, aparece uma página de aviso com um link para voltar ao início.

## Como a simulação decide

O bairro do protótipo se chama **Bairro Esperança** e é fictício. Ele tem:

- **4 regiões:** Vila do Rio, Centro, Jardim das Pontes e Colina Verde;
- **15 famílias**, cada uma com número de moradores, pessoas idosas, pessoas com deficiência, mobilidade
  reduzida e informação sobre transporte;
- **3 abrigos:** Escola do Rio (acessível), Ginásio Central e Centro da Colina (acessível);
- **5 veículos**, sendo 2 adaptados para cadeira de rodas.

Há quatro níveis de enchente: **sem alagamento, baixo, moderado e grave**. Quanto mais alto o nível, mais regiões ficam alagadas, mais rotas fecham e alguns abrigos deixam de poder ser usados.

Para cada família atingida, o sistema segue estes passos:

1. **Procura um abrigo** que esteja funcionando, fora da água, com a rota liberada e com vagas para a família inteira. Se na família há alguém com deficiência ou mobilidade reduzida, o abrigo precisa ser acessível.
2. **Procura um jeito de chegar lá:**
   - com o carro da própria família;
   - a pé, só se o abrigo estiver a até 1,5 km e ninguém na família precisar de apoio (pessoas idosas, por exemplo, nunca são mandadas a pé);
   - em um veículo da região, que precisa ser adaptado quando há alguém com deficiência ou mobilidade reduzida.
3. **Mostra o resultado** com ícone, cor e texto:
   - **Consegue sair:** existe uma alternativa segura, e o sistema diz qual.
   - **Sem alternativa segura:** nenhuma opção funciona, e o sistema diz o motivo (falta de abrigo acessível, de vagas, de veículo adaptado, rota bloqueada etc.).
   - **Fora da área alagada:** a região da família não foi atingida naquele nível.

O sistema **nunca separa uma família**: ela só é considerada atendida se houver lugar para todos juntos.

## Formulário de participação

Fica no fim da página **Equipe**. É por ele que uma pessoa diz que quer ajudar o projeto: como moradora, como representante de um órgão público, de uma ONG ou empresa, como voluntária ou de outra forma.

- **Campos obrigatórios:** nome, e-mail, forma de participação e a confirmação de consentimento.
- **Campos opcionais:** bairro ou município, interesses, quantas famílias da região precisam de apoio e uma mensagem.
- **Validação:** se faltar algo ou houver erro (por exemplo, um e-mail sem domínio), a mensagem aparece ao lado do campo e em um resumo no topo, e o cursor vai para o primeiro campo com erro. Nada usa janelas de `alert()`.
- **Envio:** ao enviar, aparece uma mensagem de sucesso na própria página. A pessoa pode apagar o que enviou ali mesmo, com confirmação.

## Cadastro de famílias: quem pode fazer

O site **não tem um cadastro de famílias aberto ao público**, e essa foi uma decisão da equipe.

Os dados de uma família incluem informações sensíveis, como deficiência, idade e mobilidade. Pela Lei Geral de Proteção de Dados (LGPD), dados de saúde são sensíveis e exigem cuidado redobrado. Além disso, um cadastro aberto poderia receber informações inventadas ou repetidas, e isso mudaria a simulação usada para planejar a evacuação de verdade.

Por isso, o cadastro de famílias fica reservado para **pessoas treinadas que fazem parte da organização**: voluntários capacitados, agentes da Defesa Civil, agentes comunitários de saúde e assistentes sociais. O caminho previsto é:

1. A pessoa se registra pelo **formulário de participação**, para que a equipe saiba quem ela é e de onde ela vem.
2. Depois de aprovada e orientada, ela recebe acesso ao cadastro de famílias.
3. O cadastro é feito **junto com a família e com o consentimento dela**.

Assim, toda informação sobre uma família tem origem conhecida. No protótipo, essa etapa está descrita e ainda não foi construída; na versão real, o acesso seria protegido por login.

## Dados e privacidade

- O projeto **não tem servidor**. O que alguém preenche no formulário fica guardado só no navegador dessa pessoa e não é enviado para a equipe.
- O formulário pede só o necessário para contato (nome e e-mail) e exige o consentimento antes de salvar.
- As famílias, os abrigos e os veículos da simulação são **fictícios**. Nenhuma pessoa real aparece no site.
- As preferências de acessibilidade (tamanho do texto e alto contraste) também ficam só no navegador.

## Acessibilidade

O Quem Fica? é sobre pessoas que costumam ser esquecidas, então o site também precisa funcionar para elas.

- **Teclado:** dá para usar o site inteiro só com Tab, Shift+Tab e Enter. O primeiro Tab mostra o link **Pular para o conteúdo**, e o foco sempre aparece com um contorno bem visível.
- **Tamanho do texto:** os botões **A−**, **A** e **A+**, no topo, mudam o tamanho de tudo (até 137,5%).
- **Alto contraste:** o botão **Contraste** deixa o fundo escuro e o texto claro, usando só as cores da identidade visual.
- **Leitores de tela:** páginas com títulos em ordem, regiões marcadas (cabeçalho, menu, conteúdo e rodapé), texto alternativo nas fotos e nomes claros em todos os botões e campos.
- **Cores com significado:** nenhuma informação depende só da cor. Toda situação tem também ícone e texto.
- **Celular:** áreas de toque com pelo menos 44 pixels e nada escapando da tela.
- **Movimento:** quem ativa "reduzir movimento" no sistema vê as animações paradas.
- **Formulários:** todo campo tem rótulo visível, e os erros explicam como corrigir.

As páginas foram verificadas com a ferramenta axe-core, nas regras de acessibilidade WCAG 2.2 (níveis A e AA), nos temas claro e de alto contraste, sem nenhum problema encontrado.

## Identidade visual

O site segue o manual de marca **Quem Fica? · Identidade Visual**.

- **Símbolo:** um "Q" de **quem**, com uma casa dentro (cada família), a janela acesa em âmbar (quem ainda está lá dentro) e a água subindo em azul-aqua (a enchente).
- **Cores:**

  | Cor | Código | Uso |
  | --- | --- | --- |
  | Navy Profundo | `#0B1F3A` | Fundos, logotipo e textos |
  | Azul Maré | `#0E7490` | Botões, links e destaques |
  | Aqua | `#22D3EE` | Água, brilho e a interrogação em fundo escuro |
  | Âmbar | `#FBBF24` | Luz de alerta: quem ainda fica |
  | Névoa | `#F4F8FB` | Fundos claros |

- **Fontes:** Poppins nos títulos e no logotipo; Inter nos textos.
- Verde e vermelho aparecem só para indicar situação (consegue sair ou pode ficar para trás) e não fazem parte da marca.

## Tecnologias

Somente tecnologias vistas no curso:

- **HTML semântico**, **CSS** (media queries, flexbox e grid) e **JavaScript**;
- **React**, com componentes, props, `useState` e `useEffect`;
- **React Router**, para as páginas;
- **Styled Components**, para os estilos;
- **React Hook Form**, no formulário de participação;
- **Bootstrap**, para a grade e os contêineres;
- **SVG**, no mapa, nos ícones e nas ilustrações;
- **Vite**, para gerar a versão final do site.

## Requisitos da Global Solution

| Requisito | Onde está no projeto |
| --- | --- |
| 01 · Página inicial com o problema | Início: cidadão, problema, dados reais com fonte, proposta e ODS 10, 11 e 13. |
| 02 · Navegação | Quatro páginas (Início, Simulação, Impacto e Equipe) com o mesmo menu, escritas com HTML semântico. |
| 03 · Simulação interativa | Simulação: a pessoa escolhe o nível e executa; os dados são um array com 15 famílias, exibidas no mapa e em cartões. |
| 04 · Formulário com validação | Equipe: campos obrigatórios validados, com erros e sucesso na própria página, sem `alert()`. |
| 05 · Responsividade | Media queries, flexbox e grid; funciona no celular e no computador. |
| 06 · Acessibilidade | Tags semânticas, `alt` nas imagens, rótulo em todos os campos, contraste e navegação completa pelo teclado. |
| 07 · Código e README | Pastas `css`, `js` e `img`, nenhum CSS inline e este README. |

Diferenciais: alto contraste e ajuste do tamanho do texto, mensagens claras em cada ação e nenhuma página sem saída.

## Roteiro de testes

Testes feitos pela equipe, abrindo o `index.html` direto no navegador:

1. **Navegação:** abrir cada item do menu e ver se a página certa carrega. Abrir `index.html#/teste` e ver a página de aviso.
2. **Simulação:** escolher cada um dos quatro níveis, clicar em **Executar simulação** e conferir o resultado de cada família. Usar os filtros e o botão **Limpar filtros**.
3. **Impacto:** mudar os valores, clicar em **Atualizar cenário** e ver os indicadores mudarem. Digitar um número negativo e ver a mensagem de erro. Clicar em **Restaurar valores do cenário**.
4. **Formulário:** enviar vazio e ver os erros; corrigir, enviar e ver a mensagem de sucesso; apagar o registro.
5. **Teclado:** usar o site só com Tab, Shift+Tab e Enter.
6. **Acessibilidade:** testar o **Contraste** e os botões **A−** e **A+**.
7. **Celular:** repetir a navegação em uma tela pequena.

## Como executar o código-fonte

Para quem quer ver ou alterar o código. Na entrega, ele está na pasta `codigo-fonte`; no GitHub, na raiz do repositório. É preciso ter o **Node.js 20.19 ou mais recente**.

```bash
cd codigo-fonte      # no GitHub, entre na pasta do repositório
npm install          # instala as bibliotecas
npm run dev          # abre o site em http://localhost:5173
npm run build        # gera o site pronto na pasta dist (index.html, css, js e img)
```

A pasta `dist` gerada pelo `npm run build` é o site que abre com dois cliques. Ela pode ser publicada em qualquer hospedagem de sites estáticos, como GitHub Pages ou Vercel.

## Estrutura de pastas

```
index.html                 ponto de partida do código
public/
  favicon.svg              ícone do site
  img/equipe/              fotos dos integrantes
src/
  components/              partes reaproveitadas: cabeçalho, rodapé, mapa, cartões, formulário, botões
  context/                 tamanho do texto e alto contraste
  data/cenario.json        o bairro fictício: 15 famílias, abrigos, veículos e regiões
  data/equipe.js           integrantes, RM, responsabilidades e tecnologias
  hooks/                   funções do React reaproveitadas
  pages/                   as páginas: Início, Simulação, Impacto, Equipe e página de aviso
  routes/                  as rotas e os itens do menu
  services/                carregamento do cenário e registros do formulário
  styles/                  cores, fontes e estilos gerais
  utils/                   motor da simulação, regras de evacuação, cálculos e validações
```

## Limitações

- É um **protótipo acadêmico**: o bairro e as famílias são fictícios, e os resultados não substituem as orientações da Defesa Civil.
- Não há servidor nem login. Por isso, o cadastro de famílias ainda não existe, e os registros do formulário ficam só no navegador de quem preencheu.
- Na página de impacto, a "cobertura depois" é uma estimativa simples: cada veículo a mais leva uma família. A página de simulação considera rotas, abrigos e necessidades de cada família.
- O teste com leitores de tela (NVDA, VoiceOver ou TalkBack) por uma pessoa ainda precisa ser feito.

## Dados reais e fontes

- **2,4 milhões** de pessoas afetadas pelas enchentes de 2024 no Rio Grande do Sul, em 478 municípios.
  Fonte: [Defesa Civil do RS, balanço de 10/06/2024](https://estado.rs.gov.br/defesa-civil-atualiza-balanco-das-enchentes-no-rs-10-6-9h).
- **47,2%** das pessoas com deficiência no Brasil têm 60 anos ou mais; são 18,6 milhões de pessoas com deficiência no país.
  Fonte: [IBGE, PNAD Contínua 2022](https://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/37317-pessoas-com-deficiencia-tem-menor-acesso-a-educacao-ao-trabalho-e-a-renda).

## Uso de inteligência artificial

A equipe usou ferramentas de inteligência artificial generativa como apoio no projeto. Todo o conteúdo gerado foi revisado pelo grupo, e cada integrante conhece e sabe explicar a parte que desenvolveu.

| Ferramenta | Para quê |
| --- | --- |
| ChatGPT (OpenAI) | Desenvolvimento do roteiro do vídeo pitch, criação de prompts e de imagens, pesquisas, explicações e orientações durante o projeto. |
| Claude (Anthropic) | Desenvolvimento do roteiro do vídeo pitch, organização e correção do código, naração do vídeo, explicações, pesquisas, orientações e testes do sistema. |
| Google Flow | Geração das imagens usadas no vídeo pitch. |
