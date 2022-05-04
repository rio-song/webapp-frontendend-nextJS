import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Post from './post'
import { post } from 'cypress/types/jquery'
export default function Home({ allPostsData, post }) {
  console.log("なぜ")
  const result = getPosts()
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ul className={utilStyles.list}>
          <Post result={result}>
          </Post>
        </ul>
      </section>
    </Layout>
  )
}

// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData()
//   return {
//     props: {
//       allPostsData
//     }
//   }
// }

async function getPosts() {
  const url = "http://localhost:8000/api/post?count=5&lastPostId=null";
  const params = { method: "GET" };
  const response = await fetch(url, params);
  const posts = await response.json()
  console.log("通信確認1" + response)
  console.log("通信確認2" + Object.values(JSON.stringify(posts)))
  console.log("通信確認3" + JSON.parse(JSON.stringify(posts)))
  return JSON.stringify(posts)
}