import type {NextPage, GetStaticProps, GetStaticPaths} from 'next'

export const getStaticPaths: GetStaticPaths = async ({
  locales,
  defaultLocale
}) => {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }

  return {
    paths: [{params: {id: '1'}}, {params: {id: '2'}}],
    fallback: false // can also be true or 'blocking'
  }
}

interface PostProps {
  a: number
}

export const getStaticProps: GetStaticProps<PostProps> = async ({
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
    },

    // regenrate page after 10 seconds of the first success request
    revalidate: 10
  }
}

const Post: NextPage<PostProps> = ({a}) => {
  return (
    <div>
      Post
      {a}
    </div>
  )
}

export default Post
