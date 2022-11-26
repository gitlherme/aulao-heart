import { gql } from "graphql-request"
import { GetStaticProps } from "next"
import { hygraph } from '../services/hygraph'

interface PostListProps {
  posts: Post[]
}

export interface Post {
  title: string
  headline: string
  body: {
    html: string
  }
}

export default function Home({ posts }: PostListProps) {
  return (
    <div>
      { posts.map(post => (
        <div key={post.title}>
          <h1>{ post.title }</h1>
          <p>{ post.headline }</p>
          <div dangerouslySetInnerHTML={{ __html: post.body.html }}/>
        </div>
      ))}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const query = gql`
    {
      posts {
        title,
        headline,
        body {
          html
        }
      }
    }
  `
  const { posts }: PostListProps = await hygraph.request(query)
  return {
    props: {
      posts
    },
  }
}
