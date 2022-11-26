# Figma
[Figma](https://www.figma.com/file/bO5ykctpVkAYkJTNmI7L6k/Aul%C3%A3o-Heart?node-id=0%3A1&t=d35Sx373qqFAuW6I-1)
# Criar projeto
- [x] Criar projeto com `npx create-next-app blog --ts --use-npm`
---

# Instalar dependências
- [x] [GraphQL](https://graphql.org/)
- [x] [GraphQL Request](https://github.com/prisma-labs/graphql-request)
- [x] [Tailwind CSS](https://tailwindcss.com/docs/installation)

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
  "./src/pages/**/*.{js,ts,jsx,tsx}",
],
```

- [ ] Importar tailwind no nosso arquivo **globals.css**.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

# [Hygraph](https://hygraph.com/)
- [x] Criar conta na Hygraph
- [x] Criar um Schema Post (Content Type)
  - [x] Title
  - [x] Headline
  - [x] Slug
  - [x] Content
  - [x] Author
- [x] Criar um Content do tipo Post

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
- [x] Requisitar post especifico
```javascript
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
  const { post } = await hygraph.request(query)
  const { title, content } = post
  return {
    props: {
      title,
      content,
    }
  }
}
```

# Materiais de Apoio
1. [getStaticProps and getServerSideProps | What’s the Difference?](https://www.ohmycrawl.com/getstaticprops-vs-getserversideprops/#gspvsgssp-difference)
2. [What is getStaticPaths() in Nextjs?](https://dev.to/akuks/what-is-getstaticpaths-in-nextjs-5ee5)
3. [REST vs GraphQL APIs, the Good, the Bad, the Ugly](https://www.moesif.com/blog/technical/graphql/REST-vs-GraphQL-APIs-the-good-the-bad-the-ugly/)