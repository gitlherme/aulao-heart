import { gql } from "graphql-request"
import { GetStaticPaths, GetStaticProps } from "next"
import { Post } from ".."
import { hygraph } from "../../services/hygraph"

export default function PostPage({ title, body }: Post) {
  return (
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: body.html }} />
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
          body {
            html
          }
        }
      }
    `
  const { post } = await hygraph.request(query)
  const { title, body } = post
  return {
    props: {
      title,
      body,
    },
    revalidate: 60 * 60 * 24 // every 24 hours
  }
}