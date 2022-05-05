import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Post from './post'
import { useState, useEffect } from 'react'

export default function Home() {
  const [result, setResult] = useState();

  useEffect(() => {
    async function fetchData() {
      const result = await getPosts();
      setResult(result);
    }
    fetchData();
  }, []);

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ul className={utilStyles.list}>
          {result && <Post result={result} />}
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
  return posts
}