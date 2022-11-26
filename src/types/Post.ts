export interface Post {
  title: string
  headline: string
  slug: string
  content?: {
    html: string
  }
}