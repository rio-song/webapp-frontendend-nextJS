import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Post from './post'
import { useState, useEffect } from 'react'
import PostDetail from './postDetail'

export default function Home() {
  //各Postの表示
  const [result, setResult] = useState();
  //詳細画面の表示
  const [postDetailShow, setPostDetailShow] = useState(false);
  const [postDetailResult, setPostDetailResult] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token')
      if (token !== null) {
        const result = await getPostsLogin();
        setResult(result);
      } else {
        const result = await getPosts();
        setResult(result);
      }
    }
    fetchData();
  }, []);

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
  const url = "http://localhost:8000/api/post?count=5&lastPostId=null/userId/";
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      // 'Access-Control-Allow-Origin': 'http://localhost:8000'
    },
  };
  const response = await fetch(url, params);
  const posts = await response.json()
  return posts
}

async function getPostsLogin() {
  const userId = localStorage.getItem('userId')

  const url = "http://localhost:8000/api/post?count=5&lastPostId=null/userId/" + userId;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "token": localStorage.getItem('token'),
      // 'Access-Control-Allow-Origin': 'http://localhost:8000'
    },
  };
  const response = await fetch(url, params);
  const posts = await response.json()
  return posts
}
