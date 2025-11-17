
# Trabalho Prático 07 - Semanas 13 e 14

A partir dos dados cadastrados na etapa anterior, vamos trabalhar formas de apresentação que representem de forma clara e interativa as informações do seu projeto. Você poderá usar gráficos (barra, linha, pizza), mapas, calendários ou outras formas de visualização. Seu desafio é entregar uma página Web que organize, processe e exiba os dados de forma compreensível e esteticamente agradável.

Com base nos tipos de projetos escohidos, você deve propor **visualizações que estimulem a interpretação, agrupamento e exibição criativa dos dados**, trabalhando tanto a lógica quanto o design da aplicação.

Sugerimos o uso das seguintes ferramentas acessíveis: [FullCalendar](https://fullcalendar.io/), [Chart.js](https://www.chartjs.org/), [Mapbox](https://docs.mapbox.com/api/), para citar algumas.

## Informações do trabalho

- Nome: Luan Costa
- Matricula: 1496937
- Proposta de projeto escolhida: Lugares Turísticos
- Breve descrição sobre seu projeto: Apresenta trilhas e pontos do Parque do Tabuleiro (MG) com listagem dinâmica, detalhes e CRUD de itens.

## Como executar localmente

1. Instale as dependências: `npm install`
2. Inicie o servidor (JSON Server + estáticos): `npm start`
3. Acesse no navegador:
   - Home: `http://localhost:3000/index.html`
   - Visualizações (gráficos): `http://localhost:3000/visualizacoes.html`

Os endpoints da API (JSON Server) ficam disponíveis, por exemplo:
- `GET http://localhost:3000/items`

## Implementação desta etapa (apresentação dinâmica)

- Adicionada a página `public/visualizacoes.html` com dois gráficos usando Chart.js:
  - Gráfico de barras: quantidade de trilhas por localização.
  - Gráfico de pizza: distribuição por dificuldade.
- Os dados são lidos dinamicamente do endpoint `/items` (JSON Server), que reflete as operações de CRUD da Home.

### Prints da funcionalidade (preencher com capturas)

<< Coloque aqui uma breve explicação da implementação feita nessa etapa>>

- Tela 1 (exemplo com dados iniciais):

![Visualização 1](docs/print-visualizacoes-1.png)

- Tela 2 (exemplo após criar/editar itens via CRUD e atualizar gráficos):

![Visualização 2](docs/print-visualizacoes-2.png)

### Como gerar os prints

1. Acesse a Home (`/index.html`) e use a seção de CRUD para criar/editar itens (campos: título, descrição, dificuldade, localização etc.).
2. Abra a página de Visualizações (`/visualizacoes.html`) para ver os gráficos atualizados.
3. Faça duas capturas:
   - Uma com o estado inicial.
   - Outra após adicionar/alterar itens (para evidenciar mudança nos gráficos).
4. Salve as imagens como:
   - `docs/print-visualizacoes-1.png`
   - `docs/print-visualizacoes-2.png`
5. Adicione ao repositório e faça o commit.
