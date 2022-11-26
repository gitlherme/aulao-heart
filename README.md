# Figma
[Figma](https://www.figma.com/file/bO5ykctpVkAYkJTNmI7L6k/Aul%C3%A3o-Heart?node-id=0%3A1&t=d35Sx373qqFAuW6I-1)
# Criar projeto
- [ ] Criar projeto com `npx create-next-app blog --ts --use-npm`
---

# Instalar dependências
- [ ] [GraphQL](https://graphql.org/)
- [ ] [GraphQL Request](https://github.com/prisma-labs/graphql-request)
- [ ] [Tailwind CSS](https://tailwindcss.com/docs/installation)

```bash
npm install graphql-request graphql
npm install -D tailwindcss postcss autoprefixer
```
---
# Configurar Tailwind
- [ ] Criar arquivo de config do tailwind

```bash
npx tailwindcss init -p
```

- [ ] Editar arquivo de config com o necessário

```javascript
content: [
  "./pages/**/*.{js,ts,jsx,tsx}",
],
```

- [ ] Importar tailwind no nosso arquivo **globals.css**.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

# [Hygraph](https://hygraph.com/)
- [ ] Criar conta na Hygraph
- [ ] Criar um Schema Post (Content Type)
  - [ ] Title
  - [ ] Slug
  - [ ] Content
  - [ ] Author
  - [ ] Date
- [ ] Criar um Content do tipo Post

# Criar configuracao do GraphQL
- Dentro da pasta services, criar um `hygraph.ts`.
- 