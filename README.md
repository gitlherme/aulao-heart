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
  - [ ] Headline
  - [ ] Slug
  - [ ] Content
  - [ ] Author
  - [ ] Date
- [ ] Criar um Content do tipo Post

# Criar configuracao do GraphQL
- Dentro da pasta services, criar um `hygraph.ts`.
```javascript
// hygraph.ts
import { GraphQLClient } from 'graphql-request';
export const hygraph = new GraphQLClient(
  'LINK PARA O SEU CONTENT PUBLIC URL'
);
```
# Criar página de post list
- [ ] Requisitar todos os posts
```javascript
export const getStaticProps: GetStaticProps = async () => {
  const query = gql`
    {
      posts {
        title,
        headline,
      }
    }
  `
  const { posts } = await hygraph.request(query)
  const { title, headline } = posts
  return {
    props: {
      title,
      headline
    },
  }
}
```

# Criar página de post
- [ ] Requisitar post especifico
```javascript
export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  
  const query = gql`
      {
        post(where: {slug: "${params?.slug}"}) {
          title
          content {
            html
          }
        }
      }
    `
  })
  const { post } = await hygraph.request(query)
  const { title, content } = posts
  return {
    props: {
      title,
      content: content.html
    },
    revalidate: 60 * 60 * 24 // every 24 hours
  }
}
```