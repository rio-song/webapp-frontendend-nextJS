import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import NestedLayout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Post from './post'
import { useState, useEffect } from 'react'
import PostDetail from './postDetail'
import { getPosts, getPostsLogin } from '../type/api'

export default function Home(props) {
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
        console.log("ログイン済み")
        if (result.statusCode = 401) {
          localStorage.clear()
          props.setLoginStatus(false);

        }
        setResult(result);
      } else {
        const result = await getPosts();
        console.log("ログイン未済")
        if (result.statusCode = 401) {
          localStorage.clear()
          props.setLoginStatus(false);

        }
        setResult(result);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {/* <Layout home props={loginStatus, setLoginStatus} >
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
        </section>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}> */}
      <ul className={utilStyles.list}>
        {result && <Post result={result} setPostDetailShow={setPostDetailShow}
          setPostDetailResult={setPostDetailResult} />}
      </ul>
      {postDetailResult && <PostDetail postDetailResult={postDetailResult}
        postDetailShow={postDetailShow} setPostDetailShow={setPostDetailShow} />}
      {/* </section>
      </Layout > */}
    </>
  )
}


Home.getLayout = function getLayout(home, props) {
  return (
    <Layout home>
      <NestedLayout home>{home}</NestedLayout>
    </Layout >
  )
}
