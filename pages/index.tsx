import Layout from '../components/layout'
import NestedLayout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Post from './post'
import { useState, useEffect } from 'react'
import PostDetail from './postDetail'
import { getPosts, getPostsLogin } from '../type/api'
import { useRouter } from 'next/router';

export default function Home(props) {
  //各Postの表示
  const [result, setResult] = useState(null);
  //詳細画面の表示
  const [postDetailShow, setPostDetailShow] = useState(false);
  const [postDetailResult, setPostDetailResult] = useState();

  const [statusCode, setStatusCode] = useState();
  const [isError, setIsError] = useState(false);
  const [errorContent, setErrorContent] = useState("");

  const [favos, setFavo] = useState();
  const [tapFavosIndex, setTapFavosIndex] = useState();

  const router = useRouter();

  const handlePagePostByUser = (userId) => {
    localStorage.setItem('currentViewUserId', userId);
    router.push({
      pathname: "/userPosts"
    });
  }


  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token')
      setIsError(false)

      let res
      if (token !== null) {
        res = await getPostsLogin(setStatusCode);
        setResult(res);
      } else {
        res = await getPosts(setStatusCode);
        setResult(res);
      }

      if (res != null) {
        const favoArray = res.Post.map(post => (post.favoStatus))
        setFavo(favoArray)
      } else {
        setIsError(true);
        setErrorContent("表示できるコンテンツがありません。");
      }

    }
    fetchData();
  }, [props.loginStatus]);

  useEffect(() => {
    if (statusCode === 200 || statusCode === 201) {
      setIsError(false)
    } else if (statusCode === 400) {
      setIsError(true);
      setErrorContent(result);
      localStorage.clear()
      props.setLoginStatus(false);
    } else {
      setIsError(true);
      setErrorContent(result);
    }
  }, [statusCode, result])

  return (
    <><br />
      {isError ? (<><br /><br /><br /><br />{errorContent}</>) : (<>
        <ul className={utilStyles.list} >
          {result && <Post result={result} setPostDetailShow={setPostDetailShow}
            setPostDetailResult={setPostDetailResult} loginStatus={props.loginStatus}
            setLoginPopShow={props.setLoginPopShow}
            favos={favos} setFavo={setFavo} setTapFavosIndex={setTapFavosIndex}
            handlePagePostByUser={handlePagePostByUser} />}
        </ul >
        {postDetailResult && <PostDetail postDetailResult={postDetailResult}
          postDetailShow={postDetailShow} setPostDetailShow={setPostDetailShow} setLoginPopShow={props.setLoginPopShow}
          favos={favos} setFavo={setFavo} tapFavosIndex={tapFavosIndex} loginStatus={props.loginStatus} />
        } </>
      )
      }</>)
}

Home.getLayout = function getLayout(home, props) {
  return (
    <Layout home>
      <NestedLayout home>{home}</NestedLayout>
    </Layout >
  )
}
