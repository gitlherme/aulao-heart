import { gql } from "graphql-request"
import { GetStaticPaths, GetStaticProps } from "next"
import Link from "next/link"
import { hygraph } from "../services/hygraph"
import { PostList } from "../types/PostList"

export default function Home({ posts }: PostList) {
  return (
    <div className="h-screen bg-black">
      <div className="w-screen h-3/6 flex items-center justify-center bg-gray-800">
        <h1 className="text-5xl font-bold text-violet-700">He4rt Blog</h1>
      </div>
      <div className="w-screen flex justify-center">
        <div className="max-w-6xl">
          <h2 className="text-3xl text-white font-bold my-8">Posts</h2>
          {
            posts.map(post => (
              <div className="text-white my-8">
                <h3 className="text-2xl font-bold">{ post.title }</h3>
                <p className="mb-4">{ post.headline }</p>
                <a href={`/posts/${post.slug}`} className="h-32 bg-violet-700 text-white px-4">Ver mais</a>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const query = gql`
    {
      posts {
        title,
        headline,
        slug
      }
    }
  `
  const { posts } = await hygraph.request(query)
  return {
    props: {
      posts
    },
  }
}