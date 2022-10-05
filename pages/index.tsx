import type {NextPage, GetServerSideProps} from 'next'
import styles from '../styles/Home.module.css'

export const getServerSideProps: GetServerSideProps = async ({
  query,
  resolvedUrl,
  req,
  res,
  preview,
  previewData
}) => {
  console.log({
    query,
    resolvedUrl,
    preview,
    previewData
  })

  return {
    props: {}
  }
}

const Home: NextPage<{a: number}> = ({a}) => {
  return (
    <div className={styles.container}>
      <div>Home</div>
      {a}
    </div>
  )
}

export default Home
