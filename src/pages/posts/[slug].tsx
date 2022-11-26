import { gql } from "graphql-request"
import { GetStaticPaths, GetStaticProps } from "next"
import { hygraph } from "../../services/hygraph"
import { Post } from "../../types/Post"

export default function PostPage({ title, content }: Post) {
  return (
    <div className="h-screen bg-black">
      <div className="w-screen h-3/6 flex items-center justify-center bg-gray-800">
        <h1 className="text-5xl font-bold text-violet-700">{ title }</h1>
      </div>
      <div className="w-screen flex justify-center">
        <div className="max-w-6xl">
          <div className="text-white my-8" dangerouslySetInnerHTML={{ __html: content!.html }} />
        </div>
      </div>
    </div>
  )
}


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
  const { post } = await hygraph.request(query)
  const { title, content } = post
  return {
    props: {
      title,
      content,
    },
    revalidate: 60 * 60 * 24 // every 24h
  }
}