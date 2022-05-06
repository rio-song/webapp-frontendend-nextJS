import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Post from './post'
import { useState, useEffect } from 'react'
import PostDetail from './postDetail'

export default function Home() {
  const [result, setResult] = useState();

  useEffect(() => {
    async function fetchData() {
      const result = await getPosts();
      setResult(result);
    }
    fetchData();
  }, []);

  //詳細画面に遷移
  const [postDetailShow, setPostDetailShow] = useState(false);

  const [postDetailResult, setPostDetailResult] = useState(null);
  console.log("中身何" + postDetailShow)


  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ul className={utilStyles.list}>
          {result && <Post result={result} setPostDetailShow={setPostDetailShow}
            setPostDetailResult={setPostDetailResult} />}
        </ul>
        {postDetailResult && <PostDetail postDetailResult={postDetailResult}
          postDetailShow={postDetailShow} setPostDetailShow={setPostDetailShow} />}
      </section>
    </Layout>
  )
}


async function getPosts() {
  const url = "http://localhost:8000/api/post?count=5&lastPostId=null";
  const params = { method: "GET" };
  const response = await fetch(url, params);
  const posts = await response.json()
  console.log("挙動確認" + posts)
  return posts
}

