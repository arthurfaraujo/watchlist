# Watchlist

Site para criar watchlists e reviews de filmes, dando a possibilidade de fazer watchlists em conjunto.

## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Contribuir](#como-contribuir)
- [Licença](#licença)


## Visão Geral

O objetivo do webapp é possibilitar que pessoas se conectem através de watchlists, colaborando ao inserir filmes, avaliá-los e sugeri-los aos seus amigos.

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vite.dev/)


## Estrutura do Projeto

Descreva brevemente a organização do projeto. Por exemplo:

```
watchlist/
├── public/
│   ├── favicon.svg
│   └── placeholder.png
├── src/
│   ├── api-services/
│   │   └── apiService.ts
│   ├── app/
│   │   ├── mywatchlists/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── MovieCard.tsx
│   │   ├── MovieCarousel.tsx
│   │   ├── MovieModal.tsx
│   │   ├── SearchBar.tsx
│   │   └── SearchResults.tsx
│   ├── context/
│   │   └── ModalContext.tsx
│   └── types/
│   │   └── media.ts
├── .gitignore
├── README.md
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── preview.png
├── tailwind.config.ts
└── tsconfig.json

```


## Como Contribuir

Seja bem-vindo para contribuir com este projeto! Siga as etapas abaixo:

1. Realize um fork do repositório.
2. Crie um branch para sua feature ou bugfix:

   ```bash
   git checkout -b minha-feature
   ```

3. Faça suas alterações e adicione commits descritivos.
4. Envie o branch para o repositório remoto:

   ```bash
   git push origin minha-feature
   ```

5. Abra um Pull Request e descreva suas alterações.

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).


