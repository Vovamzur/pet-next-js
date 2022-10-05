import type {NextPage, GetStaticProps} from 'next'

interface PostsProps {
  a: number
}

export const getStaticProps: GetStaticProps<PostsProps> = async ({
  params,
  preview,
  previewData
}) => {
  console.log({
    params,
    preview,
    previewData
  })

  return {
    props: {
      a: 1
    }
  }
}

const Posts: NextPage<PostsProps> = ({a}) => {
  return (
    <div>
      Posts
      {a}
    </div>
  )
}

export default Posts
